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
      ? { left: "-4rem", top: "25%", translateY: "-60%" }
      : { right: "-4rem", top: "25%", translateY: "-60%" };

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
        className={`max-w-4xl bg-[#fff3f1] rounded-lg p-12 shadow-lg font-body text-[#134856] ${
          isLeft ? "mr-auto text-left" : "ml-auto text-right"
        }`}
        style={{
          flex: "1 1 70%",
          boxShadow: "0 8px 24px rgba(19, 72, 86, 0.3), 0 0 12px rgba(19, 72, 86, 0.4)",
          filter: "drop-shadow(0 0 6px rgba(19, 72, 86, 0.4))",

        }}
      >
        <h2 className="text-[3rem] font-dm-serif-display text-[#E05264] mb-8">{dance.name}</h2>
        <p className="text-[1.25rem] font-lora font-medium text-[#134856] leading-relaxed">
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
    <div className="w-screen min-h-screen overflow-visible font-body text-[#134856]"
     style={{
       background: "linear-gradient(90deg, #fbd1c6 0%, #fce3d8 100%)"
     }}>
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




  {/* 💡 Main Content Wrapper with Spacing */}


      <div className="max-w-6xl mx-auto px-6 py-24 min-h-screen relative z-10">
       <h2 className="font-dm-serif-display text-[3.5rem] bg-gradient-to-r from-tealblue to-rosered bg-clip-text text-transparent font-semibold text-center mt-[-2rem] mb-8">
  Explore Dance Forms
</h2>




        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-1 bg-[#F48C8C] h-[calc(100%-9rem)] rounded-full z-0" />

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
