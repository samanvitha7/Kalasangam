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
    description:
      "Ancient tales woven into the fabric of Indian art and culture.",
    bg: "https://i.pinimg.com/1200x/87/79/51/87795197ea4e7dae982c92e4ac677825.jpg",
    isVideo: false,
    exploreRoute: "/map",
    exploreText: "Explore States"
  },
];

// Single section component
function Section({ title, description, bg, isVideo, exploreRoute, exploreText }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [controls]);

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
        className="relative z-20 max-w-4xl px-8 text-center text-white font-yatra"
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          hidden: { opacity: 0, y: 50 },
        }}
      >
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md mb-6">
          {description}
        </p>


        {/* Pink underline */}
        <motion.div
          className="mt-8 mx-auto w-16 h-1 bg-pink-600 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Explore Button */}
        <motion.button
          onClick={() => navigate(exploreRoute)}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white font-semibold rounded-full shadow-lg hover:from-pink-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
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
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      setProgress(scrollTop / scrollHeight);
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Vertical progress bar */}
      <div className="relative w-4 bg-gray-300">
        <motion.div
          className="absolute left-0 top-0 w-4 bg-pink-600 rounded-full"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Scrollable storytelling content */}
      <div
        ref={containerRef}
        className="snap-y snap-mandatory h-screen overflow-y-scroll flex-1"
      >
        {sections.map((section) => (
          <Section key={section.id} {...section} />
        ))}
      </div>
    </div>
  );
}
