import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import WhyWeBuiltThis from "../components/WhyBuilt.jsx";
import MeetTheTeam from "../components/MeetTheTeam.jsx";
import ContactUsSection from "../components/ContactUs.jsx";

// Enhanced floating particles system
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    color: [
      'rgba(255, 107, 107, 0.6)',
      'rgba(72, 52, 212, 0.6)',
      'rgba(0, 210, 211, 0.6)',
      'rgba(255, 159, 243, 0.6)',
      'rgba(255, 193, 7, 0.6)',
      'rgba(139, 69, 19, 0.6)'
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


// Simple Lottie animation data for demonstration
const culturalLottieData = {
  "v": "5.5.9",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 100,
  "h": 100,
  "nm": "animated cultural element",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Animated Shape",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": { "a": 0, "k": 0 },
        "p": { "a": 0, "k": [50, 50, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": { "a": 0, "k": [40, 40] },
              "p": { "a": 0, "k": [0, 0] },
              "nm": "Ellipse Path 1"
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [0.9, 0.1, 0.1] },
              "o": { "a": 0, "k": 100 },
              "w": { "a": 0, "k": 3 },
              "lc": 1,
              "lj": 1,
              "nm": "Stroke 1"
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 },
              "nm": "Transform"
            }
          ],
          "nm": "Ellipse 1"
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0,
      "bm": 0
    }
  ],
  "markers": []
};

