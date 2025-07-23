import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

const crafts = [
  {
    id: 1,
    name: "Pottery Making",
    region: "Khurja, Uttar Pradesh",
    description: "Ancient art of clay molding and ceramic creation, passed down through generations of skilled artisans.",
    image: "https://i.pinimg.com/1200x/d4/dc/ee/d4dcee77886a35fc2333c100ee26c667.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "45 mins",
    difficulty: "Intermediate",
    materials: ["Clay", "Potter's wheel", "Glazes", "Kiln"]
  },
  {
    id: 2,
    name: "Warli Art",
    region: "Maharashtra",
    description: "Tribal art form featuring geometric patterns and nature-inspired motifs painted on walls and canvas.",
    image: "https://i.pinimg.com/1200x/88/41/5c/88415c91056485ac21cf9cc57d77c9fc.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "30 mins",
    difficulty: "Beginner",
    materials: ["White paint", "Brown paper", "Brushes", "Natural pigments"]
  },
  {
    id: 3,
    name: "Madhubani Painting",
    region: "Bihar",
    description: "Vibrant folk art characterized by intricate patterns, bright colors, and mythological themes.",
    image: "https://i.pinimg.com/1200x/f5/8e/76/f58e769d404b7a9ff15b04b3b42a42cb.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "60 mins",
    difficulty: "Advanced",
    materials: ["Canvas", "Acrylic paints", "Fine brushes", "Pencil"]
  },
  {
    id: 4,
    name: "Block Printing",
    region: "Rajasthan",
    description: "Traditional textile printing technique using hand-carved wooden blocks and natural dyes.",
    image: "https://i.pinimg.com/736x/f0/7a/28/f07a28ec5b5d3082c88fdaa80bf4caed.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "50 mins",
    difficulty: "Intermediate",
    materials: ["Wooden blocks", "Fabric", "Natural dyes", "Printing table"]
  },
  {
    id: 5,
    name: "Bamboo Crafts",
    region: "Northeast India",
    description: "Eco-friendly craft using bamboo to create baskets, furniture, and decorative items.",
    image: "https://i.pinimg.com/736x/09/1e/05/091e051ebfa23b9379cfe0746965d0d2.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "90 mins",
    difficulty: "Advanced",
    materials: ["Bamboo strips", "Cutting tools", "Binding materials", "Varnish"]
  },
  {
    id: 6,
    name: "Meenakari Jewelry",
    region: "Rajasthan",
    description: "Intricate enamel work on metal jewelry, creating colorful and ornate traditional accessories.",
    image: "https://i.pinimg.com/736x/2e/cb/2b/2ecb2bb96ddc93835f955677d58917ef.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "120 mins",
    difficulty: "Expert",
    materials: ["Metal base", "Enamel colors", "Fine brushes", "Kiln"]
  }
];

const CraftCard = ({ craft, onPlay, isPlaying }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl overflow-hidden shadow-xl"
      whileHover={{ scale: 1.02, y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={craft.image} 
          alt={craft.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Play Button Overlay */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.button
            onClick={() => onPlay(craft)}
            className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={32} />
          </motion.button>
        </motion.div>

        {/* Difficulty Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
          craft.difficulty === 'Beginner' ? 'bg-green-500 text-white' :
          craft.difficulty === 'Intermediate' ? 'bg-yellow-500 text-white' :
          craft.difficulty === 'Advanced' ? 'bg-orange-500 text-white' :
          'bg-red-500 text-white'
        }`}>
          {craft.difficulty}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{craft.name}</h3>
          <span className="text-sm text-amber-600 font-medium">{craft.duration}</span>
        </div>
        
        <p className="text-sm text-amber-700 mb-2 font-medium">{craft.region}</p>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {craft.description}
        </p>

        {/* Materials Preview */}
        <div className="flex flex-wrap gap-2">
          {craft.materials.slice(0, 3).map((material, idx) => (
            <span
              key={idx}
              className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
            >
              {material}
            </span>
          ))}
          {craft.materials.length > 3 && (
            <span className="text-xs text-amber-600">
              +{craft.materials.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const VideoModal = ({ craft, isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  
  if (!isOpen || !craft) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {craft.name} Tutorial
                </h2>
                <p className="text-amber-600">{craft.region}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative aspect-video">
            <iframe
              src={craft.videoUrl}
              title={craft.name}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">About this Craft</h3>
                <p className="text-gray-600 text-sm">
                  {craft.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Materials Needed</h3>
                <div className="flex flex-wrap gap-2">
                  {craft.materials.map((material, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function CraftsPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [pageReady, setPageReady] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize page animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayVideo = (craft) => {
    setSelectedCraft(craft);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCraft(null);
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
      animationDuration: 8 + Math.random() * 6
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-40"
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
              y: [0, -80, 0],
              x: [0, 25, -25, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.3, 1]
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

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8E6DA] pt-24 pb-8 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden pb-16"
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
            className="text-5xl font-winky text-[#134856] mb-8 drop-shadow-lg leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            CRAFTS
          </motion.h1>
          <motion.p
            className="max-w-4xl mx-auto text-lg font-lora leading-relaxed text-gray-700 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the timeless beauty of traditional Indian crafts through immersive video tutorials.
            Learn from master artisans and create your own masterpieces.
          </motion.p>
        </div>
      </motion.section>

      {/* Crafts Grid */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-5xl font-winky text-[#134856] text-center mb-8">
            Master Traditional Crafts
          </h2>
          <p className="text-lg font-lora text-gray-700 max-w-2xl mx-auto text-center mb-12">
            Each craft tells a story of heritage, skill, and artistic excellence.
            Click on any craft to start your interactive learning journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {crafts.map((craft, index) => (
              <motion.div
                key={craft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <CraftCard
                  craft={craft}
                  onPlay={handlePlayVideo}
                  isPlaying={selectedCraft?.id === craft.id}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="bg-gradient-to-r from-[#E05264] to-[#F48C8C] rounded-2xl p-8 md:p-12 text-white shadow-2xl text-center">
            <h2 className="text-5xl font-winky mb-8">
              Ready to Start Your Craft Journey?
            </h2>
            <p className="text-lg font-lora text-[#FFD700] mb-12 max-w-2xl mx-auto">
              Join thousands of learners who have discovered the joy of traditional crafts.
              Start with any tutorial and let your creativity flow.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#E05264] px-8 py-4 rounded-full font-[Noto_Sans] font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Explore All Tutorials
            </motion.button>
          </div>
        </motion.section>
      </div>

      {/* Video Modal */}
      <VideoModal
        craft={selectedCraft}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
