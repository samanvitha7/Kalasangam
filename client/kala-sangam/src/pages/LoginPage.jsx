// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid, isPasswordStrong } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
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
    

    const result = await login(form, rememberMe);
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
      style={{ backgroundImage: `url('/assets/parallaximg.png')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[rgba(82,200,180,0.8)] p-10 rounded-3xl max-w-md w-full shadow-xl border border-white/20 font-lora"
      >
        <h2 className="text-4xl font-bold text-center mb-3 text-slate-800">Welcome Back!</h2>
        <p className="text-center mb-4 text-base text-gray-200">Login to continue</p>
        
        {/* Admin Login Option */}
        <div className="text-center mb-6">
          <p className="text-base text-white font-medium mb-2">Need admin access?</p>
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="text-sm bg-white/20 hover:bg-white/30 text-slate-800 font-semibold py-2 px-4 rounded-lg border border-slate-800/30 transition-all"
          >
            🔐 Login as Admin
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-pink/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-pink/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-deep-teal outline-none"
        />

        {/* Remember Me Checkbox */}
        <div className="mb-4">
          <label className="flex items-center gap-3 text-base cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-deep-teal border border-gray-300 rounded focus:ring-2 focus:ring-deep-teal transition-all duration-200"
            />
            <span className="text-slate-800 leading-relaxed">
              <strong>Remember me</strong> - Stay logged in after closing browser
            </span>
          </label>
          {/* <p className="text-sm text-gray-200 mt-1 ml-7">
            If unchecked, you'll be logged out when you close the website
          </p> */}
        </div>

        <div className="text-right text-base text-white font-medium mb-6">
          <Link to="/forgot-password" className="hover:underline hover:text-coral-pink">Forgot Password?</Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-deep-teal hover:bg-coral-pink text-off-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Switch to phone login */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/phone-login')}
            className="text-sm bg-white/20 hover:bg-white/30 text-deep-teal font-semibold py-2 px-4 rounded-lg border border-deep-teal/30 transition-all"
          >
            📱 Continue with Phone Number Instead
          </button>
        </div>

        <p className="text-center mt-6 text-base text-white font-medium">
          Don't have an account? <Link to="/signup" className="underline font-semibold hover:text-coral-pink">Sign Up</Link>
        </p>
      </form>



    </div>
  );
}
