import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ArtGallery from "./pages/ArtGallery.jsx";
import Home from "./pages/Home.jsx";
import IndiaMapPage from "./pages/IndiaMapPage.jsx";
import About from "./pages/About.jsx";
import CustomCursor from "./components/CustomCursor";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPw.jsx";
 
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
      <Header onMapClick={handleShowMap} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<IndiaMapPage onStateClick={handleStateClick} />} />
        <Route path="/gallery" element={<ArtGallery />} />
        <Route path="/about" element={<About />} />

        {/* ✅ New Route for Try Art Canvas */}
        <Route path="/try-art" element={<TryArtCanvas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      <Footer />
    </>
  );
}
export default App;
