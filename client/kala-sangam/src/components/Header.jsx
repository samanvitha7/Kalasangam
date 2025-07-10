export default function Header({ onMapClick }) {
  return (
    <header className="bg-gradient-to-r from-[#fdf6e3] via-[#fae5d3] to-[#ffe6eb] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-3xl font-serif font-bold text-[#9b2226] tracking-wide">
          KalaSangam
        </div>

        <nav className="hidden md:flex space-x-8 text-[#582f0e] font-medium text-lg">
          <a href="#" className="hover:text-[#9b2226] transition">Home</a>
          <a href="#" className="hover:text-[#9b2226] transition">Art Gallery</a>
         

          {/* ✅ Call the click function passed as a prop */}
          <button
            onClick={onMapClick}
            className="hover:text-[#9b2226] transition"
          >
            India Map
          </button>

          <a href="#" className="hover:text-[#9b2226] transition">About</a>
          <a href="#" className="hover:text-[#9b2226] transition">Contact</a>
        </nav>
      </div>
    </header>
  );
}
