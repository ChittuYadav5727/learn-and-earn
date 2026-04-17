import axios from 'axios';
import { clearStoredSession, getStoredSession } from '../utils/storage';

const httpClient = axios.create({
  baseURL:
    import.meta.env.DEV
      ? '/api'
      : import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api',
});

httpClient.interceptors.request.use((config) => {
  const session = getStoredSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearStoredSession();
    }
    return Promise.reject(error);
  }
);

export default httpClient;
