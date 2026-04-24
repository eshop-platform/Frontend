const configuredBase = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
const defaultDevBase = import.meta.env.DEV ? 'http://127.0.0.1:5000' : '';

export const API_BASE_URL = configuredBase || '';

export const buildApiUrl = (path, baseUrl = API_BASE_URL) => `${baseUrl}${path}`;

const candidateUrls = (path) => {
  const urls = [];

  if (API_BASE_URL) {
    urls.push(buildApiUrl(path, API_BASE_URL));
  } else {
    urls.push(path);
  }

  if (defaultDevBase && !urls.includes(buildApiUrl(path, defaultDevBase))) {
    urls.push(buildApiUrl(path, defaultDevBase));
  }

  return urls;
};

export const apiFetch = async (path, options) => {
  let lastError;

  for (const url of candidateUrls(path)) {
    try {
      return await fetch(url, options);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error('Request failed.');
};

export const parseApiResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || 'Request failed.');
  }

  return payload;
};
