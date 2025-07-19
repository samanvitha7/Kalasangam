// src/components/SunAnimation.jsx
import { motion } from "framer-motion";

export default function SunAnimation() {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0">
      <motion.div
        className="w-64 h-64 rounded-full bg-golden-saffron/60 shadow-2xl blur-xl opacity-70"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-golden-saffron rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
