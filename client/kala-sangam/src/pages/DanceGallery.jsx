import { useEffect, useState } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Enhanced floating visuals with dance-themed elements
const floatingVisualsData = [
  { id: 1, src: "/assets/traditional/1.png", size: "w-48 h-auto" },
  { id: 2, src: "/assets/traditional/2.png", size: "w-40 h-auto" },
  { id: 3, src: "/assets/traditional/3.png", size: "w-40 h-auto" },
  { id: 4, src: "/assets/traditional/4.png", size: "w-40 h-auto"  },
  { id: 5, src: "/assets/traditional/5.png", size: "w-40 h-auto"  },
  { id: 6, src: "/assets/traditional/6.png", size: "w-40 h-auto" },
  { id: 7, src: "/assets/traditional/7.png", size: "w-40 h-auto" },
  { id: 7, src: "/assets/traditional/8.png", size: "w-40 h-auto" },
];

const FloatingVisual = ({ src, size, side }) => {
  const positionStyle =
    side === "left"
      ? { left: "-2rem", top: "10%", translateY: "-40%" }
      : { right: "-2rem", top: "10%", translateY: "-40%" };

  return (
    <motion.img
      src={src}
      alt="floating visual"
      className={`${size} absolute opacity-100 select-none pointer-events-none`}
      style={{
        position: "absolute",
        top: positionStyle.top,
        [side]: positionStyle[side],
        transform: `translateY(${positionStyle.translateY})`,
      }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
      draggable={false}
      loading="lazy"
    />
  );
};

const DanceItem = ({ dance, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });
  const isLeft = index % 2 === 0;
  const visual = floatingVisualsData[index % floatingVisualsData.length];

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      className="relative w-full flex justify-center mb-20"
      style={{ minHeight: "200px" }}
    >
      <motion.img
        src="/assets/traditional/diya.png"
        alt="diya"
        className="w-12 h-auto absolute top-6 left-1/2 -translate-x-1/2 select-none pointer-events-none drop-shadow-md"
        animate={{
          scale: inView ? [1, 1.3, 1] : 1,
          filter: inView ? "drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))" : "none",
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      <FloatingVisual src={visual.src} size={visual.size} side={isLeft ? "right" : "left"} />

      <div
        className={`max-w-4xl bg-[#fff3f1] rounded-lg p-12 shadow-lg font-lora text-[#134856] ${
          isLeft ? "mr-auto text-left" : "ml-auto text-right"
        }`}
        style={{
          flex: "1 1 70%",
          boxShadow: "0 8px 24px rgba(224, 82, 100, 0.3), 0 0 12px rgba(224, 82, 100, 0.4)",
          filter: "drop-shadow(0 0 6px rgba(224, 82, 100, 0.4))",

        }}
      >
        <h2 className="text-[2rem] font-lora font-bold text-deep-teal mb-8">{dance.name}</h2>
        <p className="text-[1.25rem] font-lora font-medium text-coral-pink leading-relaxed">
          {dance.description?.slice(0, 300) ||
            "This classical dance form is celebrated for its rich heritage and traditional significance across Indian culture."}
        </p>
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

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
    animationDuration: 8 + Math.random() * 6,
    symbol: ['●', '◆', '▲', '■', '♦', '★'][Math.floor(Math.random() * 6)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl opacity-40"
          style={{
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
            color: particle.color,
            filter: 'blur(0.5px)'
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 25, -25, 0],
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.3, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: particle.animationDuration,
            repeat: Infinity,
            delay: particle.animationDelay,
            ease: "easeInOut"
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
};

const DanceGallery = () => {
  const [danceForms, setDanceForms] = useState([]);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axios
      .get("/api/danceforms")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setDanceForms(res.data);

        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching dance forms:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8E6DA] overflow-hidden font-body text-[#134856]">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Header Wave Strip */}
      <div
        className="w-full h-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #134856 0%, #E05264 40%, #fbd1c6 70%, #fce3d8 100%)",
        }}
      >
        {/* SVG Waves */}
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L0,120Z"
            fill="#fbd1c6"
            opacity="0.5"
          />
          <path
            d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L0,120Z"
            fill="#fce3d8"
            opacity="0"
          />
        </svg>

        {/* Filler div below wave to smooth transition */}
        <div className="absolute bottom-0 w-full h-4 bg-[#fce3d8] z-[-1]" />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden pb-8 pt-12"
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
            className="inline-block text-6xl font-dm-serif-display mb-4 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore Dance Forms
          </motion.h1>
          <motion.p
            className="text-xl font-lora bg-gradient-to-r from-lotus-green to-soft-coral bg-clip-text text-transparent font-semibold max-w-3xl mx-auto leading-relaxed mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the graceful movements and rich traditions of classical Indian dance forms. Each dance tells a story of devotion, celebration, and cultural heritage that has been passed down through generations.
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-[#F48C8C] h-full rounded-full z-0" />

          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {danceForms.map((dance, index) => (
              <DanceItem dance={dance} index={index} key={dance._id || index} />
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default DanceGallery;
