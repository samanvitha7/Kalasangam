import { useEffect, useState } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Enhanced DiyaIcon with better animations
const DiyaIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-8 h-8"
    animate={{ 
      scale: [1, 1.3, 1], 
      filter: [
        "drop-shadow(0 0 8px rgba(255,111,60,0.8))", 
        "drop-shadow(0 0 15px rgba(255,111,60,1))", 
        "drop-shadow(0 0 8px rgba(255,111,60,0.8))"
      ] 
    }}
    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
    fill="none"
  >
    <path
      d="M32 4C18 4 10 18 10 30c0 11 10 20 22 20s22-9 22-20c0-12-8-26-22-26z"
      fill="#FF6F3C"
      stroke="#FF914D"
      strokeWidth="2"
    />
    <path d="M32 14c-3 5-3 10 0 15 3-5 3-10 0-15z" fill="#FFB88C" />
    <motion.circle
      cx="32"
      cy="20"
      r="2"
      fill="#FFDC9E"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    />
  </motion.svg>
);

// Enhanced floating visuals with dance-themed elements
const floatingVisualsData = [
  { id: 1, src: "https://png.pngtree.com/element_pic/00/03/29/76568a5fdd29340.png", size: "w-32 h-auto" },
  { id: 2, src: "https://png.pngtree.com/png-vector/20201115/ourmid/pngtree-diwali-diya-png-png-image_2421492.jpg", size: "w-36 h-auto" },
  { id: 3, src: "https://cpng.pikpng.com/pngl/s/42-421749_tabla-hd-png-music-instrument-tabla-png-clipart.png", size: "w-28 h-auto" },
  { id: 4, src: "https://www.pngall.com/wp-content/uploads/2016/07/Indian-Classical-Dance-PNG-Image.png", size: "w-40 h-auto" },
  { id: 5, src: "https://www.pngall.com/wp-content/uploads/2016/07/Indian-Classical-Dance-Free-PNG-Image.png", size: "w-35 h-auto" },
];

// Dance-specific color themes
const danceThemes = {
  "Bharatanatyam": { primary: "#D97706", secondary: "#FED7AA", accent: "#EA580C" },
  "Kathak": { primary: "#7C3AED", secondary: "#DDD6FE", accent: "#5B21B6" },
  "Kathakali": { primary: "#DC2626", secondary: "#FECACA", accent: "#B91C1C" },
  "Manipuri": { primary: "#059669", secondary: "#D1FAE5", accent: "#047857" },
  "Kuchipudi": { primary: "#DB2777", secondary: "#FCE7F3", accent: "#BE185D" },
  "Odissi": { primary: "#2563EB", secondary: "#DBEAFE", accent: "#1D4ED8" },
  "Mohiniyattam": { primary: "#7C2D12", secondary: "#FED7AA", accent: "#92400E" },
};


// Component for a single floating visual near a dance card
const FloatingVisual = ({ src, size, side }) => {
  // side = 'left' or 'right' (the side visual should appear on)
  const positionStyle =
    side === "left"
      ? { left: "-4rem", top: "50%", translateY: "-50%" }
      : { right: "-4rem", top: "50%", translateY: "-50%" };

  return (
    <motion.img
      src={src}
      alt="floating visual"
      className={`${size} absolute opacity-70 select-none pointer-events-none`}
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

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  // Pick a floating visual for this card cyclically
  const visual = floatingVisualsData[index % floatingVisualsData.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
      }}
      className="relative w-full flex justify-center mb-20"
      style={{ minHeight: "180px" }} // gives space for visual overflow
    >
      {/* Timeline Diya */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2"
        animate={{
          scale: inView ? [1, 1.5, 1] : 1,
          filter: inView
            ? "drop-shadow(0 0 6px rgba(255, 111, 60, 0.7))"
            : "none",
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <DiyaIcon />
      </motion.div>

      {/* Floating visual on opposite side */}
      <FloatingVisual
        src={visual.src}
        size={visual.size}
        side={isLeft ? "right" : "left"}
      />

      {/* Content container */}
      <div
        className={`max-w-4xl bg-[#fff3f1] rounded-lg p-12 text-gray-900
          shadow-lg transition-shadow duration-500
          ${isLeft ? "mr-auto text-left" : "ml-auto text-right"}`}
        style={{
          flex: "1 1 70%",
          boxShadow:
            "0 8px 24px rgba(255, 111, 60, 0.25), 0 0 12px rgba(255, 111, 60, 0.35)",
          filter: "drop-shadow(0 0 6px rgba(255, 111, 60, 0.4))",
        }}
      >
        <h2 className="text-5xl font-bold text-rose-800 mb-8">{dance.name}</h2>
       
        <p className="text-gray-800 leading-relaxed text-lg">
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

const DanceGallery = () => {
  const [danceForms, setDanceForms] = useState([]);

  useEffect(() => {
    axios
      .get("/api/danceforms")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const classicalDances = res.data.filter((art) =>
            [
              "Bharatanatyam",
              "Kathak",
              "Kathakali",
              "Manipuri",
              "Kuchipudi",
              "Odissi",
              "Mohiniyattam",
            ].includes(art.name)
          );
          setDanceForms(classicalDances);
        } else {
          console.error("Unexpected response:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching dance forms:", err);
      });
  }, []);

  return (
    <div
      className="relative w-screen min-h-screen bg-gradient-to-b from-rose-50 via-rose-100 to-rose-50 overflow-visible"
    >
      {/* Full Bleed Divider */}
      <div className="w-full h-20 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-red-600/20 to-orange-600/20"></div>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#ec4899" 
            opacity="0.8"
          />
          <path d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#dc2626"
            opacity="0.9"
          />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-24 min-h-screen relative z-10">
        <h1 className="text-5xl font-bold mb-24 text-center text-rose-800 font-[Yatra One]">
          Classical Indian Dance Forms
        </h1>

        {/* Timeline line */}
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-1 bg-rose-300 h-[calc(100%-9rem)] rounded-full z-0" />

        {/* Dance items */}
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
      </div>
    </div>
  );

};

export default DanceGallery;
