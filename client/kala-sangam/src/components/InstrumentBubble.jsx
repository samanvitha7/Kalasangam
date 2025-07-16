// src/components/InstrumentBubble.jsx
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function InstrumentBubble({ name, image, sound, description }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
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
    <motion.div
      className={`relative w-56 h-56 rounded-full flex flex-col items-center justify-center p-4 shadow-xl cursor-pointer bg-white transition-all duration-300 ${
        isPlaying ? "ring-4 ring-orange-400 glow" : "ring-2 ring-gray-200"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handlePlay}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img src={image} alt={name} className="w-28 h-28 object-contain mb-2" />
      <p className="font-semibold text-lg text-center">{name}</p>
      <p className="text-sm text-center text-gray-500 px-2">{description}</p>

      {/* Waveform */}
      {isPlaying && (
        <div className="absolute bottom-4 flex gap-1">
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
  );
}
