import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WhyWeBuiltThis from "../components/WhyBuilt.jsx";
import MeetTheTeam from "../components/MeetTheTeam.jsx";
import ContactUsSection from "../components/ContactUs.jsx";
import FullBleedDivider from "../components/FullBleedDivider.jsx";
import useHardReload from "../hooks/useHardReload";

// Enhanced floating particles system
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 6+2,
    color: [
      'rgba(255, 107, 107, 0.6)',
      'rgba(0, 210, 211, 0.6)',
      'rgba(244, 140, 140, 0.6)',
      'rgba(255, 159, 243, 0.6)',
      'rgba(255, 193, 7, 0.6)',
      'rgba(19, 72, 86, 0.6)',
    ][Math.floor(Math.random() * 6)],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    animationDelay: Math.random() * 5,
    animationDuration: 8 + Math.random() * 10,
    shape: Math.random() > 0.5 ? 'circle' : 'square'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${
            particle.shape === 'circle' ? 'rounded-full' : 'rounded-sm'
          } opacity-40 backdrop-blur-sm`}
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
            y: [0, -100, 0],
            x: [0, 30, -30, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1],
            rotate: [0, 360]
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

export default function About() {
  // Add hard reload functionality - DISABLED temporarily
  // useHardReload();
  
  const containerRef = useRef(null);
  const location = useLocation();
  const [pageReady, setPageReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Ensure animations restart when navigating to About page
  useEffect(() => {
    // Scroll to top when About page is loaded
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Set page ready with a small delay to ensure proper rendering
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="min-h-screen bg-blush-peach text-coral-pink font-lora pb-20 overflow-hidden">
      {/* Full Bleed Divider */}
      <FullBleedDivider />
      
      {/* Global Floating Particles */}
      <FloatingParticles />
      
      {/* Hero Section */}
     <motion.section 
        className="relative overflow-hidden pt-12 pb-10 bg-[#F8E6DA]"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Content */}
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1 
            className="inline-block text-6xl mt-10 font-dm-serif font-bold mb-8 pb-2 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ lineHeight: '1.2' }}
          >
            About KalaSangam
          </motion.h1>

          <motion.p 
            className="text-xl max-w-3xl mx-auto leading-relaxed text-coral-pink font-semibold font-lora mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Where ancient artistry meets modern innovation. A digital sanctuary preserving India's rich cultural heritage through technology.
          </motion.p>
        </div>

      </motion.section>

      {/* Why We Built This - Enhanced */}
      <section className="relative py-12 px-6 bg-[#F8E6DA]">
        <div className="container mx-auto px-4">
          <WhyWeBuiltThis />
        </div>
      </section>

      {/* Our Vision Section */}
<motion.section className="relative py-20 px-6 overflow-hidden bg-[#F8E6DA]">
  <div className="container mx-auto px-4">
    <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-8 md:p-12">
      <div className="bg-[#F8E6DA] rounded-2xl p-8 md:p-10">
        
        {/* Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-dm-serif mb-2 text-lotus-green relative -top-3">
            Our Vision
          </h2>
          <p className="text-xl text-[#E05264] max-w-3xl mx-auto leading-relaxed font-lora">
            Building a future where traditional arts thrive in the digital age
          </p>
        </motion.div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🌍",
              title: "Global Reach",
              description:
                "Making Indian traditional arts accessible to audiences worldwide through innovative digital experiences.",
              gradient: "from-[#5E97A7] to-[#134856]",
              delay: 0
            },
            {
              icon: "🎓",
              title: "Education First",
              description:
                "Creating immersive learning experiences that inspire the next generation of artists and art lovers.",
              gradient: "from-[#6FC4B7] to-[#1D7C6F]",
              delay: 0.2
            },
            {
              icon: "🤝",
              title: "Community Building",
              description:
                "Fostering connections between artists, scholars, and enthusiasts across the globe.",
              gradient: "from-[#F5959F] to-[#E05264]",
              delay: 0.4
            }
          ].map((vision, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${vision.gradient} rounded-3xl p-8 text-white shadow-xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: vision.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{vision.icon}</div>
              <h3 className="text-xl font-bold mb-3 font-dm-serif">
                {vision.title}
              </h3>
              <p className="leading-relaxed opacity-90 font-lora">
                {vision.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  </div>
</motion.section>


      {/* Meet The Team */}
      <section className="relative py-12 px-6 bg-[#F8E6DA]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="bg-[#F8E6DA] rounded-2xl p-8 md:p-10">
              <MeetTheTeam />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <motion.section className="relative py-20 px-6 overflow-hidden bg-[#F8E6DA]">
        {/* Floating 3D Elements */}
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a24] rounded-full opacity-20 blur-sm"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-[#4834d4] to-[#686de0] rounded-full opacity-25 blur-sm"
          animate={{ 
            y: [0, 40, 0],
            x: [0, -25, 0],
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-[#00d2d3] to-[#01a3a4] rounded-full opacity-30 blur-sm"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Particle System */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Immediate container with gradient background and white text */}
          <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-[#1d7c6f] to-[#f48c8c]">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-dm-serif mb-6 text-white">
                Impact Stories
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed font-lora">
                Real stories of how KalaSangam is making a difference
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Cards with blush peach background and gradient text */}
              <motion.div 
                className="bg-[#F8E6DA] backdrop-blur-sm rounded-3xl p-8 shadow-xl"
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-[#5a8fa0] to-[#134856] rounded-full flex items-center justify-center text-white font-bold mr-4"
                    animate={{ 
                      rotateZ: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🎨
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold font-dm-serif bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">Artists Empowered</h3>
                    <p className="bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent text-sm font-lora">Connecting traditional artists with global audiences</p>
                  </div>
                </div>
                <p className="bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent leading-relaxed font-lora">
                  "KalaSangam has given me a platform to share my Madhubani art with people who truly appreciate it. The response has been overwhelming!"
                </p>
                <p className="bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent font-semibold mt-4 font-dm-serif">- Priya Sharma, Madhubani Artist</p>
              </motion.div>

              <motion.div 
                className="bg-[#F8E6DA] backdrop-blur-sm rounded-3xl p-8 shadow-xl"
                initial={{ opacity: 0, x: 50, rotateY: 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: -5,
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-[#f7b7bb] to-[#F48C8C] rounded-full flex items-center justify-center text-white font-bold mr-4"
                    animate={{ 
                      rotateZ: [0, -360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    📚
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold font-dm-serif bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">Students Inspired</h3>
                    <p className="bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent text-sm font-lora">Bridging the gap between tradition and modern learning</p>
                  </div>
                </div>
                <p className="bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent leading-relaxed font-lora">
                  "I never knew Indian art could be so diverse and beautiful. KalaSangam has opened my eyes to our incredible cultural heritage."
                </p>
                <p className="bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent font-semibold mt-4 font-dm-serif">- Arjun Patel, College Student</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>


     {/* Contact Us - Call to Action */}
      <section className="relative py-20 px-6 bg-[#F8E6DA] text-[#FF6F61]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-10 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-dm-serif font-bold mb-6 text-white drop-shadow">
                Join Our Cultural Revolution
              </h2>
              <p className="text-xl leading-relaxed font-lora mb-8 text-white/90">
                Be part of the movement to preserve and celebrate India's artistic heritage
              </p>
              <ContactUsSection />
          </div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-20"></div>
    </div>
  );
}
