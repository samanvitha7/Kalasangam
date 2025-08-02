// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

// Import the new Pinterest-inspired components
import BackgroundImageGrid from "../components/login/BackgroundImageGrid";
import OverlayText from "../components/login/OverlayText";
import LoginCard from "../components/login/LoginCard";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    
    if (!isEmailValid(email)) {
      setError("Enter a valid email.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await login(form, rememberMe);
      if (result.success) {
        toast.success("Login successful! Welcome back!");
        navigate("/home");
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } finally {
      setIsSubmitting(false);
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
      
      {/* Overlay text - moved closer to center */}
      <div className="absolute left-32 top-1/2 -translate-y-1/2 z-10">
        <OverlayText />
      </div>
      
      {/* Login card background area for better visibility */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-black/40 to-transparent z-15"></div>
      
      {/* Login card - moved closer to center */}
      <div className="absolute left-1/2 top-1/2 translate-x-16 -translate-y-1/2 z-20">
        <LoginCard
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          isSubmitting={isSubmitting}
          loading={loading}
        />
      </div>
    </div>
  );
}
