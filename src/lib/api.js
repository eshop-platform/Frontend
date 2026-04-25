<<<<<<< HEAD
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

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
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
};
=======
const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const api = {
  // Products
  getProducts: async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products?${query}`);
    return res.json();
  },
  getProductById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },
  
  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  // Orders
  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return res.json();
  }
};
>>>>>>> d4cea9c8c7184f28035db3b584fb913dd2609fd0
