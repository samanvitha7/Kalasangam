// src/pages/Signup.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid, isPasswordStrong } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const isArtistSignup = roleParam === 'artist';
  
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    role: "Artist" 
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
    privacy: ""
  });
  const [touchedFields, setTouchedFields] = useState({});
  const navigate = useNavigate();
  const { register, isAuthenticated, loading, clearError } = useAuth();
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });


  useEffect(() => {
    clearError();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'email':
        if (value.trim() === '') return 'Email is required';
        return !isEmailValid(value) ? 'Please enter a valid email address' : '';
      case 'password':
        if (value.trim() === '') return 'Password is required';
        const newRequirements = {
          minLength: value.length >= 6,
          hasNumber: /\d/.test(value),
          hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        };
        setPasswordRequirements(newRequirements);
        return !isPasswordStrong(value) ? 'Password does not meet all requirements' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
    
    // Update password requirements in real-time
    if (name === 'password') {
      const newRequirements = {
        minLength: value.length >= 6,
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      };
      setPasswordRequirements(newRequirements);
    }
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
    const error = validateField(name, value);
    setFieldErrors({ ...fieldErrors, [name]: error });
  };

  const handleCheckboxChange = (type, checked) => {
    if (type === 'terms') {
      setAgreedToTerms(checked);
      if (fieldErrors.terms) {
        setFieldErrors({ ...fieldErrors, terms: '' });
      }
    } else if (type === 'privacy') {
      setAgreedToPrivacy(checked);
      if (fieldErrors.privacy) {
        setFieldErrors({ ...fieldErrors, privacy: '' });
      }
    }
  };

  const validateAllFields = () => {
    const { name, email, password } = form;
    const errors = {
      name: validateField('name', name),
      email: validateField('email', email),
      password: validateField('password', password),
      terms: !agreedToTerms ? 'You must agree to the Terms of Service to proceed' : '',
      privacy: !agreedToPrivacy ? 'You must agree to the Privacy Policy to proceed' : ''
    };
    
    setFieldErrors(errors);
    setTouchedFields({ name: true, email: true, password: true, terms: true, privacy: true });
    
    return !Object.values(errors).some(error => error !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate all fields
    if (!validateAllFields()) {
      setError("Please fix the errors below before submitting.");
      return;
    }

    // Add email notifications preference to form data
    const formWithNotifications = {
      ...form,
      emailNotifications: {
        enabled: emailNotifications,
        followNotifications: emailNotifications,
        likeNotifications: false,
        artworkNotifications: false
      }
    };
    
    const result = await register(formWithNotifications, rememberMe);
    if (result.success) {
      toast.success("Account created successfully! Welcome to KalaSangam!");
      
      // Redirect to user profile page
      navigate("/user-profile");
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
        className="bg-[rgba(82,200,180,0.8)] 
                  p-10 rounded-3xl max-w-md w-full shadow-xl border border-white/20 font-lora"
      >
        <h2 className="text-4xl font-bold text-center mb-3 text-slate-800">
          Join as Artist
        </h2>
        <p className="text-center mb-6 text-base text-gray-200">
          Start your artistic journey with us!
        </p>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder={fieldErrors.name ? fieldErrors.name : "Full Name"}
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 border ${
              fieldErrors.name 
                ? 'border-coral-red border-2 placeholder-coral-red' 
                : 'border-coral-red/30'
            } text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none transition-all duration-200`}
          />
          {fieldErrors.name && (
            <p className="text-coral-red text-xs mt-1 ml-2 font-medium">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder={fieldErrors.email ? fieldErrors.email : "Email"}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 border ${
              fieldErrors.email 
                ? 'border-coral-red border-2 placeholder-coral-red' 
                : 'border-coral-red/30'
            } text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none transition-all duration-200`}
          />
          {fieldErrors.email && (
            <p className="text-coral-red text-xs mt-1 ml-2 font-medium">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password Requirements */}
        {form.password && (!passwordRequirements.minLength || !passwordRequirements.hasNumber || !passwordRequirements.hasSpecialChar) && (
          <div className="mb-3 transition-all duration-300 ease-in-out">
            <p className="text-base font-semibold text-slate-800 mb-2">Password Requirements:</p>
            <ul className="text-sm text-gray-200 space-y-1 ml-4">
              <li className={`flex items-center ${passwordRequirements.minLength ? 'text-green-300' : 'text-gray-200'}`}>
                <span className={`w-1 h-1 rounded-full mr-2 ${passwordRequirements.minLength ? 'bg-green-300' : 'bg-gray-200'}`}></span>
                At least 6 characters long
              </li>
              <li className={`flex items-center ${passwordRequirements.hasNumber ? 'text-green-300' : 'text-gray-200'}`}>
                <span className={`w-1 h-1 rounded-full mr-2 ${passwordRequirements.hasNumber ? 'bg-green-300' : 'bg-gray-200'}`}></span>
                Contains at least one number
              </li>
              <li className={`flex items-center ${passwordRequirements.hasSpecialChar ? 'text-green-300' : 'text-gray-200'}`}>
                <span className={`w-1 h-1 rounded-full mr-2 ${passwordRequirements.hasSpecialChar ? 'bg-green-300' : 'bg-gray-200'}`}></span>
                Contains at least one special character
              </li>
            </ul>
          </div>
        )}

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder={fieldErrors.password ? fieldErrors.password : "Password"}
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 rounded-xl bg-white/70 border ${
              fieldErrors.password 
                ? 'border-coral-red border-2 placeholder-coral-red' 
                : 'border-coral-red/30'
            } text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none transition-all duration-200`}
          />
          {fieldErrors.password && (
            <p className="text-coral-red text-xs mt-1 ml-2 font-medium">
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Agreement Checkboxes */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="flex items-start gap-3 text-base cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => handleCheckboxChange('terms', e.target.checked)}
                className={`mt-1 w-4 h-4 text-deep-teal border ${
                  fieldErrors.terms ? 'border-coral-red border-2' : 'border-gray-300'
                } rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200`}
              />
              <span className="text-slate-800 leading-relaxed">
                I agree to KalaSangam's{" "}
                <Link 
                  to="/terms-of-service" 
                  target="_blank" 
                  className="text-white hover:underline font-semibold hover:text-gray-200"
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
            <label className="flex items-start gap-3 text-base cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="mt-1 w-4 h-4 text-deep-teal border border-gray-300 rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200"
              />
              <span className="text-slate-800 leading-relaxed">
                <strong> Email Updates</strong> - Get notified when someone follows you
              </span>
            </label>
            {/* <p className="text-xs text-teal-200 mt-1 ml-7">
              You'll receive email notifications for new followers and important updates
            </p> */}
          </div>
          
          {/* Remember Me Checkbox */}
          <div>
            <label className="flex items-start gap-3 text-base cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mt-1 w-4 h-4 text-deep-teal border border-gray-300 rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200"
              />
              <span className="text-slate-800 leading-relaxed">
                <strong>Remember me</strong> - Stay logged in even after closing the browser
              </span>
            </label>
            {/* <p className="text-xs text-teal-200 mt-1 ml-7">
              If unchecked, you'll need to log in again when you close and reopen the website
            </p> */}
          </div>
        </div>
        


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-deep-teal hover:bg-coral-red text-off-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Switch to phone signup */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/phone-signup')}
            className="text-sm bg-white/20 hover:bg-white/30 text-deep-teal font-semibold py-2 px-4 rounded-lg border border-deep-teal/30 transition-all"
          >
            📱 Continue with Phone Number Instead
          </button>
        </div>

        <p className="text-center mt-6 text-base text-white font-medium">
          Already have an account? <Link to="/login" className="underline font-semibold hover:text-coral-red">Login</Link>
        </p>
      </form>

    </div>
  );
}
