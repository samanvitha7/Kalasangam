import { useEffect, useState } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    return () => clearTimeout(timer);
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

  // Floating particles for background
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
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <div className="container mx-auto px-4 pt-20 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          
          <h1 className="inline-block text-6xl pt-10 font-dm-serif mb-8 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Explore Music
          </h1>
          <p className="text-xl font-lora font-semibold text-[#E05264] max-w-4xl mx-auto leading-relaxed mb-12">
            Immerse yourself in the rich tapestry of Indian classical music. From the melodious strings of the sitar to the rhythmic beats of the tabla, discover the instruments that have shaped centuries of musical tradition and continue to enchant audiences worldwide.
          </p>
          
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={() => setShowGuessGame(!showGuessGame)}
              className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-dm-serif"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMusic className="text-white" />
              {showGuessGame ? 'Hide Game' : 'Test Your Knowledge'}
            </motion.button>
          </div>
        </motion.section>

        {/* Interactive Game Section - Show/Hide */}
        <AnimatePresence>
          {showGuessGame && (
            <motion.section 
              className="relative py-12 px-6 mb-8 overflow-hidden bg-[#F8E6DA]"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Floating 3D Elements */}
              <motion.div 
                className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a24] rounded-full opacity-20 blur-sm"
                animate={{ 
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-[#4834d4] to-[#686de0] rounded-full opacity-25 blur-sm"
                animate={{ 
                  y: [0, 40, 0],
                  x: [0, -25, 0],
                  scale: [1, 0.8, 1],
                  rotate: [0, -180, -360]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              
              {/* Particle System */}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              <div className="container mx-auto px-4 relative z-10">
                {/* Main container with gradient background - matching About page structure */}
                <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-10 md:p-16 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-lora font-bold mb-6 text-white drop-shadow">
                      Test Your Musical Knowledge
                    </h2>
                    <p className="text-xl leading-relaxed font-lora mb-8 text-white/90">
                      Challenge yourself with our interactive instrument guessing game
                    </p>
                    <GuessInstrument />
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Instruments Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-4xl font-dm-serif text-[#134856] text-center mb-12 font-normal">
            Discover Traditional Instruments
          </h2>
          
          {/* Instruments bubbles layout */}
          <AnimatePresence>
            <motion.div 
              className="flex flex-wrap justify-center gap-16 lg:gap-20 mb-20 z-10 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {instruments.map((instrument, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <InstrumentBubble {...instrument} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* No Results equivalent - Musical Categories */}
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
        </motion.div>
      </div>
    </div>
  );
}
