import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import axios from "axios";
import ArtFormCard from "../components/ArtFormCard";
import LazyImage from "../components/LazyImage";
import FullBleedDivider from "../components/FullBleedDivider";
import { FaSearch, FaFilter, FaTimes, FaMapMarkerAlt, FaPalette, FaGlobe, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useHardReload from "../hooks/useHardReload";

export default function ArtGallery() {
  // Add hard reload functionality
  useHardReload();
  
  const navigate = useNavigate();
  const containerRef = useRef(null); // for scroll animations
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [artforms, setArtforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const stateFromQuery = searchParams.get("state");
  const categoryFromQuery = searchParams.get("category");
  
  // For explore/art route, always start with no filters
  const isExploreRoute = window.location.pathname === '/explore/art';
  const [selectedState, setSelectedState] = useState(isExploreRoute ? "" : (stateFromQuery || ""));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState(isExploreRoute ? 'all' : (categoryFromQuery || 'all'));
  const [sortBy, setSortBy] = useState('name');
  const [zoomImg, setZoomImg] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
    // Don't apply URL parameters on explore/art route - keep it clean
    if (!isExploreRoute) {
      const stateFromURL = searchParams.get("state");
      if (stateFromURL) {
        setSelectedState(stateFromURL);
      }
      
      const categoryFromURL = searchParams.get("category");
      if (categoryFromURL) {
        setFilterCategory(categoryFromURL);
      }
    }
  }, [searchParams, isExploreRoute]);

  // Fetch artforms data
  useEffect(() => {
    const fetchArtforms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:5050/api/artforms?limit=200");
        
        // Handle the API response structure
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setArtforms(response.data.data);
          console.log('Artforms loaded successfully:', response.data.data.length);
        } else if (Array.isArray(response.data)) {
          // Fallback for direct array response
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

  // Enhanced filtering logic with search, category, and state filters
  const filteredArtforms = artforms
    .filter(art => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        art.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.origin?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // State filter
      const matchesState = selectedState === '' || art.origin === selectedState;
      
      // Art form category filter (you can expand this based on your categories)
      const matchesCategory = filterCategory === 'all' || 
        art.category?.toLowerCase() === filterCategory.toLowerCase() ||
        (filterCategory === 'painting' && (art.name?.toLowerCase().includes('painting') || art.title?.toLowerCase().includes('painting'))) ||
        (filterCategory === 'craft' && (art.name?.toLowerCase().includes('craft') || art.name?.toLowerCase().includes('work'))) ||
        (filterCategory === 'sculpture' && art.name?.toLowerCase().includes('carving')) ||
        (filterCategory === 'textile' && (art.name?.toLowerCase().includes('embroidery') || art.name?.toLowerCase().includes('shawl') || art.name?.toLowerCase().includes('phulkari')));
      
      return matchesSearch && matchesState && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || a.title || '').localeCompare(b.name || b.title || '');
        case 'state':
          return (a.origin || '').localeCompare(b.origin || '');
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'oldest':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        default:
          return 0;
      }
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredArtforms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArtforms = filteredArtforms.slice(startIndex, endIndex);
  
  // Keep the original filtered variable for backward compatibility
  const filtered = paginatedArtforms;
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedState, filterCategory, sortBy]);

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
    <div ref={containerRef} className="min-h-screen bg-[#F8E6DA] pb-8 overflow-hidden">
      <FullBleedDivider />
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Full Bleed Divider */}
        
        
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          
          <h1 className="inline-block text-6xl pt-10 font-dm-serif font-bold mb-6 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Art Gallery
          </h1>
          <p className="text-lg font-lora font-semibold text-xl text-[#E05264] max-w-3xl mx-auto leading-relaxed mb-10">
            Discover the magnificent tapestry of Indian traditional arts. From ancient crafts to timeless performances, explore the diverse cultural heritage of our nation.
          </p>
        </motion.section>





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

          {/* Search and Filter Controls */}
          <motion.div 
            className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[#F8E6DA] rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for art forms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Filter and Sort */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <FaFilter className="text-gray-600" />
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="painting">Painting</option>
                      <option value="sculpture">Sculpture</option>
                      <option value="craft">Craft</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-600" />
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">All States</option>
                      {[...new Set(artforms.map((art) => art.origin))]
                        .filter(state => state) // Remove any null/undefined values
                        .sort() // Sort alphabetically
                        .map((state) =>
                        <option key={state} value={state}>
                          {state}
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaPalette className="text-gray-600" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="name">By Name</option>
                      <option value="state">By State</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content - Only show when not loading and no error */}
          {!loading && !error && (
            <>
              {/* Art Cards */}
          {filtered.length > 0 ? (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600 font-lora">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredArtforms.length)} of {filteredArtforms.length} art form{filteredArtforms.length !== 1 ? 's' : ''}
                  {selectedState && ` from ${selectedState}`}
                </p>
                {totalPages > 1 && (
                  <p className="text-sm text-gray-500 mt-1 font-lora">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
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
              
              {/* Pagination Navigation */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12 mb-8">
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      currentPage === 1 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-[#134856] to-[#e05264] hover:from-[#e05264] hover:to-[#134856] text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                    whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                    whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  >
                    <FaChevronLeft size={14} />
                    Previous
                  </motion.button>
                  
                  <div className="flex items-center gap-2">
                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const startPage = Math.max(1, currentPage - 2);
                      const pageNum = startPage + i;
                      if (pageNum <= totalPages) {
                        return (
                          <motion.button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-[#134856] to-[#e05264] text-white shadow-lg'
                                : 'bg-white text-[#134856] border-2 border-[#134856] hover:bg-gradient-to-r hover:from-[#134856] hover:to-[#e05264] hover:text-white'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {pageNum}
                          </motion.button>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      currentPage === totalPages 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-[#134856] to-[#e05264] hover:from-[#e05264] hover:to-[#134856] text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    }`}
                    whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                    whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                  >
                    Next
                    <FaChevronRight size={14} />
                  </motion.button>
                </div>
              )}
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
          
          }}
          className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-md flex flex-col items-center justify-center z-50 cursor-zoom-out p-4"
        >
          {/*Wrapper to give all images uniform bounding box*/}
          <div className="w-[600px] h-[400px] flex items-center justify-center bg-white rounded-lg shadow-2xl">

          <img
            src={zoomImg}
            alt="Zoomed art"
            //using object-contain to maintain aspect ratio
            className="w-screen h-screen object-cover cursor-zoom-in select-none"
            onClick={(e) => e.stopPropagation()}
            style={{ userSelect: "auto" }}
          />

          </div>
        </div>
      )}

      

      <div className="flex justify-center mt-12">
        <motion.button
          onClick={() => navigate("/map")}
          className="bg-gradient-to-r from-[#134856] to-[#e05264] hover:from-[#e05264] hover:to-[#134856] text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to India Map
        </motion.button>
      </div>
      </div>
    </div>
  );
}

