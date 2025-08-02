import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

const SignupCard = ({ 
  form, 
  handleChange, 
  handleSubmit, 
  error, 
  fieldErrors,
  agreedToTerms,
  setAgreedToTerms,
  emailNotifications,
  setEmailNotifications,
  rememberMe,
  setRememberMe,
  passwordRequirements,
  loading 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white/100 backdrop-blur-xl p-6 rounded-xl shadow-xl w-full max-w-md border border-white/40 ring-1 ring-deep-teal/10 drop-shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-deep-teal mb-2 font-dm-serif">
          Join as Artist
        </h2>
        <p className="text-gray-600">
          Start your artistic journey with us!
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-coral-pink/10 border border-coral-pink/20 text-coral-pink px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white ${
              fieldErrors.name 
                ? 'border-coral-red border-2' 
                : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
            required
          />
          {fieldErrors.name && (
            <p className="text-coral-red text-xs mt-1 font-medium">
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white ${
              fieldErrors.email 
                ? 'border-coral-red border-2' 
                : 'border-gray-300'
            }`}
            placeholder="Enter your email"
            required
          />
          {fieldErrors.email && (
            <p className="text-coral-red text-xs mt-1 font-medium">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password Requirements */}
        {form.password && (!passwordRequirements.minLength || !passwordRequirements.hasNumber || !passwordRequirements.hasSpecialChar) && (
          <div className="mb-3 transition-all duration-300 ease-in-out">
            <p className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</p>
            <ul className="text-xs text-gray-600 space-y-1 ml-4">
              <li className={`flex items-center ${passwordRequirements.minLength ? 'text-green-600' : 'text-gray-600'}`}>
                <span className={`w-1 h-1 rounded-full mr-2 ${passwordRequirements.minLength ? 'bg-green-600' : 'bg-gray-600'}`}></span>
                At least 6 characters long
              </li>
              <li className={`flex items-center ${passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-600'}`}>
                <span className={`w-1 h-1 rounded-full mr-2 ${passwordRequirements.hasNumber ? 'bg-green-600' : 'bg-gray-600'}`}></span>
                Contains at least one number
              </li>
              <li className={`flex items-center ${passwordRequirements.hasSpecialChar ? 'text-green-600' : 'text-gray-600'}`}>
                <span className={`w-1 h-1 rounded-full mr-2 ${passwordRequirements.hasSpecialChar ? 'bg-green-600' : 'bg-gray-600'}`}></span>
                Contains at least one special character
              </li>
            </ul>
          </div>
        )}

        {/* Password Field */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white/50 ${
                fieldErrors.password 
                  ? 'border-coral-red border-2' 
                  : 'border-gray-300'
              }`}
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
          {fieldErrors.password && (
            <p className="text-coral-red text-xs mt-1 font-medium">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Agreement Checkboxes */}
        <div className="space-y-4">
          <div>
            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className={`mt-1 w-4 h-4 text-deep-teal border rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200 ${
                  fieldErrors.terms ? 'border-coral-red border-2' : 'border-gray-300'
                }`}
              />
              <span className="text-gray-700 leading-relaxed">
                I agree to KalaSangam's{" "}
                <Link 
                  to="/terms-of-service" 
                  target="_blank" 
                  className="text-deep-teal hover:text-coral-pink font-semibold hover:underline"
                >
                  TOS and Privacy Policy
                </Link>
              </span>
            </label>
            {fieldErrors.terms && (
              <p className="text-coral-red text-xs mt-1 ml-7 font-medium">
                {fieldErrors.terms}
              </p>
            )}
          </div>
          
          {/* Email Notifications Checkbox */}
          <div>
            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="mt-1 w-4 h-4 text-deep-teal border border-gray-300 rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200"
              />
              <span className="text-gray-700 leading-relaxed">
                <strong>Email Updates</strong> - Get notified when someone follows you
              </span>
            </label>
          </div>
          
          {/* Remember Me Checkbox */}
          <div>
            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mt-1 w-4 h-4 text-deep-teal border border-gray-300 rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200"
              />
              <span className="text-gray-700 leading-relaxed">
                <strong>Remember me</strong> - Stay logged in even after closing the browser
              </span>
            </label>
          </div>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-deep-teal hover:bg-lotus-green text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {loading && <FaSpinner className="animate-spin" size={16} />}
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>


        {/* Switch to phone signup */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/phone-signup')}
            className="text-sm bg-gray-100 hover:bg-gray-200 text-deep-teal font-semibold py-2 px-4 rounded-lg border border-gray-300 transition-all"
          >
            📱 Continue with Phone Number Instead
          </button>
        </div>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6 pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-deep-teal hover:text-coral-pink transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupCard;
