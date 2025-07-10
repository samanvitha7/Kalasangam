import { useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import IndiaMap from './components/IndiaMap.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const location = useLocation();

  const handleStateClick = (stateName) => {
    alert(`You clicked on ${stateName}`);
  };

  const handleShowMap = () => {
    setShowMap(true);
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Header onMapClick={handleShowMap} />

      <main className="min-h-screen px-6 py-10 bg-[#fffef2] text-center scroll-smooth">

        {/* ✅ Only show this block on homepage */}
        {location.pathname === '/' && (
          <>
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
          </>
        )}

        {/* ✅ You can define more <Routes> below if needed */}
        <Routes>
          <Route path="/" element={<></>} />
          {/* Example: <Route path="/about" element={<About />} /> */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
