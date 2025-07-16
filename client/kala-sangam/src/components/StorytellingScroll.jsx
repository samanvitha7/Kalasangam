import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Define each section
const sections = [
  {
    id: 1,
    title: "The Rhythm of India",
    description:
      "Feel the heartbeat of the land through vibrant dance and music.",
    bg: "/images/rhythm.jpg",
    videoEmbed: "https://www.youtube.com/embed/rsOTjPYOAak",
  },
  {
    id: 2,
    title: "Colors of Tradition",
    description:
      "Discover the palettes that paint stories on canvas, fabric, and skin.",
    bg: "https://i.pinimg.com/736x/79/0a/c9/790ac9eb3b1362f14cafb3c3669aba31.jpg",
  },
  {
    id: 3,
    title: "Soulful Stories",
    description:
      "Ancient tales woven into the fabric of Indian art and culture.",
    bg: "https://i.pinimg.com/1200x/87/79/51/87795197ea4e7dae982c92e4ac677825.jpg",
  },
];

// Single section component
function Section({ title, description, bg, videoEmbed }) {
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
    return () => ref.current && observer.unobserve(ref.current);
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

        {/* Embedded video if available */}
        {videoEmbed && (
          <div className="w-full max-w-4xl mx-auto h-[500px] mb-6">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={`${videoEmbed}?autoplay=1&mute=1&controls=0&loop=1&playlist=rsOTjPYOAak`}
              title={title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}

        {/* Pink underline */}
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
