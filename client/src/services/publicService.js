import httpClient from '../api/httpClient';

export const publicService = {
  getHome: async () => {
    const response = await httpClient.get('/public/home');
    return response.data.data;
  },
  getVideos: async () => {
    const response = await httpClient.get('/public/videos');
    return response.data.data;
  },
  sendChatMessage: async (payload) => {
    const response = await httpClient.post('/public/chat', payload);
    return response.data.data;
  },
};
