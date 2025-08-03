import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '../utils/axios';

const AuthContext = createContext();

const getStoredToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const setTokenStorage = (token, rememberMe = true) => {
  if (rememberMe) {
    localStorage.setItem('token', token);
    sessionStorage.removeItem('token');
  } else {
    sessionStorage.setItem('token', token);
    localStorage.removeItem('token');
  }
};

const removeTokenFromStorage = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

const initialState = {
  user: null,
  token: getStoredToken(),
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      // Token storage is now handled in the action dispatch
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'AUTH_ERROR':
      removeTokenFromStorage();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      removeTokenFromStorage();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Load user
  const loadUser = async () => {
    const token = getStoredToken();
    
    // If no token exists, don't make the API call
    if (!token) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: 'No token found'
      });
      return;
    }

    setAuthToken(token);

    try {
      const res = await api.get('/api/auth/me');
      console.log('AuthContext loadUser response:', res.data);
      console.log('User data loaded:', res.data.user);
      console.log('User likes:', res.data.user?.likes);
      
      // Make sure role is stored in localStorage for ProtectedRoute
      if (res.data.user && res.data.user.role) {
        localStorage.setItem('userRole', res.data.user.role);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.user
      });
    } catch (error) {
      // Handle 401 errors silently as they're expected when not authenticated
      if (error.response?.status === 401) {
        removeTokenFromStorage();
        setAuthToken(null);
      }
      
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.response?.data?.message || 'Authentication failed'
      });
    }
  };

  // Register user
  const register = async (formData, rememberMe = true) => {
  dispatch({ type: 'SET_LOADING', payload: true });

  try {
    console.log('Sending registration data:', formData); // Debug log
    const res = await api.post('/api/auth/register', formData);
    console.log('Registration response:', res.data); // Debug log
    
    const { token, user } = res.data;

    // Store token based on remember me preference
    setTokenStorage(token, rememberMe);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: { token, user }
    });

    setAuthToken(token);

    // Note: Artist profile creation is now handled on the backend
    
    return { success: true, data: res.data };
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message); // Debug log
    const errorMessage = error.response?.data?.message || 'Registration failed';
    dispatch({
      type: 'REGISTER_FAIL',
      payload: errorMessage
    });
    return { success: false, error: errorMessage };
  }
};

  // Register user with phone
  const registerWithPhone = async (formData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const res = await api.post('/api/auth/register-phone', formData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });
      setAuthToken(res.data.token);
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch({
        type: 'REGISTER_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Login user
  const login = async (formData, rememberMe = true) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const res = await api.post('/api/auth/login', formData);
      
      // Store token based on remember me preference
      setTokenStorage(res.data.token, rememberMe);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      setAuthToken(res.data.token);
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Login user with phone
  const loginWithPhone = async (formData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const res = await api.post('/api/auth/login-phone', formData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      setAuthToken(res.data.token);
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({
        type: 'LOGIN_FAIL',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    dispatch({ type: 'LOGOUT' });
    setAuthToken(null);
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const res = await api.post('/api/auth/forgot-password', { email });
      return { success: true, message: res.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send reset email';
      return { success: false, error: errorMessage };
    }
  };

  // Reset password
  const resetPassword = async (resetToken, password) => {
    try {
      const res = await api.put(`/api/auth/reset-password/${resetToken}`, { password });
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      setAuthToken(res.data.token);
      return { success: true, data: res.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password reset failed';
      return { success: false, error: errorMessage };
    }
  };

  // Verify email
  const verifyEmail = async (token) => {
    try {
      const res = await api.get(`/api/auth/verify-email/${token}`);
      return { success: true, message: res.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Email verification failed';
      return { success: false, error: errorMessage };
    }
  };

  // Resend verification email
  const resendVerificationEmail = async (email) => {
    try {
      const res = await api.post('/api/auth/resend-verification', { email });
      return { success: true, message: res.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to resend verification email';
      return { success: false, error: errorMessage };
    }
  };

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Update user
  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        registerWithPhone,
        login,
        loginWithPhone,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        resendVerificationEmail,
        clearError,
        loadUser,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
