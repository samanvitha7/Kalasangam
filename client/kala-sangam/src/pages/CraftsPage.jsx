import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { FaFilter, FaSearch, FaBookmark, FaHeart, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FullBleedDivider from '../components/FullBleedDivider';

const crafts = [
  {
    id: 1,
    name: "Pottery Making",
    region: "Khurja, Uttar Pradesh",
    description: "Ancient art of clay molding and ceramic creation, passed down through generations of skilled artisans.",
    image: "https://i.pinimg.com/736x/fd/bd/f6/fdbdf6b716370a8df325273c980bfecc.jpg",
    videoUrl: "https://www.youtube.com/embed/FkjNbTCFY1Q?si=gXasaZjmqsj8deFO",
    duration: "19m 15s",
    difficulty: "Beginner",
    materials: ["Clay", "Potter's wheel", "Glazes", "Kiln"]
  },
  {
    id: 2,
    name: "Warli Art",
    region: "Maharashtra",
    description: "Tribal art form featuring geometric patterns and nature-inspired motifs painted on walls and canvas.",
    image: "https://i.pinimg.com/1200x/c6/1d/45/c61d450d68695c630cb4ca9d90094cca.jpg",
    videoUrl: "https://www.youtube.com/embed/cGXvztdfOf4?si=990SLp0jQzVN3LMz",
    duration: "23m 5s",
    difficulty: "Intermediate",
    materials: ["White paint", "Brown paper", "Brushes", "Natural pigments"]
  },
  {
    id: 3,
    name: "Madhubani Painting",
    region: "Bihar",
    description: "Vibrant folk art characterized by intricate patterns, bright colors, and mythological themes.",
    image: "https://i.pinimg.com/736x/0d/35/d2/0d35d2628d979c757066636a5872cd2e.jpg",
    videoUrl: "https://www.youtube.com/embed/F9Rvckkue3A?si=kC_kiQ71oxUFozQt",
    duration: "10m 18s",
    difficulty: "Advanced",
    materials: ["Canvas", "Acrylic paints", "Fine brushes", "Pencil"]
  },
  {
    id: 4,
    name: "Block Printing",
    region: "Rajasthan",
    description: "Traditional textile printing technique using hand-carved wooden blocks and natural dyes.",
    image: "https://i.pinimg.com/736x/17/48/64/17486448bb3c20b02dfd83c0e5ecdfb8.jpg",
    videoUrl: "https://www.youtube.com/embed/moMFuBbeCiU?si=8JPRa_kNMXjPcbLz",
    duration: "15m 22s",
    difficulty: "Beginner",
    materials: ["Wooden blocks", "Fabric", "Natural dyes", "Printing table"]
  },
  {
    id: 5,
    name: "Bamboo Crafts",
    region: "Northeast India",
    description: "Eco-friendly craft using bamboo to create baskets, furniture, and decorative items.",
    image: "https://i.pinimg.com/1200x/ca/62/23/ca6223b5bf8ae30074aeb962c7f9b505.jpg",
    videoUrl: "https://www.youtube.com/embed/AVR45-hdm-g?si=3bBx-pyNzd_1BVSy",
    duration: "13m 30s",
    difficulty: "Advanced",
    materials: ["Bamboo strips", "Cutting tools", "Binding materials", "Varnish"]
  },
  {
    id: 6,
    name: "Meenakari Jewelry",
    region: "Rajasthan",
    description: "Intricate enamel work on metal jewelry, creating colorful and ornate traditional accessories.",
    image: "https://i.pinimg.com/1200x/24/d4/95/24d495102bfd7a0620d69eb4841b5aad.jpg",
    videoUrl: "https://www.youtube.com/embed/GMT077q_pPQ?si=iHcAjcjh4iO9KjhN",
    duration: "9m 19s",
    difficulty: "Expert",
    materials: ["Metal base", "Enamel colors", "Fine brushes", "Kiln"]
  }
];

const CraftCard = ({ craft, onPlay, isPlaying }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 border-2 border-[#e05264]/20 shadow-[0_0_30px_rgba(224,82,100,0.4)] h-[500px] flex flex-col"
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        boxShadow: "0 0 50px rgba(224, 82, 100, 0.8), 0 25px 50px rgba(224, 82, 100, 0.3)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.4 }}
      style={{
        boxShadow: "0 0 30px rgba(224, 82, 100, 0.4), 0 10px 30px rgba(224, 82, 100, 0.2)"
      }}
    >
        {/* Image Container */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
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
            className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] text-white p-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-110"
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
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-[#134856] font-dm-serif group-hover:text-[#e05264] transition-colors">{craft.name}</h3>
          <span className="text-sm text-[#e05264] font-medium">{craft.duration}</span>
        </div>
        
        <p className="text-sm text-[#134856] mb-2 font-medium flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-[#134856] to-[#e05264] rounded-full"></span>
          {craft.region}
        </p>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
          {craft.description}
        </p>

        {/* Materials Preview */}
        <div className="flex flex-wrap gap-2 mb-4">
          {craft.materials.slice(0, 3).map((material, idx) => (
            <span
              key={idx}
              className="text-xs bg-gradient-to-r from-[#134856]/10 to-[#e05264]/10 text-[#134856] px-2 py-1 rounded-full border border-[#134856]/20"
            >
              {material}
            </span>
          ))}
          {craft.materials.length > 3 && (
            <span className="text-xs text-[#e05264] font-medium">
              +{craft.materials.length - 3} more
            </span>
          )}
        </div>

        {/* Watch Tutorial Button */}
        <button 
          onClick={() => onPlay(craft)}
          className="w-full bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-md hover:shadow-lg mt-auto"
        >
          Watch Tutorial
        </button>
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
    <div ref={containerRef} className="min-h-screen bg-[#F8E6DA] overflow-hidden">
      {/* Full Bleed Divider */}
      <FullBleedDivider />
      
      <div className="pt-10 pb-8">
        {/* Floating Particles Background */}
        <FloatingParticles />

      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden pb-8"
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
            className="inline-block text-6xl font-dm-serif mb-4 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Traditional Crafts
          </motion.h1>
          <motion.p
            className="text-xl font-lora text-coral-pink font-semibold max-w-3xl mx-auto leading-relaxed mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Step into the soul of India's heritage, where hands weave history and tradition breathes through craft. Learn timeless arts from the masters who keep them alive.
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        {/* Crafts Grid */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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

        {/* Back to Home Button */}
        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Link to="/">
            <motion.button
              className="bg-gradient-to-r from-[#134856] to-[#e05264] hover:from-[#e05264] hover:to-[#134856] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.section>
      </div>

        {/* Video Modal */}
        <VideoModal
          craft={selectedCraft}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
