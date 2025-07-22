// src/pages/MusicPage.jsx
import InstrumentBubble from "../components/InstrumentBubble";
import GuessInstrument from "../components/GuessInstruments.jsx";
import sitar from "../assets/instruments/sitar.png";
import tabla from "../assets/instruments/tabla.png";
import flute from "../assets/instruments/flute.png";
import sitarSound from "../assets/sounds/sitar.mp3";
import tablaSound from "../assets/sounds/tabla.mp3";
import fluteSound from "../assets/sounds/flute.mp3";
import veena from "../assets/instruments/veena.png";
import mridangam from "../assets/instruments/mridangam.jpg";
import veenaSound from "../assets/sounds/veena.mp3";
import mridangamSound from "../assets/sounds/mridangam.mp3";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Enhanced visual elements for background
const backgroundElements = [
  { id: 1, className: "absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-gradient-to-br from-orange-300 to-yellow-300 opacity-30 blur-3xl" },
  { id: 2, className: "absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 opacity-25 blur-3xl" },
  { id: 3, className: "absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-gradient-to-br from-blue-300 to-cyan-300 opacity-20 blur-3xl" },
];

// Enhanced instruments with more details
const instruments = [
  {
    name: "Sitar",
    image: sitar,
    sound: sitarSound,
    description: "A string instrument with deep roots in Hindustani music, known for its resonant sound and complex melodies.",
    origin: "North India",
    category: "String Instrument",
    color: "from-amber-400 to-orange-500"
  },
  {
    name: "Tabla",
    image: tabla,
    sound: tablaSound,
    description: "Percussion at its finest — rhythm for every raga, consisting of two drums played with fingers and palms.",
    origin: "North India",
    category: "Percussion",
    color: "from-red-400 to-pink-500"
  },
  {
    name: "Bansuri (Flute)",
    image: flute,
    sound: fluteSound,
    description: "Breathes melody into the soul of Indian classical music, a simple bamboo flute with profound expression.",
    origin: "All India",
    category: "Wind Instrument",
    color: "from-green-400 to-blue-500"
  },
   {
    name: "Veena",
    image: veena,
    sound: veenaSound,
    description: "A plucked string instrument with ancient roots, central to Carnatic music, known for its deep and divine tones.",
    origin: "South India",
    category: "String Instrument",
    color: "from-yellow-400 to-orange-600"
  },
  {
    name: "Mridangam",
    image: mridangam,
    sound: mridangamSound,
    description: "A two-headed drum central to South Indian classical music, delivering rich rhythm with intricate finger techniques.",
    origin: "South India",
    category: "Percussion",
    color: "from-indigo-400 to-purple-500"
  }
];

// Interactive music note animation
const MusicNote = ({ delay = 0, x = 0, y = 0 }) => (
  <motion.div
    className="absolute text-orange-400 opacity-60 pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0], 
      scale: [0, 1, 0],
      y: [0, -50, -100]
    }}
    transition={{ 
      duration: 3, 
      repeat: Infinity, 
      delay: delay,
      repeatDelay: 2 
    }}
  >
    ♪
  </motion.div>
);

export default function MusicPage() {
  const [musicNotes, setMusicNotes] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
    
    // Generate random music notes
    const notes = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 5
    }));
    setMusicNotes(notes);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#fffaf2] via-[#fef7ed] to-[#fff7ed] text-center text-[#462F1A] overflow-hidden">
      {/* Full Bleed Divider */}
      <div className="w-full h-20 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-yellow-600/20 to-red-600/20"></div>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#f59e0b" 
            opacity="0.8"
          />
          <path d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#eab308"
            opacity="0.9"
          />
        </svg>
      </div>
      
      <div className="py-20 px-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {backgroundElements.map((element) => (
          <motion.div
            key={element.id}
            className={element.className}
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      {/* Floating Music Notes */}
      {musicNotes.map((note) => (
        <MusicNote key={note.id} delay={note.delay} x={note.x} y={note.y} />
      ))}

      {/* Enhanced Header */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl font-extrabold mb-6 font-[Yatra One] bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎵 Explore by Music 🎵
        </motion.h1>
        <motion.p 
          className="max-w-2xl mx-auto text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Discover the enchanting world of Indian classical instruments. Click the bubbles to hear their melodious sounds and learn about their rich heritage.
        </motion.p>
      </motion.div>

      {/* Enhanced Instrument Bubbles */}
      <div className="flex flex-wrap gap-24 justify-center relative z-10 mb-20">
        {instruments.map((inst, idx) => (
          <motion.div 
            key={idx} 
            className="relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.3, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <InstrumentBubble {...inst} />
          </motion.div>
        ))}
      </div>

      {/* Enhanced Guess the Instrument Section */}
      <motion.section
        className="mt-32 max-w-4xl mx-auto text-center relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="mb-12"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <h2 className="text-5xl font-bold font-[Yatra One] mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎮 Test Your Knowledge! 🎮
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Listen carefully and guess the instrument. Can you identify the sound of these traditional instruments?
          </p>
        </motion.div>

        <GuessInstrument />
      </motion.section>

      {/* Fun Facts Section */}
      <motion.section
        className="mt-24 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold font-[Yatra One] mb-8 text-orange-800">
          🎼 Did You Know? 🎼
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
           { fact: "The sitar has 18-21 strings and produces its unique sound through sympathetic resonance." },
{ fact: "Tabla drums are tuned to specific pitches and can produce hundreds of different sounds." },
{ fact: "The bansuri flute is traditionally made from a single piece of bamboo with no mechanical parts." },
{ fact: "The veena is a plucked string instrument with ancient origins, known for its deep, divine tones in Carnatic music." },
{ fact: "The mridangam is a two-headed drum played with fingers and palms, producing rich, intricate rhythms." }

          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-orange-100 to-yellow-100 p-6 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-800 text-center leading-relaxed">{item.fact}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      </div>
    </main>
  );
}
