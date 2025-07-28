// src/pages/PhoneSignup.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isPhoneNumberValid, isPasswordStrong, getPhoneValidationMessage, formatPhoneForStorage } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

export default function PhoneSignup() {
  const [form, setForm] = useState({ name: "", phoneNumber: "", password: "" });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    terms: "",
    privacy: ""
  });
  const [hasBlurred, setHasBlurred] = useState({
    name: false,
    phoneNumber: false,
    password: false
  });
  const navigate = useNavigate();
  const { registerWithPhone, isAuthenticated, loading, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, []);

  const validateField = (fieldName, value, realTime = false) => {
    let errorMessage = "";
    
    switch (fieldName) {
      case 'name':
        if (!realTime && !value.trim()) {
          errorMessage = "Full name is required";
        } else if (value.trim() && value.trim().length < 2) {
          errorMessage = "Name must be at least 2 characters long";
        }
        break;
      case 'phoneNumber':
        if (!realTime && !value.trim()) {
          errorMessage = "Phone number is required";
        } else if (value.trim()) {
          const validationMessage = getPhoneValidationMessage(value);
          if (validationMessage) {
            errorMessage = validationMessage;
          }
        }
        break;
      case 'password':
        if (!realTime && !value.trim()) {
          errorMessage = "Password is required";
        } else if (value.trim() && !isPasswordStrong(value)) {
          errorMessage = "Password must be at least 6 characters long";
        }
        break;
      case 'terms':
        if (!value) {
          errorMessage = "You must agree to the Terms of Service";
        }
        break;
      case 'privacy':
        if (!value) {
          errorMessage = "You must agree to the Privacy Policy";
        }
        break;
      default:
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [fieldName]: errorMessage }));
    return errorMessage === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
    
    // Real-time validation for better UX
    if (hasBlurred[name]) {
      validateField(name, value, true);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setHasBlurred(prev => ({ ...prev, [name]: true }));
    validateField(name, value, false);
  };

  const handleCheckboxChange = (checkboxType, checked) => {
    if (checkboxType === 'terms') {
      setAgreedToTerms(checked);
      validateField('terms', checked, false);
    } else if (checkboxType === 'privacy') {
      setAgreedToPrivacy(checked);
      validateField('privacy', checked, false);
    }
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
      setError("You must agree to the Terms of Service.");
      return;
    }
    
    if (!agreedToPrivacy) {
      setError("You must agree to the Privacy Policy.");
      return;
    }

    const result = await registerWithPhone(form);
    if (result.success) {
      toast.success("Account created successfully! Welcome to KalaSangam!");
      navigate("/home");
    } else {
      setError(result.error);
      toast.error(result.error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url('/assets/parallaximg.png')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[linear-gradient(to_bottom,rgba(255,190,152,0.8),rgba(255,187,233,0.7),rgba(44,165,141,0.7))] 
                  p-10 rounded-3xl max-w-md w-full shadow-xl border border-white/20 font-lora"
      >
        <h2 className="text-4xl font-bold text-center mb-3 text-deep-teal">Create Account</h2>
        <p className="text-center mb-6 text-sm text-teal-200">Join KalaSangam with your phone!</p>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder={fieldErrors.name || !form.name ? "Full Name" : ""}
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
              fieldErrors.name ? 'border-coral-red' : 'border-coral-red/30'
            } placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none transition-all duration-200`}
          />
          {fieldErrors.name && (
            <p className="text-coral-red text-xs mt-1 font-medium">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="tel"
            name="phoneNumber"
            placeholder={fieldErrors.phoneNumber || !form.phoneNumber ? "Phone Number (e.g., +1234567890)" : ""}
            value={form.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
              fieldErrors.phoneNumber ? 'border-coral-red' : 'border-coral-red/30'
            } placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none transition-all duration-200`}
          />
          {fieldErrors.phoneNumber && (
            <p className="text-coral-red text-xs mt-1 font-medium">
              {fieldErrors.phoneNumber}
            </p>
          )}
        </div>

        {/* Phone Number Requirements */}
        <div className="mb-3">
          <p className="text-sm font-semibold text-[#284139] mb-2">Phone Number Format:</p>
          <ul className="text-xs text-teal-200 space-y-1 ml-4">
            <li className="flex items-center">
              <span className="w-1 h-1 bg-teal-200 rounded-full mr-2"></span>
              International: +1234567890 (10-18 digits after +)
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-teal-200 rounded-full mr-2"></span>
              Domestic: 1234567890 (10-15 digits)
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-teal-200 rounded-full mr-2"></span>
              Allowed: +, -, (), spaces (automatically removed)
            </li>
          </ul>
        </div>

        {/* Password Requirements */}
        <div className="mb-3">
          <p className="text-sm font-semibold text-[#284139] mb-2">Password Requirements:</p>
          <ul className="text-xs text-teal-200 space-y-1 ml-4">
            <li className="flex items-center">
              <span className="w-1 h-1 bg-teal-200 rounded-full mr-2"></span>
              At least 6 characters long
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-teal-200 rounded-full mr-2"></span>
              Mix of letters and numbers recommended
            </li>
            <li className="flex items-center">
              <span className="w-1 h-1 bg-teal-200 rounded-full mr-2"></span>
              Avoid common passwords
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder={fieldErrors.password || !form.password ? "Password" : ""}
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 border-2 ${
              fieldErrors.password ? 'border-coral-red' : 'border-coral-red/30'
            } placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none transition-all duration-200`}
          />
          {fieldErrors.password && (
            <p className="text-coral-red text-xs mt-1 font-medium">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Agreement Checkboxes */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => handleCheckboxChange('terms', e.target.checked)}
                className={`mt-1 w-4 h-4 text-deep-teal border ${
                  fieldErrors.terms ? 'border-coral-red border-2' : 'border-gray-300'
                } rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200`}
              />
              <span className="text-[#284139] leading-relaxed">
                I agree to KalaSangam's{" "}
                <Link 
                  to="/terms-of-service" 
                  target="_blank" 
                  className="text-coral-red hover:underline font-semibold"
                >
                  Terms of Service
                </Link>
              </span>
            </label>
            {fieldErrors.terms && (
              <p className="text-coral-red text-xs mt-1 ml-7 font-medium">
                {fieldErrors.terms}
              </p>
            )}
          </div>
          
          <div>
            <label className="flex items-start gap-3 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPrivacy}
                onChange={(e) => handleCheckboxChange('privacy', e.target.checked)}
                className={`mt-1 w-4 h-4 text-deep-teal border ${
                  fieldErrors.privacy ? 'border-coral-red border-2' : 'border-gray-300'
                } rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200`}
              />
              <span className="text-[#284139] leading-relaxed">
                I agree to KalaSangam's{" "}
                <Link 
                  to="/privacy-policy" 
                  target="_blank" 
                  className="text-coral-red hover:underline font-semibold"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            {fieldErrors.privacy && (
              <p className="text-coral-red text-xs mt-1 ml-7 font-medium">
                {fieldErrors.privacy}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-deep-teal hover:bg-coral-red text-off-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Switch to email signup */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-sm bg-white/20 hover:bg-white/30 text-deep-teal font-semibold py-2 px-4 rounded-lg border border-deep-teal/30 transition-all"
          >
            📧 Continue with Email Instead
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-teal-200">
          Already have an account? <Link to="/phone-login" className="underline font-semibold hover:text-coral-red">Login with Phone</Link>
        </p>
      </form>
    </div>
  );
}
