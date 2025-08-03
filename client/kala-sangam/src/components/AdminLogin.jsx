import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { adminApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import BackgroundImageGrid from './login/BackgroundImageGrid';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!credentials.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    console.log('Attempting admin login with:', { email: credentials.email });

    try {
      const data = await adminApi.adminLogin(credentials);
      console.log('Admin login successful:', data);
      
      // Store in localStorage first - make sure user role is properly stored
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userRole', data.user.role);
      
      // Debug logging
      console.log('Stored in localStorage:', {
        token: data.token ? 'exists' : 'missing',
        user: data.user,
        userRole: data.user.role
      });
      
      // Trigger AuthContext to load the user and update state
      await loadUser();
      
      if (onLogin) {
        onLogin(data.user);
      }
      
      navigate('/admin');
    } catch (err) {
      console.error('Admin login error:', err);
      
      // More specific error handling
      if (err.message.includes('401') || err.message.includes('403')) {
        setError('Invalid admin credentials or insufficient privileges');
      } else if (err.message.includes('400')) {
        setError('Please check your email and password');
      } else if (err.message.includes('500')) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Full screen background image grid */}
      <div className="absolute inset-0">
        <BackgroundImageGrid />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Admin Login card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-blush-peach/100 backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-full max-w-6xl border-2 border-white/50 ring-2 ring-deep-teal/10 drop-shadow-2xl"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-deep-teal mb-2 font-lora">
              Admin Access
            </h2>
            <p className="text-sm text-gray-600">Administrator login only</p>
          </div>

          {error && (
            <div className="bg-coral-pink/10 border border-coral-pink/20 text-coral-pink px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={credentials.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Admin Password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-deep-teal hover:bg-lotus-green text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading && <FaSpinner className="animate-spin" size={16} />}
              {loading ? "Logging in..." : "Admin Login"}
            </button>
          </div>

          {/* Back to normal login option */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-3">Need regular access?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm bg-coral-pink/10 hover:bg-coral-pink/20 text-coral-pink font-semibold py-2 px-4 rounded-lg border border-coral-pink/30 transition-all"
              >
                🔓 Login as User
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm bg-deep-teal/10 hover:bg-deep-teal/20 text-deep-teal font-semibold py-2 px-4 rounded-lg border border-deep-teal/30 transition-all"
              >
                🏠 Back to App
              </button>
            </div>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Forgot admin credentials?{' '}
              <Link 
                to="/contact" 
                className="font-semibold text-coral-pink hover:text-deep-teal transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
