import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { HeaderSmartSearch } from "./SmartSearchComponent";
import NotificationsBell from "./NotificationsBell";

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

  return (
   <header
  className={`
    fixed top-0 left-1/2 -translate-x-1/2 w-full z-50
    transition-all duration-500 ease-in-out font-lora
    ${scrolled
      ? "bg-blushpeach/95 backdrop-blur-md rounded-full shadow-2xl px-6 border border-vermilion/20"
      : "bg-transparent px-6 flex justify-between items-center"}
    h-16
  `}
  style={{ width: scrolled ? "97vw" : "100vw" }}
>
  <div className="flex items-center justify-between h-full w-full">
{/* Logo - Far Left */}

 <div className="flex-shrink-0 flex items-center">
  <Link to="/home" className="no-underline block">
    <img
      src="/assets/logo-header.png"
      alt="KalaSangam Logo"
      className={`
        transition-all duration-500 ease-in-out
        ${scrolled ? "h-20 scale-125" : "h-24 scale-150"}
        hover:scale-[1.7]"
      `}
    />
  </Link>
</div>



        {/* Navigation links - Center */}
        <nav
            className={`flex space-x-12 text-[1.35rem] font-bold tracking-wide transition-colors duration-500 ease-in-out
              ${scrolled ? "text-tealblue" : "text-tealblue"}`}
          >

           <Link
              to="/home"
              className="font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
            >
            Home
            </Link>
           <Link
              to="/gallery"
              className="font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
            >
            Gallery
            </Link>

            <Link
              to="/art-wall"
              className="font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
            >
              Art Wall
            </Link>

            <Link
              to="/artists"
              className="font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
            >
              Artists
            </Link>

        <div className="relative flex items-center" ref={dropdownRef}>
  <span
    className={`
      font-winky font-[500] text-tealblue cursor-pointer flex items-center
      transition-all duration-300 ease-in-out
      hover:text-rosehover
    `}
    onClick={() => setShowDropdown(!showDropdown)}
  >
    Explore 
    <svg 
      className={`w-4 h-4 ml-1 transition-transform duration-200 ${
        showDropdown ? 'rotate-90' : 'rotate-0'
      }`} 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  </span>

  {showDropdown && (
    <ul
      className={`
        absolute top-full mt-2 z-50 w-52 rounded-xl shadow-lg font-winky text-[1.1rem] font-[500] tracking-wide
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
                : "hover:text-vermilion"
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
           className="font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
            
            onClick={onMapClick}
          >
             Map
          </Link>

          <Link
            to="/events"
            className="font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
            
          >
            Events
          </Link>

          <Link
            to="/about"
            className="font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover"
          >
            About
          </Link>

          {/* Search Icon in Navigation */}
          <div className="flex items-center">
            <HeaderSmartSearch scrolled={scrolled} />
          </div>
        </nav>

        {/* Notifications - Center Right */}
        <div className="flex-shrink-0 flex items-center mx-4 space-x-4">
          <NotificationsBell />
        </div>

        {/* User Profile or Login/Signup buttons - Far Right */}
        <div className="flex-shrink-0 flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {/* Admin Profile Button - Only for admins */}
              {user?.role === 'Admin' && (
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-xl font-[550] font-winky text-[1rem] transition-all duration-300 ${
                    scrolled
                      ? "bg-gradient-to-r from-rosered to-saffronglow text-white hover:from-saffronglow hover:to-rosered"
                      : "bg-gradient-to-r from-rosered to-saffronglow text-white hover:from-saffronglow hover:to-rosered"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Admin Panel</span>
                  </div>
                </Link>
              )}
              
              {/* Regular User Profile Dropdown */}
              <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                 className={`group flex items-center space-x-2 px-4 py-2 rounded-xl font-[550] font-winky text-[1rem] transition-all duration-300 ${
                    scrolled
                    ? "bg-gradient-to-r from-tealblue to-rosered text-blushpeach hover:from-rosered hover:to-saffronglow"
                    : "hover:bg-gradient-to-r from-tealblue to-rosered  "}
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
                  className={`absolute right-0 top-full mt-2 z-50 w-56 rounded-xl shadow-xl font-winky text-[1rem] font-[500] tracking-wide ${
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

                  {/* Main Menu Items */}
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
                        <span>👤</span>
                        <span>Profile</span>
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
                        <span>📅</span>
                        <span>My Events</span>
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
                        <span>❤️</span>
                        <span>Liked Posts</span>
                      </div>
                    </Link>
                  </li>
                  
                  {/* Divider */}
                  <li className="mx-4 my-2">
                    <div className={`h-px ${scrolled ? "bg-rosered/20" : "bg-tealblue/20"}`}></div>
                  </li>
                  
                  {/* Account Menu Items */}
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
                  
                  <li>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left block px-4 py-3 rounded-md transition-all duration-300 ${
                        scrolled
                          ? "hover:bg-rosered/20 text-blushpeach hover:text-saffronglow"
                          : "text-tealblue hover:text-vermilion"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>🚪</span>
                        <span>Logout</span>
                      </div>
                    </button>

                  </li>
                </ul>
              )}
            </div>
            </>
          ) : (
            <>
              <Link
            to="/login"
            className="px-5 py-2 rounded-lg font-bold transition-all duration-300 
             bg-gradient-to-r from-tealblue to-rosered text-white
             hover:from-rosered hover:to-saffronglow"
            >
              Login
            </Link>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg font-bold transition-all duration-300 
                  bg-gradient-to-r from-tealblue to-rosered text-white
                  hover:from-rosered hover:to-saffronglow"
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

