import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection.jsx";
import KaleidoscopeArt from "../components/KaleidoscopeArt.jsx";
import FloatingVisuals from "../components/FloatingVisuals.jsx";
import StorytellingScroll from "../components/StorytellingScroll.jsx";
import CinematicCarousel from "../components/CinematicCarousel.jsx";
import IndiaMap from "../components/IndiaMap.jsx";
import SoundToggle from "../components/SoundToggle.jsx";
import SplashScreen from "../components/SplashScreen.jsx";
import ArtGallery from "./ArtGallery.jsx";

export default function Home({ showMap, mapRef, onStateClick, audio }) {
  const [showMain, setShowMain] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // On component mount, check if splash was already shown
    const splashShown = localStorage.getItem("splashShown");
    if (splashShown) {
      // If splash was shown before, show main content directly
      setShowMain(true);
      setPlaying(true); // optionally start sound automatically if you want
    }
  }, []);

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
      audioRef.current.currentTime = 0; // Reset audio position
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset audio position
      }
    };
  }, [isPlaying]);

  const handleContinue = (sound) => {
    localStorage.setItem("splashShown", "true");
    setPlaying(sound);
    setShowMain(true);
  };

  return (
    <>
      {showMain && (
        <main className="min-h-screen px-6 py-10 bg-[#fffef2] text-center scroll-smooth">
          <SoundToggle soundOn={isPlaying} setSoundOn={setPlaying} />
          <HeroSection audioRef={audioRef} isPlaying={isPlaying} setPlaying={setPlaying} />mois
          <KaleidoscopeArt />
          <FloatingVisuals />
          <StorytellingScroll />
          <CinematicCarousel />

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
