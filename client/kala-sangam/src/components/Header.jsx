import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { HeaderSmartSearch } from "./SmartSearchComponent";
import { FaBars, FaTimes } from "react-icons/fa";
import NotificationsBell from "./NotificationsBell";

export default function Header({ scrolled, onMapClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('[data-mobile-menu-toggle]')
      ) {
        setShowMobileMenu(false);
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
        navigate("/explore/art?category=art");
        break;
      case "dance":
        navigate("/explore/dance?category=dance");
        break;
      case "music":
        navigate("/explore/music?category=music");
        break;
      case "crafts":
        navigate("/explore/crafts?category=craft");
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

  const handleMobileExplore = (type) => {
    setShowMobileMenu(false);
    handleExplore(type);
  };

  return (
   <header
  className={`
    fixed left-1/2 -translate-x-1/2 w-full z-50
    transition-all duration-500 ease-in-out font-lora
    ${scrolled
      ? "top-0 bg-blush-peach/95 backdrop-blur-md rounded-full shadow-2xl px-6 border border-vermilion/20"
      : "top-0 bg-transparent px-6 flex justify-between items-center"}
    h-16
  `}
  style={{ width: scrolled ? "97vw" : "100vw" }}
>
  <div className="flex items-center h-full w-full">
{/* Logo - Far Left */}

 <div className="w-64 flex-shrink-0 flex items-center">
 <Link
  to="/home"
  className={`no-underline block transition-all duration-500 ease-in-out ${!scrolled ? "relative top-4" : ""}`}
>
  <img
    src="/assets/logo-header.png"
    alt="KalaSangam Logo"
    className={`
      transition-all duration-500 ease-in-out
      ${scrolled ? "h-20 scale-125" : "h-24 scale-125"}
      hover:scale-[1.7]"
    `}
  />
</Link>

</div>

        {/* Navigation links - Center */}
        <nav
            className={`hidden lg:flex items-center justify-center flex-1 text-[1.35rem] font-bold tracking-wide transition-colors duration-500 ease-in-out
              ${scrolled ? "text-deep-teal" : "text-deep-teal"}`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
          <div className="flex items-center justify-center space-x-8" style={{ marginTop: '8px' }}>
           
           <Link
          to="/gallery"
          className={`font-winky font-[500] transition-all duration-500 ease-in-out hover:text-rosehover ${
            !scrolled ? "relative top-3" : ""
          }`}
        >
          Gallery
        </Link>

            <Link
              to="/art-wall"
              className={`font-winky font-[500] transition-all duration-500 ease-in-out hover:text-rosehover ${
            !scrolled ? "relative top-3" : ""
          }`}
            >
              Art Wall
            </Link>

            <Link
              to="/artists"
              className={`font-winky font-[500] transition-all duration-500 ease-in-out hover:text-rosehover ${
            !scrolled ? "relative top-3" : ""
          }`}
            >
              Artists
            </Link>

        <div className="relative flex items-center" ref={dropdownRef}>
          <span
            className={`
              font-winky font-[500] text-deep-teal cursor-pointer flex items-center
              transition-all duration-500 ease-in-out hover:text-rosehover
              ${!scrolled ? "relative top-3" : ""}
            `}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Explore
            <span className={`ml-1 transform transition-transform duration-200 text-xs ${
              showDropdown ? "rotate-90" : "rotate-0"
            }`}>
              ▸
            </span>
          </span>

{showDropdown && (
                <>
            <ul
              className={`absolute top-full mt-2 z-50 w-52 rounded-xl shadow-lg font-winky text-[1.1rem] font-[500] tracking-wide ${
                scrolled
                  ? "bg-deep-teal text-blush-peach border border-coral-red/20"
                  : "bg-blush-peach text-deep-teal border border-deep-teal/10"
              }`}
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
                  className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
                    scrolled
                      ? "hover:bg-coral-red/20 hover:text-saffronglow"
                      : "hover:text-vermilion"
                  }`}
                  onClick={() => handleExplore(item.key)}
                >
                  {item.label}
                </li>
              ))}
</ul>
                </>
          )}
        </div>

            <Link
              to="/map"
              className={`font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover ${
                !scrolled ? "relative top-3" : ""
              }`}
              onClick={onMapClick}
            >
              Map
            </Link>

            <Link
              to="/events"
              className={`font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover ${
                !scrolled ? "relative top-3" : ""
              }`}
            >
              Events
            </Link>

            <Link
              to="/about"
              className={`font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover ${
                !scrolled ? "relative top-3" : ""
              }`}
            >
              About
            </Link>

            {/* Smart Search Component */}
            <div className={`flex items-center transition-all duration-500 ease-in-out ${
              !scrolled ? "relative top-3" : ""
            }`}>
              <HeaderSmartSearch scrolled={scrolled} />
            </div>
          
          {/* Notifications */}
          {isAuthenticated && (
            <div className={`flex items-center transition-all duration-500 ease-in-out ${
              !scrolled ? "relative top-3" : ""
            }`}>
              <div className="flex items-center">
                <NotificationsBell />
              </div>
            </div>
          )}

          </div>
        </nav>

        {/* Right side - Authentication/User */}
        <div className="w-64 flex-shrink-0 flex items-center justify-end">
          {isAuthenticated ? (
            /* User is logged in - show user dropdown */
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className={`flex items-center space-x-2 text-deep-teal hover:text-rosehover transition-all duration-300 ease-in-out ${
                  !scrolled ? "relative top-3" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral-red to-vermilion flex items-center justify-center text-white font-bold text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="font-winky font-[500] hidden md:block">
                  {user?.name || 'User'}
                </span>
                <span className={`transform transition-transform duration-200 text-xs ${
                  showUserDropdown ? "rotate-180" : "rotate-0"
                }`}>
                  ▼
                </span>
              </button>

              {showUserDropdown && (
                <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg z-50 ${
                  scrolled
                    ? "bg-deep-teal text-blush-peach border border-coral-red/20"
                    : "bg-blush-peach text-deep-teal border border-deep-teal/10"
                }`}>
                  <Link
                    to={user?.role === 'Admin' ? '/admin' : '/profile'}
                    className={`block px-4 py-3 font-winky font-[500] transition-all duration-200 ${
                      scrolled
                        ? "hover:bg-coral-red/20 hover:text-saffronglow"
                        : "hover:text-vermilion"
                    }`}
                    onClick={() => setShowUserDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-3 font-winky font-[500] transition-all duration-200 ${
                      scrolled
                        ? "hover:bg-coral-red/20 hover:text-saffronglow"
                        : "hover:text-vermilion"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* User is not logged in - show login/signup buttons */
            <div className={`flex items-center space-x-4 transition-all duration-500 ease-in-out ${
              !scrolled ? "relative top-3" : ""
            }`}>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-full font-winky font-[500] transition-all duration-300 ease-in-out ${
                  scrolled
                    ? "bg-coral-red text-white hover:bg-vermilion"
                    : "bg-deep-teal text-blush-peach hover:bg-coral-red"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`px-4 py-2 rounded-full font-winky font-[500] transition-all duration-300 ease-in-out ${
                  scrolled
                    ? "bg-coral-red text-white hover:bg-vermilion"
                    : "bg-deep-teal text-blush-peach hover:bg-coral-red"
                }`}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button - completely hidden on desktop */}
        <div className="hidden">
          <button
            data-mobile-menu-toggle
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`text-2xl transition-all duration-300 ease-in-out ${
              !scrolled ? "relative top-3 text-deep-teal" : "text-deep-teal"
            }`}
          >
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 w-full bg-blush-peach shadow-lg z-40 rounded-b-2xl"
        >
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/gallery"
              className="block font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
              onClick={() => setShowMobileMenu(false)}
            >
              Gallery
            </Link>
            <Link
              to="/art-wall"
              className="block font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
              onClick={() => setShowMobileMenu(false)}
            >
              Art Wall
            </Link>
            <Link
              to="/artists"
              className="block font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
              onClick={() => setShowMobileMenu(false)}
            >
              Artists
            </Link>
            <div className="space-y-2">
              <div className="font-winky font-[500] text-deep-teal">Explore</div>
              {[
                { label: "Explore by State", key: "state" },
                { label: "Explore Art", key: "art" },
                { label: "Explore Dance", key: "dance" },
                { label: "Explore Music", key: "music" },
                { label: "Explore Crafts", key: "crafts" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="pl-4 py-1 font-winky text-deep-teal/80 hover:text-rosehover cursor-pointer transition-all duration-200"
                  onClick={() => handleMobileExplore(item.key)}
                >
                  {item.label}
                </div>
              ))}
            </div>
            <Link
              to="/map"
              className="block font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
              onClick={() => setShowMobileMenu(false)}
            >
              Map
            </Link>
            <Link
              to="/events"
              className="block font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
              onClick={() => setShowMobileMenu(false)}
            >
              Events
            </Link>
            <Link
              to="/about"
              className="block font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
              onClick={() => setShowMobileMenu(false)}
            >
              About
            </Link>
            
            {/* Mobile auth buttons */}
            {!isAuthenticated && (
              <div className="flex space-x-4 pt-4 border-t border-deep-teal/20">
                <Link
                  to="/login"
                  className="flex-1 text-center py-2 font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center py-2 px-4 bg-deep-teal text-blush-peach rounded-full font-winky font-[500] hover:bg-coral-red transition-all duration-300"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile user menu */}
            {isAuthenticated && (
              <div className="pt-4 border-t border-deep-teal/20">
                <Link
                  to={user?.role === 'Admin' ? '/admin' : '/profile'}
                  className="block py-2 font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    handleLogout();
                  }}
                  className="block w-full text-left py-2 font-winky font-[500] text-deep-teal hover:text-rosehover transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