export default function About() {
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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#FFF4E0] via-[#FFE0B5] to-[#FFD6A5] text-[#462F1A] overflow-hidden">
      {/* Global Floating Particles */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden pt-20 pb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-amber-200/20 via-orange-200/20 to-yellow-200/20"
          style={{ opacity: heroOpacity }}
        />
        <motion.div 
          className="absolute w-96 h-96 bg-[#f5c796] rounded-full blur-3xl opacity-30 top-0 left-0"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-[#e6a97b] rounded-full blur-3xl opacity-25 bottom-0 right-0"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            opacity: [0.25, 0.4, 0.25]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Floating Lottie Animation */}
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 opacity-30"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Lottie 
            animationData={culturalLottieData} 
            loop={true} 
            className="w-full h-full"
          />
        </motion.div>
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.h1 
            className="text-6xl md:text-7xl font-extrabold font-[Yatra One] mb-8 drop-shadow-lg leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            About KalaSangam
          </motion.h1>
          <motion.p 
            className="max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed text-[#5c3d24] font-medium mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Where ancient artistry meets modern innovation. A digital sanctuary preserving India's rich cultural heritage through technology.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-sm md:text-base"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: "🎨", text: "Traditional Arts" },
              { icon: "💻", text: "Modern Technology" },
              { icon: "🌟", text: "Cultural Preservation" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-semibold text-[#8b4513]">{item.icon} {item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Journey Section */}
      <motion.section className="relative py-20 px-6">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-[Yatra One] mb-6 text-[#8b4513]">
              Our Journey
            </h2>
            <p className="text-xl text-[#5c3d24] max-w-3xl mx-auto leading-relaxed">
              From a simple idea to a digital revolution in cultural preservation
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              {[
                {
                  number: 1,
                  title: "The Spark",
                  description: "Four students realized how disconnected our generation had become from India's incredible artistic heritage.",
                  gradient: "from-[#ff6b6b] to-[#ee5a24]"
                },
                {
                  number: 2,
                  title: "The Vision",
                  description: "We envisioned a platform that wouldn't just showcase art, but would make it accessible, engaging, and alive for everyone.",
                  gradient: "from-[#4834d4] to-[#686de0]"
                },
                {
                  number: 3,
                  title: "The Creation",
                  description: "Months of research, design, and development led to KalaSangam - a digital bridge between past and future.",
                  gradient: "from-[#00d2d3] to-[#01a3a4]"
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.number}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-[#8b4513] mb-2">{step.title}</h3>
                    <p className="text-[#5c3d24] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-gradient-to-br from-white to-[#fff4e8] rounded-3xl p-8 shadow-xl"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center space-y-4">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-[#ff9ff3] to-[#f368e0] rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    ✨
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#8b4513]">Today</h3>
                  <p className="text-[#5c3d24] leading-relaxed">
                    KalaSangam stands as a testament to what's possible when technology serves culture, creating meaningful connections between artists, art forms, and audiences.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why We Built This - Enhanced */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <WhyWeBuiltThis />
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <motion.section className="relative py-20 px-6 overflow-hidden">
        {/* Floating Team Images */}
        <motion.div 
          className="absolute -left-32 top-20 w-24 h-24 rounded-full overflow-hidden shadow-2xl border-4 border-white z-10"
          initial={{ x: -200, y: 100, rotate: -45, scale: 0.5, opacity: 0 }}
          whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOutBack" }}
          viewport={{ once: true }}
        >
          <img src="/images/naina.jpg" alt="Naina" className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.div 
          className="absolute -right-32 top-32 w-24 h-24 rounded-full overflow-hidden shadow-2xl border-4 border-white z-10"
          initial={{ x: 200, y: -50, rotate: 45, scale: 0.5, opacity: 0 }}
          whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.7, ease: "easeOutBack" }}
          viewport={{ once: true }}
        >
          <img src="/images/sam.jpg" alt="Samanvitha" className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.div 
          className="absolute -left-24 bottom-32 w-24 h-24 rounded-full overflow-hidden shadow-2xl border-4 border-white z-10"
          initial={{ x: -250, y: 50, rotate: -30, scale: 0.5, opacity: 0 }}
          whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 0.9, ease: "easeOutBack" }}
          viewport={{ once: true }}
        >
          <img src="/images/shreya.jpg" alt="Shreya" className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.div 
          className="absolute -right-24 bottom-20 w-24 h-24 rounded-full overflow-hidden shadow-2xl border-4 border-white z-10"
          initial={{ x: 250, y: -80, rotate: 30, scale: 0.5, opacity: 0 }}
          whileInView={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 1.1, ease: "easeOutBack" }}
          viewport={{ once: true }}
        >
          <img src="/images/Vaishalii.jpg" alt="Vaishali" className="w-full h-full object-cover" />
        </motion.div>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-[Yatra One] mb-6 text-[#8b4513]">
              Our Vision
            </h2>
            <p className="text-xl text-[#5c3d24] max-w-3xl mx-auto leading-relaxed">
              Building a future where traditional arts thrive in the digital age
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌍",
                title: "Global Reach",
                description: "Making Indian traditional arts accessible to audiences worldwide through innovative digital experiences.",
                gradient: "from-[#ff6b6b] to-[#ee5a24]",
                delay: 0
              },
              {
                icon: "🎓",
                title: "Education First",
                description: "Creating immersive learning experiences that inspire the next generation of artists and art lovers.",
                gradient: "from-[#4834d4] to-[#686de0]",
                delay: 0.2
              },
              {
                icon: "🤝",
                title: "Community Building",
                description: "Fostering connections between artists, scholars, and enthusiasts across the globe.",
                gradient: "from-[#00d2d3] to-[#01a3a4]",
                delay: 0.4
              }
            ].map((vision, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br ${vision.gradient} rounded-3xl p-8 text-white shadow-xl`}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: vision.delay }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  {vision.icon}
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: vision.delay + 0.3 }}
                >
                  {vision.title}
                </motion.h3>
                <motion.p 
                  className="leading-relaxed opacity-90"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: vision.delay + 0.5 }}
                >
                  {vision.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet The Team */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#fff4e8] to-white rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <MeetTheTeam />
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <motion.section className="relative py-20 px-6 overflow-hidden">
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
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-[Yatra One] mb-6 text-[#8b4513]">
              Impact Stories
            </h2>
            <p className="text-xl text-[#5c3d24] max-w-3xl mx-auto leading-relaxed">
              Real stories of how KalaSangam is making a difference
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
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
                  className="w-12 h-12 bg-gradient-to-br from-[#ff9ff3] to-[#f368e0] rounded-full flex items-center justify-center text-white font-bold mr-4"
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
                  <h3 className="text-xl font-bold text-[#8b4513]">Artists Empowered</h3>
                  <p className="text-[#5c3d24] text-sm">Connecting traditional artists with global audiences</p>
                </div>
              </div>
              <p className="text-[#5c3d24] leading-relaxed">
                "KalaSangam has given me a platform to share my Madhubani art with people who truly appreciate it. The response has been overwhelming!"
              </p>
              <p className="text-[#8b4513] font-semibold mt-4">- Priya Sharma, Madhubani Artist</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
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
                  className="w-12 h-12 bg-gradient-to-br from-[#4834d4] to-[#686de0] rounded-full flex items-center justify-center text-white font-bold mr-4"
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
                  <h3 className="text-xl font-bold text-[#8b4513]">Students Inspired</h3>
                  <p className="text-[#5c3d24] text-sm">Bridging the gap between tradition and modern learning</p>
                </div>
              </div>
              <p className="text-[#5c3d24] leading-relaxed">
                "I never knew Indian art could be so diverse and beautiful. KalaSangam has opened my eyes to our incredible cultural heritage."
              </p>
              <p className="text-[#8b4513] font-semibold mt-4">- Arjun Patel, College Student</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Us - Call to Action */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-[#8b4513] to-[#5c3d24] rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-[Yatra One] mb-6">
              Join Our Cultural Revolution
            </h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
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
