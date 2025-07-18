import axios from 'axios';

<<<<<<< HEAD
// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
=======
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
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers if present
>>>>>>> 3679e650e422a55cda1b9a2f6b93fa0844cda0c7
    }
    return config;
  },
  (error) => {
<<<<<<< HEAD
    return Promise.reject(error);
=======
    return Promise.reject(error); // Reject if request fails
>>>>>>> 3679e650e422a55cda1b9a2f6b93fa0844cda0c7
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
<<<<<<< HEAD
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
=======
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid (Unauthorized)
      localStorage.removeItem('token');
      // Don't redirect here; handle redirects in your app routing logic
    }
    return Promise.reject(error); // Reject the error to propagate it
>>>>>>> 3679e650e422a55cda1b9a2f6b93fa0844cda0c7
  }
);

export default api;
