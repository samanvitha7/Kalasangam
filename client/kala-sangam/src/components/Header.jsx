import { Link } from "react-router-dom";

export default function Header({ onMapClick }) {
  return (
    <header className="bg-gradient-to-r from-[#fdf6e3] via-[#fae5d3] to-[#ffe6eb] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-3xl font-serif font-bold text-[#9b2226] tracking-wide">
           <h1 className="text-5xl text-[#9b2226] yatra-font">
  KalaSangam
</h1>

        </div>

        <nav className="hidden md:flex space-x-8 text-[#582f0e] font-medium text-lg">
          <Link to="/" className="hover:text-[#9b2226] transition">Home</Link>
          <Link to="/gallery" className="hover:text-[#9b2226] transition">Art Gallery</Link>

          {/* India Map remains a button since it's triggering a scroll action */}
          <button
            onClick={onMapClick}
            className="hover:text-[#9b2226] transition"
          >
            India Map
          </button>

          <Link to="/about" className="hover:text-[#9b2226] transition">About</Link>
          <Link to="/contact" className="hover:text-[#9b2226] transition">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
