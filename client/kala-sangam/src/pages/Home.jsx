import { useRef, useState, useEffect } from "react";
import HeroSection from "../components/HeroSection.jsx";
import FloatingVisuals from "../components/FloatingVisuals.jsx";
import StorytellingScroll from "../components/StorytellingScroll.jsx";
import CinematicCarousel from "../components/CinematicCarousel.jsx";
import IndiaMap from "../components/IndiaMap.jsx";
import SoundToggle from "../components/SoundToggle.jsx";
import ParallaxSection from "../components/ParallaxSection.jsx";

export default function Home({ showMap, mapRef, onStateClick, audio }) {
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sitar-loop.mp3");
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isPlaying]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#fffef2] text-center">
      <SoundToggle soundOn={isPlaying} setSoundOn={setPlaying} />

      {/* Fullscreen Parallax Section */}
      <div className="w-full h-screen overflow-hidden">
        <ParallaxSection />
      </div>

      <StorytellingScroll />
      <CinematicCarousel />

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
