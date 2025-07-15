import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const artworks = [
  {
    state: "Rajasthan",
    image: "/assets/rajasthan.jpg",
    music: "/music/rajasthan.mp3",
    description: "Bold colors and royal legacy of Rajasthani folk art."
  },
  {
    state: "Kerala",
    image: "/assets/kerala.jpg",
    music: "/music/kerala.mp3",
    description: "Serenity of backwaters and the storytelling in Kathakali."
  },
  {
    state: "Punjab",
    image: "/assets/punjab.jpg",
    music: "/music/punjab.mp3",
    description: "The joyful rhythm of Bhangra and vivid cultural expression."
  }
];

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [audio, setAudio] = useState(null);

  const current = artworks[index];

  useEffect(() => {
    if (audio) audio.pause();
    const newAudio = new Audio(current.music);
    newAudio.play();
    setAudio(newAudio);

    return () => newAudio.pause();
  }, [index]);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gradient-to-b from-pink-100 to-orange-100 text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-pink-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Kala Sangam
        </motion.h1>
        <motion.p
          className="mt-6 text-xl text-gray-600 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A celebration of Indian art and culture in a digital world.
        </motion.p>
        <div className="mt-8 space-x-4">
          <button className="px-6 py-3 rounded-full bg-pink-500 text-white hover:bg-pink-600">Explore</button>
          <button className="px-6 py-3 rounded-full border border-pink-500 text-pink-500 hover:bg-pink-50">Learn More</button>
        </div>
      </section>

      {/* Art Showcase Section */}
      <section className="relative max-w-5xl mx-auto py-16 px-4">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <img
            src={current.image}
            alt={current.state}
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white">
            <h2 className="text-3xl font-bold">{current.state}</h2>
            <p className="mt-2 text-lg">{current.description}</p>
          </div>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2"
          >
            ❯
          </button>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {artworks.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-pink-500" : "bg-gray-300"}`}
            ></span>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <motion.section
        className="py-24 px-6 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-pink-500 mb-4">Why Kala Sangam?</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Kala Sangam was built to preserve and promote the soul of Indian art — from classical dance to ancient painting styles.
          Our platform brings centuries of culture to a digital stage, where anyone can explore and engage.
        </p>
      </motion.section>
    </div>
  );
}