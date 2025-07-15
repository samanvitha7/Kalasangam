import { useState, useEffect } from "react";

export default function SoundToggle({ isPlaying, setIsPlaying }) {
  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className="fixed top-5 right-5 z-50 bg-white text-black px-4 py-2 rounded-full shadow-lg"
      onClick={toggleSound}
    >
      {isPlaying ? "Sound On" : "Sound Off"}
    </button>
  );
}

