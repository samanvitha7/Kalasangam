import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function InstrumentBubble({ name, image, sound, description }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    // Cleanup function to stop audio when component unmounts
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
          console.log('Audio play failed:', error);
          setAudioError(true);
          // Still show info even if audio fails
        }
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4 animate-bob">
      {/* Circular Instrument Bubble with consistent pink background */}
      <motion.div
        className={`relative w-40 h-40 rounded-full bg-[#fdecec] p-4 shadow-2xl flex items-center justify-center transition-all duration-300 cursor-pointer
          ${isPlaying ? "ring-4 ring-coral-red glow" : "ring-2 ring-teal-blue/30"}`}
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
        <img
          src={image}
          alt={name}
          className="max-h-24 w-auto object-contain"
        />

        {/* Waveform Animation when playing */}
        {isPlaying && (
          <div className="absolute bottom-2 flex gap-1">
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="w-1 h-5 bg-coral-red rounded-sm"
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

      {/* Description Speech Bubble */}
      {showInfo && (
        <motion.div
          className="relative bg-[#fdecec] border border-coral-red/30 text-deep-charcoal px-4 py-3 rounded-2xl shadow-md max-w-xs text-center text-sm font-lora font-bold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <strong className="block mb-1 text-lg font-semibold">{name}</strong>
          {description}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#fdecec] rotate-45 border-l border-t border-coral-red/30"></div>
        </motion.div>
      )}
    </div>
  );
}
