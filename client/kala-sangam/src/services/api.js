const API_URL = import.meta.env.VITE_API_URL || 'https://kalasangam.onrender.com';

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
    
    console.log('Fetching reports from:', url);
    console.log('Using token:', localStorage.getItem('token') ? 'Present' : 'Missing');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error Response:', errorData);
      throw new Error(`Failed to fetch reports: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data;
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
  },

  // User management functions
  // Get all users with pagination and filters
  getAllUsers: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.role) queryParams.append('role', filters.role);
    
    const url = `${API_URL}/api/users/admin/all${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch users: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Get user statistics for admin dashboard
  getUserStatsAdmin: async () => {
    const response = await fetch(`${API_URL}/api/users/admin/stats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user statistics');
    }

    return response.json();
  },

  // Create new user (admin only)
  createUser: async (userData) => {
    const response = await fetch(`${API_URL}/api/users/admin/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || 'Failed to create user');
    }

    return response.json();
  },

  // Update user role (admin only)
  updateUserRole: async (userId, role) => {
    const response = await fetch(`${API_URL}/api/users/admin/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || 'Failed to update user role');
    }

    return response.json();
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    const response = await fetch(`${API_URL}/api/users/admin/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || 'Failed to delete user');
    }

    return response.json();
  },

  // Artwork management functions
  // Get all artworks (admin only)
  getAllArtworks: async () => {
    const response = await fetch(`${API_URL}/api/artforms`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch artworks: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Delete artwork (admin only)
  deleteArtwork: async (artworkId) => {
    const response = await fetch(`${API_URL}/api/artworks/${artworkId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || 'Failed to delete artwork');
    }

    return response.json();
  },

  // Event management functions
  // Get all events (admin only)
  getAllEvents: async (options = {}) => {
    const queryParams = new URLSearchParams();
    
    // Add option to filter by creator role
    if (options.creatorRole) {
      queryParams.append('creatorRole', options.creatorRole);
    }
    if (options.upcoming !== undefined) {
      queryParams.append('upcoming', options.upcoming);
    }

    const url = `${API_URL}/api/events${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch events: ${response.status} - ${errorData}`);
    }

    const result = await response.json();
    return result.data || [];
  },

  // Delete event (admin only)
  deleteEvent: async (eventId) => {
    const response = await fetch(`${API_URL}/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || 'Failed to delete event');
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
  },

  // Fetch cultural events
  getEvents: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.city) queryParams.append('city', filters.city);
    if (filters.state) queryParams.append('state', filters.state);
    if (filters.upcoming) queryParams.append('upcoming', filters.upcoming);
    if (filters.organizer) queryParams.append('organizer', filters.organizer);

    const url = `${API_URL}/api/events${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch events: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Fetch artists
  getArtists: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.featured) queryParams.append('featured', filters.featured);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);

    const url = `${API_URL}/api/users/artists${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch artists: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Fetch single artist by ID
  getArtist: async (artistId) => {
    const url = `${API_URL}/api/users/artists/${artistId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch artist: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Fetch artworks (real user-created artworks)
  getArtworks: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);
    if (filters.userId) queryParams.append('userId', filters.userId);

    const url = `${API_URL}/api/artworks${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch artworks: ${response.status} - ${errorData}`);
    }

    return response.json();
  },


  // Toggle like for an artwork
  toggleLike: async (artworkId) => {
    const response = await fetch(`${API_URL}/api/artworks/${artworkId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to toggle like: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Toggle bookmark for an artwork
  toggleBookmark: async (artworkId) => {
    const response = await fetch(`${API_URL}/api/artworks/${artworkId}/bookmark`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to toggle bookmark: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Create new artwork
  createArtwork: async (artworkData) => {
    const response = await fetch(`${API_URL}/api/artworks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artworkData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to create artwork: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Update existing artwork
  updateArtwork: async (artworkId, artworkData) => {
    const response = await fetch(`${API_URL}/api/artworks/${artworkId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artworkData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to update artwork: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Delete artwork
  deleteArtwork: async (artworkId) => {
    const response = await fetch(`${API_URL}/api/artworks/${artworkId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to delete artwork: ${response.status} - ${errorData}`);
    }

    return response.json();
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch current user: ${response.status} - ${errorData}`);
    }

    return response.json();
  }
};

export default { api, adminApi };
