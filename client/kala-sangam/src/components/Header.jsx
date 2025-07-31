import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { HeaderSmartSearch } from "./SmartSearchComponent";

export default function Header({ scrolled, onMapClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const dropdownRef = useRef();
  const userDropdownRef = useRef();
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle navigation for Explore dropdown
  const handleExplore = (type) => {
    setShowDropdown(false);
    const routes = {
      state: "/explore/state",
      art: "/explore/art?category=art",
      dance: "/explore/dance?category=dance",
      music: "/explore/music?category=music",
      crafts: "/explore/crafts?category=craft",
    };
    navigate(routes[type]);
  };

  // Logout functionality
  const handleLogout = async () => {
    setShowUserDropdown(false);
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/home");
    } catch {
      toast.error("Error logging out");
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-1/2 -translate-x-1/2 w-full z-50
        transition-all duration-500 ease-in-out font-lora
        ${scrolled
          ? "bg-blush-peach/95 backdrop-blur-md rounded-full shadow-2xl px-6 border border-vermilion/20"
          : "bg-transparent px-6 flex justify-between items-center"}
        h-16
      `}
      style={{ width: scrolled ? "97vw" : "100vw" }}
    >
      <div className="flex items-center justify-between h-full w-full">

        {/* ------------ LOGO ------------ */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/home">
            <img
              src="/assets/logo-header.png"
              alt="KalaSangam Logo"
              className={`
                transition-all duration-500 ease-in-out
                ${scrolled ? "h-20 scale-125" : "h-24 scale-150"}
                hover:scale-[1.7]
              `}
            />
          </Link>
        </div>

        {/* ------------ NAVIGATION LINKS ------------ */}
        <nav
          className={`
            flex space-x-12 text-[1.35rem] font-bold tracking-wide
            transition-colors duration-500 ease-in-out
            text-deep-teal
          `}
        >
          <NavLink to="/gallery" label="Gallery" />
          <NavLink to="/art-wall" label="Art Wall" />
          <NavLink to="/artists" label="Artists" />

          {/* Explore Dropdown */}
          <div className="relative flex items-center" ref={dropdownRef}>
            <span
              onClick={() => setShowDropdown(!showDropdown)}
              className="font-winky font-[500] cursor-pointer flex items-center hover:text-rosehover"
            >
              Explore
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${showDropdown ? "rotate-90" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            {showDropdown && (
              <DropdownMenu scrolled={scrolled} handleExplore={handleExplore} />
            )}
          </div>

          <NavLink to="/map" label="Map" onClick={onMapClick} />
          <NavLink to="/events" label="Events" />
          <NavLink to="/about" label="About" />

          {/* Search Bar */}
          <HeaderSmartSearch scrolled={scrolled} />
        </nav>

        {/* ------------ AUTH BUTTONS / USER MENU ------------ */}
        <div className="flex-shrink-0 flex items-center space-x-4">
          {isAuthenticated ? (
            <UserMenu
              user={user}
              scrolled={scrolled}
              showUserDropdown={showUserDropdown}
              setShowUserDropdown={setShowUserDropdown}
              handleLogout={handleLogout}
              userDropdownRef={userDropdownRef}
            />
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </header>
  );
}

/* ✅ Small Helper Components for Cleaner Code */
function NavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="font-winky font-[500] transition-all duration-300 hover:text-rosehover"
    >
      {label}
    </Link>
  );
}

function DropdownMenu({ scrolled, handleExplore }) {
  const items = [
    { label: "Explore by State", key: "state" },
    { label: "Explore Art", key: "art" },
    { label: "Explore Dance", key: "dance" },
    { label: "Explore Music", key: "music" },
    { label: "Explore Crafts", key: "crafts" },
  ];

  return (
    <ul
      className={`
        absolute top-full mt-2 z-50 w-52 rounded-xl shadow-lg font-winky text-[1.1rem] font-[500] tracking-wide
        ${scrolled
          ? "bg-deep-teal text-blush-peach border border-coral-red/20"
          : "bg-blush-peach text-deep-teal border border-deep-teal/10"}
      `}
    >
      {items.map((item) => (
        <li
          key={item.key}
          onClick={() => handleExplore(item.key)}
          className={`
            px-4 py-2 cursor-pointer transition-all duration-200
            ${scrolled ? "hover:bg-coral-red/20 hover:text-saffronglow" : "hover:text-vermilion"}
          `}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function AuthButtons() {
  return (
    <>
      <Link
        to="/login"
        className="px-5 py-2 rounded-lg font-bold transition-all duration-300 bg-gradient-to-r from-deep-teal to-coral-red text-white hover:from-coral-red hover:to-saffronglow"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="px-5 py-2 rounded-lg font-bold transition-all duration-300 bg-gradient-to-r from-deep-teal to-coral-red text-white hover:from-coral-red hover:to-saffronglow"
      >
        Sign Up
      </Link>
    </>
  );
}
