import { apiFetch, parseApiResponse } from './apiConfig';

const normalizeProduct = (product) => ({
  id: product.id,
  name: product.name,
  image: product.image,
  images: product.images ?? (product.image ? [product.image] : []),
  category: product.category || 'Uncategorized',
  price: Number(product.price ?? 0),
  description: product.description || '',
  stock: Number(product.stock ?? 0),
  colors: product.colors ?? [],
  sizes: product.sizes ?? [],
  rating: Number(product.rating ?? 0),
  reviewCount: Number(product.reviewCount ?? 0),
  reviews: product.reviews ?? [],
  tags: product.tags ?? [],
  status: product.status,
  sellerName: product.sellerName || '',
  sellerEmail: product.sellerEmail || '',
  brandName: product.brandName || '',
  submittedAt: product.submittedAt || '',
  aiSummary: product.aiSummary || '',
  isNew: Boolean(product.isNew),
  onSale: Boolean(product.onSale),
  bestSeller: Boolean(product.bestSeller),
  gender: product.gender || '',
  isRemote: true
});

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });

  const payload = await parseApiResponse(await apiFetch(`/api/products${query.toString() ? `?${query}` : ''}`));
  const dataList = Array.isArray(payload) ? payload : (payload.data ?? []);
  return dataList.map(normalizeProduct);
};

export const fetchProductById = async (id) => {
  const payload = await parseApiResponse(await apiFetch(`/api/products/${id}`));
  return normalizeProduct(payload.data);
};

export const submitProduct = async (formData) => {
  const payload = await parseApiResponse(await apiFetch('/api/products/submit', {
    method: 'POST',
    body: formData
  }));

  return normalizeProduct(payload.data);
};

export const generateProductDraft = async (formData) => {
  const payload = await parseApiResponse(await apiFetch('/api/ai/product-draft', {
    method: 'POST',
    body: formData
  }));

  return payload.data;
};

export const suggestDynamicPrice = async (payload) => {
  const response = await apiFetch('/api/ai/pricing', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return parseApiResponse(response).then((result) => result.data);
};

export const approveProduct = async (id) => {
  const payload = await parseApiResponse(await apiFetch(`/api/products/${id}/approve`, {
    method: 'PATCH'
  }));

  return normalizeProduct(payload.data);
};

export const rejectProduct = async (id) => {
  const payload = await parseApiResponse(await apiFetch(`/api/products/${id}/reject`, {
    method: 'PATCH'
  }));

  return normalizeProduct(payload.data);
};

export const addRemoteReview = async (id, review) => {
  const payload = await parseApiResponse(await apiFetch(`/api/products/${id}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  }));

  return normalizeProduct(payload.data);
};

export const deleteProduct = async (id) => {
  await parseApiResponse(await apiFetch(`/api/products/${id}`, {
    method: 'DELETE'
  }));
};
