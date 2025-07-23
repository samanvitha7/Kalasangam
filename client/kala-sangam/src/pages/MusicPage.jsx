import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InstrumentBubble from "../components/InstrumentBubble";
import GuessInstrument from "../components/GuessInstruments";
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

export default function MusicPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [pageReady, setPageReady] = useState(false);

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
    <div ref={containerRef} className="min-h-screen bg-[#F8E6DA] pt-24 pb-8 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden pb-16"
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
            className="text-5xl font-dm-serif text-[#134856] mb-8 drop-shadow-lg leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            🎵 Musical Heritage 🎵
          </motion.h1>
          <motion.p 
            className="max-w-4xl mx-auto text-lg font-lora leading-relaxed text-gray-700 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Journey through India's rich musical traditions. Discover ancient instruments, learn their melodies, and immerse yourself in the sounds that have echoed through centuries.
          </motion.p>
          
          {/* Floating Music Icons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-sm"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: "🎸", text: "String Instruments" },
              { icon: "🥁", text: "Percussion" },
              { icon: "🎺", text: "Wind Instruments" },
              { icon: "🎼", text: "Classical Ragas" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-lora text-gray-700 font-semibold">{item.icon} {item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 relative z-10">
        {/* Instruments Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-5xl font-dm-serif text-[#134856] text-center mb-12">
            Discover Traditional Instruments
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-20 z-10 relative">
            {instruments.map((inst, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.2 + idx * 0.1 }}
              >
                <InstrumentBubble {...inst} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Game Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="bg-gradient-to-r from-[#E05264] to-[#F48C8C] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <h2 className="text-5xl font-dm-serif text-center mb-8">
              Test Your Musical Knowledge
            </h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <GuessInstrument />
            </div>
          </div>
        </motion.section>
      </div>

      <div className="musical-notes-background"></div>
    </div>
  );
}
