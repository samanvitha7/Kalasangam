import { useState, useEffect } from "react";

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio("/sitar-loop.mp3"); // place your audio file in `public/`

  useEffect(() => {
    audio.loop = true;
    isPlaying ? audio.play() : audio.pause();
    return () => audio.pause();
  }, [isPlaying]);

   return (
    <button
      className="fixed top-5 right-5 z-50 bg-white text-black px-4 py-2 rounded-full shadow-lg"
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {isPlaying ? "Sound On" : "Sound Off"}
    </button>
  );
}
