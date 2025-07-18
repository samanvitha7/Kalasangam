import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-200 border-t border-slate-700 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4 text-amber-400">About KalaSangam</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            KalaSangam is a digital tribute to India's rich heritage of traditional arts —
            from Madhubani and Warli to Kathakali and Pattachitra. We connect culture, creativity,
            and community across 29 states.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4 text-teal-400">Explore</h2>
          <ul className="text-sm space-y-2 text-slate-300">
            <li><Link to="/" className="hover:underline hover:text-teal-400 transition-colors duration-200">Home</Link></li>
            <li><Link to="/gallery" className="hover:underline hover:text-teal-400 transition-colors duration-200">Traditional Arts</Link></li>
            <li><Link to="/art-wall" className="hover:underline hover:text-teal-400 transition-colors duration-200">Art Wall</Link></li>
            <li><Link to="/map" className="hover:underline hover:text-teal-400 transition-colors duration-200">States</Link></li>
            <li><Link to="/gallery" className="hover:underline hover:text-teal-400 transition-colors duration-200">Gallery</Link></li>
            <li><Link to="/login" className="hover:underline hover:text-teal-400 transition-colors duration-200">Login</Link></li>
            <li><Link to="/signup" className="hover:underline hover:text-teal-400 transition-colors duration-200">Sign Up</Link></li>
            
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4 text-pink-400">Get In Touch</h2>
          <p className="text-sm text-slate-300 mb-4">
            We'd love to hear from artists, enthusiasts, and collaborators.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border border-slate-600 rounded bg-slate-700 text-sm text-slate-200 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-slate-100 text-sm rounded hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-slate-400 mt-8 pt-6 border-t border-slate-700">
        © 2025 KalaSangam. All rights reserved.
      </div>
    </footer>
  );
}
