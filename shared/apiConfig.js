const configuredBase = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export const API_BASE_URL = configuredBase || '';

export const buildApiUrl = (path, baseUrl = API_BASE_URL) => `${baseUrl}${path}`;

export const apiFetch = async (path, options) => {
  const url = API_BASE_URL ? `${API_BASE_URL}${path}` : path;
  return fetch(url, options);
};

export const parseApiResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || 'Request failed.');
  }

  return payload;
};
