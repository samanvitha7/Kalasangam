import { Routes, Route, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import IndiaMap from "./components/IndiaMap.jsx";
import ArtGallery from "./pages/ArtGallery.jsx"; // ✅ make sure this file exists!

function Home() {
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

      <main className="min-h-screen px-6 py-10 bg-[#fffef2] text-center scroll-smooth">
        <h1 className="text-5xl font-bold font-serif text-[#9b2226]">
          Welcome to KalaSangam
        </h1>
        <p className="text-lg text-[#582f0e] mt-4 max-w-2xl mx-auto">
          Immerse yourself in the timeless traditions, stories, and colors of Indian art.
        </p>

        {showMap && (
          <div
            id="india-map"
            ref={mapRef}
            className="mt-16 flex items-center justify-center p-6"
          >
            <IndiaMap onStateClick={handleStateClick} />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<ArtGallery />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
