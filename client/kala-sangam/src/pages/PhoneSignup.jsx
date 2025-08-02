// src/pages/PhoneSignup.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { isPhoneNumberValid, isPasswordStrong, getPhoneValidationMessage } from "../utils/validators";
import { useAuth } from "../context/AuthContext";
import BackgroundImageGrid from "../components/login/BackgroundImageGrid";
import OverlayText from "../components/login/OverlayText";

export default function PhoneSignup() {
  const [form, setForm] = useState({ name: "", phoneNumber: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { registerWithPhone, isAuthenticated, loading, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phoneNumber, password } = form;

    if (!name || !phoneNumber || !password) {
      setError("All fields are required.");
      return;
    }

    const phoneValidationMessage = getPhoneValidationMessage(phoneNumber);
    if (phoneValidationMessage) {
      setError(phoneValidationMessage);
      return;
    }

    if (!isPasswordStrong(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerWithPhone(form);
      if (result.success) {
        toast.success("Account created successfully! Welcome to KalaSangam!");
        navigate("/home");
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryBtnClasses = "w-full bg-deep-teal hover:bg-lotus-green text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl";

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Full screen background image grid */}
      <div className="absolute inset-0">
        <BackgroundImageGrid />
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Overlay text */}
      <div className="absolute left-48 top-1/2 -translate-y-1/2 z-10">
        <OverlayText />
      </div>

      {/* Signup card background area for better visibility */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-black/40 to-transparent z-[15]" />

      {/* Phone Signup card */}
      <div className="absolute right-48 top-1/2 -translate-y-1/2 z-20">
        <div className="bg-blush-peach/100 backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-full max-w-6xl border-2 border-white/50 ring-2 ring-deep-teal/10 drop-shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-deep-teal mb-2 font-lora">
              Create Account
            </h2>
            <p className="text-sm text-gray-600">Join KalaSangam with your phone</p>
          </div>

          {error && (
            <div className="bg-coral-pink/10 border border-coral-pink/20 text-coral-pink px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white"
                placeholder="Full Name"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white"
                placeholder="Phone Number (e.g., +1234567890)"
                required
              />
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
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

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-deep-teal border border-gray-300 rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200"
              />
              <span className="text-[#284139] leading-relaxed">
                I agree to KalaSangam's{' '}
                <Link
                  to="/terms-of-service"
                  target="_blank"
                  className="text-coral-red hover:underline font-semibold"
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  className="text-coral-red hover:underline font-semibold"
                >
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className={primaryBtnClasses}
            >
              {(loading || isSubmitting) && <FaSpinner className="animate-spin" size={16} />}
              {(loading || isSubmitting) ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-blush-peach text-gray-500">OR</span>
              </div>
            </div>

            {/* Email signup as inline link */}
            <div className="text-center">
              <span className="text-sm text-gray-600 mr-1">Continue with</span>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-coral-pink font-semibold hover:text-deep-teal transition-colors text-sm"
              >
                Email Address
              </button>
            </div>
          </form>

          {/* Admin login option */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="text-sm bg-coral-red/10 hover:bg-coral-red/20 text-coral-red font-semibold py-2 px-4 rounded-lg border border-coral-red/30 transition-all"
            >
              🔐 Login as Admin
            </button>
          </div>

          {/* Already have an account? */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/phone-login"
                className="font-semibold text-coral-pink hover:text-deep-teal transition-colors"
              >
                Login with Phone
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
