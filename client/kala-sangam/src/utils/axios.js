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
    console.log('Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers if present
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Reject if request fails
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response; // Return response as-is if no error
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid (Unauthorized)
      localStorage.removeItem('token'); // Remove invalid token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error); // Reject the error to propagate it
  }
);

export default api;
