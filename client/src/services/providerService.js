import httpClient from '../api/httpClient';

export const providerService = {
  getDashboard: async () => (await httpClient.get('/providers/dashboard')).data.data,
  getProfile: async () => (await httpClient.get('/providers/profile')).data.data,
  updateProfile: async (payload) => (await httpClient.put('/providers/profile', payload)).data.data,
  getGst: async () => (await httpClient.get('/providers/gst')).data.data,
  submitGst: async (payload) => (await httpClient.post('/providers/gst', payload)).data.data,
  getOpportunities: async () => (await httpClient.get('/providers/opportunities')).data.data,
  createOpportunity: async (payload) => (await httpClient.post('/providers/opportunities', payload)).data.data,
  updateOpportunity: async (opportunityId, payload) =>
    (await httpClient.patch(`/providers/opportunities/${opportunityId}`, payload)).data.data,
  deleteOpportunity: async (opportunityId) =>
    (await httpClient.delete(`/providers/opportunities/${opportunityId}`)).data.data,
  getApplicants: async () => (await httpClient.get('/providers/applicants')).data.data,
  updateApplicationStatus: async (applicationId, status) =>
    (await httpClient.patch(`/providers/applications/${applicationId}/status`, { status })).data.data,
};
