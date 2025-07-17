import { useState, useRef } from "react";
import { motion } from "framer-motion";
import sitarSound from "../assets/sounds/sitar.mp3";
import tablaSound from "../assets/sounds/sitar.mp3";
import fluteSound from "../assets/sounds/sitar.mp3";

// Temporary hardcoded question
const question = {
  sound: tablaSound,
  options: ["Sitar", "Tabla", "Bansuri"],
  answer: "Tabla",
};

export default function GuessInstrument() {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
        audioRef.current.play();
    } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // reset to start if you want
    }
  }; 


  const handleGuess = (option) => {
    setSelected(option);
    setShowAnswer(true);
  };

  return (
    <motion.div
      className="bg-[#fff1dc] border border-orange-200 p-6 rounded-3xl shadow-xl"
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <button
        onClick={handlePlay}
        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full mb-6 transition"
      >
        🔊 Play Sound
      </button>
      <audio src={question.sound} ref={audioRef} />

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleGuess(opt)}
            className={`px-4 py-2 rounded-full border transition font-medium ${
              selected === opt
                ? opt === question.answer
                  ? "bg-green-200 border-green-500"
                  : "bg-red-200 border-red-500"
                : "bg-white border-gray-300 hover:bg-orange-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {showAnswer && (
        <motion.p
          className="mt-4 text-lg font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {selected === question.answer
            ? "Correct! 🎉"
            : `Oops! It was ${question.answer}.`}
        </motion.p>
      )}
    </motion.div>
  );
}
