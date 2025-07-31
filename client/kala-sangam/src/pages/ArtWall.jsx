import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../utils/toastUtils';
import ArtCard from '../components/ArtCard';
import ContributeModal from '../components/ContributeModal';
import { FaPlus, FaFilter, FaSearch, FaTimes, FaDownload, FaHeart, FaBookmark, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import FullBleedDivider from '../components/FullBleedDivider';
import { globalEvents, ARTWORK_EVENTS } from '../utils/eventEmitter';

const ArtWall = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [userBookmarks, setUserBookmarks] = useState(new Set());
  const [userLikes, setUserLikes] = useState(new Set());
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Fetch artworks from API
  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const response = await api.getArtworks({
        limit: 50,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });
      
      if (response.success) {
        // Transform the API data to match frontend expectations
        const transformedArtworks = response.data.map(artwork => {
          console.log('ArtWall - Original artwork.userId:', artwork.userId, 'type:', typeof artwork.userId);
          const transformedUserId = artwork.userId ? (typeof artwork.userId === 'object' ? artwork.userId._id : artwork.userId.toString()) : artwork.artistId?.toString();
          console.log('ArtWall - Transformed userId:', transformedUserId, 'type:', typeof transformedUserId);
          
          return {
            id: artwork._id || artwork.id,
            title: artwork.title || artwork.name,
            description: artwork.description,
            artist: artwork.artist || 'Cultural Heritage',
            imageUrl: artwork.imageUrl || artwork.image,
            category: artwork.category || 'Traditional Art',
            likes: artwork.likes || [],
            bookmarks: artwork.bookmarks || [],
            likeCount: artwork.likeCount || (artwork.likes ? artwork.likes.length : 0),
            bookmarkCount: artwork.bookmarkCount || (artwork.bookmarks ? artwork.bookmarks.length : 0),
            createdAt: artwork.createdAt || new Date().toISOString(),
            userId: transformedUserId,
            origin: artwork.origin
          };
        });
        setArtworks(transformedArtworks);
      } else {
        console.error('Failed to fetch artworks:', response.message);
        setArtworks([]);
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
      showToast.error('Failed to load artworks. Please try again later.');
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
    
    // Load user bookmarks if authenticated
    if (isAuthenticated && user) {
      console.log('ArtWall useEffect - user authenticated:', { user, userLikes: user.likes });
      fetchUserBookmarks();
    }
  }, [isAuthenticated, user]);

  const fetchUserBookmarks = async () => {
    try {
      const response = await api.getCurrentUser();
      console.log('ArtWall fetchUserBookmarks response:', response);
      if (response && response.user) {
        const bookmarkIds = new Set((response.user.bookmarks || []).map(id => id.toString()));
        setUserBookmarks(bookmarkIds);
        
        // Also update the user in context if the likes are different
        if (response.user.likes && JSON.stringify(response.user.likes) !== JSON.stringify(user?.likes)) {
          console.log('Updating user likes from fetchUserBookmarks:', response.user.likes);
          updateUser({ likes: response.user.likes, bookmarks: response.user.bookmarks });
        }
      }
    } catch (error) {
      console.error('Error fetching user bookmarks:', error);
    }
  };

  const filteredArtworks = artworks
    .filter(artwork => {
      // Show all artworks - no user filtering needed for Art Wall
      // Everyone should see all community artworks
      
      // Filter by category
      const categoryFilter = filterCategory === 'all' || artwork.category.toLowerCase() === filterCategory;
      
      // Filter by search term
      const searchFilter = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return categoryFilter && searchFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'likes':
          return (b.likeCount || 0) - (a.likeCount || 0);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        default:
          return 0;
      }
    });

  const handleContribute = () => {
    if (!isAuthenticated) {
      showToast.error('Please login or create an account to contribute your artwork');
      return;
    }
    setShowModal(true);
  };

  const handleArtworkSubmit = async (newArtwork) => {
    try {
      console.log('Submitting artwork:', newArtwork);
      
      // Submit to the API
      const response = await api.createArtwork(newArtwork);
      console.log('Artwork created:', response);
      
      // Get the created artwork data
      const createdArtwork = response.data || response;
      
      // Transform the artwork to match the expected format
      const transformedArtwork = {
        id: createdArtwork._id || createdArtwork.id,
        title: createdArtwork.title,
        description: createdArtwork.description,
        artist: createdArtwork.artist || user?.name || 'Anonymous',
        imageUrl: createdArtwork.imageUrl,
        category: createdArtwork.category,
        likes: createdArtwork.likes || 0,
        bookmarks: createdArtwork.bookmarks || 0,
        createdAt: createdArtwork.createdAt || new Date().toISOString(),
        userId: createdArtwork.userId || user?.id
      };
      
      // Add to local state
      setArtworks([transformedArtwork, ...artworks]);
      setShowModal(false);
      showToast.success('Your artwork has been added to the Art Wall!');
      
      // Emit global event for artwork creation
      globalEvents.emit(ARTWORK_EVENTS.CREATED, {
        artwork: transformedArtwork,
        userId: user?.id
      });
      
      // Keep backward compatibility with existing storage events
      localStorage.setItem('artworkCreated', Date.now().toString());
      window.dispatchEvent(new CustomEvent('artworkCreated', { detail: transformedArtwork }));
      
    } catch (error) {
      console.error('Failed to create artwork:', error);
      showToast.error('Failed to create artwork. Please try again.');
    }
  };

  const handleLike = async (artworkId) => {
    if (!isAuthenticated) {
      showToast.error('Please login to like artworks');
      return;
    }

    try {
      console.log('ArtWall handleLike starting:', { artworkId, currentUser: user, userLikes: user?.likes });
      const response = await api.toggleLike(artworkId);
      
      console.log('ArtWall handleLike API response:', response);
      
      if (response.success) {
        console.log('ArtWall handleLike response:', { artworkId, response });
        
        // Update local artworks state with new like count
        setArtworks(prev => {
          const updated = prev.map(art => {
            if (art.id === artworkId) {
              const updatedArt = { 
                ...art, 
                likeCount: response.likeCount,
                likes: response.likes, // This is now a count, not array
                isLiking: false
              };
              console.log('ArtWall updating artwork:', { 
                original: art, 
                updated: updatedArt,
                responseLikes: response.likes,
                responseLikeCount: response.likeCount 
              });
              return updatedArt;
            }
            return art;
          });
          return updated;
        });
        
        // Update user's likes array in auth context
        if (user) {
          const currentLikes = [...(user.likes || [])];
          const artworkIdStr = artworkId.toString();
          
          console.log('Before user likes update:', { currentLikes, artworkIdStr, liked: response.liked });
          
          if (response.liked) {
            // Add to likes if not already there
            if (!currentLikes.find(id => id.toString() === artworkIdStr)) {
              currentLikes.push(artworkIdStr);
              console.log('Added to likes:', currentLikes);
            }
          } else {
            // Remove from likes
            const index = currentLikes.findIndex(id => id.toString() === artworkIdStr);
            if (index > -1) {
              currentLikes.splice(index, 1);
              console.log('Removed from likes:', currentLikes);
            }
          }
          
          console.log('Updating user with new likes:', currentLikes);
          updateUser({ likes: currentLikes });
        }
        
        // Show toast message
        if (response.liked) {
          showToast.success('Artwork liked!', { autoClose: 2000 });
          
          // Emit global event for like
          globalEvents.emit(ARTWORK_EVENTS.LIKED, {
            artworkId: artworkId.toString(),
            userId: user?.id
          });
        } else {
          showToast.success('Like removed!', { autoClose: 2000 });
          
          // Emit global event for unlike
          globalEvents.emit(ARTWORK_EVENTS.UNLIKED, {
            artworkId: artworkId.toString(),
            userId: user?.id
          });
        }
        
        // Emit user stats update event
        globalEvents.emit(ARTWORK_EVENTS.USER_STATS_UPDATED, {
          userId: user?.id,
          likeChange: response.liked ? 1 : -1
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      showToast.error('Failed to toggle like. Please try again.');
    }
  };

  const handleBookmark = async (artworkId) => {
    if (!isAuthenticated) {
      showToast.error('Please login to bookmark artworks');
      return;
    }

    try {
      const response = await api.toggleBookmark(artworkId);
      
      if (response.success) {
        // Update local bookmarks state
        setUserBookmarks(prev => {
          const newBookmarks = new Set(prev);
          const artworkIdStr = artworkId.toString();
          
          if (response.bookmarked) {
            newBookmarks.add(artworkIdStr);
            showToast.success('Artwork bookmarked!', { autoClose: 2000 });
            
            // Emit global event for bookmark
            globalEvents.emit(ARTWORK_EVENTS.BOOKMARKED, {
              artworkId: artworkIdStr,
              userId: user?.id
            });
          } else {
            newBookmarks.delete(artworkIdStr);
            showToast.success('Bookmark removed!', { autoClose: 2000 });
            
            // Emit global event for unbookmark
            globalEvents.emit(ARTWORK_EVENTS.UNBOOKMARKED, {
              artworkId: artworkIdStr,
              userId: user?.id
            });
          }
          return newBookmarks;
        });
        
        // Update artworks state with new bookmark count
        setArtworks(prev => prev.map(art => 
          art.id === artworkId ? { 
            ...art, 
            bookmarkCount: response.bookmarkCount,
            bookmarks: response.bookmarks // This is now a count, not array
          } : art
        ));
        
        // Emit user stats update event
        globalEvents.emit(ARTWORK_EVENTS.USER_STATS_UPDATED, {
          userId: user?.id,
          bookmarkChange: response.bookmarked ? 1 : -1
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      showToast.error('Failed to toggle bookmark. Please try again.');
    }
  };

  const handleImageClick = (artwork) => {
    setFullscreenImage(artwork);
    setShowFullscreen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeFullscreen = () => {
    setShowFullscreen(false);
    setFullscreenImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const handleDownloadImage = async (imageUrl, title) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showToast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading image:', error);
      showToast.error('Failed to download image. Please try again.');
    }
  };

  // Handle ESC key and browser back button
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showFullscreen) {
        closeFullscreen();
      }
    };

    const handlePopState = () => {
      if (showFullscreen) {
        closeFullscreen();
      }
    };

    if (showFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('popstate', handlePopState);
      // Push a state to handle back button
      window.history.pushState({ fullscreen: true }, '');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showFullscreen]);

  const categories = ['all', 'traditional', 'contemporary', 'abstract', 'landscape', 'digital'];

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
          
          <h1 className="inline-block text-6xl font-dm-serif mb-6 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Art Wall
          </h1>
          <p className="text-lg font-lora font-semibold text-xl text-[#E05264] max-w-3xl mx-auto leading-relaxed mb-10">
            A collaborative space where artists share their creativity and passion. 
            Discover, appreciate, and contribute to our growing collection of artistic expressions.
          </p>
          
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={handleContribute}
              className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-dm-serif"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus className="text-white" />
              Contribute Your Art
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/community-guidelines"
                className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-dm-serif"
              >
                <FaUsers className="text-white" />
                Community Guidelines
              </Link>
            </motion.div>
          </div>
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
                isBookmarked={userBookmarks.has(artwork.id ? artwork.id.toString() : artwork._id?.toString())}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onImageClick={handleImageClick}
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

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {showFullscreen && fullscreenImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeFullscreen}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors z-60"
                onClick={closeFullscreen}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaTimes />
              </motion.button>

              {/* Download Button */}
              <motion.button
                className="absolute top-4 right-16 text-white text-xl hover:text-gray-300 transition-colors z-60"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadImage(fullscreenImage.imageUrl, fullscreenImage.title);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FaDownload />
              </motion.button>

              {/* Image Container */}
              <motion.div
                className="relative max-w-screen-lg max-h-screen-80 w-full h-full flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Main Image */}
                <img
                  src={fullscreenImage.imageUrl}
                  alt={fullscreenImage.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{ maxHeight: '85vh' }}
                />

                {/* Image Info Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 rounded-b-lg"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {fullscreenImage.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-3">
                    by {fullscreenImage.artist}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {fullscreenImage.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white">
                      <FaHeart className="text-red-500" />
                      <span>{fullscreenImage.likeCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <FaBookmark className="text-blue-500" />
                      <span>{fullscreenImage.bookmarkCount}</span>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {fullscreenImage.category}
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p>Press ESC or click outside to close</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
