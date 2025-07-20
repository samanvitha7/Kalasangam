import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import { adminApi } from '../services/api';
import './AdminPanel.css';

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFilters, setUserFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    role: 'all'
  });
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  // User management functions
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await adminApi.getAllUsers(userFilters);
      setUsers(data.users || []);
      setPagination(data.pagination || {});
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(`Error fetching users: ${err.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      setError('');
      await adminApi.createUser(userData);
      setShowCreateModal(false);
      fetchUsers(); // Refresh user list
    } catch (err) {
      setError(`Error creating user: ${err.message}`);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      setError('');
      await adminApi.updateUserRole(userId, newRole);
      setShowRoleModal(false);
      setSelectedUser(null);
      fetchUsers(); // Refresh user list
    } catch (err) {
      setError(`Error updating role: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    
    try {
      setError('');
      await adminApi.deleteUser(userId);
      fetchUsers(); // Refresh user list
    } catch (err) {
      setError(`Error deleting user: ${err.message}`);
    }
  };

  // Load users when the users tab is active
  useEffect(() => {
    if (activeTab === 'users' && currentUser?.role === 'Admin') {
      fetchUsers();
    }
  }, [activeTab, userFilters, currentUser]);

  if (!currentUser) {
    return <div className="loading">Loading...</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'reports':
        return <AdminPanel />;
      case 'users':
        return renderUserManagement();
      case 'content':
        return renderContentManagement();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="dashboard-overview">
      <h2>Welcome, {currentUser.name}!</h2>
      <p>Role: <span className="role-badge">{currentUser.role}</span></p>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Quick Stats</h3>
          <p>Your dashboard overview goes here</p>
        </div>
        
        {currentUser.role === 'Admin' && (
          <>
            <div className="dashboard-card">
              <h3>System Status</h3>
              <p>All systems operational</p>
            </div>
            <div className="dashboard-card">
              <h3>Recent Activity</h3>
              <p>Monitor platform activity</p>
            </div>
          </>
        )}
        
        {currentUser.role === 'Artist' && (
          <>
            <div className="dashboard-card">
              <h3>Your Artworks</h3>
              <p>Manage your art submissions</p>
            </div>
            <div className="dashboard-card">
              <h3>Performance</h3>
              <p>View your artwork statistics</p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderUserManagement = () => {
    if (currentUser.role !== 'Admin') {
      return (
        <div className="access-limited">
          <p>Limited access: You can only view your own profile.</p>
        </div>
      );
    }

    return (
      <div className="user-management">
        <div className="admin-header">
          <h2>User Management</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create New User
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Search and Filter Controls */}
        <div className="user-controls">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={userFilters.search}
            onChange={(e) => setUserFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
            className="search-input"
          />
          
          <select
            value={userFilters.role}
            onChange={(e) => setUserFilters(prev => ({ ...prev, role: e.target.value, page: 1 }))}
            className="role-filter"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Artist">Artist</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.isEmailVerified ? 'verified' : 'unverified'}`}>
                          {user.isEmailVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="user-actions">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowRoleModal(true);
                            }}
                            disabled={user._id === currentUser.id}
                          >
                            Change Role
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={user._id === currentUser.id}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setUserFilters(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={userFilters.page === 1}
              className="btn btn-sm"
            >
              Previous
            </button>
            <span>
              Page {userFilters.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setUserFilters(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={userFilters.page >= pagination.totalPages}
              className="btn btn-sm"
            >
              Next
            </button>
          </div>
        )}

        {/* Create User Modal */}
        {showCreateModal && (
          <CreateUserModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateUser}
            error={error}
          />
        )}

        {/* Change Role Modal */}
        {showRoleModal && selectedUser && (
          <ChangeRoleModal
            user={selectedUser}
            onClose={() => {
              setShowRoleModal(false);
              setSelectedUser(null);
            }}
            onSubmit={(newRole) => handleUpdateRole(selectedUser._id, newRole)}
            error={error}
          />
        )}
      </div>
    );
  };

  const renderContentManagement = () => (
    <div className="content-management">
      <h2>Content Management</h2>
      {currentUser.role === 'Admin' ? (
        <div>
          <p>Admin can manage all content</p>
          <div className="content-actions">
            <button className="btn btn-primary">Manage Artworks</button>
            <button className="btn btn-secondary">Manage Events</button>
            <button className="btn btn-success">Approve Submissions</button>
          </div>
        </div>
      ) : currentUser.role === 'Artist' ? (
        <div>
          <p>Artist can manage their own content</p>
          <div className="content-actions">
            <button className="btn btn-primary">My Artworks</button>
            <button className="btn btn-secondary">Upload New Art</button>
            <button className="btn btn-info">View Submissions</button>
          </div>
        </div>
      ) : (
        <div className="access-limited">
          <p>Viewers cannot manage content.</p>
        </div>
      )}
    </div>
  );

  const getAvailableTabs = () => {
    const baseTabs = [
      { id: 'dashboard', label: 'Dashboard', roles: ['Admin', 'Artist', 'Viewer'] }
    ];

    if (currentUser.role === 'Admin') {
      return [
        ...baseTabs,
        { id: 'reports', label: 'Reports', roles: ['Admin'] },
        { id: 'users', label: 'Users', roles: ['Admin'] },
        { id: 'content', label: 'Content', roles: ['Admin'] }
      ];
    } else if (currentUser.role === 'Artist') {
      return [
        ...baseTabs,
        { id: 'content', label: 'My Content', roles: ['Artist'] }
      ];
    } else {
      return baseTabs;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-left">
          <h1>Admin Panel</h1>
        </div>
        <div className="header-right">
          <span className="welcome-text">Welcome, {currentUser.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="admin-nav">
        {getAvailableTabs().map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

// Create User Modal Component
const CreateUserModal = ({ onClose, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Viewer'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', password: '', role: 'Viewer' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Create New User</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              disabled={submitting}
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              disabled={submitting}
            />
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              minLength="6"
              disabled={submitting}
            />
          </div>
          
          <div className="form-group">
            <label>Role:</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              disabled={submitting}
            >
              <option value="Viewer">Viewer</option>
              <option value="Artist">Artist</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Change Role Modal Component
const ChangeRoleModal = ({ user, onClose, onSubmit, error }) => {
  const [newRole, setNewRole] = useState(user.role);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || newRole === user.role) return;
    
    setSubmitting(true);
    try {
      await onSubmit(newRole);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Change User Role</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          {error && <div className="error-message">{error}</div>}
          
          <p><strong>User:</strong> {user.name} ({user.email})</p>
          <p><strong>Current Role:</strong> {user.role}</p>
          
          <div className="form-group">
            <label>New Role:</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              disabled={submitting}
            >
              <option value="Viewer">Viewer</option>
              <option value="Artist">Artist</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting || newRole === user.role}
            >
              {submitting ? 'Updating...' : 'Update Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
