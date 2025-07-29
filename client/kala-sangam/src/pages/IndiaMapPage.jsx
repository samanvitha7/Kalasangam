import IndiaMap from "../components/IndiaMap";
import Lottie from "lottie-react";
import oceanAnim from "../assets/ocean.json";
import sunAnim from "../assets/sun.json";
import FullBleedDivider from "../components/FullBleedDivider";
import useHardReload from "../hooks/useHardReload";

export default function IndiaMapPage({ onStateClick }) {
  // Add hard reload functionality
  useHardReload();
  
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8E6DA] text-center">
      <FullBleedDivider />

      {/* ────── Top Heading ────── */}
     <div className="relative z-10 container mx-auto px-4 pt-10 pb-10">
      <h2 className="inline-block text-6xl font-dm-serif  drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
        Explore States
      </h2>


    <p
      className="mt-2 italic font-semibold text-xl text-[#E05264] max-w-3xl mx-auto leading-relaxed"
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
      </div>
      
      {/* Bottom padding to continue with ocean animation */}
      <div className="relative z-10 h-32"></div>
    </main>
  );
}
