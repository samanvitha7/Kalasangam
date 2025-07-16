import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DanceGallery = () => {
  const [danceForms, setDanceForms] = useState([]);

  useEffect(() => {
    axios.get("/api/danceforms")
      .then((res) => {
        if (Array.isArray(res.data)) {
          // Filter for only dance forms (you can adjust this logic if needed)
          const classicalDances = res.data.filter((art) =>
            ["Bharatanatyam", "Kathak", "Kathakali", "Manipuri", "Kuchipudi", "Odissi", "Mohiniyattam"].includes(art.name)
          );
          setDanceForms(classicalDances);
        } else {
          console.error("Unexpected response:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching dance forms:", err);
      });
  }, []);

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-rose-800">
        Classical Indian Dance Forms
      </h1>

      {danceForms.map((dance, index) => (
        <motion.div
          key={dance._id}
          className="mb-16 border-b pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-[#9b2226] mb-4">{dance.name}</h2>

          <img
            src={dance.photos?.[0]}
            alt={dance.name}
            className="w-full h-auto rounded shadow-md mb-4"
          />

          <p className="text-gray-800 text-lg leading-relaxed">
            {dance.description?.slice(0, 300) || "This classical dance form is celebrated for its rich heritage and traditional significance across Indian culture, particularly in the region of its origin. Known for expressive gestures, symbolic costumes, and storytelling through rhythm, it is a cherished cultural gem practiced and performed widely today."}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default DanceGallery;
