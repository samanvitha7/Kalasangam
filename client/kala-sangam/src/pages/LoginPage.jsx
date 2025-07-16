// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid, isPasswordStrong } from "../utils/validators";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError("All fields are required.");
    } else if (!isEmailValid(email)) {
      setError("Enter a valid email.");
    } else if (!isPasswordStrong(password)) {
      setError("Password must be at least 6 characters.");
    } else {
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1500);
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
        <h2 className="text-4xl font-bold text-center mb-3 text-[#74404b]">Welcome Back!</h2>
        <p className="text-center mb-6 text-sm text-[#74404b]">Login to continue</p>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

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
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white border border-yellow-300 placeholder-[#74404b] text-[#74404b] focus:ring-2 focus:ring-[#74404b] outline-none"
        />

        <div className="text-right text-sm text-[#74404b] mb-6">
          <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
        </div>

        <button
          type="submit"
          className="w-full bg-[#74404b] hover:bg-[#5f343d] text-white font-bold py-3 rounded-xl transition-all"
        >
          Login
        </button>

        <p className="text-center mt-6 text-sm text-[#74404b]">
          Don’t have an account? <a href="/signup" className="underline font-semibold">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
