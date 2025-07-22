import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Sound imports
import sitarSound from "../assets/sounds/sitar.mp3";
import tablaSound from "../assets/sounds/tabla.mp3";
import fluteSound from "../assets/sounds/flute.mp3";
import veenaSound from "../assets/sounds/veena.mp3";
import mridangamSound from "../assets/sounds/mridangam.mp3";

// Questions list
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
  const audioRef = useRef(null);

  useEffect(() => {
    pickRandomQuestion();
  }, []);

  const pickRandomQuestion = () => {
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrent(random);
    setSelected(null);
    setShowAnswer(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    }, 100);
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleGuess = (option) => {
    stopSound(); // ⛔ Stop the sound when user guesses
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
      {/* Play Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={pickRandomQuestion}
          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          🔊 Play Random Sound
        </button>
      </div>

      {/* Audio Element */}
      {current && <audio src={current.sound} ref={audioRef} />}

      {/* Options */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {["Sitar", "Tabla", "Bansuri","Veena", "Mridangam"].map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleGuess(opt)}
            disabled={showAnswer}
            className={`px-4 py-2 rounded-full border transition font-medium ${
              selected === opt
                ? opt === current?.answer
                  ? "bg-green-200 border-green-500"
                  : "bg-red-200 border-red-500"
                : "bg-white border-gray-300 hover:bg-orange-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showAnswer && (
        <motion.p
          className="mt-2 text-lg font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {selected === current?.answer
            ? "✅ Correct!"
            : `❌ Oops! It was ${current?.answer}.`}
        </motion.p>
      )}
    </motion.div>
  );
}
