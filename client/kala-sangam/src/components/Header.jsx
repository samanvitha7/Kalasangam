import { Link } from "react-router-dom";

export default function Header({ onMapClick }) {
  return (
    <header className="bg-gradient-to-r from-[#fdf6e3] via-[#fae5d3] to-[#ffe6eb] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-3xl font-serif font-bold text-[#9b2226] tracking-wide">
          KalaSangam
        </div>

        <nav className="hidden md:flex space-x-8 text-[#582f0e] font-medium text-lg">
          <Link to="/" className="hover:text-[#9b2226] transition">Home</Link>
          <Link to="/gallery" className="hover:text-[#9b2226] transition">Art Gallery</Link>
          <Link to="/map" className="hover:text-[#9b2226] transition">India Map</Link>
          <Link to="/about" className="hover:text-[#9b2226] transition">About</Link>
          <Link to="/contact" className="hover:text-[#9b2226] transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
