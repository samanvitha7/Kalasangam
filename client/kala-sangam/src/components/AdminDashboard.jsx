import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import './AdminPanel.css';

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const renderUserManagement = () => (
    <div className="user-management">
      <h2>User Management</h2>
      {currentUser.role === 'Admin' ? (
        <div>
          <p>Admin can manage all users here</p>
          <div className="user-actions">
            <button className="btn btn-primary">View All Users</button>
            <button className="btn btn-secondary">Create New User</button>
            <button className="btn btn-warning">Manage Roles</button>
          </div>
        </div>
      ) : (
        <div className="access-limited">
          <p>Limited access: You can only view your own profile.</p>
        </div>
      )}
    </div>
  );

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

export default AdminDashboard;
