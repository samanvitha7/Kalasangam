import axios from 'axios';

// Create an instance of axios with default configuration
const api = axios.create({
  baseURL: 'http://localhost:5050', // API base URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from LocalStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid (Unauthorized)
      localStorage.removeItem('token');
      // Don't redirect here; handle redirects in your app routing logic
    }
    return Promise.reject(error); // Reject the error to propagate it
  }
);

export default api;
