import IndiaMap from '../components/IndiaMap.jsx';

export default function Home({ showMap, mapRef, onStateClick }) {
  return (
    <main className="min-h-screen px-6 py-10 bg-[#fffef2] text-center scroll-smooth">
      <h1 className="text-5xl font-bold font-serif text-[#9b2226]">
        Welcome to KalaSangam
      </h1>

      <p className="text-lg text-[#582f0e] mt-4 max-w-2xl mx-auto">
        Immerse yourself in the timeless traditions, stories, and colors of Indian art.
      </p>

      {/* 👇 India Map shown if `showMap` is true */}
      {showMap && (
        <div
          id="india-map"
          ref={mapRef}
          className="mt-16 flex items-center justify-center p-6"
        >
          <IndiaMap onStateClick={onStateClick} />
        </div>
      )}
    </main>
  );
}
