import IndiaMap from '../components/IndiaMap';
import Lottie from 'lottie-react';
import oceanAnim from '../assets/ocean.json'; // adjust path if needed

export default function IndiaMapPage({ onStateClick }) {
  return (
    <main className="relative min-h-screen px-6 py-10 bg-[#fffef2] text-center overflow-hidden">

      {/* 🌊 Ocean Lottie Background (darker + shifted down) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Lottie
          animationData={oceanAnim}
          loop
          autoplay
          className="absolute w-full h-full top-[500px] opacity-100" // ⬅️ shift down + make darker
        />
      </div>

      {/* Optional: add a dark overlay on top for more contrast */}
      <div className="absolute inset-0 z-0 bg-black/10 pointer-events-none" />

      {/* 🌟 Heading */}
      <h2 className="text-4xl sm:text-5xl font-bold text-[#9b2226] mb-10 tracking-wide font-serif relative z-10">
        Explore States
      </h2>

      {/* 🗺️ India Map */}
      <div className="relative z-10 mt-10 flex items-center justify-center p-6">
        <IndiaMap onStateClick={onStateClick} />
      </div>
    </main>
  );
}
