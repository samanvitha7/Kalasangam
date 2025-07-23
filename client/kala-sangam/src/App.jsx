import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Enhanced global CSS and resource loading hook
function useAppReady() {
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Comprehensive CSS and resource check function
    const checkResources = () => {
      try {
        // Test multiple CSS properties to ensure Tailwind is fully loaded
        const testDiv = document.createElement('div');
        testDiv.className = 'container mx-auto px-4 text-tealblue bg-warm-sand font-lora transition-all';
        testDiv.style.position = 'absolute';
        testDiv.style.left = '-9999px';
        testDiv.style.top = '-9999px';
        document.body.appendChild(testDiv);
        
        const computedStyles = window.getComputedStyle(testDiv);
        
        // Check if key Tailwind classes are applied
        const hasContainer = computedStyles.maxWidth !== 'none';
        const hasCustomColors = computedStyles.color !== 'rgba(0, 0, 0, 0)' && computedStyles.color !== 'rgb(0, 0, 0)';
        const hasCustomBg = computedStyles.backgroundColor !== 'rgba(0, 0, 0, 0)' && computedStyles.backgroundColor !== 'transparent';
        const hasTransitions = computedStyles.transitionProperty !== 'none';
        
        document.body.removeChild(testDiv);
        
        // All key properties should be properly applied
        return hasContainer && hasCustomColors && hasCustomBg && hasTransitions;
      } catch (error) {
        console.warn('CSS check failed:', error);
        return false;
      }
    };

    const checkFonts = async () => {
      try {
        if (!document.fonts) return true; // Fallback for older browsers
        
        await document.fonts.ready;
        
        // Check if our specific fonts are loaded
        const loraLoaded = document.fonts.check('400 16px Lora, serif');
        const yatraLoaded = document.fonts.check('400 16px "Yatra One", cursive');
        
        return loraLoaded && yatraLoaded;
      } catch (error) {
        console.warn('Font check failed:', error);
        return true; // Fallback
      }
    };

    const checkImages = () => {
      // Check if critical images are loaded (if any)
      const images = document.querySelectorAll('img[src]');
      return Array.from(images).every(img => img.complete);
    };

    const performChecks = async () => {
      // Wait for DOM to be interactive
      if (document.readyState === 'loading') {
        return false;
      }
      
      setDomReady(true);
      
      // Check all resources
      const cssReady = checkResources();
      const fontsReady = await checkFonts();
      const imagesReady = checkImages();
      
      const allReady = cssReady && fontsReady && imagesReady;
      
      if (allReady) {
        setResourcesLoaded(true);
        // Small delay to ensure final render
        setTimeout(() => {
          setAppReady(true);
          // Remove any loading classes from body
          document.body.classList.remove('css-loading');
        }, 150);
      }
      
      return allReady;
    };

    // Initial check
    performChecks();

    // Set up event listeners for different loading stages
    const handleDOMContentLoaded = () => performChecks();
    const handleLoad = () => {
      setTimeout(performChecks, 100);
    };
    
    // Listen for font loading events
    const handleFontLoad = () => {
      setTimeout(performChecks, 50);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    }
    
    if (document.readyState !== 'complete') {
      window.addEventListener('load', handleLoad);
    }
    
    if (document.fonts) {
      document.fonts.addEventListener('loadingdone', handleFontLoad);
    }

    // Fallback timeout - ensure app loads even if checks fail
    const fallbackTimeout = setTimeout(() => {
      console.warn('Resource loading check timed out, proceeding with app load');
      setResourcesLoaded(true);
      setAppReady(true);
    }, 3000);

    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      window.removeEventListener('load', handleLoad);
      if (document.fonts) {
        document.fonts.removeEventListener('loadingdone', handleFontLoad);
      }
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return { resourcesLoaded, domReady, appReady };
}

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
import { AppReadyProvider, useAppReady as useAppReadyContext } from "./context/AppReadyContext.jsx";
import FloatingSoundToggle from "./components/FloatingSoundToggle.jsx";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { disableSound } = useSoundContext();
  const { isAppReady, loadingStage } = useAppReadyContext();

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

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [scrolled]);


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
      <div className="content-wrapper relative">
        <Header scrolled={scrolled} onMapClick={handleShowMap} />
        
        {/* Invisible sentinel to track scroll position */}
        <div ref={sentinelRef} className="h-[1px] w-full" />

        {/* Start main content */}
        <main className={`page-content ${isAppReady ? '' : 'loading'}`}>
          {/* Always render routes, but show loading overlay when not ready */}
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen bg-warm-sand">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tealblue mx-auto mb-4"></div>
                <div className="text-lg text-deep-charcoal font-lora">Loading...</div>
              </div>
            </div>
          }>
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
              <Route path="/explore/dance" element={<Dance />} />
              <Route path="/explore/music" element={<Music />} />
              <Route path="/explore/crafts" element={<CraftsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/community-guidelines" element={<CommunityGuidelines />} />
              {/* Catch-all route - redirect unknown paths to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
          
          {/* Loading overlay when app is not ready */}
          {!isAppReady && (
            <div className="fixed inset-0 z-50 flex justify-center items-center" style={{ backgroundColor: '#F8E6DA' }}>
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-orange-500 mx-auto mb-6"></div>
                <div className="text-xl font-bold" style={{ color: '#2E2E2E', fontFamily: 'system-ui, -apple-system, sans-serif' }}>KalaSangam</div>
                <div className="text-sm mt-2" style={{ color: '#666', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {loadingStage === 'checking-dom' && 'Initializing...'}
                  {loadingStage === 'checking-styles' && 'Loading styles...'}
                  {loadingStage === 'checking-fonts' && 'Loading fonts...'}
                  {loadingStage === 'finalizing' && 'Almost ready...'}
                  {loadingStage === 'initializing' && 'Starting up...'}
                  {!loadingStage && 'Preparing your cultural journey...'}
                </div>
                <div className="w-48 h-1 bg-gray-200 rounded-full mt-4 mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
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

  const handleSplashContinue = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  };

  return (
    <AppReadyProvider>
      <AuthProvider>
        <SoundProvider>
          {showSplash ? (
            <SplashScreen onContinue={handleSplashContinue} />
          ) : (
            <AppContent />
          )}
        </SoundProvider>
      </AuthProvider>
    </AppReadyProvider>
  );
}

export default App;
