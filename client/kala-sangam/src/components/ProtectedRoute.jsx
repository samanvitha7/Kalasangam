import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple wrapper component for role-based protection
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const user = localStorage.getItem('user');

  console.log('ProtectedRoute check:', {
    hasToken: !!token,
    hasUser: !!user,
    userRole,
    allowedRoles,
    tokenLength: token ? token.length : 0
  });

  // Check if user is authenticated
  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log('Role check failed', { userRole, allowedRoles });
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Required role: {allowedRoles.join(' or ')}</p>
        <p>Your role: {userRole || 'Not specified'}</p>
      </div>
    );
  }

  console.log('ProtectedRoute passed, rendering children');
  return children;
};

export default ProtectedRoute;

