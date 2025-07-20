import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-blue via-coral-red to-teal-blue text-off-white border-t border-muted-fuchsia/20 px-6 py-10 font-lora font-bold">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4 text-golden-saffron">About KalaSangam</h2>
          <p className="text-sm leading-relaxed text-off-white/80">
            KalaSangam is a digital tribute to India's rich heritage of traditional arts —
            from Madhubani and Warli to Kathakali and Pattachitra. We connect culture, creativity,
            and community across 29 states.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4 text-golden-saffron">Explore</h2>
          <ul className="text-sm space-y-2 text-off-white/80">
            <li><Link to="/" className="hover:underline hover:text-golden-saffron transition-colors duration-200 font-bold">Home</Link></li>
            <li><Link to="/gallery" className="hover:underline hover:text-golden-saffron transition-colors duration-200 font-bold">Traditional Arts</Link></li>
            <li><Link to="/art-wall" className="hover:underline hover:text-golden-saffron transition-colors duration-200 font-bold">Art Wall</Link></li>
            <li><Link to="/map" className="hover:underline hover:text-golden-saffron transition-colors duration-200 font-bold">States</Link></li>
            <li><Link to="/gallery" className="hover:underline hover:text-golden-saffron transition-colors duration-200 font-bold">Gallery</Link></li>
            <li><Link to="/login" className="hover:underline hover:text-golden-saffron transition-colors duration-200 font-bold">Login</Link></li>
            <li><Link to="/signup" className="hover:underline hover:text-golden-saffron transition-colors duration-200 font-bold">Sign Up</Link></li>
            
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4 text-muted-fuchsia">Get In Touch</h2>
          <p className="text-sm text-off-white/80 mb-4">
            We'd love to hear from artists, enthusiasts, and collaborators.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border border-teal-blue/30 rounded bg-teal-blue/20 text-sm text-off-white placeholder-off-white/60 focus:outline-none focus:border-coral-red focus:ring-1 focus:ring-coral-red transition-all duration-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-coral-red to-muted-fuchsia text-off-white text-sm rounded hover:from-muted-fuchsia hover:to-indigo-purple transition-all duration-300 shadow-lg hover:shadow-xl font-bold"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-off-white/60 mt-8 pt-6 border-t border-coral-red/30 font-bold">
        © 2025 KalaSangam. All rights reserved.
      </div>
    </footer>
  );
}
