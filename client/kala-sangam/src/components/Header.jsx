import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Header({ isVisible = true, onMapClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // 🔄 Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚀 Navigation handler for dropdown
  const handleExplore = (type) => {
    setShowDropdown(false);
    if (type === "state") navigate("/explore/state");
    else if (type === "art") navigate("/explore/art");
    else if (type === "dance") navigate("/explore/dance");
  };

  return (
    <header
      className={`transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } bg-white/30 backdrop-blur-sm shadow-sm fixed top-0 left-0 w-full z-50`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 🔆 Logo */}
        <div className="text-3xl font-serif font-bold text-[#9b2226] tracking-wide">
          <h1 className="text-5xl text-[#9b2226] yatra-font">KalaSangam</h1>
        </div>

        {/* 🔗 Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-[#582f0e] font-medium text-lg items-center relative">
          <Link to="/" className="hover:text-[#9b2226] transition">Home</Link>
          <Link to="/gallery" className="hover:text-[#9b2226] transition">Art Gallery</Link>

          {/* 🔽 Explore Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <span
              className="hover:text-rose-700 font-semibold cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Explore ▾
            </span>

            {showDropdown && (
              <ul className="absolute top-full mt-2 bg-white text-[#582f0e] shadow-md rounded w-48 z-50">
                <li
                  className="px-4 py-2 hover:bg-rose-100 cursor-pointer"
                  onClick={() => handleExplore("state")}
                >
                  Explore by State
                </li>
                <li
                  className="px-4 py-2 hover:bg-rose-100 cursor-pointer"
                  onClick={() => handleExplore("art")}
                >
                  Explore by Art Form
                </li>
                <li
                  className="px-4 py-2 hover:bg-rose-100 cursor-pointer"
                  onClick={() => handleExplore("dance")}
                >
                  Explore by Dance Form
                </li>
              </ul>
            )}
          </div>

          
          <Link to="/about" className="hover:text-[#9b2226] transition">About</Link>
          <Link to="/login" className="hover:text-[#9b2226] transition">Login</Link>
          <Link to="/signup" className="hover:text-[#9b2226] transition">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
