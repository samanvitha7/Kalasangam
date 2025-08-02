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
  className={`no-underline block transition-all duration-500 ease-in-out ${!scrolled ? "relative top-0" : ""}`}
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
          >
          <div className="flex items-center justify-center space-x-8">
           
           <Link
          to="/gallery"
          className={`font-winky font-[500] transition-all duration-500 ease-in-out hover:text-rosehover ${
            !scrolled ? "relative top-0" : ""
          }`}
        >
          Gallery
        </Link>

            <Link
              to="/art-wall"
              className={`font-winky font-[500] transition-all duration-500 ease-in-out hover:text-rosehover ${
            !scrolled ? "relative top-0" : ""
          }`}
            >
              Art Wall
            </Link>

            <Link
              to="/artists"
              className={`font-winky font-[500] transition-all duration-500 ease-in-out hover:text-rosehover ${
            !scrolled ? "relative top-0" : ""
          }`}
            >
              Artists
            </Link>

        <div className="relative flex items-center" ref={dropdownRef}>
          <span
            className={`
              font-winky font-[500] text-deep-teal cursor-pointer flex items-center
              transition-all duration-500 ease-in-out hover:text-rosehover
              ${!scrolled ? "relative top-0" : ""}
            `}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Explore
            <span className="ml-1 transform transition-transform duration-200">
              {showDropdown ? "▲" : "▼"}
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
                !scrolled ? "relative top-0" : ""
              }`}
              onClick={onMapClick}
            >
              Map
            </Link>

            <Link
              to="/events"
              className={`font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover ${
                !scrolled ? "relative top-0" : ""
              }`}
            >
              Events
            </Link>

            <Link
              to="/about"
              className={`font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover ${
                !scrolled ? "relative top-0" : ""
              }`}
            >
              About
            </Link>
          
          {/* Search and Notifications in nav */}
          <div className={`flex items-center space-x-4 transition-all duration-500 ease-in-out ${!scrolled ? "relative top-0" : ""}`}>
            <HeaderSmartSearch scrolled={scrolled} />
            <div className="relative top-1">
              <NotificationsBell />
            </div>
          </div>
          </div>
        </nav>

        {/* Search, User Profile or Login/Signup buttons - Far Right */}
        <div className={`hidden lg:flex w-64 items-center justify-end space-x-4 transition-all duration-500 ease-in-out ${
          !scrolled ? "relative top-0" : ""
        }`}>
          {/* Search Component */}
          <HeaderSmartSearch scrolled={scrolled} />
          {isAuthenticated ? (
            <>
              {user?.role === 'Admin' && (
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-xl font-[550] font-winky transition-all duration-500 ease-in-out ${
                    scrolled
                      ? "text-[1rem] bg-gradient-to-r from-coral-red to-saffronglow text-white hover:from-saffronglow hover:to-coral-red"
                      : "text-[0.85rem] bg-blush-peach text-deep-teal hover:bg-blush-peach/80"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Admin Panel</span>
                  </div>
                </Link>
              )}
              
              {/* Regular User Profile Dropdown - Only for non-admin users */}
              {user?.role !== 'Admin' && (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className={`group flex items-center space-x-2 px-4 py-2 rounded-full font-[550] font-winky transition-all duration-500 ease-in-out ${
                      scrolled
                        ? "text-[1rem] bg-gradient-to-r from-deep-teal to-coral-red text-blush-peach hover:from-coral-red hover:to-saffronglow"
                        : "text-[0.85rem] bg-blush-peach text-deep-teal hover:bg-blush-peach/80"
                    }`}
                  >
                    <div className={`rounded-full bg-white/20 flex items-center justify-center transition-all duration-300 ${
                      scrolled ? "w-9 h-9" : "w-7 h-7"
                    }`}>
                      <span className={`font-semibold transition-all duration-300 ${
                        scrolled 
                          ? "text-base text-blush-peach group-hover:text-white" 
                          : "text-sm text-deep-teal group-hover:text-white"
                      }`}>
                        {user?.name?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>

                    <span className={`font-[500] tracking-wide transition-all duration-300 ${
                      scrolled 
                        ? "text-[1.2rem] text-blush-peach group-hover:text-white" 
                        : "text-[1rem] text-deep-teal group-hover:text-white"
                    }`}>
                      {user?.name || "Artist"}
                    </span>

                    <span className="text-xs text-deep-teal group-hover:text-white">▾</span>
                  </button>

{showUserDropdown && (
                    <>
                    <ul
                      className={`absolute right-0 top-full mt-2 z-50 w-56 rounded-xl shadow-xl font-winky text-[1rem] font-[500] tracking-wide ${
                        scrolled
                          ? "bg-deep-teal text-white border border-coral-red/20"
                          : "bg-blush-peach text-deep-teal shadow-md border border-deep-teal/10"
                      }`}
                    >
                      <li className="px-4 py-3 border-b border-coral-red/10">
                        <div className={`text-sm ${scrolled ? "text-saffronglow" : "text-vermilion"}`}>
                          Signed in as
                        </div>
                        <div className={`font-normal truncate ${scrolled ? "text-blush-peach" : "text-deep-teal"}`}>
                          {user?.email}
                        </div>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                            scrolled
                              ? "hover:bg-coral-red/20 text-blush-peach hover:text-saffronglow"
                              : "text-deep-teal hover:text-vermilion"
                          }`}
                          onClick={() => setShowUserDropdown(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                            scrolled
                              ? "hover:bg-coral-red/20 text-blush-peach hover:text-saffronglow"
                              : "text-deep-teal hover:text-vermilion"
                          }`}
                          onClick={() => setShowUserDropdown(false)}
                        >
                          My Artworks
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                            scrolled
                              ? "hover:bg-coral-red/20 text-blush-peach hover:text-saffronglow"
                              : "text-deep-teal hover:text-vermilion"
                          }`}
                          onClick={() => setShowUserDropdown(false)}
                        >
                          My Events
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                            scrolled
                              ? "hover:bg-coral-red/20 text-blush-peach hover:text-saffronglow"
                              : "text-deep-teal hover:text-vermilion"
                          }`}
                          onClick={() => setShowUserDropdown(false)}
                        >
                          Liked Posts
                        </Link>
                      </li>
                      <li className="mx-4 my-2">
                        <div className={`h-px ${scrolled ? "bg-coral-red/20" : "bg-deep-teal/20"}`}></div>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                            scrolled
                              ? "hover:bg-coral-red/20 text-blush-peach hover:text-saffronglow"
                              : "text-deep-teal hover:text-vermilion"
                          }`}
                          onClick={() => setShowUserDropdown(false)}
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className={`w-full text-left block px-4 py-3 rounded-md transition-all duration-300 ${
                            scrolled
                              ? "hover:bg-coral-red/20 text-blush-peach hover:text-saffronglow"
                              : "text-deep-teal hover:text-vermilion"
                          }`}
                        >
                          Logout
                        </button>
                      </li>
