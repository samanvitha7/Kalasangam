// src/pages/MusicPage.jsx
import InstrumentBubble from "../components/InstrumentBubble";
import sitar from "../assets/instruments/sitar.png";
import tabla from "../assets/instruments/tabla.png";
import flute from "../assets/instruments/flute.png";
import sitarSound from "../assets/sounds/sitar.mp3";
import tablaSound from "../assets/sounds/sitar.mp3";
import fluteSound from "../assets/sounds/sitar.mp3";

const instruments = [
  {
    name: "Sitar",
    image: sitar,
    sound: sitarSound,
    description: "A string instrument with deep roots in Hindustani music."
  },
  {
    name: "Tabla",
    image: tabla,
    sound: tablaSound,
    description: "Percussion at its finest — rhythm for every raga."
  },
  {
    name: "Bansuri (Flute)",
    image: flute,
    sound: fluteSound,
    description: "Breathes melody into the soul of Indian classical music."
  }
];

export default function MusicPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] py-20 px-6 text-center text-[#462F1A]">
      <h1 className="text-5xl font-extrabold mb-12 font-[Yatra One]">Explore by Music</h1>
      <p className="max-w-xl mx-auto mb-10 text-lg">Click to hear the sounds of India’s legendary instruments. Feel the rhythm, the melody, the magic.</p>
      <div className="flex flex-wrap gap-12 justify-center">
        {instruments.map((inst, idx) => (
          <InstrumentBubble key={idx} {...inst} />
        ))}
      </div>
    </main>
  );
}
