import { createHmac, timingSafeEqual } from 'node:crypto';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const loadEnvFile = (filePath) => {
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, 'utf8');

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
};

loadEnvFile(resolve(process.cwd(), '.env'));
loadEnvFile(resolve(process.cwd(), '.env.local'));

const PORT = Number(process.env.PORT ?? 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';
const SERVER_BASE_URL = process.env.SERVER_BASE_URL ?? `http://localhost:${PORT}`;
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY ?? '';
const CHAPA_WEBHOOK_SECRET = process.env.CHAPA_WEBHOOK_SECRET ?? CHAPA_SECRET_KEY;

const orders = new Map();

const json = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': FRONTEND_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type, chapa-signature, x-chapa-signature',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  });
  response.end(JSON.stringify(payload));
};

const readBody = async (request) => {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
};

const verifyWebhookSignature = (rawBody, headers) => {
  if (!CHAPA_WEBHOOK_SECRET) {
    return false;
  }

  const providedSignature = headers['x-chapa-signature'] ?? headers['chapa-signature'];
  if (!providedSignature) {
    return false;
  }

  const expectedSignature = createHmac('sha256', CHAPA_WEBHOOK_SECRET).update(rawBody).digest('hex');

  try {
    return timingSafeEqual(Buffer.from(providedSignature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
};

const createOrderRecord = ({ txRef, amount, customer, product }) => {
  const order = {
    txRef,
    amount,
    currency: 'ETB',
    status: 'initialized',
    product,
    customer,
    createdAt: new Date().toISOString(),
    chapa: null
  };

  orders.set(txRef, order);
  return order;
};

const initializeChapaTransaction = async ({ amount, email, firstName, lastName, phone, txRef, productName }) => {
  const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount,
      currency: 'ETB',
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      tx_ref: txRef,
      callback_url: `${SERVER_BASE_URL}/api/chapa/callback?tx_ref=${encodeURIComponent(txRef)}`,
      return_url: `${FRONTEND_ORIGIN}/cart?payment=success&tx_ref=${encodeURIComponent(txRef)}`,
      customization: {
        title: 'PrimeCommerce',
        description: `Payment for ${productName}`
      }
    })
  });

  const payload = await response.json();

  if (!response.ok || payload.status !== 'success') {
    throw new Error(payload.message ?? 'Failed to initialize Chapa transaction.');
  }

  return payload;
};

const verifyTransaction = async (txRef) => {
  const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${encodeURIComponent(txRef)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${CHAPA_SECRET_KEY}`
    }
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message ?? 'Failed to verify Chapa transaction.');
  }

  return payload;
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', SERVER_BASE_URL);

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': FRONTEND_ORIGIN,
      'Access-Control-Allow-Headers': 'Content-Type, chapa-signature, x-chapa-signature',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
    });
    response.end();
    return;
  }

  if (requestUrl.pathname === '/api/health' && request.method === 'GET') {
    json(response, 200, { ok: true, service: 'primecommerce-backend' });
    return;
  }

  if (requestUrl.pathname === '/api/chapa/initialize' && request.method === 'POST') {
    if (!CHAPA_SECRET_KEY) {
      json(response, 500, { message: 'CHAPA_SECRET_KEY is not configured on the server.' });
      return;
    }

    try {
      const rawBody = await readBody(request);
      const body = JSON.parse(rawBody || '{}');
      const txRef = body.txRef;

      if (!body.amount || !body.email || !body.firstName || !body.lastName || !txRef) {
        json(response, 400, { message: 'amount, email, firstName, lastName, and txRef are required.' });
        return;
      }

      const order = createOrderRecord({
        txRef,
        amount: body.amount,
        customer: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone ?? ''
        },
        product: {
          name: body.productName ?? 'PrimeCommerce Order'
        }
      });

      const chapaPayload = await initializeChapaTransaction({
        amount: body.amount,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone ?? '',
        txRef,
        productName: body.productName ?? 'PrimeCommerce Order'
      });

      order.chapa = chapaPayload.data ?? chapaPayload;
      order.status = 'pending';

      json(response, 200, {
        checkoutUrl: chapaPayload.data?.checkout_url,
        txRef,
        order
      });
    } catch (error) {
      json(response, 500, { message: error.message ?? 'Unable to initialize payment.' });
    }
    return;
  }

  if (requestUrl.pathname.startsWith('/api/chapa/verify/') && request.method === 'GET') {
    if (!CHAPA_SECRET_KEY) {
      json(response, 500, { message: 'CHAPA_SECRET_KEY is not configured on the server.' });
      return;
    }

    const txRef = decodeURIComponent(requestUrl.pathname.replace('/api/chapa/verify/', ''));

    try {
      const payload = await verifyTransaction(txRef);
      const order = orders.get(txRef);

      if (order) {
        order.status = payload.data?.status ?? payload.status ?? order.status;
        order.chapa = payload.data ?? payload;
      }

      json(response, 200, { txRef, order: order ?? null, chapa: payload });
    } catch (error) {
      json(response, 500, { message: error.message ?? 'Unable to verify transaction.' });
    }
    return;
  }

  if (requestUrl.pathname === '/api/chapa/callback' && request.method === 'GET') {
    const txRef = requestUrl.searchParams.get('tx_ref');

    if (!txRef) {
      json(response, 400, { message: 'tx_ref is required.' });
      return;
    }

    try {
      const payload = await verifyTransaction(txRef);
      const order = orders.get(txRef);

      if (order) {
        order.status = payload.data?.status ?? payload.status ?? order.status;
        order.chapa = payload.data ?? payload;
      }

      json(response, 200, { txRef, order: order ?? null, chapa: payload });
    } catch (error) {
      json(response, 500, { message: error.message ?? 'Unable to verify callback transaction.' });
    }
    return;
  }

  if (requestUrl.pathname === '/api/chapa/webhook' && request.method === 'POST') {
    const rawBody = await readBody(request);
    const payload = JSON.parse(rawBody || '{}');

    if (!verifyWebhookSignature(rawBody, request.headers)) {
      json(response, 401, { message: 'Invalid Chapa webhook signature.' });
      return;
    }

    const txRef = payload?.data?.tx_ref ?? payload?.tx_ref;

    if (txRef && orders.has(txRef)) {
      const order = orders.get(txRef);
      order.status = payload?.data?.status ?? payload?.status ?? order.status;
      order.chapa = payload;
    }

    json(response, 200, { received: true });
    return;
  }

  if (requestUrl.pathname.startsWith('/api/orders/') && request.method === 'GET') {
    const txRef = decodeURIComponent(requestUrl.pathname.replace('/api/orders/', ''));
    json(response, 200, { order: orders.get(txRef) ?? null });
    return;
  }

  json(response, 404, { message: 'Not found.' });
});

server.listen(PORT, () => {
  console.log(`PrimeCommerce backend listening on ${SERVER_BASE_URL}`);
});
