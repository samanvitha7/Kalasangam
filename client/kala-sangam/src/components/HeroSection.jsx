import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Floating background particles (optional later) */}

      <div className="absolute top-1/4 z-10 w-full text-center px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-pink-500 drop-shadow-xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Kala Sangam
        </motion.h1>

        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Celebrate Indian art through rhythm, color, and soul.
        </motion.p>


        <motion.button
          className="mt-6 px-6 py-3 rounded-full border border-pink-500 text-pink-500 hover:bg-pink-600 hover:text-white transition"
          whileHover={{ scale: 1.1 }}
        >
          Why Kala Sangam?
        </motion.button>
        <button
        className="mt-6 px-6 py-3 rounded-full border border-pink-500 text-pink-500 hover:bg-pink-600 hover:text-white transition"
        onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
        >
        Scroll to Explore ↓
        </button>

      </div>
    </section>
  );
}

