import { useEffect, useRef, useState } from "react";
import IndiaMap from "../components/IndiaMap.jsx";
import HeroSection from "../components/HeroSection";
import SoundToggle from "../components/SoundToggle";
import FloatingVisuals from "../components/FloatingVisuals";
import SplashScreen from "../components/SplashScreen";
import ArtShowCase from "../components/ArtShowCase";

export default function Home({ showMap, mapRef, onStateClick }) {
  const [showMain, setShowMain] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sitar-loop.mp3");
      audioRef.current.loop = true;
    }

    if (playSound) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [playSound]);

  const handleContinue = (sound) => {
    setPlaySound(sound);
    setShowMain(true);
  };

  return (
    <>
      {!showMain && <SplashScreen onContinue={handleContinue} />}

      {showMain && (
        <main className="min-h-screen px-6 py-10 bg-[#fffef2] text-center scroll-smooth">
          <SoundToggle soundOn={playSound} setSoundOn={setPlaySound} />
          <HeroSection />
          <FloatingVisuals />
          <ArtShowCase />

          <h1 className="text-5xl font-bold font-serif text-[#9b2226]">
            Welcome to <span className="yatra-font">KalaSangam</span>
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
              <IndiaMap onStateClick={onStateClick} />
            </div>
          )}
        </main>
      )}
    </>
  );
}
