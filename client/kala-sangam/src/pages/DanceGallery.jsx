import React from "react";

const dummyDanceForms = [
  {
    name: "Bharatanatyam",
    origin: "Tamil Nadu",
    description: "One of the oldest classical dance forms of India.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Bharatanatyam_Performance_DS.jpg"
  },
  {
    name: "Kathak",
    origin: "Uttar Pradesh",
    description: "A classical dance with storytelling roots.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Kathak_Dancer_Performance.jpg"
  },
  {
    name: "Odissi",
    origin: "Odisha",
    description: "Fluid temple dance with sculpturesque poses.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Odissi_dancer_1.jpg"
  }
];

export default function DanceGallery() {
  return (
    <div className="min-h-screen bg-[#FAF3E0] p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#9b2226] yatra-font">
        Explore Indian Classical Dance Forms
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {dummyDanceForms.map((dance, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={dance.image}
              alt={dance.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-rose-700">{dance.name}</h2>
            <p className="italic text-sm text-gray-600 mb-1">{dance.origin}</p>
            <p className="text-gray-700">{dance.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
