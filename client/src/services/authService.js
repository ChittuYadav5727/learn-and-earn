import httpClient from '../api/httpClient';

export const authService = {
  registerUser: async (payload) => {
    const response = await httpClient.post('/auth/user/register', payload);
    return response.data.data;
  },
  registerProvider: async (payload) => {
    const response = await httpClient.post('/auth/provider/register', payload);
    return response.data.data;
  },
  login: async (payload) => {
    const response = await httpClient.post('/auth/login', payload);
    return response.data.data;
  },
  getCurrentUser: async () => {
    const response = await httpClient.get('/auth/me');
    return response.data.data;
  },
  getSocialProviders: async () => {
    const response = await httpClient.get('/auth/social/providers');
    return response.data.data;
  },
  getSocialRedirect: async (provider) => {
    const response = await httpClient.get(`/auth/social/${provider}`);
    return response.data.data;
  },
};
