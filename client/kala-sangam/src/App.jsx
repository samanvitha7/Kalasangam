import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ArtGallery from "./pages/ArtGallery.jsx";
import Home from "./pages/Home.jsx";
import IndiaMapPage from "./pages/IndiaMapPage.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPw.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import DanceGallery from "./pages/DanceGallery";
function App() {
  // Initialize splash from localStorage
  const [showSplash, setShowSplash] = useState(() => {
    return !localStorage.getItem("splashShown");
  });

  const [playSound, setPlaySound] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setIsHeaderVisible(false);
        setIsFooterVisible(false);
      } else {
        setIsHeaderVisible(true);
        setIsFooterVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <>
      {showSplash ? (
        <SplashScreen onContinue={handleSplashContinue} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header isVisible={isHeaderVisible} onMapClick={handleShowMap} />

          <main className="flex-grow pt-[80px]">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/map" element={<IndiaMapPage onStateClick={handleStateClick} />} />
              <Route path="/gallery" element={<ArtGallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/explore/state" element={<IndiaMapPage onStateClick={handleStateClick} />} />
              <Route path="/explore/art" element={<ArtGallery />} />
              <Route path="/explore/dance" element={<DanceGallery />} />
            </Routes>
          </main>

          <Footer isVisible={isFooterVisible} />
        </div>
      )}
    </>
  );
}

import SoundToggle from "./components/SoundToggle.jsx";

export default App;
