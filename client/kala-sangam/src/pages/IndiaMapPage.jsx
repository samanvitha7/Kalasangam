import IndiaMap from "../components/IndiaMap";
import Lottie from "lottie-react";
import oceanAnim from "../assets/ocean.json";
import sunAnim from "../assets/sun.json";

export default function IndiaMapPage({ onStateClick }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff4d1] via-[#ffd97d] to-[#ffbc4b] text-center">
      {/* 🌊 Ocean Lottie at Bottom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full origin-center"
          style={{ transform: "translateY(150px)" }}
        >
          <Lottie animationData={oceanAnim} loop autoplay className="w-full h-300px object-cover" />
        </div>
      </div>

      {/* Optional overlay */}
      <div className="absolute inset-0 z-5 bg-black/5 pointer-events-none" />

      {/* ────── Top Heading ────── */}
      <div className="relative z-10 max-w-screen-lg mx-auto pt-24">
        <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-wide text-[#9b2226]">
          Explore States
        </h2>
        <p className="mt-2 text-lg text-[#7a4c16] italic">
          Oh, clicking this will lead you to a new world of art!
        </p>
      </div>

      {/* ────── Sun and Map on Same Row ────── */}
      <div className="relative z-10 flex items-start justify-between max-w-screen-lg mx-auto pt-10">
        {/* 🗺️ India Map */}
        <div className="flex-1 flex justify-start scale-110 sm:scale-125">
          <IndiaMap onStateClick={onStateClick} />
        </div>

        {/* ☀️ Sun Animation */}
        <div
          className="w-[180px] h-[180px] relative pl-6"
          style={{ transform: "translate(20px, -50px)" }}
        >
          {/* Glowing background behind sun */}
          <div
            className="absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            w-[300px] h-[300px] 
            rounded-full 
            bg-yellow-400 
            opacity-50 
            filter 
            blur-[100px] 
            animate-pulse 
            -z-10"
          />

          {/* Sun Lottie */}
          <Lottie animationData={sunAnim} loop autoplay />
        </div>
      </div>
    </main>
  );
}
