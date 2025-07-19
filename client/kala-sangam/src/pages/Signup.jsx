// src/pages/Signup.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid, isPasswordStrong } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, isAuthenticated, loading, clearError } = useAuth();


  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
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

    const result = await register(form);
    if (result.success) {
      toast.success("Account created successfully!");
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
        <h2 className="text-4xl font-bold text-center mb-3 text-teal-blue">Create Account</h2>
        <p className="text-center mb-6 text-sm text-teal-200">Join KalaSangam today!</p>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-red/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/70 border border-coral-red/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/70 border border-coral-red/30 placeholder-[#284139] text-[#284139] focus:ring-2 focus:ring-teal-blue outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-blue hover:bg-coral-red text-off-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center mt-6 text-sm text-teal-200">
          Already have an account? <Link to="/login" className="underline font-semibold hover:text-coral-red">Login</Link>
        </p>
      </form>

    </div>
  );
}
