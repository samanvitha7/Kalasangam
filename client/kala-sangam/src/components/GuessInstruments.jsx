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
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Just pick a random question without auto-playing on component mount
    const random = questions[Math.floor(Math.random() * questions.length)];
    setCurrent(random);
    setSelected(null);
    setShowAnswer(false);
    setIsPlaying(false);

    // Cleanup function to stop audio when component unmounts
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
      // Only play if user has interacted and requested to play
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
      console.log('Audio play failed:', error);
      setAudioError('Click the play button to hear the sound!');
      setIsPlaying(false);
    }
  };

  const handlePlayClick = () => {
    if (!hasStarted) {
      // First time - just start the sound for current question
      playCurrentSound();
    } else {
      // Subsequent times - pick new question and play
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
      <div className="flex flex-col items-center mb-6">
        <button
          onClick={handlePlayClick}
          disabled={isPlaying}
          className={`font-semibold px-6 py-3 rounded-full transition ${
            isPlaying 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-orange-400 hover:bg-orange-500 text-white'
          }`}
        >
          {isPlaying ? '🔊 Playing...' : hasStarted ? '🔊 Play New Sound' : '🔊 Start Game'}
        </button>
        
        {audioError && (
          <motion.p 
            className="text-red-600 text-sm mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {audioError}
          </motion.p>
        )}
        
        {!hasStarted && (
          <p className="text-gray-600 text-sm mt-2 text-center">
            Click to hear an instrument sound and guess what it is!
          </p>
        )}
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
