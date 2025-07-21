import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Header({ scrolled, onMapClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef();
  const userDropdownRef = useRef();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

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
      case "crafts":
        navigate("/explore/crafts");
        break;
    }
  };

  const handleLogout = async () => {
    setShowUserDropdown(false);
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-1/2 -translate-x-1/2 w-full z-50
        transition-all duration-500 ease-in-out font-lora
        ${scrolled
          ? "bg-light-rose-pink/95 backdrop-blur-md rounded-full shadow-2xl px-6 border border-coral-red/20"
          : "bg-transparent px-6 flex justify-between items-center"}
        h-16
      `}
      style={{ width: scrolled ? "80vw" : "100vw" }}
    >
      <div className="flex items-center justify-between h-full w-full">
{/* Logo - Far Left */}
        <div className="flex-shrink-0">
          <Link to="/home" className="no-underline">
            <img
              className={`transition-all duration-500 transform ${
                            scrolled ? "h-12 scale-125" : "h-24 scale-150"
                          }`}
              src="/assets/logo-header.png"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Navigation links - Center */}
        <nav className={`flex space-x-10 font-bold text-xl transition-colors duration-500 ${
          scrolled ? "text-teal-blue" : "text-teal-blue"
        }`}>
          <Link
            to="/gallery"
            className={`hover:underline hover:italic transition-all duration-200 font-bold ${
              scrolled ? "hover:text-coral-red" : "hover:text-muted-fuchsia"
            }`}
          >
            Art Gallery
          </Link>

          <Link
            to="/art-wall"
            className={`hover:underline hover:italic transition-all duration-200 font-bold ${
              scrolled ? "hover:text-coral-red" : "hover:text-muted-fuchsia"
            }`}
          >
            Art Wall
          </Link>

          <Link
            to="/artists"
            className={`hover:underline hover:italic transition-all duration-200 font-bold ${
              scrolled ? "hover:text-coral-red" : "hover:text-muted-fuchsia"
            }`}
          >
            Artists
          </Link>

          <div className="relative" ref={dropdownRef}>
            <span
              className={`hover:underline hover:italic font-bold cursor-pointer transition-all duration-200 ${
                scrolled ? "hover:text-coral-red" : "hover:text-muted-fuchsia"
              }`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Explore ▾
            </span>

            {showDropdown && (
              <ul className={`absolute top-full mt-2 shadow-2xl rounded-lg w-48 z-50 font-bold ${
                scrolled 
                  ? "bg-teal-blue text-off-white border border-coral-red/20" 
                  : "bg-mist-blush text-teal-blue shadow-md border border-teal-blue/10"
              }`}>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-coral-red/20 hover:text-golden-saffron" : "hover:bg-warm-sand hover:text-muted-fuchsia"
                  }`}
                  onClick={() => handleExplore("state")}
                >
                  Explore by State
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-coral-red/20 hover:text-golden-saffron" : "hover:bg-warm-sand hover:text-muted-fuchsia"
                  }`}
                  onClick={() => handleExplore("art")}
                >
                  Explore Art
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-coral-red/20 hover:text-golden-saffron" : "hover:bg-warm-sand hover:text-muted-fuchsia"
                  }`}
                  onClick={() => handleExplore("dance")}
                >
                  Explore Dance
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-coral-red/20 hover:text-golden-saffron" : "hover:bg-warm-sand hover:text-muted-fuchsia"
                  }`}
                  onClick={() => handleExplore("music")}
                >
                  Explore Music
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled ? "hover:bg-coral-red/20 hover:text-golden-saffron" : "hover:bg-warm-sand hover:text-muted-fuchsia"
                  }`}
                  onClick={() => handleExplore("crafts")}
                >
                  Explore Crafts
                </li>
              </ul>
            )}
          </div>

          <Link
            to="/map"
            className={`hover:underline hover:italic transition-all duration-200 font-bold ${
              scrolled ? "hover:text-coral-red" : "hover:text-muted-fuchsia"
            }`}
            onClick={onMapClick}
          >
            India Map
          </Link>

          <Link
            to="/events"
            className={`hover:underline hover:italic transition-all duration-200 font-bold ${
              scrolled ? "hover:text-coral-red" : "hover:text-muted-fuchsia"
            }`}
          >
            Events
          </Link>

          <Link
            to="/about"
            className={`hover:underline hover:italic transition-all duration-200 font-bold ${
              scrolled ? "hover:text-coral-red" : "hover:text-muted-fuchsia"
            }`}
          >
            About
          </Link>
        </nav>

        {/* User Profile or Login/Signup buttons - Far Right */}
        <div className="flex-shrink-0 flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold shadow-lg transition-all duration-300 ${
                  scrolled 
                    ? "bg-gradient-to-r from-teal-blue to-coral-red text-off-white hover:from-muted-fuchsia hover:to-indigo-purple hover:shadow-xl" 
                    : "bg-teal-blue text-off-white hover:bg-coral-red"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                <span>{user?.name || 'Artist'}</span>
                <span className="text-xs">▾</span>
              </button>

              {showUserDropdown && (
                <ul className={`absolute right-0 top-full mt-2 shadow-2xl rounded-lg w-56 z-50 font-medium ${
                  scrolled 
                    ? "bg-white text-teal-blue border border-coral-red/20" 
                    : "bg-white text-teal-blue shadow-md border border-teal-blue/10"
                }`}>
                  <li className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm text-gray-500">Signed in as</div>
                    <div className="font-semibold truncate">{user?.email}</div>
                  </li>
                  
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-teal-50 hover:text-coral-red transition-colors duration-200"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <span>👤</span>
                        <span>My Profile</span>
                      </div>
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-teal-50 hover:text-coral-red transition-colors duration-200"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <span>🎨</span>
                        <span>My Artworks</span>
                      </div>
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-teal-50 hover:text-coral-red transition-colors duration-200"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <span>⚙️</span>
                        <span>Settings</span>
                      </div>
                    </Link>
                  </li>
                  
                  <li className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <span>🚪</span>
                        <span>Sign Out</span>
                      </div>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-5 py-2 rounded-lg font-bold shadow-lg transition-all duration-300 ${
                  scrolled 
                    ? "bg-gradient-to-r from-teal-blue to-coral-red text-off-white hover:from-muted-fuchsia hover:to-indigo-purple hover:shadow-xl" 
                    : "bg-teal-blue text-off-white hover:bg-coral-red"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-5 py-2 rounded-lg font-bold shadow-lg transition-all duration-300 ${
                  scrolled 
                    ? "bg-gradient-to-r from-coral-red to-muted-fuchsia text-off-white hover:from-muted-fuchsia hover:to-indigo-purple hover:shadow-xl" 
                    : "bg-coral-red text-off-white hover:bg-muted-fuchsia"
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
