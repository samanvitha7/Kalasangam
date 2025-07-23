import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import sitarSound from "../assets/sounds/sitar.mp3";
import tablaSound from "../assets/sounds/tabla.mp3";
import fluteSound from "../assets/sounds/flute.mp3";
import veenaSound from "../assets/sounds/veena.mp3";
import mridangamSound from "../assets/sounds/mridangam.mp3";

const questions = [
  { sound: sitarSound, answer: "Sitar" },
  { sound: tablaSound, answer: "Tabla" },
  { sound: fluteSound, answer: "Bansuri" },
  { sound: veenaSound, answer: "Veena" },
  { sound: mridangamSound, answer: "Mridangam" },
];

export default function GuessInstrument() {
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrent(random);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const pickRandomQuestion = (shouldPlay = true) => {
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrent(random);
    setSelected(null);
    setShowAnswer(false);
    setIsPlaying(false);
    if (shouldPlay && hasStarted) {
      setTimeout(() => {
        playCurrentSound();
      }, 100);
    }
  };

  const playCurrentSound = async () => {
    if (!audioRef.current || !current) return;
    try {
      setAudioError(null);
      audioRef.current.load();
      await audioRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      setAudioError("Click the play button to hear the sound!");
      setIsPlaying(false);
    }
  };

  const handlePlayClick = () => {
    if (!hasStarted) {
      playCurrentSound();
    } else {
      pickRandomQuestion(true);
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleGuess = (option) => {
    stopSound();
    setSelected(option);
    setShowAnswer(true);
  };

  return (
    <motion.div
      className="bg-[#fdecec] px-6 py-8 rounded-3xl shadow-xl font-noto text-[#134856] max-w-3xl mx-auto mt-20"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center mb-6">
        <button
          onClick={handlePlayClick}
          disabled={isPlaying}
          className={`font-semibold px-6 py-3 rounded-full transition text-white text-base shadow-md ${
            isPlaying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#E05264] hover:bg-[#d0465a]"
          }`}
        >
          {isPlaying ? "🔊 Playing..." : hasStarted ? "🔊 Play New Sound" : "🔊 Start Game"}
        </button>

        {audioError && (
          <motion.p className="text-[#E05264] text-sm mt-2 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {audioError}
          </motion.p>
        )}

        {!hasStarted && (
          <p className="text-[#134856] text-sm mt-2 text-center">
            Click to hear an instrument sound and guess what it is!
          </p>
        )}
      </div>

      {current && <audio src={current.sound} ref={audioRef} />}

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {["Sitar", "Tabla", "Bansuri", "Veena", "Mridangam"].map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleGuess(opt)}
            disabled={showAnswer}
            className={`px-4 py-2 rounded-full border transition text-base font-medium ${
              selected === opt
                ? opt === current?.answer
                  ? "bg-green-200 border-green-500 text-green-800"
                  : "bg-red-200 border-red-500 text-red-800"
                : "bg-white border-gray-300 hover:bg-[#F48C8C]/40"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {showAnswer && (
        <motion.p
          className="mt-2 text-lg font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {selected === current?.answer ? "✅ Correct!" : `❌ Oops! It was ${current?.answer}.`}
        </motion.p>
      )}
    </motion.div>
  );
}
