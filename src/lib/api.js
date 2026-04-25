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
