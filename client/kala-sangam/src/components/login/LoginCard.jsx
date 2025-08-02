import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

const LoginCard = ({ 
  form, 
  handleChange, 
  handleSubmit, 
  error, 
  isSubmitting, 
  loading 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePhoneLogin = () => {
    navigate('/phone-login');
  };

  const primaryBtnClasses = "w-full bg-deep-teal hover:bg-lotus-green text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl";

  return (
    <div className="bg-blush-peach/100 backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-full max-w-6xl border-2 border-white/50 ring-2 ring-deep-teal/10 drop-shadow-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-deep-teal mb-2 font-lora">
          Welcome back
        </h2>
      </div>

      {error && (
        <div className="bg-coral-pink/10 border border-coral-pink/20 text-coral-pink px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white/50"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-deep-teal transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <Link 
            to="/forgot-password" 
            className="text-sm text-coral-pink hover:text-deep-teal font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading || isSubmitting}
          className={primaryBtnClasses}
        >
          {(loading || isSubmitting) && <FaSpinner className="animate-spin" size={16} />}
          {(loading || isSubmitting) ? 'Logging in...' : 'Log in'}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-blush-peach text-gray-500">OR</span>
          </div>
        </div>

        {/* Phone login as inline link like signup */}
        <div className="text-center">
          <span className="text-sm text-gray-600 mr-1">Continue with</span>
          <button
            type="button"
            onClick={handlePhoneLogin}
            className="text-coral-pink font-semibold hover:text-deep-teal transition-colors text-sm"
          >
            Phone Number
          </button>
        </div>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-semibold text-coral-pink hover:text-deep-teal transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
