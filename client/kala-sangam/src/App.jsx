import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ArtGallery from "./pages/ArtGallery.jsx";
import Home from "./pages/Home.jsx";
import IndiaMapPage from "./pages/IndiaMapPage.jsx";
import About from "./pages/About.jsx";


// 👇 Import Try Art Canvas Page
import TryArtCanvas from "./pages/TryArtCanvas.jsx"; // Make sure this path is correct
import SplashScreen from "./components/SplashScreen.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [playSound, setPlaySound] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashContinue = (withSound) => {
    setPlaySound(withSound);          // start or not start music
    navigate("/home", { replace: true }); // then navigate to home
    setShowSplash(false); // hide splash screen
  };
  const handleStateClick = (stateName) => {
    navigate(`/gallery?state=${encodeURIComponent(stateName)}`);
  };
 
  const handleShowMap = () => {
    navigate("/map");
  };

  return (
    <>
      {showSplash && location.pathname === "/" ? (
        <SplashScreen onContinue={handleSplashContinue} />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/home" element={<Home playSound={playSound} />} />
            <Route path="/map" element={<IndiaMapPage />} />
            <Route path="/gallery" element={<ArtGallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/try-art" element={<TryArtCanvas />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}
export default App;
