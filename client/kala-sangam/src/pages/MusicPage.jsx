import { useState, useEffect } from "react";
import InstrumentBubble from "../components/InstrumentBubble";
import GuessInstrument from "../components/GuessInstruments";
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

const instruments = [
  {
    name: "Sitar",
    image: sitarImage,
    sound: sitarSound,
    description:
      "A string instrument with deep roots in Hindustani music, known for its resonant sound and complex melodies.",
    fact:
      "The sitar has 18–21 strings and produces its unique sound through sympathetic resonance.",
  },
  {
    name: "Tabla",
    image: tablaImage,
    sound: tablaSound,
    description:
      "Percussion at its finest—rhythm for every raga, consisting of two drums played with fingers and palms.",
    fact:
      "Tabla drums are tuned to specific pitches and can produce hundreds of different sounds.",
  },
  {
    name: "Bansuri",
    image: fluteImage,
    sound: fluteSound,
    description:
      "Breathes melody into the soul of Indian classical music—a simple bamboo flute with profound expression.",
    fact:
      "The bansuri is traditionally made from a single piece of bamboo with no mechanical parts.",
  },
  {
    name: "Veena",
    image: veenaImage,
    sound: veenaSound,
    description:
      "A plucked string instrument with ancient roots, central to Carnatic music, known for its deep and divine tones.",
    fact:
      "The veena is a plucked string instrument with ancient origins, known for its deep, divine tones.",
  },
  {
    name: "Mridangam",
    image: mridangamImage,
    sound: mridangamSound,
    description:
      "A two-headed drum central to South Indian classical music, delivering rich rhythm with intricate finger techniques.",
    fact:
      "The mridangam is a two‑headed drum played with fingers and palms, producing rich, intricate rhythms.",
  },
];

export default function MusicPage() {
  const [musicNotes, setMusicNotes] = useState([]);

  useEffect(() => {
    // Initialize page with animation readiness
    const timer = setTimeout(() => {
      setMusicNotes(Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 5
      })));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="pt-24 pb-8 px-4 bg-[#F8E6DA] text-[#E05264] font-dm-serif-display">
      <section className="text-center mb-16">
        <h1 className="font-winky font-semibold text-[4rem] text-[#134856] mb-4">
          🎵 Explore by Music 🎵
        </h1>
        <p className="text-lg max-w-2xl mx-auto font-normal text-[#E05264]">
          Discover the enchanting world of Indian classical instruments. Click the bubbles to
          hear their melodious sounds and learn about their rich heritage.
        </p>
      </section>

      <section className="container mx-auto mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {instruments.map((inst) => (
          <InstrumentBubble
            key={inst.name}
            name={inst.name}
            image={inst.image}
            sound={inst.sound}
            description={inst.description}
            fact={inst.fact}
          />
        ))}
      </section>

      <section className="container mx-auto text-center max-w-3xl">
        <h2 className="font-winky font-semibold text-[3rem] text-[#134856] mb-6">
          🎧 Test Your Knowledge! 🎧
        </h2>
        <GuessInstrument />
      </section>
    </main>
  );
}
