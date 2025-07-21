import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Lazy load all pages for better performance
const Art = lazy(() => import("./pages/ArtGallery.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const IndiaMapPage = lazy(() => import("./pages/IndiaMapPage.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Login = lazy(() => import("./pages/LoginPage.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const PhoneLogin = lazy(() => import("./pages/PhoneLogin.jsx"));
const PhoneSignup = lazy(() => import("./pages/PhoneSignup.jsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const CommunityGuidelines = lazy(() => import("./pages/CommunityGuidelines.jsx"));
const UserPage = lazy(() => import("./pages/UserPage.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPw.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));
const Dance = lazy(() => import("./pages/DanceGallery.jsx"));
const Music = lazy(() => import("./pages/MusicPage.jsx"));
const CraftsPage = lazy(() => import("./pages/CraftsPage.jsx"));
const EventsPage = lazy(() => import("./pages/EventsPage.jsx"));
const ArtWall = lazy(() => import("./pages/ArtWall.jsx"));
const ArtistsList = lazy(() => import("./pages/ArtistsList.jsx"));
const ArtistProfile = lazy(() => import("./pages/ArtistProfile.jsx"));
const AdminLogin = lazy(() => import("./components/AdminLogin.jsx"));
const AdminPanel = lazy(() => import("./components/AdminPanel.jsx"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard.jsx"));
 import { AuthProvider } from "./context/AuthContext.jsx";
import { SoundProvider, useSoundContext } from "./context/SoundContext.jsx";
import FloatingSoundToggle from "./components/FloatingSoundToggle.jsx";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { disableSound } = useSoundContext();

  // Simple redirect root URL to home if splash was already shown
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
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-pulse text-lg text-gray-600">Loading...</div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<IndiaMapPage onStateClick={handleStateClick} />} />
            <Route path="/gallery" element={<Art />} />
            <Route path="/art-wall" element={<ArtWall />} />
            <Route path="/artists" element={<ArtistsList />} />
            <Route path="/artist/:artistId" element={<ArtistProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['Admin', 'Artist', 'Viewer']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/panel" element={
              <ProtectedRoute allowedRoles={['Admin', 'Artist']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/phone-login" element={<PhoneLogin />} />
            <Route path="/phone-signup" element={<PhoneSignup />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/explore/state" element={<IndiaMapPage onStateClick={handleStateClick} />} />
            <Route path="/explore/art" element={<Art />} />
            <Route path="/explore/dance" element={<Dance />} />
            <Route path="/explore/music" element={<Music />} />
            <Route path="/explore/crafts" element={<CraftsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/community-guidelines" element={<CommunityGuidelines />} />
          </Routes>
        </Suspense>
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
