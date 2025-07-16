import { FaUser, FaEye } from "react-icons/fa";

export default function Login() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
  backgroundImage: `url('https://i.pinimg.com/1200x/6b/e4/d2/6be4d2c53b8b4923f3c6cc3503d4bc64.jpg')`,
}}

    >
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md text-white z-10">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {/* Username */}
        <div className="relative mb-4">
          <FaUser className="absolute top-3.5 left-4 text-white pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white border border-gray-500 focus:outline-none caret-white z-20 relative"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <FaEye className="absolute top-3.5 left-4 text-white pointer-events-none z-10" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white border border-gray-500 focus:outline-none caret-white z-20 relative"
          />
        </div>

        {/* Remember Me + Forgot */}
        <div className="flex justify-between text-sm mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Remember Me</span>
          </label>
          <a href="#" className="hover:underline">Forgot Password?</a>
        </div>

        {/* Button */}
        <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition">
          Login
        </button>

        {/* Signup Redirect */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
