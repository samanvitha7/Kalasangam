import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Header({ scrolled, onMapClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const userDropdownRef = useRef();
  const mobileMenuRef = useRef();
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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExplore = (type) => {
    setShowDropdown(false);
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
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
          ? "bg-blushpeach/95 backdrop-blur-md rounded-full shadow-2xl px-4 sm:px-6 border border-vermilion/20"
          : "bg-transparent px-4 sm:px-6 flex justify-between items-center"}
        h-16
      `}
      style={{ width: scrolled ? "97vw" : "100vw" }}
    >
      <div className="flex items-center justify-between h-full w-full">
        {/* Logo - Left */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/home" className="no-underline block">
            <img
              src="/assets/logo-header.png"
              alt="KalaSangam Logo"
              className={`
                transition-all duration-500 ease-in-out
                ${scrolled ? "h-16 sm:h-20 scale-125" : "h-20 sm:h-24 scale-150"}
                hover:scale-[1.7]
              `}
            />
          </Link>
        </div>

        {/* Mobile Menu Text - Center (visible only on mobile) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="font-yatra text-tealblue text-lg font-[500] hover:text-rosehover transition-colors"
          >
            {mobileMenuOpen ? "Menu" : "Menu"}
          </button>
        </div>

        {/* Desktop Navigation - Center (hidden on mobile) */}
        <nav className="hidden lg:flex space-x-8 xl:space-x-12 text-[1.1rem] xl:text-[1.35rem] font-bold tracking-wide transition-colors duration-500 ease-in-out">
          <Link
            to="/gallery"
            className="font-yatra mt-[10px] font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
          >
            Art Gallery
          </Link>

          <Link
            to="/art-wall"
            className="font-yatra mt-[10px] font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
          >
            Art Wall
          </Link>

          <Link
            to="/artists"
            className="font-yatra mt-[10px] font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
          >
            Artists
          </Link>

          <div className="relative mt-[8px]" ref={dropdownRef}>
            <span
              className={`
                font-yatra font-[500] text-tealblue cursor-pointer
                transition-all duration-300 ease-in-out
                hover:text-rosehover 
              `}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Explore ▾
            </span>

            {showDropdown && (
              <ul
                className={`
                  absolute top-full mt-2 z-50 w-52 rounded-xl shadow-lg font-yatra text-[1.1rem] font-[500] tracking-wide
                  ${scrolled
                    ? "bg-tealblue text-blushpeach border border-rosered/20"
                    : "bg-blushpeach text-tealblue border border-tealblue/10"}
                `}
              >
                {[
                  { label: "Explore by State", key: "state" },
                  { label: "Explore Art", key: "art" },
                  { label: "Explore Dance", key: "dance" },
                  { label: "Explore Music", key: "music" },
                  { label: "Explore Crafts", key: "crafts" },
                ].map((item) => (
                  <li
                    key={item.key}
                    className={`
                      px-4 py-2 cursor-pointer transition-all duration-200
                      ${
                        scrolled
                          ? "hover:bg-rosered/20 hover:text-saffronglow"
                          : " hover:text-vermilion"
                      }
                    `}
                    onClick={() => handleExplore(item.key)}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            to="/map"
            className="font-yatra mt-[10px] font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
            onClick={onMapClick}
          >
            India Map
          </Link>

          <Link
            to="/events"
            className="font-yatra mt-[10px] font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
          >
            Events
          </Link>

          <Link
            to="/about"
            className="font-yatra mt-[10px] font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
          >
            About
          </Link>
        </nav>

        {/* Right Side - Login/Signup or User Profile */}
        <div className="flex flex-shrink-0 items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative hidden lg:block" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-xl font-[550] font-yatra text-[1rem] transition-all duration-300 ${
                  scrolled
                    ? "bg-gradient-to-r from-tealblue to-rosered text-blushpeach hover:from-rosered hover:to-saffronglow"
                    : "hover:bg-gradient-to-r from-tealblue to-rosered"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <span className={`text-base font-semibold transition-colors duration-300 ${
                    scrolled ? "text-blushpeach group-hover:text-white" : "text-tealblue group-hover:text-white"
                  }`}>
                    {user?.name?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>

                <span className={`text-[1rem] font-[500] tracking-wide transition-colors duration-300 ${
                  scrolled ? "text-blushpeach group-hover:text-white" : "text-tealblue group-hover:text-white"
                }`}>
                  {user?.name || "Artist"}
                </span>

                <span className="text-xs text-tealblue group-hover:text-white">▾</span>
              </button>

              {showUserDropdown && (
                <ul
                  className={`absolute right-0 top-full mt-2 z-50 w-56 rounded-xl shadow-xl font-yatra text-[1rem] font-[500] tracking-wide ${
                    scrolled
                      ? "bg-tealblue text-white border border-rosered/20"
                      : "bg-blushpeach text-tealblue shadow-md border border-tealblue/10"
                  }`}
                >
                  <li className="px-4 py-3 border-b border-rosered/10">
                    <div className={`text-sm ${scrolled ? "text-saffronglow" : "text-vermilion"}`}>
                      Signed in as
                    </div>
                    <div className={`font-normal truncate ${scrolled ? "text-blushpeach " : "text-tealblue"}`}>
                      {user?.email}
                    </div>
                  </li>
                  
                  <li>
                    <Link
                      to="/profile"
                      className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                        scrolled 
                          ? " hover:bg-rosered/20 text-blushpeach hover:text-saffronglow" 
                          : "text-tealblue hover:text-vermilion"
                      }`}
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
                      className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                          scrolled 
                            ? "hover:bg-rosered/20 text-blushpeach hover:text-saffronglow" 
                            : "text-tealblue hover:text-vermilion"
                        }`}
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
                      className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                          scrolled 
                            ? "hover:bg-rosered/20 text-blushpeach hover:text-saffronglow" 
                            : "text-tealblue hover:text-vermilion"
                        }`}
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
                      className={`w-full block px-4 py-3 rounded-md transition-all duration-300 ${
                        scrolled
                          ? "hover:bg-rosered/20 text-blushpeach hover:text-saffronglow"
                          : "text-tealblue hover:text-vermilion"
                      }`}
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
                className="px-4 py-2 rounded-lg font-bold transition-all duration-300 
                 bg-gradient-to-r from-tealblue to-rosered text-white
                 hover:from-rosered hover:to-saffronglow text-sm sm:text-base"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="hidden sm:block px-4 py-2 rounded-lg font-bold transition-all duration-300 
                  bg-gradient-to-r from-tealblue to-rosered text-white
                  hover:from-rosered hover:to-saffronglow text-sm sm:text-base"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (visible only on small screens) */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className={`lg:hidden absolute top-16 left-0 right-0 z-50 shadow-lg transition-all duration-300 ${
            scrolled 
              ? "bg-blushpeach/95 backdrop-blur-md border-t border-vermilion/20" 
              : "bg-blushpeach/95 backdrop-blur-md"
          }`}
        >
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/gallery"
              className="block px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Art Gallery
            </Link>

            <Link
              to="/art-wall"
              className="block px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Art Wall
            </Link>

            <Link
              to="/artists"
              className="block px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Artists
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                className="w-full text-left px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10 flex justify-between items-center"
              >
                <span>Explore</span>
                <span>{showMobileDropdown ? "▴" : "▾"}</span>
              </button>

              {showMobileDropdown && (
                <div className="pl-6 space-y-1 mt-1">
                  <Link
                    to="/IndiaMapPage"
                    className="block w-full text-left px-4 py-2 rounded-lg font-yatra text-base font-[500] text-tealblue hover:bg-tealblue/10"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowMobileDropdown(false);
                    }}
                  >
                    Explore by State
                  </Link>
                  <Link
                    to="/ArtGallery"
                    className="block w-full text-left px-4 py-2 rounded-lg font-yatra text-base font-[500] text-tealblue hover:bg-tealblue/10"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowMobileDropdown(false);
                    }}
                  >
                    Explore Art
                  </Link>
                  <Link
                    to="/DanceGallery"
                    className="block w-full text-left px-4 py-2 rounded-lg font-yatra text-base font-[500] text-tealblue hover:bg-tealblue/10"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowMobileDropdown(false);
                    }}
                  >
                    Explore Dance
                  </Link>
                  <Link
                    to="/MusicPage"
                    className="block w-full text-left px-4 py-2 rounded-lg font-yatra text-base font-[500] text-tealblue hover:bg-tealblue/10"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowMobileDropdown(false);
                    }}
                  >
                    Explore Music
                  </Link>
                  <Link
                    to="/CraftsPage"
                    className="block w-full text-left px-4 py-2 rounded-lg font-yatra text-base font-[500] text-tealblue hover:bg-tealblue/10"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowMobileDropdown(false);
                    }}
                  >
                    Explore Crafts
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/map"
              className="block px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10"
              onClick={() => {
                setMobileMenuOpen(false);
                onMapClick();
              }}
            >
              India Map
            </Link>

            <Link
              to="/events"
              className="block px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>

            <Link
              to="/about"
              className="block px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>

            {isAuthenticated && (
              <div className="pt-2 border-t border-tealblue/20">
                <div className="px-4 py-2">
                  <div className="text-sm font-yatra text-vermilion">
                    Signed in as
                  </div>
                  <div className="font-yatra font-normal text-tealblue">
                    {user?.email}
                  </div>
                </div>

                <Link
                  to="/profile"
                  className="block px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-3 rounded-lg font-yatra text-lg font-[500] text-tealblue hover:bg-tealblue/10"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}