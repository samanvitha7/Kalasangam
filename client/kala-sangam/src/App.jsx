import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";


import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ArtGallery from "./pages/ArtGallery.jsx";
import Home from "./pages/Home.jsx";
import IndiaMapPage from "./pages/IndiaMapPage.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);

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
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/map"
          element={<IndiaMapPage onStateClick={handleStateClick} />}
        />
        <Route path="/gallery" element={<ArtGallery />} />
        <Route path="/map" element={<IndiaMapPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
