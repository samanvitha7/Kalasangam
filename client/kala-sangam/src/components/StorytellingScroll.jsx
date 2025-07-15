import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const sections = [
  {
    id: 1,
    title: "The Rhythm of India",
    description:
      "Feel the heartbeat of the land through vibrant dance and music.",
    bg: "/images/rhythm.jpg",
  },
  {
    id: 2,
    title: "Colors of Tradition",
    description:
      "Discover the palettes that paint stories on canvas, fabric, and skin.",
    bg: "/images/colors.jpg",
  },
  {
    id: 3,
    title: "Soulful Stories",
    description:
      "Ancient tales woven into the fabric of Indian art and culture.",
    bg: "/images/soul.jpg",
  },
];

function Section({ title, description, bg }) {
  const ref = useRef(null);
  const controls = useAnimation();

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

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [controls]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center snap-start"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
      <motion.div
        className="relative z-20 max-w-3xl px-8 text-center text-white font-yatra"
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
        <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md">
          {description}
        </p>
        <motion.div
          className="mt-8 mx-auto w-16 h-1 bg-pink-600 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </section>
  );
}

export default function StorytellingScroll() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Update progress based on scroll position
  useEffect(() => {
    const container = containerRef.current;

    function onScroll() {
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;
      setProgress(progress);
    }

    container.addEventListener("scroll", onScroll);

    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Vertical Progress Bar */}
      <div className="relative w-4 bg-gray-300">
        <motion.div
          className="absolute left-0 top-0 w-4 bg-pink-600 rounded-full"
          style={{ height: `${progress * 100}%` }}
          layout
        />
      </div>

      {/* Scrollable Sections */}
      <div
        ref={containerRef}
        className="snap-y snap-mandatory h-screen overflow-y-scroll flex-1"
      >
        {sections.map(({ id, title, description, bg }) => (
          <Section
            key={id}
            title={title}
            description={description}
            bg={bg}
          />
        ))}
      </div>
    </div>
  );
}
