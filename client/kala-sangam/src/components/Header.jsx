import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle.jsx";

export default function Header({ scrolled, onMapClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExplore = (type) => {
    setShowDropdown(false);
    switch (type) {
      case "state":
        navigate("/explore/state");
        break;
      case "art":
        navigate("/explore/art");
        break;
      case "dance":
        navigate("/explore/dance");
        break;
      case "music":
        navigate("/explore/music");
        break;
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-1/2 -translate-x-1/2 w-full z-50
        transition-all duration-500 ease-in-out
        ${scrolled
          ? "bg-slate-900/95 backdrop-blur-md rounded-full shadow-2xl px-6 border border-teal-400/20"
          : "bg-transparent px-6 flex justify-between items-center"}
        h-16
      `}
      style={{ width: scrolled ? "80vw" : "100vw" }}
    >
      <div className="flex items-center justify-between h-full w-full">
        {/* Logo - Far Left */}
        <div className="flex-shrink-0">
          <Link to="/home" className="no-underline">
            <h1
              className={`
                yatra-font font-serif font-bold text-[#9b2226] tracking-wide cursor-pointer
                transition-all duration-500
                ${scrolled ? "text-3xl" : "text-4xl"}
                leading-none
              `}
            >
              KalaSangam
            </h1>
          </Link>
        </div>

        {/* Navigation links - Center */}
        <nav className={`flex space-x-10 font-medium text-lg transition-colors duration-500 ${
          scrolled ? "text-slate-200" : "text-[#582f0e]"
        }`}>
          <Link
            to="/gallery"
            className={`hover:underline hover:italic transition-all duration-200 ${
              scrolled ? "hover:text-teal-400" : "hover:text-rose-700"
            }`}
          >
            Art Gallery
          </Link>

          <Link
            to="/art-wall"
            className={`hover:underline hover:italic transition-all duration-200 ${
              scrolled ? "hover:text-teal-400" : "hover:text-rose-700"
            }`}
          >
            Art Wall
          </Link>

          <div className="relative" ref={dropdownRef}>
            <span
              className={`hover:underline hover:italic font-semibold cursor-pointer transition-all duration-200 ${
                scrolled ? "hover:text-teal-400" : "hover:text-rose-700"
              }`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Explore ▾
            </span>

            {showDropdown && (
              <ul className={`absolute top-full mt-2 shadow-2xl rounded-lg w-48 z-50 ${
                scrolled 
                  ? "bg-slate-800 text-slate-200 border border-teal-400/20" 
                  : "bg-white text-[#582f0e] shadow-md"
              }`}>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-teal-600/20 hover:text-teal-400" : "hover:bg-rose-100"
                  }`}
                  onClick={() => handleExplore("state")}
                >
                  Explore by State
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-teal-600/20 hover:text-teal-400" : "hover:bg-rose-100"
                  }`}
                  onClick={() => handleExplore("art")}
                >
                  Explore Art
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-teal-600/20 hover:text-teal-400" : "hover:bg-rose-100"
                  }`}
                  onClick={() => handleExplore("dance")}
                >
                  Explore Dance
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-teal-600/20 hover:text-teal-400" : "hover:bg-rose-100"
                  }`}
                  onClick={() => handleExplore("music")}
                >
                  Explore Music
                </li>
              </ul>
            )}
          </div>

          <Link
            to="/map"
            className={`hover:underline hover:italic transition-all duration-200 ${
              scrolled ? "hover:text-teal-400" : "hover:text-rose-700"
            }`}
            onClick={onMapClick}
          >
            India Map
          </Link>

          <Link
            to="/about"
            className={`hover:underline hover:italic transition-all duration-200 ${
              scrolled ? "hover:text-teal-400" : "hover:text-rose-700"
            }`}
          >
            About
          </Link>
        </nav>

        {/* Dark Mode Toggle and Login/Signup buttons - Far Right */}
        <div className="flex-shrink-0 flex items-center space-x-4">
          <DarkModeToggle scrolled={scrolled} />
          <Link
            to="/login"
            className={`px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
              scrolled 
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-slate-100 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl" 
                : "bg-rose-600 text-white hover:bg-rose-700"
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
              scrolled 
                ? "bg-gradient-to-r from-red-600 to-red-700 text-slate-100 hover:from-red-700 hover:to-red-800 hover:shadow-xl" 
                : "bg-rose-600 text-white hover:bg-rose-700"
            }`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
