import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid } from "../utils/validators";
import { useAuth } from "../context/AuthContext";
import BackgroundImageGrid from "../components/login/BackgroundImageGrid";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }
    
    if (!isEmailValid(email)) {
      setError("Enter a valid email.");
      return;
    }

    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);
    
    if (result.success) {
      toast.success("Password reset link sent to your email!");
      setEmail("");
      setError("");
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
      
      {/* Forgot Password card - centered */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
      
        <form
          onSubmit={handleSubmit}
          className="bg-white/100 backdrop-blur-xl p-6 rounded-xl shadow-xl w-full max-w-md border border-white/40 ring-1 ring-deep-teal/10 drop-shadow-lg"
        >
          <h2 className="text-3xl font-bold text-deep-teal mb-3 font-lora text-center">Forgot Password?</h2>
          <p className="text-center mb-6 text-sm text-gray-600">
            Enter your email and we'll send a reset link.
          </p>

          {error && <p className="text-coral-red text-sm mb-4 text-center">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-white border border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-2 focus:ring-deep-teal outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-deep-teal hover:bg-lotus-green text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            <Link to="/login" className="font-semibold text-deep-teal hover:text-coral-pink transition-colors">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
