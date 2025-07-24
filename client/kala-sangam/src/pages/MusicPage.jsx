import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InstrumentBubble from "../components/InstrumentBubble";
import GuessInstrument from "../components/GuessInstruments";
import { FaMusic } from 'react-icons/fa';
import "./MusicPage.css";
import sitarImage from "../assets/instruments/sitar.png";
import tablaImage from "../assets/instruments/tabla.png";
import fluteImage from "../assets/instruments/flute.png";
import veenaImage from "../assets/instruments/veena.png";
import mridangamImage from "../assets/instruments/mridangam.png";
import sitarSound from "../assets/sounds/sitar.mp3";
import tablaSound from "../assets/sounds/tabla.mp3";
import fluteSound from "../assets/sounds/flute.mp3";
import veenaSound from "../assets/sounds/veena.mp3";
import mridangamSound from "../assets/sounds/mridangam.mp3";
import FullBleedDivider from "../components/FullBleedDivider";

export default function MusicPage() {
  const [pageReady, setPageReady] = useState(false);
  const [showGuessGame, setShowGuessGame] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRef = useRef(null);

  const handlePlayAudio = (sound, name) => {
    if (currentlyPlaying === name) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setCurrentlyPlaying(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const newAudio = new Audio(sound);
    audioRef.current = newAudio;
    newAudio.play();
    setCurrentlyPlaying(name);

    newAudio.onended = () => {
      setCurrentlyPlaying(null);
    };
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const instruments = [
    {
      name: "Sitar",
      image: sitarImage,
      sound: sitarSound,
      description:
        "The sitar is a plucked stringed instrument used in Hindustani classical music. 🎵 Did you know? It has been used in pop music by The Beatles!",
    },
    {
      name: "Tabla",
      image: tablaImage,
      sound: tablaSound,
      description:
        "Tabla consists of a pair of hand drums and is used in North Indian music. 🎵 Did you know? Each drum has a distinct sound!",
    },
    {
      name: "Bansuri",
      image: fluteImage,
      sound: fluteSound,
      description:
        "The bansuri is a bamboo flute associated with Lord Krishna. 🎵 Did you know? It has six to seven finger holes!",
    },
    {
      name: "Veena",
      image: veenaImage,
      sound: veenaSound,
      description:
        "The veena is one of the oldest Indian instruments. 🎵 Did you know? It's often used in Carnatic music performances.",
    },
    {
      name: "Mridangam",
      image: mridangamImage,
      sound: mridangamSound,
      description:
        "A classical percussion instrument of South India. 🎵 Did you know? It's the primary rhythmic accompaniment in Carnatic music!",
    },
  ];

  const FloatingParticles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      color: [
        'rgba(19, 72, 86, 0.6)',
        'rgba(224, 82, 100, 0.6)',
        'rgba(244, 140, 140, 0.6)',
        'rgba(29, 124, 111, 0.6)',
        'rgba(255, 215, 0, 0.6)'
      ][Math.floor(Math.random() * 5)],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 8 + Math.random() * 6,
      note: ['♪', '♫', '♩', '♬', '♭', '♯'][Math.floor(Math.random() * 6)]
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl opacity-40"
            style={{
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              color: particle.color,
              filter: 'blur(0.5px)'
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 25, -25, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.3, 1],
              rotate: [0, 360]
            }}
            transition={{
              duration: particle.animationDuration,
              repeat: Infinity,
              delay: particle.animationDelay,
              ease: "easeInOut"
            }}
          >
            {particle.note}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8E6DA] pb-8 overflow-hidden">
      <FullBleedDivider />
      <FloatingParticles />
      
      <div className="relative z-10 px-4 py-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <FaMusic className="text-4xl text-[#134856]" />
            <h1 className="text-5xl font-dm-serif text-[#134856] tracking-wide">
              Explore Traditional Music
            </h1>
            <FaMusic className="text-4xl text-[#134856]" />
          </div>
          <p className="text-xl text-[#1d7c6f] font-lora max-w-3xl mx-auto leading-relaxed">
            Discover the enchanting sounds of Indian classical instruments. Click on each instrument to hear its unique melody and learn about its rich heritage.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 max-w-7xl mx-auto mb-12">

          {instruments.map((instrument, index) => (
            <motion.div
              key={instrument.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <InstrumentBubble
                name={instrument.name}
                image={instrument.image}
                sound={instrument.sound}
                description={instrument.description}
                isPlaying={currentlyPlaying === instrument.name}
                onPlay={handlePlayAudio}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            onClick={() => setShowGuessGame(true)}
            className="bg-gradient-to-r from-[#1d7c6f] to-[#E05264] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            🎵 Test Your Knowledge! 🎵
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showGuessGame && (
          <GuessInstrument
            instruments={instruments}
            onClose={() => setShowGuessGame(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
