import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import IndiaMap from "../components/IndiaMap";
import Lottie from "lottie-react";
import oceanAnim from "../assets/ocean.json";
import sunAnim from "../assets/sun.json";
import FullBleedDivider from "../components/FullBleedDivider";

export default function IndiaMapPage({ onStateClick }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [pageReady, setPageReady] = useState(false);

  // Initialize page animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Floating particles for background
  const FloatingParticles = () => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      color: [
        'rgba(19, 72, 86, 0.6)',
        'rgba(224, 82, 100, 0.6)',
        'rgba(244, 140, 140, 0.6)',
        'rgba(29, 124, 111, 0.6)',
        'rgba(255, 215, 0, 0.6)'
      ][Math.floor(Math.random() * 5)],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 8 + Math.random() * 6
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-40"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 25, -25, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: particle.animationDuration,
              repeat: Infinity,
              delay: particle.animationDelay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <main ref={containerRef} className="relative min-h-[150vh] overflow-hidden bg-gradient-to-b from-[#F8E6DA] via-[#FCD5B5] to-[#FFF7C2] text-center">
      <FullBleedDivider />
      
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Animated Ocean Background - Behind lower half of map and extending down */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          className="absolute w-full bottom-0 left-0"
          style={{ 
            top: "30vh", 
            height: "100vh",
            transform: "translateY(0px)"
          }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Lottie animationData={oceanAnim} loop autoplay className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>

      {/* Animated Overlay */}
      <motion.div 
        className="absolute inset-0 z-5 bg-black/5 pointer-events-none" 
        initial={{ opacity: 0 }}
        animate={{ opacity: pageReady ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Hero Section with Animations */}
      <motion.section
        className="relative overflow-hidden pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-[#E05264]/20 to-[#F48C8C]/20 rounded-full blur-3xl opacity-30 top-0 left-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-[#1D7C6F]/20 to-[#FFD700]/20 rounded-full blur-3xl opacity-25 bottom-0 right-0"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
            opacity: [0.25, 0.4, 0.25]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative z-10 container mx-auto px-4 pt-5 pb-5">
          <motion.h2 
            className="inline-block text-6xl font-dm-serif drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore States
          </motion.h2>

          <motion.p
            className="mt-2 text-lg italic font-semibold text-xl text-[#E05264] max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Oh, clicking this will lead you to a new world of art!
          </motion.p>
        </div>
      </motion.section>


      {/* Interactive Map Section with Animations */}
      <motion.section
        className="relative z-10 flex items-start justify-between container mx-auto px-4 pt-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 50 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {/* 🗺️ India Map with Animation - Much Bigger */}
        <motion.div 
          className="flex-1 flex justify-start"
          initial={{ opacity: 0, x: -100, rotate: -5, scale: 0.8 }}
          animate={{ 
            opacity: pageReady ? 1 : 0, 
            x: pageReady ? 0 : -100, 
            rotate: pageReady ? 0 : -5,
            scale: pageReady ? 1.3 : 0.8
          }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          style={{ transformOrigin: "left center" }}
        >
          <IndiaMap onStateClick={onStateClick} />
        </motion.div>

        {/* ☀️ Sun Animation with Enhanced Effects */}
        <motion.div
          className="w-[180px] h-[180px] relative pl-6"
          style={{ transform: "translate(20px, 100px)" }}
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ 
            opacity: pageReady ? 1 : 0, 
            scale: pageReady ? 1 : 0.5, 
            rotate: pageReady ? 0 : -180 
          }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        >
          {/* Enhanced Glowing background behind sun */}
          <motion.div
            className="absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            w-[300px] h-[300px] 
            rounded-full 
            bg-yellow-400 
            opacity-50 
            filter 
            blur-[100px] 
            -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Sun Lottie with floating animation */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Lottie animationData={sunAnim} loop autoplay />
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Bottom padding with fade-in animation */}
      <motion.div 
        className="relative z-10 h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageReady ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      ></motion.div>
    </main>
  );
}
