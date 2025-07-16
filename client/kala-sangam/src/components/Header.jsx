export default function Header({ isVisible = true, onMapClick }) {
  return (
    <header
      className={`transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } bg-gradient-to-r from-[#fdf6e3] via-[#fae5d3] to-[#ffe6eb] shadow-md fixed top-0 left-0 w-full z-50`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-5xl text-[#9b2226] font-serif font-bold yatra-font">KalaSangam</h1>
        <nav className="hidden md:flex space-x-8 text-[#582f0e] font-medium text-lg">
          <Link to="/home" className="hover:text-[#9b2226] transition">Home</Link>
          <Link to="/gallery" className="hover:text-[#9b2226] transition">Art Gallery</Link>
          <Link to="/map" className="hover:text-[#9b2226] transition">India Map</Link>
          <Link to="/about" className="hover:text-[#9b2226] transition">About</Link>
          <Link to="/login" className="hover:text-[#9b2226] transition">Login</Link>
          <Link to="/signup" className="hover:text-[#9b2226] transition">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
import { Link } from 'react-router-dom';