import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isEmailValid } from "../utils/validators";
import { useAuth } from "../context/AuthContext";
import BackgroundImageGrid from "../components/login/BackgroundImageGrid";
import OverlayText from "../components/login/OverlayText";

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
      <div className="absolute inset-0 bg-black/25" />

      {/* Forgot Password card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <form
          onSubmit={handleSubmit}
          className="bg-blush-peach/100 backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-full max-w-6xl border-2 border-white/50 ring-2 ring-deep-teal/10 drop-shadow-2xl"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-deep-teal mb-2 font-lora">
              Forgot Password?
            </h2>
           
          </div>

          {error && (
            <div className="bg-coral-pink/10 border border-coral-pink/20 text-coral-pink px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal outline-none transition-all duration-200 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-deep-teal hover:bg-lotus-green text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-coral-pink hover:text-deep-teal transition-colors"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
