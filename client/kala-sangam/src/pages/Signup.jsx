// src/pages/Signup.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid, isPasswordStrong } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

// Import the Pinterest-style components
import BackgroundImageGrid from "../components/login/BackgroundImageGrid";
import SignupOverlayText from "../components/signup/SignupOverlayText";
import SignupCard from "../components/signup/SignupCard";

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
  const [rememberMe, setRememberMe] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
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
    }
  };

  const validateAllFields = () => {
    const { name, email, password } = form;
    const errors = {
      name: validateField('name', name),
      email: validateField('email', email),
      password: validateField('password', password),
      terms: !agreedToTerms ? 'You must agree to the Terms of Service and Privacy Policy to proceed' : ''
    };
    
    setFieldErrors(errors);
    setTouchedFields({ name: true, email: true, password: true, terms: true });
    
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
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Full screen background image grid */}
      <div className="absolute inset-0">
        <BackgroundImageGrid />
      </div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-black/25"></div>
      
      {/* Overlay text */}
      <div className="absolute left-48 top-1/2 -translate-y-1/2 z-10">
        <SignupOverlayText />
      </div>
      
      {/* Signup card background area for better visibility */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-black/40 to-transparent z-[15]" />
      
      {/* Signup card */}
      <div className="absolute right-48 top-1/2 -translate-y-1/2 z-20">
        <SignupCard
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          fieldErrors={fieldErrors}
          agreedToTerms={agreedToTerms}
          setAgreedToTerms={setAgreedToTerms}
          emailNotifications={emailNotifications}
          setEmailNotifications={setEmailNotifications}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          passwordRequirements={passwordRequirements}
          loading={loading}
        />
      </div>
    </div>
  );
}
