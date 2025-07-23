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
      <motion.div
        className={`relative w-40 h-40 rounded-full bg-[#fdecec] p-4 shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isPlaying
            ? "ring-4 ring-[#E05264] shadow-[#E05264]/30"
            : "ring-2 ring-[#1D7C6F]/30"
        }`}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePlay}
      >
        <img src={image} alt={name} className="max-h-24 w-auto object-contain" />
        {isPlaying && (
          <div className="absolute bottom-2 flex gap-1">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="w-1 h-5 bg-[#E05264] rounded-sm"
                animate={{ height: ["1rem", "2rem", "1rem"] }}
                transition={{ repeat: Infinity, repeatType: "loop", duration: 0.4, delay: i * 0.1 }}
              />
            ))}
          </div>
        )}
        <audio src={sound} ref={audioRef} />
      </motion.div>
      {showInfo && (
        <motion.div
          className="relative bg-[#fdecec] border border-[#E05264]/30 text-[#134856] px-4 py-3 rounded-2xl shadow-md max-w-xs text-center text-base font-[Noto Sans]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <strong className="block mb-1 text-lg font-[Winky Rough] text-[#134856]">
            {name}
          </strong>
          {description}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#fdecec] rotate-45 border-l border-t border-[#E05264]/30"></div>
        </motion.div>
      )}
    </div>
  );
}
