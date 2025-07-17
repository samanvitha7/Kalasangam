// src/pages/MusicPage.jsx
import InstrumentBubble from "../components/InstrumentBubble";
import GuessInstrument from "../components/GuessInstruments.jsx";
import sitar from "../assets/instruments/sitar.png";
import tabla from "../assets/instruments/tabla.png";
import flute from "../assets/instruments/flute.png";
import sitarSound from "../assets/sounds/sitar.mp3";
import tablaSound from "../assets/sounds/sitar.mp3";
import fluteSound from "../assets/sounds/sitar.mp3";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';



const instruments = [
  {
    name: "Sitar",
    image: sitar,
    sound: sitarSound,
    description: "A string instrument with deep roots in Hindustani music.",
  },
  {
    name: "Tabla",
    image: tabla,
    sound: tablaSound,
    description: "Percussion at its finest — rhythm for every raga.",
  },
  {
    name: "Bansuri (Flute)",
    image: flute,
    sound: fluteSound,
    description: "Breathes melody into the soul of Indian classical music.",
  },
];

export default function MusicPage() {
  useEffect(() => {
  AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    
    <main className="relative min-h-screen bg-[#fffaf2] py-20 px-6 text-center text-[#462F1A] overflow-hidden">
      {/* Heading */}
      <div data-aos="fade-down">
        <h1 className="text-5xl font-extrabold mb-6 font-[Yatra One]">
          Explore by Music
        </h1>
        <p className="max-w-xl mx-auto mb-16 text-lg">
          Click the bubbles to hear the sounds of India’s legendary instruments.
        </p>
      </div>

      {/* Animated Blurry Background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none flex justify-center items-center"
        style={{ overflow: "hidden" }}
      >
        <div className="relative w-full max-w-7xl h-full">
          <motion.div
            className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-orange-300 opacity-40 blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-yellow-300 opacity-30 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Floating Bubbles */}
      <div className="flex flex-wrap gap-20 justify-center relative z-10">
        {instruments.map((inst, idx) => (
          <div key={idx} data-aos="zoom-in" data-aos-delay={idx * 200}>
            <InstrumentBubble {...inst} />
          </div>
        ))}
      </div>
      {/* Guess the Instrument Section */}
      <section
        className="mt-32 max-w-3xl mx-auto text-center text-[#462F1A] relative"
        data-aos="fade-up"
      >
        <motion.h2
          className="text-4xl font-bold font-[Yatra One] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Now it's your turn!
        </motion.h2>
        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Guess the instrument based on the sound.
        </motion.p>

        <GuessInstrument />
      </section>

    </main>
  );
}