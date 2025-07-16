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
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [playSound, setPlaySound] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
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
    setPlaySound(withSound);
    setShowSplash(false); // hide splash screen
    navigate("/home", { replace: true }); // redirect to home
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
        <>
          <Header isVisible={isHeaderVisible} onMapClick={handleShowMap} />

      {/* Page content wrapper with padding */}
      <div className="pt-[80px] pb-[120px] min-h-screen">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/map" element={<IndiaMapPage onStateClick={handleStateClick} />} />
          <Route path="/gallery" element={<ArtGallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>

          <Footer isVisible={isFooterVisible} />
        </>
      )}
    </>
  );
}

export default App;
