import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Define each section
const sections = [
  {
    id: 1,
    title: "The Rhythm of India",
    description:
      "Feel the heartbeat of the land through vibrant dance.",
    bg: "https://www.youtube.com/embed/ErtbifqxJwA?autoplay=1&mute=1&controls=0&loop=1&playlist=ErtbifqxJwA&showinfo=0&rel=0",
    isVideo: true,
    exploreRoute: "/explore/dance",
    exploreText: "Explore Dance"
  },
  {
    id: 2,
    title: "Melodies of Tradition",
    description:
      "Immerse yourself in the rhythms and harmonies that echo through time.",
    bg: "https://www.youtube.com/embed/EyeJOyKf48I?autoplay=1&mute=1&controls=0&loop=1&playlist=EyeJOyKf48I&showinfo=0&rel=0",
    isVideo: true,
    exploreRoute: "/explore/music",
    exploreText: "Explore Music"
  },
  {
    id: 3,
    title: "Soulful Stories",
    description: "Ancient tales woven into the fabric of Indian art and culture.",
    bg: "https://www.youtube.com/embed/89LdsMWY3Ic?autoplay=1&mute=1&controls=0&loop=1&playlist=89LdsMWY3Ic&showinfo=0&rel=0"
,
    isVideo: true,
    exploreRoute: "/map",
    exploreText: "Explore States"
  },
  {
    id: 4,
    title: "Crafted with Love",
    description: "Master the ancient art of traditional Indian crafts through immersive video tutorials. From pottery to weaving, discover the secrets passed down through generations of skilled artisans.",
    bg: "https://www.youtube.com/embed/oWubGUwxudc?autoplay=1&mute=1&controls=0&loop=1&playlist=oWubGUwxudc&showinfo=0&rel=0",
    isVideo: true,
    exploreRoute: "/explore/crafts",
    exploreText: "Learn Crafts"
  }


];

// Single section component
function Section({ title, description, bg, isVideo, exploreRoute, exploreText }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [controls, isMounted]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center snap-start overflow-hidden"
    >
      {/* Background - either video or image */}
      {isVideo ? (
        <iframe
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={bg}
          title={title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{
            width: "100vw",
            height: "100vh",
            transform: "scale(1.2)", // Scale to hide borders
          }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />

      {/* Animated content */}
      <motion.div
        className="relative z-20 max-w-4xl px-8 text-center text-white font-dm-serif"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          hidden: { opacity: 0, y: 50 },
        }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-6 drop-shadow-lg">
          {title}
        </h2>

        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed drop-shadow-md mb-6">
          {description}
        </p>


        {/* Pink underline */}
        <motion.div
          className="mt-8 mx-auto w-16 h-1 bg-coral-pink rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Explore Button */}
        <motion.button
          onClick={() => navigate(exploreRoute)}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-[#134856] to-[#e05264] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-lora"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {exploreText}
        </motion.button>
      </motion.div>
    </section>
  );
}

// Main storytelling scroll component
export default function StorytellingScroll() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Auto-rotate through sections every 8 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sections.length);
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + sections.length) % sections.length);
    // Reset the interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sections.length);
      }, 8000);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sections.length);
    // Reset the interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sections.length);
      }, 8000);
    }
  };

  const currentSection = sections[currentIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background - either video or image */}
      {currentSection.isVideo ? (
        <iframe
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={currentSection.bg}
          title={currentSection.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{
            width: "100vw",
            height: "100vh",
            transform: "scale(1.2)", // Scale to hide borders and ensure full coverage
            objectFit: "cover"
          }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${currentSection.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />

      {/* Content */}
      <motion.div
        key={currentIndex}
        className="relative z-20 h-full flex items-center justify-center max-w-4xl mx-auto px-8 text-center text-white font-dm-serif"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-6 drop-shadow-lg">
            {currentSection.title}
          </h2>

          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed drop-shadow-md mb-6">
            {currentSection.description}
          </p>

          {/* Pink underline */}
          <motion.div
            className="mt-8 mx-auto w-16 h-1 bg-coral-pink rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          {/* Explore Button */}
          <motion.button
            onClick={() => window.open(currentSection.exploreRoute, '_self')}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-[#134856] to-[#e05264] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-lora"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentSection.exploreText}
          </motion.button>
        </div>
      </motion.div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Previous section"
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Next section"
      >
        →
      </button>

      {/* Section indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              // Reset the interval
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = setInterval(() => {
                  setCurrentIndex((prev) => (prev + 1) % sections.length);
                }, 8000);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
