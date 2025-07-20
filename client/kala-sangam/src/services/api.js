const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Admin API functions
export const adminApi = {
  // Fetch all reports with optional filtering
  getReports: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    
    const url = `${API_URL}/api/reports${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }

    return response.json();
  },

  // Update report status with admin notes
  updateReportStatus: async (reportId, status, adminNotes = '') => {
    const response = await fetch(`${API_URL}/api/reports/${reportId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, adminNotes }),
    });

    if (!response.ok) {
      throw new Error('Failed to update report status');
    }

    return response.json();
  },

  // Get report statistics
  getReportStats: async () => {
    const response = await fetch(`${API_URL}/api/reports/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch report statistics');
    }

    return response.json();
  },

  // Admin login
  adminLogin: async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/admin-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Admin login failed');
    }

    return response.json();
  }
};

// General API functions that might be used elsewhere
export const api = {
  // Regular user login
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  // Register user
  register: async (userData) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },

  // Submit a report
  submitReport: async (reportData) => {
    const response = await fetch(`${API_URL}/api/reports`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit report');
    }

    return response.json();
  },

  // Get user's own reports
  getUserReports: async () => {
    const response = await fetch(`${API_URL}/api/reports/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user reports');
    }

    return response.json();
  }
};

export default { api, adminApi };
