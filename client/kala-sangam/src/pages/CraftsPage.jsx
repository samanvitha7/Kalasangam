import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [selectedCraft, setSelectedCraft] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayVideo = (craft) => {
    setSelectedCraft(craft);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCraft(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative">
      {/* Garland background on top half */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-top bg-no-repeat bg-cover opacity-30" style={{ backgroundImage: "url('/assets/garland.png')" }}></div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-red-400 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              CRAFTS
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Discover the timeless beauty of traditional Indian crafts through immersive video tutorials. 
              Learn from master artisans and create your own masterpieces.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Crafts Grid */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Master Traditional Crafts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each craft tells a story of heritage, skill, and artistic excellence. 
            Click on any craft to start your interactive learning journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crafts.map((craft, index) => (
            <motion.div
              key={craft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CraftCard
                craft={craft}
                onPlay={handlePlayVideo}
                isPlaying={selectedCraft?.id === craft.id}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 py-20">
        <div className="container mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Craft Journey?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have discovered the joy of traditional crafts. 
              Start with any tutorial and let your creativity flow.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Explore All Tutorials
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        craft={selectedCraft}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
