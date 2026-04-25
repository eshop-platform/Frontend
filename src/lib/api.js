/**
 * Centralized API helper for standardizing fetch requests
 * Automatically attaches the JWT token if found in localStorage
 */

const API_BASE = '/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  // Ensure endpoint starts with / if not absolute
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  
  const response = await fetch(url, config);
  
  // Handle empty responses
  const contentType = response.headers.get('content-type');
  const data = contentType && contentType.includes('application/json') 
    ? await response.json() 
    : await response.text();

  if (!response.ok) {
    const error = new Error(data.message || data || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const api = {
  get: (url, options) => apiCall(url, { ...options, method: 'GET' }),
  post: (url, body, options) => apiCall(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (url, body, options) => apiCall(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: (url, body, options) => apiCall(url, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (url, options) => apiCall(url, { ...options, method: 'DELETE' }),

  // Compatibility helpers (if needed by other components)
  getProducts: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products?${query}`);
  },
  getProductById: (id) => api.get(`/products/${id}`),
  login: (credentials) => api.post('/auth/login', credentials),
  createOrder: (orderData) => api.post('/orders', orderData)
};
