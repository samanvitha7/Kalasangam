import { useState } from "react";
import StorytellingScroll from "../components/StorytellingScroll.jsx";
import CinematicCarousel from "../components/CinematicCarousel.jsx";
import IndiaMap from "../components/IndiaMap.jsx";
import ParallaxSection from "../components/ParallaxSection.jsx";
import PulsingEventsCalendar from "../components/PulsingEventsCalendar.jsx";
import LivingArtistMosaic from "../components/LivingArtistMosaic.jsx";
import { motion } from "framer-motion";

export default function Home({ showMap, mapRef, onStateClick }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email before submitting!");
      return;
    }

    window.location.href = `/about?email=${encodeURIComponent(email)}#contact`;
  };

  return (
    <main className="relative w-full overflow-x-hidden text-center font-lora bg-[#F8E6DA] pb-20">

      {/* Fullscreen Parallax Section */}
      <div className="w-full overflow-hidden">
        <ParallaxSection />
      </div>

      <CinematicCarousel />
      <StorytellingScroll />
      <PulsingEventsCalendar />
      <LivingArtistMosaic />

      {showMap && (
        <div
          id="india-map"
          ref={mapRef}
          className="mt-16 flex items-center justify-center p-6"
        >
          <IndiaMap onStateClick={onStateClick} />
        </div>
      )}

      {/* Contact Form */}
      <div className="mt-4">

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xs mx-auto">
  <input
    type="email"
    placeholder="Your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-4 py-3 font-lora rounded-full text-base 
               bg-white/90  text-[#134856] 
               placeholder-[#134856]/50 focus:outline-none 
               focus:border-[#e05264] focus:ring-2 focus:ring-[#e05264]/40 
               transition-all duration-300 shadow-md"
  />

  <motion.button
    type="submit"
    className="w-full bg-gradient-to-r from-[#134856] to-[#e05264] text-white py-4 rounded-full text-lg font-lora font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    Send Feedback ✨
  </motion.button>
</form>

      </div>
    </main>
  );
}
