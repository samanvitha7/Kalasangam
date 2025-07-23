import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function InstrumentBubble({ name, image, sound, description }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handlePlay = async () => {
    setShowInfo((prev) => !prev);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setAudioError(false);
          audioRef.current.onended = () => setIsPlaying(false);
        } catch (error) {
          setAudioError(true);
        }
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4 pt-8 animate-bob">
      {/* Gradient Border Container */}
      <motion.div
        className="relative p-1 rounded-full bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] shadow-2xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Play/Stop Button - positioned on the border */}
        <motion.button
          onClick={handlePlay}
          className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] rounded-full flex items-center justify-center text-white shadow-lg z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <span className="text-lg">⏸</span>
          ) : (
            <span className="text-lg">▶</span>
          )}
        </motion.button>

        {/* Main Bubble */}
        <motion.div
          className="relative w-72 h-72 rounded-full bg-[#fdecec] p-8 flex items-center justify-center transition-all duration-300 cursor-pointer"
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
        >
          <img src={image} alt={name} className="max-h-40 w-auto object-contain" />
          {isPlaying && (
            <div className="absolute bottom-6 flex gap-2">
              {[...Array(8)].map((_, i) => (
                <motion.span
                  key={i}
                  className="w-2 h-8 bg-[#E05264] rounded-sm"
                  animate={{ height: ["1.5rem", "3rem", "1.5rem"] }}
                  transition={{ repeat: Infinity, repeatType: "loop", duration: 0.4, delay: i * 0.1 }}
                />
              ))}
            </div>
          )}
          <audio src={sound} ref={audioRef} />
        </motion.div>
      </motion.div>
      {showInfo && (
        <motion.div
          className="relative bg-[#fdecec] border border-[#E05264]/30 text-[#134856] px-6 py-4 rounded-2xl shadow-lg max-w-md text-center text-base font-lora"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <strong className="block mb-2 text-xl font-dm-serif text-[#134856]">
            {name}
          </strong>
          {description}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#fdecec] rotate-45 border-l border-t border-[#E05264]/30"></div>
        </motion.div>
      )}
    </div>
  );
}
