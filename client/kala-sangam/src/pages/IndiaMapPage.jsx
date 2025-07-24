import IndiaMap from "../components/IndiaMap";
import Lottie from "lottie-react";
import oceanAnim from "../assets/ocean.json";
import sunAnim from "../assets/sun.json";
import FullBleedDivider from "../components/FullBleedDivider";

export default function IndiaMapPage({ onStateClick }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F8E6DA] via-[#FCD5B5] to-[#FFF7C2] text-center">
      <FullBleedDivider />


      {/* 🌊 Ocean Lottie at Bottom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full origin-center"
          style={{ transform: "translateY(300px)" }}
        >
          <Lottie animationData={oceanAnim} loop autoplay className="w-full h-100px object-cover" />
        </div>
      </div>

      {/* Optional overlay */}
      <div className="absolute inset-0 z-5 bg-black/5 pointer-events-none" />

      {/* ────── Top Heading ────── */}
     <div className="relative z-10 container mx-auto px-4 pt-10 pb-10">
      <h2 className="inline-block text-6xl font-dm-serif  drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
        Explore States
      </h2>


    <p
      className="mt-2 text-lg italic font-semibold text-xl text-[#E05264] max-w-3xl mx-auto leading-relaxed"
    >
      Oh, clicking this will lead you to a new world of art!
    </p>



    </div>


      {/* ────── Sun and Map on Same Row ────── */}
      <div className="relative z-10 flex items-start justify-between container mx-auto px-4 pt-10">
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
      
      {/* Bottom padding to continue with ocean animation */}
      <div className="relative z-10 h-32"></div>
    </main>
  );
}
