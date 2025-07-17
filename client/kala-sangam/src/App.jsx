import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Art from "./pages/ArtGallery.jsx";
import Home from "./pages/Home.jsx";
import IndiaMapPage from "./pages/IndiaMapPage.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPw.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import Dance from "./pages/DanceGallery";
import Music from "./pages/MusicPage.jsx";
import ArtWall from "./pages/ArtWall.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  const [showSplash, setShowSplash] = useState(() => !localStorage.getItem("splashShown"));
  const [playSound, setPlaySound] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSplashContinue = (withSound) => {
    localStorage.setItem("splashShown", "true");
    setPlaySound(withSound);
    setShowSplash(false);
    navigate("/home", { replace: true });
  };

  const handleStateClick = (stateName) => {
    navigate(`/gallery?state=${encodeURIComponent(stateName)}`);
  };

  const handleShowMap = () => {
    navigate("/map");
  };

  return (
    <AuthProvider>
      {showSplash ? (
        <SplashScreen onContinue={handleSplashContinue} />
      ) : (
        <div className="min-h-screen flex flex-col relative">
          <Header scrolled={scrolled} onMapClick={handleShowMap} />
          
          {/* Invisible sentinel to track scroll position */}
          <div ref={sentinelRef} className="h-[1px] w-full" />

          {/* Start main content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<SplashScreen onContinue={handleSplashContinue} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/map" element={<IndiaMapPage onStateClick={handleStateClick} />} />
              <Route path="/gallery" element={<Art />} />
              <Route path="/art-wall" element={<ArtWall />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/explore/state" element={<IndiaMapPage onStateClick={handleStateClick} />} />
              <Route path="/explore/art" element={<Art />} />
              <Route path="/explore/dance" element={<Dance />} />
              <Route path="/explore/music" element={<Music />} />
            </Routes>
          </main>

          <Footer />
        </div>
      )}
    </AuthProvider>
  );
}

export default App;
