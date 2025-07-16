import { useState, useEffect } from "react";

// Props: soundOn → boolean value that tells whether audio is playing
//        setSoundOn → function to toggle the value
export default function SoundToggle({ soundOn, setSoundOn }) {
  
  // Toggle function to switch sound state on button click
  const toggleSound = () => {
    setSoundOn(!soundOn); // Toggle true/false
  };

  return (
    <button
      // Styling to make button fixed on top-right with shadow and rounded look
      className="fixed top-5 right-5 z-50 bg-white text-black px-4 py-2 rounded-full shadow-lg"
      onClick={toggleSound} // Call the toggle function on click
    >
      {soundOn ? "Sound On" : "Sound Off"}
    </button>
  );
}
