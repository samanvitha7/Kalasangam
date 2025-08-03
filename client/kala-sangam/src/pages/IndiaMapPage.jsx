import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import IndiaMap from "../components/IndiaMap";
import FullBleedDivider from "../components/FullBleedDivider";

// Enhanced floating particles - optimized count
const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 6, // Bigger particles 6-14px
    color: [
      'rgba(19, 72, 86, 0.6)',
      'rgba(224, 82, 100, 0.6)',
      'rgba(29, 124, 111, 0.6)',
    ][Math.floor(Math.random() * 3)],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    animationDelay: Math.random() * 5,
    animationDuration: 8 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, -20, 0],
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.1, 1],
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

export default function IndiaMapPage({ onStateClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8E6DA] text-center">
      <FullBleedDivider />
      
      {/* Floating Particles */}
      <FloatingParticles />

      {/* ────── Top Heading ────── */}
     <div className="relative z-10 container mx-auto px-4 pt-8 pb-4">
      <div className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <h2 className="inline-block text-6xl font-dm-serif mb-2 pb-1 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent"
            style={{ lineHeight: '1.2' }}>
          Explore States
        </h2>
      </div>

      <div className={`transform transition-all duration-1000 ease-out delay-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <p className="mt-1 italic font-semibold text-xl text-[#E05264] max-w-3xl mx-auto leading-relaxed">
          Oh, clicking this will lead you to a new world of art!
        </p>
      </div>

    </div>


      {/* ────── Map Section ────── */}
      <div className="relative z-10 container mx-auto px-2 pt-2 pb-4">
        {/* 🗺️ India Map */}
        <div className={`flex justify-center items-center transform transition-all duration-1200 ease-out delay-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}>
          <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-8xl">
            <IndiaMap onStateClick={onStateClick} />
          </div>
        </div>
      </div>
      
      {/* Bottom padding to continue with ocean animation */}
      <div className="relative z-10 h-16"></div>
    </main>
  );
}
