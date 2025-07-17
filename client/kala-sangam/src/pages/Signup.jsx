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
      style={{ backgroundImage: `url('/images/bg-login.jpg')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#fbebd8] p-10 rounded-3xl max-w-md w-full shadow-xl border border-yellow-200 backdrop-blur-sm"
      >
        <h2 className="text-4xl font-bold text-center mb-3 text-[#74404b]">Create Account</h2>
        <p className="text-center mb-6 text-sm text-[#74404b]">Join KalaSangam today!</p>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white border border-yellow-300 placeholder-[#74404b] text-[#74404b] focus:ring-2 focus:ring-[#74404b] outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white border border-yellow-300 placeholder-[#74404b] text-[#74404b] focus:ring-2 focus:ring-[#74404b] outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white border border-yellow-300 placeholder-[#74404b] text-[#74404b] focus:ring-2 focus:ring-[#74404b] outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#74404b] hover:bg-[#5f343d] text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center mt-6 text-sm text-[#74404b]">
          Already have an account? <Link to="/login" className="underline font-semibold">Login</Link>
        </p>
      </form>
    </div>
  );
}
