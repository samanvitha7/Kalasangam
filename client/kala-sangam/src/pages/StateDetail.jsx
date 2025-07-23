import { useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import stateArtData from "../data/stateArtData.json"; // auto-parsed as JS object

const StateDetail = () => {
  const { stateName } = useParams();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [pageReady, setPageReady] = useState(false);
  const stateData = stateArtData[stateName];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // Floating particles for background
  const FloatingParticles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
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

  if (!stateData) {
    return (
      <div className="min-h-screen bg-[#F8E6DA] pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-[Winky_Rough] text-[#134856] mb-4">State Not Found</h1>
            <p className="text-lg font-[Noto_Sans] text-[#134856]">No data found for {stateName}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8E6DA] pt-24 pb-8 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden pb-16"
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
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.h1 
            className="text-5xl font-[Winky_Rough] text-[#134856] mb-8 drop-shadow-lg leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stateName}
          </motion.h1>
          
          {/* State Image */}
          <motion.div
            className="mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img 
              src={stateData.collage} 
              alt={`${stateName} collage`} 
              className="w-full max-w-4xl mx-auto h-64 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/50" 
            />
          </motion.div>
          
          <motion.p 
            className="max-w-4xl mx-auto text-lg font-[Noto_Sans] leading-relaxed text-[#134856] mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stateData.intro}
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 relative z-10">
        {/* Art Forms Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-5xl font-[Winky_Rough] text-[#134856] text-center mb-12">
            Traditional Art Forms
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stateData.artForms.map((art, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 1.2 + idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={art.image} 
                    alt={art.name} 
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-[Winky_Rough] text-[#134856] mb-3">
                    {art.name}
                  </h3>
                  <p className="text-base font-[Noto_Sans] text-[#134856] leading-relaxed mb-4">
                    {art.description}
                  </p>
                  
                  {art.artists && (
                    <div className="border-t border-[#E05264]/20 pt-4">
                      <p className="text-sm font-[Noto_Sans] text-[#1D7C6F]">
                        <span className="font-bold text-[#E05264]">Notable Artists:</span>
                        <br />
                        {art.artists.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Fun Facts Section */}
        {stateData.facts?.length > 0 && (
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="bg-gradient-to-r from-[#E05264] to-[#F48C8C] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
              <h2 className="text-5xl font-[Winky_Rough] text-center mb-8">
                Fascinating Facts
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                {stateData.facts.map((fact, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: pageReady ? 1 : 0, x: pageReady ? 0 : -20 }}
                    transition={{ duration: 0.6, delay: 1.7 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#134856] font-bold text-sm">{idx + 1}</span>
                      </div>
                      <p className="text-base font-[Noto_Sans] leading-relaxed">
                        {fact}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default StateDetail;

