import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email before submitting!");
      return;
    }

    window.location.href = `/about?email=${encodeURIComponent(email)}#contact`;
  };

  return (
    <footer className="bg-gradient-to-r from-deep-teal to-coral-red text-white border-t border-coral-red/20 px-6 py-10 font-lora font-medium">
      {/* Main Footer Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold font-dm-serif-display mb-3 text-coral-red">
            About KalaSangam
          </h2>
          <p className="font-lora text-sm leading-relaxed max-w-md mx-auto sm:mx-0">
            KalaSangam is a digital tribute to India's rich heritage of traditional arts — 
            from Madhubani and Warli to Kathakali and Pattachitra. We connect culture, creativity,
            and community across 29 states.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold font-dm-serif-display mb-3 text-coral-red">Explore</h2>
          <ul className="font-lora text-sm space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/gallery", label: "Traditional Arts" },
              { to: "/art-wall", label: "Art Wall" },
              { to: "/map", label: "States" },
              { to: "/artists", label: "Artists" },
              { to: "/login", label: "Login" },
              { to: "/signup", label: "Sign Up" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:underline hover:text-saffronglow transition-colors duration-200 font-semibold"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold font-dm-serif-display mb-3 text-deep-teal">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xs mx-auto">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 font-lora rounded-full text-base 
                         bg-white/90 text-[#134856] 
                         placeholder-[#134856]/50 focus:outline-none 
                         focus:border-[#e05264] focus:ring-2 focus:ring-[#e05264]/40 
                         transition-all duration-300 shadow-md"
            />

            <motion.button
              type="submit"
              className="w-full bg-blush-peach text-deep-teal py-2 rounded-full text-lg font-lora font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Feedback 
            </motion.button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 pt-5 border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center">
          <div className="text-xs font-lora font-bold">
            © 2025 KalaSangam. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-xs">
            {[
              { to: "/terms-of-service", label: "Terms of Service" },
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/community-guidelines", label: "Community Guidelines" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="hover:text-saffronglow hover:underline transition-colors duration-200 font-semibold"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
