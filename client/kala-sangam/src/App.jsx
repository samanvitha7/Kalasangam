import { Routes, Route, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import IndiaMap from "./components/IndiaMap.jsx";
import ArtGallery from "./pages/ArtGallery.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const location = useLocation();
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);

  const handleStateClick = (stateName) => {
    alert(`You clicked on ${stateName}`);
  };

  const handleShowMap = () => {
    setShowMap(true);
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <Header onMapClick={handleShowMap} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              showMap={showMap}
              mapRef={mapRef}
              onStateClick={handleStateClick}
            />
          }
        />
        <Route path="/gallery" element={<ArtGallery />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
