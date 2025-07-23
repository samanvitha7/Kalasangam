import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import axios from "axios";
import ArtFormCard from "../components/ArtFormCard";

export default function ArtGallery() {
const navigate = useNavigate();
  const containerRef = useRef(null); // for scroll animations
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [artforms, setArtforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const stateFromQuery = searchParams.get("state");
  const [selectedState, setSelectedState] = useState(stateFromQuery || "");
  const [zoomImg, setZoomImg] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize page with proper animations
  const [pageReady, setPageReady] = useState(false);
  
  useEffect(() => {
    // Ensure page is ready before showing animations
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stateFromURL = searchParams.get("state");
    if (stateFromURL) {
      setSelectedState(stateFromURL);
    }
  }, [searchParams]);

  // Fetch artforms data
  useEffect(() => {
    const fetchArtforms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/artforms");
        
        if (Array.isArray(response.data)) {
          setArtforms(response.data);
          console.log('Artforms loaded successfully:', response.data.length);
        } else {
          console.error("Expected array but got:", response.data);
          setError("Invalid data format received");
          setArtforms([]);
        }
      } catch (err) {
        console.error("Error fetching artforms:", err);
        setError("Failed to load art forms. Please try refreshing the page.");
        setArtforms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtforms();
  }, []);

  const filtered = selectedState
    ? artforms.filter((art) => art.origin === selectedState)
    : artforms;

  // Debug logging (only log important information)
  useEffect(() => {
    if (artforms.length > 0) {
      console.log(`Art Gallery: Loaded ${artforms.length} artforms, showing ${filtered.length} filtered results`);
    }
  }, [artforms, filtered]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setZoomImg(null);
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleImageClick = (imgSrc) => {
    setZoomImg(imgSrc);
    setIsFullscreen(false);
  };

  // Floating particles for background
  const FloatingParticles = () => {
    const particles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      color: [
        'rgba(19, 72, 86, 0.6)',
        'rgba(224, 82, 100, 0.6)',
        'rgba(248, 230, 218, 0.8)',
        'rgba(255, 193, 7, 0.6)',
        'rgba(139, 69, 19, 0.5)'
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
    <div ref={containerRef} className="min-h-screen bg-blush-peach text-coral-pink font-noto page-layout overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Hero Section with Enhanced Design */}
      <motion.section 
        className="relative overflow-hidden pt-20 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-[#134856]/20 to-[#E05264]/20 rounded-full blur-3xl opacity-30 top-0 left-0"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-gradient-to-r from-[#ff6b6b]/20 to-[#ffa726]/20 rounded-full blur-3xl opacity-25 bottom-0 right-0"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
            opacity: [0.25, 0.4, 0.25]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.h1 
            className="text-6xl md:text-7xl font-extrabold font-dm-serif text-deep-teal mb-8 drop-shadow-lg leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Art Gallery
          </motion.h1>
          <motion.p 
            className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed text-[#5c3d24] font-medium mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the magnificent tapestry of Indian traditional arts. From ancient crafts to timeless performances, explore the diverse cultural heritage of our nation.
          </motion.p>
          
          {/* Floating Art Icons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-sm md:text-base"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: "🎨", text: "Traditional Paintings" },
              { icon: "🏺", text: "Ancient Crafts" },
              { icon: "🎭", text: "Cultural Heritage" },
              { icon: "✨", text: "Artistic Legacy" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-semibold text-[#8b4513]">{item.icon} {item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-6 relative z-10">





      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tealblue mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 font-lora">Loading art forms...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center py-16">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <p className="text-red-600 font-lora text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition font-lora"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Only show when not loading and no error */}
      {!loading && !error && (
        <>
          <div className={`mb-8 flex justify-center transition-all duration-1000 delay-300 ${pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <select
              className="border border-coral-red/50 rounded px-5 py-3 text-lg shadow-sm bg-mist-blush text-deep-charcoal font-lora"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={artforms.length === 0}
            >
              <option value="">All States</option>
              {[...new Set(artforms.map((art) => art.origin))].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Art Cards */}
          {filtered.length > 0 ? (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600 font-lora">
                  Showing {filtered.length} art form{filtered.length !== 1 ? 's' : ''}
                  {selectedState && ` from ${selectedState}`}
                </p>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 auto-rows-auto transition-all duration-1000 delay-500 ${pageReady ? 'opacity-100' : 'opacity-0'}`}>
                {filtered.map((art, index) => (
                  <div 
                    key={art._id} 
                    className={`w-full transition-all duration-700 ${pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${Math.min(index * 100, 1000)}ms` }}
                  >
                    <ArtFormCard
                      {...art}
                      onImageClick={handleImageClick}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 font-lora text-lg">
                {selectedState ? `No art forms found for ${selectedState}` : 'No art forms available'}
              </p>
            </div>
          )}
        </>
      )}

      {/* Zoom Modal */}
      {zoomImg && (
        <div
          onClick={() => {
            setZoomImg(null);
            setIsFullscreen(false);
          }}
          className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-md flex flex-col items-center justify-center z-50 cursor-zoom-out p-4"
        >
          <img
            src={zoomImg}
            alt="Zoomed art"
            className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-zoom-in select-none ${
              isFullscreen ? "w-full h-full" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ userSelect: "auto" }}
          />

          <button
            onClick={e => {
              e.stopPropagation();
              setIsFullscreen(f => !f);
            }}
            className="mt-6 px-6 py-2 bg-tealblue text-white rounded-full shadow-lg hover:bg-coral-red focus:outline-none focus:ring-4 focus:ring-golden-saffron transition font-lora font-bold"
          >
            {isFullscreen ? "Fit to Screen" : "Full Screen"}
          </button>
        </div>
      )}

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/map")}
          className="px-8 py-3 bg-tealblue text-white font-bold rounded-full shadow-md hover:bg-coral-red transition font-lora"
        >
          ← Back to India Map
        </button>
      </div>
      </div>
    </div>
  );
}

