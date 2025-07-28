import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';

// Create axios instance with interceptors for auth
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const verificationApi = {
  // Submit verification request
  submitVerificationRequest: async (data) => {
    const response = await api.post('/verification/submit', data);
    return response.data;
  },

  // Get verification status
  getVerificationStatus: async () => {
    const response = await api.get('/verification/status');
    return response.data;
  },

  // Get verified artists (public)
  getVerifiedArtists: async (params = {}) => {
    const response = await api.get('/verification/verified-artists', { params });
    return response.data;
  },

  // Admin only - Get pending verifications
  getPendingVerifications: async (params = {}) => {
    const response = await api.get('/verification/pending', { params });
    return response.data;
  },

  // Admin only - Review verification
  reviewVerification: async (targetUserId, action, notes) => {
    const response = await api.post(`/verification/review/${targetUserId}`, {
      action,
      notes
    });
    return response.data;
  },

  // Admin only - Get verification stats
  getVerificationStats: async () => {
    const response = await api.get('/verification/stats');
    return response.data;
  }
};

export default verificationApi;
