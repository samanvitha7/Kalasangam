// src/pages/PhoneLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isPhoneNumberValid, isPasswordStrong, getPhoneValidationMessage } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

export default function PhoneLogin() {
  const [form, setForm] = useState({ phoneNumber: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginWithPhone, isAuthenticated, loading, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phoneNumber, password } = form;

    if (!phoneNumber || !password) {
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

    const result = await loginWithPhone(form);
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
        className="p-10 rounded-3xl max-w-md w-full shadow-xl border border-white/20 font-lora
                  bg-[linear-gradient(to_bottom,rgba(255,190,152,0.7),rgba(255,187,233,0.7),rgba(44,165,141,0.67))]"
      >
        <h2 className="text-4xl font-bold text-center mb-3 text-teal-blue">Welcome Back!</h2>
        <p className="text-center mb-4 text-sm text-teal-200">Login with your phone number</p>
        
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number (e.g., +1234567890)"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-red/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-red/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-blue hover:bg-coral-red text-off-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Switch to email login */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sm bg-white/20 hover:bg-white/30 text-teal-blue font-semibold py-2 px-4 rounded-lg border border-teal-blue/30 transition-all"
          >
            📧 Continue with Email Instead
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-teal-200">
          Don't have an account? <Link to="/phone-signup" className="underline font-semibold hover:text-coral-red">Sign Up with Phone</Link>
        </p>
      </form>
    </div>
  );
}
