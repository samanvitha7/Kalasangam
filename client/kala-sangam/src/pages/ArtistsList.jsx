import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { FaSearch, FaFilter, FaUsers, FaPalette } from 'react-icons/fa';
import { api } from '../services/api';
import FullBleedDivider from '../components/FullBleedDivider';

const ArtistsList = () => {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  // Fetch artists from API
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.getArtists();
        if (response.success && response.data) {
          setArtists(response.data);
        } else {
          console.error('No artists found in response:', response);
          setArtists([]);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = artists
    .filter(artist => 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artist.specialization && artist.specialization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (artist.location && artist.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'followers':
          return (b.followers || 0) - (a.followers || 0);
        case 'artworks':
          return (b.artworks ? b.artworks.length : 0) - (a.artworks ? a.artworks.length : 0);
        case 'likes':
          return (b.totalLikes || 0) - (a.totalLikes || 0);
        default:
          return 0;
      }
    });

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8E6DA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-[#134856] font-medium font-lora">Loading artists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8E6DA] pb-8 overflow-hidden">
      <FullBleedDivider />
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <div className="container mx-auto px-4 pt-10 relative z-10">
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
          
          <h1 className="inline-block text-6xl font-dm-serif pt-10 mb-6 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Traditional Artists
          </h1>
          <p className="text-lg text-xl font-lora font-semibold text-[#E05264] max-w-3xl mx-auto leading-relaxed mb-10">
            Discover talented artists preserving India's rich traditional art heritage. Connect with masters who carry forward centuries of artistic wisdom.
          </p>
          
          {/* Action Buttons */}
          
        </motion.section>

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
                  placeholder="Search artists, art forms..."
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
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="followers">Sort by Followers</option>
                    <option value="artworks">Sort by Artworks</option>
                    <option value="likes">Sort by Likes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* Artists Grid */}
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredArtists.map((artist, index) => (
              <motion.div
                key={artist._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Link to={`/artist/${artist._id}`}>
                  <motion.div
                    className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20 hover:shadow-[#E05264]/20 transition-all duration-300 group"
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Featured Badge */}
                    {artist.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#E05264] to-[#F48C8C] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}

                    <div className="text-center">

                      {/* Artist Info */}
                      <h3 className="text-xl font-dm-serif font-bold text-[#134856] mb-2 group-hover:text-[#E05264] transition-colors">
                        {artist.name}
                      </h3>
                      
                      <p className="text-[#E05264] font-lora font-medium text-sm mb-2">
                        {artist.specialization || 'Traditional Artist'}
                      </p>
                      
                      <p className="text-gray-500 font-lora text-xs mb-4">
                        {artist.location || 'India'}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div>
                          <div className="font-bold text-[#134856] text-lg">{artist.artworks ? artist.artworks.length : 0}</div>
                          <div className="text-xs text-gray-500 font-lora">Artworks</div>
                        </div>
                        <div>
                          <div className="font-bold text-[#134856] text-lg">{artist.followers || 0}</div>
                          <div className="text-xs text-gray-500 font-lora">Followers</div>
                        </div>
                        <div>
                          <div className="font-bold text-[#134856] text-lg">{artist.totalLikes || 0}</div>
                          <div className="text-xs text-gray-500 font-lora">Likes</div>
                        </div>
                      </div>

                      {/* View Profile Button */}
                      <motion.div 
                        className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.05 }}
                      >
                        View Profile
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {!loading && filteredArtists.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No artists found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-dm-serif font-bold mb-6">Are you an artist?</h2>
          <p className="text-xl font-lora mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join our community of traditional artists and showcase your work to art lovers worldwide.
          </p>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup?role=artist"
              className="inline-block px-8 py-4 bg-white text-[#134856] font-semibold font-dm-serif rounded-full hover:bg-[#F8E6DA] transition-colors duration-300 shadow-lg"
            >
              Become an Artist
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtistsList;
