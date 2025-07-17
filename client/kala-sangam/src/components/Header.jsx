import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

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
          ? "bg-rose-100/90 backdrop-blur-md rounded-full shadow-md px-6 border-none"
          : "bg-transparent px-6"}
        h-16
      `}
      style={{ width: scrolled ? "80vw" : "100vw" }}
    >
      <div
        className={`
          flex items-center h-full
          ${scrolled ? "justify-between" : "justify-center"}
        `}
      >
        {/* Logo */}
        <div
          className={`
            transition-all duration-500 flex-shrink-0
            ${scrolled ? "flex justify-start" : ""}
            ${!scrolled ? "ml-[25vw]" : ""}
          `}
        >
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

        {/* Navigation links */}
        <nav
          className={`
            flex space-x-10 text-[#582f0e] font-medium text-lg
            transition-all duration-500
            ${scrolled ? "flex-1 justify-center" : "absolute left-1/2 top-16 -translate-x-1/2"}
          `}
          style={!scrolled ? { top: "4rem" } : {}}
        >
          <Link
            to="/gallery"
            className="hover:text-rose-700 hover:underline hover:italic transition-all duration-200"
          >
            Art Gallery
          </Link>

          <div className="relative" ref={dropdownRef}>
            <span
              className="hover:text-rose-700 hover:underline hover:italic font-semibold cursor-pointer transition-all duration-200"
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
                  Explore Art
                </li>
                <li
                  className="px-4 py-2 hover:bg-rose-100 cursor-pointer"
                  onClick={() => handleExplore("dance")}
                >
                  Explore Dance
                </li>
                <li
                  className="px-4 py-2 hover:bg-rose-100 cursor-pointer"
                  onClick={() => handleExplore("music")}
                >
                  Explore Music
                </li>
              </ul>
            )}
          </div>

          <Link
            to="/map"
            className="hover:text-rose-700 hover:underline hover:italic transition-all duration-200"
            onClick={onMapClick}
          >
            India Map
          </Link>

          <Link
            to="/about"
            className="hover:text-rose-700 hover:underline hover:italic transition-all duration-200"
          >
            About
          </Link>
        </nav>

        {/* Login/Signup buttons */}
        <div
          className={`
            transition-all duration-500 flex-shrink-0
            ${scrolled ? "flex space-x-4" : "absolute top-4 right-6 flex space-x-4"}
          `}
          style={!scrolled ? { top: "1rem", right: "1.5rem" } : {}}
        >
          <Link
            to="/login"
            className="bg-rose-600 text-white px-5 py-2 rounded-md font-semibold shadow hover:bg-rose-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-rose-600 text-white px-5 py-2 rounded-md font-semibold shadow hover:bg-rose-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
