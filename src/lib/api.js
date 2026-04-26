/**
 * Centralized API helper for standardizing fetch requests.
 * In Vite, only variables prefixed with VITE_ are exposed to frontend code.
 */

const API_PREFIX = '/api';
const configuredBaseUrl = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/+$/, '');

export const API_BASE_URL = configuredBaseUrl;

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value);

const isFormDataLike = (value) =>
  typeof FormData !== 'undefined' && value instanceof FormData;

const isUrlSearchParamsLike = (value) =>
  typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;

const hasContentTypeHeader = (headers = {}) =>
  Object.keys(headers).some((key) => key.toLowerCase() === 'content-type');

const normalizePath = (path) => (path.startsWith('/') ? path : `/${path}`);

const serializeBody = (body) => {
  if (
    body == null ||
    typeof body === 'string' ||
    isFormDataLike(body) ||
    isUrlSearchParamsLike(body) ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  return JSON.stringify(body);
};

export const buildApiUrl = (path) => {
  if (isAbsoluteUrl(path)) return path;
  const normalizedPath = normalizePath(path);
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
};

export const parseApiResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : await response.text().catch(() => '');

  if (!response.ok) {
    const message =
      (typeof payload === 'object' && payload?.message) ||
      (typeof payload === 'object' && payload?.error) ||
      (typeof payload === 'string' && payload) ||
      'Something went wrong';
    const error = new Error(message);
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return payload;
};

const resolveApiEndpoint = (endpoint) => {
  if (isAbsoluteUrl(endpoint)) return endpoint;
  if (endpoint.startsWith(API_PREFIX)) return endpoint;
  return `${API_PREFIX}${normalizePath(endpoint)}`;
};

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const body = serializeBody(options.body);
  const headers = {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  if (body != null && !isFormDataLike(body) && !hasContentTypeHeader(headers)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(buildApiUrl(resolveApiEndpoint(endpoint)), {
    ...options,
    body,
    headers
  });

  return parseApiResponse(response);
};

export const api = {
  get: (url, options) => apiCall(url, { ...options, method: 'GET' }),
  post: (url, body, options) => apiCall(url, { ...options, method: 'POST', body }),
  put: (url, body, options) => apiCall(url, { ...options, method: 'PUT', body }),
  patch: (url, body, options) => apiCall(url, { ...options, method: 'PATCH', body }),
  delete: (url, options) => apiCall(url, { ...options, method: 'DELETE' }),
  getProducts: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products?${query}`);
  },
  getProductById: (id) => api.get(`/products/${id}`),
  login: (credentials) => api.post('/auth/login', credentials),
  createOrder: (orderData) => api.post('/orders', orderData)
};
