import { useRef, useState } from 'react';
import IndiaMap from '../components/IndiaMap.jsx';

export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);

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
    <main className="min-h-screen px-6 py-10 bg-[#fffef2] text-center scroll-smooth">
      <h1 className="text-5xl font-bold font-serif text-[#9b2226]">
        Welcome to KalaSangam
      </h1>

      <p className="text-lg text-[#582f0e] mt-4 max-w-2xl mx-auto">
        Immerse yourself in the timeless traditions, stories, and colors of Indian art.
      </p>

      <button
        onClick={handleShowMap}
        className="mt-6 px-4 py-2 bg-[#9b2226] text-white rounded-lg"
      >
        Show India Map
      </button>

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
  );
}
