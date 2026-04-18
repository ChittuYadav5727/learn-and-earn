import httpClient from '../api/httpClient';

export const userService = {
  getDashboard: async () => (await httpClient.get('/users/dashboard')).data.data,
  getProfile: async () => (await httpClient.get('/users/profile')).data.data,
  updateProfile: async (payload) => (await httpClient.put('/users/profile', payload)).data.data,
  updateMode: async (selectedMode) => (await httpClient.patch('/users/mode', { selectedMode })).data.data,
  getLearnEarn: async (mode) => (await httpClient.get(`/users/learn-earn?mode=${mode}`)).data.data,
  getInternships: async (type) => (await httpClient.get(`/users/internships?type=${type}`)).data.data,
  applyOpportunity: async (opportunityId, payload) =>
    (await httpClient.post(`/users/opportunities/${opportunityId}/apply`, payload)).data.data,
  getApplications: async () => (await httpClient.get('/users/applications')).data.data,
  getCompetitions: async () => (await httpClient.get('/users/competitions')).data.data,
  joinCompetition: async (competitionId) =>
    (await httpClient.post(`/users/competitions/${competitionId}/join`)).data.data,
  getLeaderboard: async () => (await httpClient.get('/users/leaderboard')).data.data,
  getWallet: async () => (await httpClient.get('/users/wallet')).data.data,
  getTasks: async () => (await httpClient.get('/users/tasks')).data.data,
  submitTask: async (taskId, submissionLink) =>
    (await httpClient.patch(`/users/tasks/${taskId}/submit`, { submissionLink })).data.data,
  getCertificationExam: async () => (await httpClient.get('/users/certification/exam')).data.data,
  submitCertification: async (answers) =>
    (await httpClient.post('/users/certification/submit', { answers })).data.data,
  getCertificationHistory: async () => (await httpClient.get('/users/certification/history')).data.data,
};
