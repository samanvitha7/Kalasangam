import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../services/api';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await adminApi.adminLogin(credentials);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userRole', data.user.role);
      
      if (onLogin) {
        onLogin(data.user);
      }
      
      navigate('/admin/panel');
    } catch (err) {
      setError(err.message || 'Login failed');
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
        <h2 className="text-4xl font-bold text-center mb-3 text-teal-blue">Admin Access</h2>
        <p className="text-center mb-4 text-sm text-teal-200">Administrator login only</p>
        
        {/* Back to normal login option */}
        <div className="text-center mb-6">
          <p className="text-xs text-teal-200 mb-2">Need regular access?</p>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-xs bg-coral-red/20 hover:bg-coral-red/30 text-coral-red font-semibold py-2 px-4 rounded-lg border border-coral-red/30 transition-all"
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
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-red/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Admin Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-red/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-blue hover:bg-coral-red text-off-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Admin Login"}
        </button>

        {/* Back to app option */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm bg-white/20 hover:bg-white/30 text-teal-blue font-semibold py-2 px-4 rounded-lg border border-teal-blue/30 transition-all"
          >
            🏠 Back to App
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-teal-200">
          Forgot admin credentials? <Link to="/contact" className="underline font-semibold hover:text-coral-red">Contact Support</Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
