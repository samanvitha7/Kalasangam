import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import ArtCard from '../components/ArtCard';
import ContributeModal from '../components/ContributeModal';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';

const ArtWall = () => {
  const { user, isAuthenticated } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sample data - replace with actual API calls
  const sampleArtworks = [
    {
      id: 1,
      title: "Sunset Over Mountains",
      description: "A beautiful landscape painting capturing the golden hour over the Himalayas.",
      artist: "Priya Sharma",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "Landscape",
      likes: 24,
      createdAt: "2024-01-15T10:30:00Z",
      userId: "user123"
    },
    {
      id: 2,
      title: "Abstract Emotions",
      description: "An abstract piece exploring human emotions through vibrant colors and dynamic forms.",
      artist: "Raj Kumar",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      category: "Abstract",
      likes: 31,
      createdAt: "2024-01-14T14:20:00Z",
      userId: "user456"
    },
    {
      id: 3,
      title: "Traditional Madhubani",
      description: "A traditional Madhubani painting depicting nature and mythology in classic style.",
      artist: "Anjali Devi",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "Traditional",
      likes: 67,
      createdAt: "2024-01-13T09:15:00Z",
      userId: "user789"
    },
    {
      id: 4,
      title: "Urban Life",
      description: "A contemporary take on city life, showing the hustle and bustle of modern India.",
      artist: "Neha Gupta",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      category: "Contemporary",
      likes: 18,
      createdAt: "2024-01-12T16:45:00Z",
      userId: "user321"
    },
    {
      id: 5,
      title: "Floral Mandala",
      description: "Intricate floral patterns arranged in a mandala design, symbolizing unity and peace.",
      artist: "Vikram Singh",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "Traditional",
      likes: 45,
      createdAt: "2024-01-11T11:30:00Z",
      userId: "user654"
    },
    {
      id: 6,
      title: "Digital Dreams",
      description: "A digital artwork exploring the intersection of technology and imagination.",
      artist: "Arjun Patel",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      category: "Digital",
      likes: 28,
      createdAt: "2024-01-10T13:20:00Z",
      userId: "user987"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArtworks(sampleArtworks);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArtworks = artworks
    .filter(artwork => 
      (filterCategory === 'all' || artwork.category.toLowerCase() === filterCategory) &&
      (artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
       artwork.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'likes':
          return b.likes - a.likes;
        case 'artist':
          return a.artist.localeCompare(b.artist);
        default:
          return 0;
      }
    });

  const handleContribute = () => {
    if (!isAuthenticated) {
      toast.error('Please login or create an account to contribute your artwork', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    setShowModal(true);
  };

  const handleArtworkSubmit = (newArtwork) => {
    const artwork = {
      ...newArtwork,
      id: artworks.length + 1,
      artist: user?.name || 'Anonymous',
      likes: 0,
      createdAt: new Date().toISOString(),
      userId: user?.id
    };
    setArtworks([artwork, ...artworks]);
    setShowModal(false);
    toast.success('Your artwork has been added to the Art Wall!');
  };

  const categories = ['all', 'traditional', 'contemporary', 'abstract', 'landscape', 'digital'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold font-[Yatra One] text-amber-900 mb-4">
            Art Wall
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            A collaborative space where artists share their creativity and passion. 
            Discover, appreciate, and contribute to our growing collection of artistic expressions.
          </p>
          
          {/* Contribute Button */}
          <motion.button
            onClick={handleContribute}
            className="mt-8 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="text-white" />
            Contribute
          </motion.button>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search artworks, artists..."
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
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="likes">Most Liked</option>
                <option value="artist">By Artist</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* Art Grid */}
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredArtworks.map((artwork, index) => (
              <ArtCard 
                key={artwork.id} 
                artwork={artwork} 
                index={index}
                currentUser={user}
                onLike={(id) => {
                  setArtworks(prev => prev.map(art => 
                    art.id === id ? { ...art, likes: art.likes + 1 } : art
                  ));
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {!loading && filteredArtworks.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No artworks found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Contribute Modal */}
        <ContributeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleArtworkSubmit}
        />
      </div>
    </div>
  );
};

export default ArtWall;
