import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

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
      
      // Store in localStorage first
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userRole', data.user.role);
      
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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url('/assets/parallaximg.png')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-3xl max-w-md w-full shadow-xl border border-white/20 font-lora
                  bg-[linear-gradient(to_bottom,rgba(255,190,152,0.7),rgba(255,187,233,0.7),rgba(44,165,141,0.67))]"
      >
        <h2 className="text-4xl font-bold text-center mb-3 text-deep-teal">Admin Access</h2>
        <p className="text-center mb-4 text-sm text-teal-200">Administrator login only</p>
        
        {/* Back to normal login option */}
        <div className="text-center mb-6">
          <p className="text-xs text-teal-200 mb-2">Need regular access?</p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-xs bg-coral-pink/20 hover:bg-coral-pink/30 text-coral-pink font-semibold py-2 px-4 rounded-lg border border-coral-pink/30 transition-all"
          >
            🔓 Login as User
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-pink/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-pink/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-deep-teal hover:bg-coral-pink text-off-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Admin Login"}
        </button>

        {/* Back to app option */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm bg-white/20 hover:bg-white/30 text-deep-teal font-semibold py-2 px-4 rounded-lg border border-deep-teal/30 transition-all"
          >
            🏠 Back to App
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-teal-200">
          Forgot admin credentials? <Link to="/contact" className="underline font-semibold hover:text-coral-pink">Contact Support</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