</ul>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <Link
            to="/login"
            className={`px-5 py-2 rounded-full font-bold transition-all duration-500 ease-in-out ${
              scrolled 
                ? "text-base bg-gradient-to-r from-deep-teal to-coral-red text-white hover:from-coral-red hover:to-saffronglow" 
                : "text-sm bg-blush-peach text-deep-teal hover:bg-blush-peach/80"
             }`}
            >
              Login
            </Link>

              <Link
                to="/signup"
                className={`px-5 py-2 rounded-full font-bold transition-all duration-500 ease-in-out ${
                  scrolled 
                    ? "text-base bg-gradient-to-r from-deep-teal to-coral-red text-white hover:from-coral-red hover:to-saffronglow" 
                    : "text-sm bg-blush-peach text-deep-teal hover:bg-blush-peach/80"
                  }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button - Visible on mobile only */}
        <div className="lg:hidden flex items-center justify-end">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              scrolled
                ? "bg-deep-teal/20 text-deep-teal hover:bg-deep-teal/30"
                : "bg-white/10 text-deep-teal hover:bg-white/20"
            }`}
            data-mobile-menu-toggle
          >
            {showMobileMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-16 left-0 w-full bg-blush-peach/95 backdrop-blur-md border-t border-vermilion/20 transition-all duration-300 z-50 ${
          showMobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-6 space-y-4">

          {/* Navigation Links */}
          <Link
            to="/gallery"
            className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
            onClick={() => setShowMobileMenu(false)}
          >
            Gallery
          </Link>
          
          <Link
            to="/art-wall"
            className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
            onClick={() => setShowMobileMenu(false)}
          >
            Art Wall
          </Link>
          
          <Link
            to="/artists"
            className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
            onClick={() => setShowMobileMenu(false)}
          >
            Artists
          </Link>

          {/* Explore Dropdown */}
          <div className="border-t border-deep-teal/20 pt-4">
            <div className="px-4 py-2 text-deep-teal font-winky font-[600] text-lg">
              Explore
            </div>
            {[
              { label: "Explore by State", key: "state" },
              { label: "Explore Art", key: "art" },
              { label: "Explore Dance", key: "dance" },
              { label: "Explore Music", key: "music" },
              { label: "Explore Crafts", key: "crafts" },
            ].map((item) => (
              <button
                key={item.key}
                className="block w-full text-left py-2 pl-8 pr-4 text-deep-teal/80 font-winky font-[400] text-base transition-colors hover:text-rosehover"
                onClick={() => handleMobileExplore(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link
            to="/map"
            className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
            onClick={() => { setShowMobileMenu(false); onMapClick?.(); }}
          >
            Map
          </Link>
          
          <Link
            to="/events"
            className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
            onClick={() => setShowMobileMenu(false)}
          >
            Events
          </Link>
          
          <Link
            to="/about"
            className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
            onClick={() => setShowMobileMenu(false)}
          >
            About
          </Link>

          {/* Auth Section */}
          <div className="border-t border-deep-teal/20 pt-6 mt-6">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="px-4 py-2 bg-deep-teal/10 rounded-lg">
                  <div className="text-sm text-vermilion font-medium">Signed in as</div>
                  <div className="text-deep-teal font-winky truncate">{user?.email}</div>
                </div>
                
                {user?.role === 'Admin' && (
                  <Link
                    to="/admin"
                    className="block py-3 px-4 bg-gradient-to-r from-coral-red to-saffronglow text-white rounded-lg font-winky font-[500] text-center transition-all hover:from-saffronglow hover:to-coral-red"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    ⚡ Admin Panel
                  </Link>
                )}
                
                <Link
                  to="/profile"
                  className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Profile
                </Link>
                
                <Link
                  to="/profile"
                  className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Artworks
                </Link>
                
                <Link
                  to="/profile"
                  className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Events
                </Link>
                
                <Link
                  to="/profile"
                  className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Liked Posts
                </Link>
                
                <Link
                  to="/profile"
                  className="block py-3 px-4 text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Settings
                </Link>
                
                <button
                  onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                  className="block w-full py-3 px-4 text-left text-deep-teal font-winky font-[500] text-lg transition-colors hover:text-rosehover"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="block py-3 px-4 bg-gradient-to-r from-deep-teal to-coral-red text-white rounded-lg font-bold text-center transition-all hover:from-coral-red hover:to-saffronglow"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-3 px-4 bg-gradient-to-r from-deep-teal to-coral-red text-white rounded-lg font-bold text-center transition-all hover:from-coral-red hover:to-saffronglow"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

