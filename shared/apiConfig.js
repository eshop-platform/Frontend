import { API_BASE_URL, buildApiUrl, parseApiResponse } from '../src/lib/api';

export { API_BASE_URL, buildApiUrl, parseApiResponse };

export const apiFetch = (path, options) => fetch(buildApiUrl(path), options);
