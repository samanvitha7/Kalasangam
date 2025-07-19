// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid, isPasswordStrong } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, clearError } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

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
    
    if (!isPasswordStrong(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const result = await login(form);
    if (result.success) {
      toast.success("Login successful!");
      navigate("/home");
    } else {
      setError(result.error);
      toast.error(result.error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url('/images/bg-login.jpg')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-mist-blush p-10 rounded-3xl max-w-md w-full shadow-xl border border-coral-red/20 backdrop-blur-sm font-lora"
      >
        <h2 className="text-4xl font-bold text-center mb-3 text-teal-blue">Welcome Back!</h2>
        <p className="text-center mb-6 text-sm text-deep-charcoal">Login to continue</p>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-off-white border border-coral-red/30 placeholder-deep-charcoal text-deep-charcoal focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-off-white border border-coral-red/30 placeholder-deep-charcoal text-deep-charcoal focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <div className="text-right text-sm text-deep-charcoal mb-6">
          <Link to="/forgot-password" className="hover:underline hover:text-coral-red">Forgot Password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-blue hover:bg-coral-red text-off-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6 text-sm text-deep-charcoal">
          Don't have an account? <Link to="/signup" className="underline font-semibold hover:text-coral-red">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
