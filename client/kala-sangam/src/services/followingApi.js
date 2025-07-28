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

export const followingApi = {
  // Follow a user
  followUser: async (userId) => {
    const response = await api.post(`/following/follow/${userId}`);
    return response.data;
  },

  // Unfollow a user
  unfollowUser: async (userId) => {
    const response = await api.post(`/following/unfollow/${userId}`);
    return response.data;
  },

  // Get following list
  getFollowing: async () => {
    const response = await api.get('/following/following');
    return response.data;
  },

  // Get followers list
  getFollowers: async () => {
    const response = await api.get('/following/followers');
    return response.data;
  },

  // Check if following a specific user
  isFollowing: async (userId) => {
    try {
      const response = await api.get('/following/following');
      if (response.data.success) {
        return response.data.following.some(user => user._id === userId);
      }
      return false;
    } catch (error) {
      console.error('Error checking follow status:', error);
      return false;
    }
  }
};

export default followingApi;
