import { useState } from "react";
import { toast } from "react-toastify";
import { isEmailValid } from "../utils/validators";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
    } else if (!isEmailValid(email)) {
      setError("Enter a valid email.");
    } else {
      toast.success("Reset link sent to your email!");
      setEmail("");
      setError("");
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
        <h2 className="text-3xl font-bold text-center mb-3 text-[#74404b]">Forgot Password?</h2>
        <p className="text-center mb-6 text-sm text-[#74404b]">
          Enter your email and we'll send a reset link
        </p>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white border border-yellow-300 placeholder-[#74404b] text-[#74404b] focus:ring-2 focus:ring-[#74404b] outline-none"
        />

        <button
          type="submit"
          className="w-full bg-[#74404b] hover:bg-[#5f343d] text-white font-bold py-3 rounded-xl transition-all"
        >
          Send Reset Link
        </button>

        <p className="text-center mt-6 text-sm text-[#74404b]">
          <a href="/login" className="underline font-semibold">Back to Login</a>
        </p>
      </form>
    </div>
  );
}
