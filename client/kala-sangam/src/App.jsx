import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Art from "./pages/ArtGallery.jsx";
import Home from "./pages/Home.jsx";
import IndiaMapPage from "./pages/IndiaMapPage.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPw.jsx";
import ResetPassword from "./pages/ResetPassword";
import SplashScreen from "./components/SplashScreen.jsx";
import Dance from "./pages/DanceGallery.jsx";
import Music from "./pages/MusicPage.jsx";
import CraftsPage from "./pages/CraftsPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import ArtWall from "./pages/ArtWall.jsx";
import ArtistsList from "./pages/ArtistsList.jsx";
import ArtistProfile from "./pages/ArtistProfile.jsx";
 import { AuthProvider } from "./context/AuthContext.jsx";
import { SoundProvider, useSoundContext } from "./context/SoundContext.jsx";
import FloatingSoundToggle from "./components/FloatingSoundToggle.jsx";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { disableSound } = useSoundContext();

  // Redirect root URL to home if splash was already shown
  useEffect(() => {
    if (location.pathname === '/' && sessionStorage.getItem("splashShown")) {
      navigate('/home', { replace: true });
    }
  }, [location.pathname, navigate]);

  const sentinelRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);


  const handleStateClick = (stateName) => {
    navigate(`/gallery?state=${encodeURIComponent(stateName)}`);
  };

  const handleShowMap = () => {
    navigate("/map");
  };

  // Disable sound when navigating away from home page
  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/home") {
      console.log('Navigating away from home, disabling sound');
      disableSound();
    }
  }, [location.pathname, disableSound]);

  return (
    <div className="app-container relative">
      <div className="content-wrapper">
        <Header scrolled={scrolled} onMapClick={handleShowMap} />
        
        {/* Invisible sentinel to track scroll position */}
        <div ref={sentinelRef} className="h-[1px] w-full" />

        {/* Start main content */}
        <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<IndiaMapPage onStateClick={handleStateClick} />} />
          <Route path="/gallery" element={<Art />} />
          <Route path="/art-wall" element={<ArtWall />} />
          <Route path="/artists" element={<ArtistsList />} />
          <Route path="/artist/:artistId" element={<ArtistProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/explore/state" element={<IndiaMapPage onStateClick={handleStateClick} />} />
          <Route path="/explore/art" element={<Art />} />
          <Route path="/explore/dance" element={<Dance />} />
          <Route path="/explore/music" element={<Music />} />
          <Route path="/explore/crafts" element={<CraftsPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
        </main>

        <Footer />
      </div>
      
      {/* Sound toggle visible only on home path */}
      {(location.pathname === "/" || location.pathname === "/home") && (
        <FloatingSoundToggle />
      )}
      
      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash screen only when visiting root URL and it hasn't been shown in this session
    return window.location.pathname === '/' && !sessionStorage.getItem("splashShown");
  });

  const handleSplashContinue = (withSound) => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
    // The navigation is now handled within the SplashScreen component
  };

  return (
    <AuthProvider>
      <SoundProvider>
        {showSplash ? (
          <SplashScreen onContinue={handleSplashContinue} />
        ) : (
          <AppContent />
        )}
      </SoundProvider>
    </AuthProvider>
  );
}

export default App;
