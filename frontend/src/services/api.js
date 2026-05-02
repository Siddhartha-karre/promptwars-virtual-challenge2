import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

export const simulatorAPI = {
  startSimulation: (role) => api.post('/simulator/start', { role }),
  makeDecision: (sessionId, decision) =>
    api.post('/simulator/decide', { sessionId, decision }),
  getSessionDetails: (sessionId) => api.get(`/simulator/session/${sessionId}`),
  getUserSessions: () => api.get('/simulator/my-sessions'),
};

export const assistantAPI = {
  searchAnswers: (query) => api.post('/assistant/search', { query }),
  getCommonQuestions: () => api.get('/assistant/common-questions'),
  getAnswerByCategory: (category) =>
    api.get(`/assistant/category/${category}`),
};

export const misinformationAPI = {
  getChallenge: () => api.get('/misinformation/challenge'),
  submitAnswer: (contentId, userResponse) =>
    api.post('/misinformation/submit-answer', { contentId, userResponse }),
  getUserStats: () => api.get('/misinformation/stats'),
};

export const voterGuideAPI = {
  getGuide: () => api.get('/voter-guide/guide'),
  completeStep: (stepNumber) =>
    api.post('/voter-guide/complete-step', { stepNumber }),
  getProgress: () => api.get('/voter-guide/progress'),
};

export const timelineAPI = {
  getAllTimeline: () => api.get('/timeline/all'),
  getTimelineByStage: (stage) => api.get(`/timeline/stage/${stage}`),
  getTimelineOverview: () => api.get('/timeline/overview'),
};

export const progressAPI = {
  getUserProgress: () => api.get('/progress/user'),
  awardBadge: (badgeName, description) =>
    api.post('/progress/award-badge', { badgeName, description }),
  getAwarenessScore: () => api.get('/progress/awareness-score'),
  getLeaderboard: (limit) => api.get('/progress/leaderboard', { params: { limit } }),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

export default api;
