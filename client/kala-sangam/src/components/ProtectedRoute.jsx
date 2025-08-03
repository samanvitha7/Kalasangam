import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple wrapper component for role-based protection
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  let userRole = localStorage.getItem('userRole');
  const userString = localStorage.getItem('user');
  
  // Try to get role from user object if userRole is not found
  if (!userRole && userString) {
    try {
      const user = JSON.parse(userString);
      userRole = user.role;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }

  console.log('ProtectedRoute check:', {
    hasToken: !!token,
    hasUser: !!userString,
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p><strong>Required role:</strong> {allowedRoles.join(' or ')}</p>
            <p><strong>Your role:</strong> {userRole || 'Not specified'}</p>
          </div>
          <div className="mt-6">
            <button 
              onClick={() => window.location.href = '/admin/login'}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Login as Admin
            </button>
            <button 
              onClick={() => window.location.href = '/home'}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  console.log('ProtectedRoute passed, rendering children');
  return children;
};

export default ProtectedRoute;

