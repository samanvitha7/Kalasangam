import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [pageReady, setPageReady] = useState(false);
  const [showGuessGame, setShowGuessGame] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRef = useRef(null);

  // Initialize page animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

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
    <div ref={containerRef} className="min-h-screen bg-[#F8E6DA] overflow-hidden">
      {/* Full Bleed Divider */}
      <FullBleedDivider />
      
      <div className="pt-10 pb-8">
        {/* Floating Particles Background */}
        <FloatingParticles />

        {/* Hero Section */}
        <motion.section
          className="relative overflow-hidden pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: pageReady ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Animated Background Elements */}
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-[#E05264]/20 to-[#F48C8C]/20 rounded-full blur-3xl opacity-30 top-0 left-0"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-80 h-80 bg-gradient-to-r from-[#1D7C6F]/20 to-[#FFD700]/20 rounded-full blur-3xl opacity-25 bottom-0 right-0"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
              opacity: [0.25, 0.4, 0.25]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative container mx-auto px-4 text-center z-10">
            <motion.h1
              className="inline-block text-6xl font-dm-serif mb-8 pb-2 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent"
              style={{ lineHeight: '1.2' }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Traditional Music
            </motion.h1>
            <motion.p
              className="text-xl font-lora text-coral-pink font-semibold max-w-3xl mx-auto leading-relaxed mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Immerse yourself in the soul-stirring melodies of India's classical traditions. Discover the ancient instruments that have echoed through generations, each carrying stories of devotion, celebration, and cultural heritage.
            </motion.p>
          </div>
        </motion.section>

        <div className="container mx-auto px-2 sm:px-4 relative z-10">
          {/* Instruments Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
              {instruments.map((instrument, index) => (
                <motion.div
                  key={instrument.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
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
          </motion.section>

          {/* Test Knowledge Button */}
          <motion.section
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.button
              onClick={() => setShowGuessGame(true)}
              className="bg-gradient-to-r from-[#134856] to-[#e05264] hover:from-[#e05264] hover:to-[#134856] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎵 Test Your Knowledge! 🎵
            </motion.button>
          </motion.section>
        </div>

        {/* Guess Game Modal */}
        <AnimatePresence>
          {showGuessGame && (
            <GuessInstrument
              instruments={instruments}
              onClose={() => setShowGuessGame(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
