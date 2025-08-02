// Cache buster - v2.0.1
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import FloatingSoundToggle from "./components/FloatingSoundToggle.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SoundProvider } from "./context/SoundContext.jsx";

// Lazy load all pages
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
import SearchResults from "./pages/SearchResults.jsx";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef(null);

  // Simple redirect root URL to home if splash was already shown
  useEffect(() => {
    if (location.pathname === '/' && sessionStorage.getItem("splashShown")) {
      navigate('/home', { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
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

  return (
    <div className="app-container relative">
      <div className="content-wrapper relative">
        <Header scrolled={scrolled} onMapClick={handleShowMap} />
        
        <div ref={sentinelRef} className="h-[1px] w-full" />

        <main className="page-content">
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen bg-warm-sand">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-teal mx-auto mb-4"></div>
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
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/panel" element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/phone-login" element={<PhoneLogin />} />
              <Route path="/phone-signup" element={<PhoneSignup />} />
              <Route path="/profile" element={<UserPage />} />
              <Route path="/search" element={<SearchResults />} />
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
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
      
      {/* Sound toggle visible only on home path */}
      {(location.pathname === "/" || location.pathname === "/home") && (
        <FloatingSoundToggle />
      )}
      
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
        toastClassName="toast-custom"
        bodyClassName="toast-body-custom"
        progressClassName="toast-progress-custom"
      />
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return window.location.pathname === '/' && !sessionStorage.getItem("splashShown");
  });

  const handleSplashContinue = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onContinue={handleSplashContinue} />;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <SoundProvider>
          <AppContent />
        </SoundProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
