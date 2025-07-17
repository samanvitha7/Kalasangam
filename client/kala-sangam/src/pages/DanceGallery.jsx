import { useEffect, useState } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// DiyaIcon (same as before)
const DiyaIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-6 h-6"
    animate={{ scale: [1, 1.5, 1], filter: ["drop-shadow(0 0 6px rgba(255,111,60,0.7))", "none", "drop-shadow(0 0 6px rgba(255,111,60,0.7))"] }}
    transition={{ repeat: Infinity, duration: 2 }}
    fill="none"
  >
    <path
      d="M32 4C18 4 10 18 10 30c0 11 10 20 22 20s22-9 22-20c0-12-8-26-22-26z"
      fill="#FF6F3C"
      stroke="#FF914D"
      strokeWidth="2"
    />
    <path d="M32 14c-3 5-3 10 0 15 3-5 3-10 0-15z" fill="#FFB88C" />
  </motion.svg>
);

// Your floating visuals, positioned dynamically per item:
const floatingVisualsData = [
  { id: 1, src: "https://png.pngtree.com/element_pic/00/03/29/76568a5fdd29340.png", size: "w-28 h-auto" },
  { id: 2, src: "https://png.pngtree.com/png-vector/20201115/ourmid/pngtree-diwali-diya-png-png-image_2421492.jpg", size: "w-36 h-auto" },
  { id: 3, src: "https://cpng.pikpng.com/pngl/s/42-421749_tabla-hd-png-music-instrument-tabla-png-clipart.png", size: "w-24 h-auto" },
];


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
        <img
          src={dance.photos?.[0]}
          alt={dance.name}
          className="rounded-md mb-8 object-cover max-h-[28rem] w-full"
        />
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
