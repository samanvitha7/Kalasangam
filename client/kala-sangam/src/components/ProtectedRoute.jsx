import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple wrapper component for role-based protection
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Required role: {allowedRoles.join(' or ')}</p>
        <p>Your role: {userRole || 'Not specified'}</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;

