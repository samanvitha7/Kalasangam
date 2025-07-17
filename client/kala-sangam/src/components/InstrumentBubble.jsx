import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function InstrumentBubble({ name, image, sound, description }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false); // <-- new state for speech bubble

  const handlePlay = () => {
    setShowInfo((prev) => !prev); // toggle the info box visibility

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        audioRef.current.onended = () => setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4 animate-bob">
      {/* Floating Instrument Bubble */}
      <motion.div
        className={`relative w-40 h-40 rounded-full bg-white p-4 shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer
          ${isPlaying ? "ring-4 ring-orange-500 glow" : "ring-2 ring-gray-200"}`}
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePlay}
      >
        <img src={image} alt={name} className="w-24 h-24 object-contain" />

        {/* Waveform Animation */}
        {isPlaying && (
          <div className="absolute bottom-2 flex gap-1">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="w-1 h-5 bg-orange-500 rounded-sm"
                animate={{ height: ["1rem", "2rem", "1rem"] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 0.4,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}

        <audio src={sound} ref={audioRef} />
      </motion.div>

      {/* Conditional Speech Bubble Info */}
      {showInfo && (
        <motion.div
          className="relative bg-[#fff1dc] border border-orange-200 text-[#462F1A] px-4 py-3 rounded-2xl shadow-md max-w-xs text-center text-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <strong className="block mb-1 text-lg font-semibold">{name}</strong>
          {description}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#fff1dc] rotate-45 border-l border-t border-orange-200"></div>
        </motion.div>
      )}
    </div>
  );
}
