import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaEye, FaMapMarkerAlt, FaCalendarAlt, FaBookmark } from 'react-icons/fa';
import LazyImage from '../components/LazyImage';
import useSmoothScroll from '../hooks/useSmoothScroll';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from "axios";
import FollowButton from '../components/FollowButton';
import VerificationBadge from '../components/VerificationBadge';

const ArtistProfile = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [artist, setArtist] = useState({
    coverImage: '/assets/parallaximg.png'
  });
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artworksLoading, setArtworksLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [views, setViews] = useState(0);

  useSmoothScroll();

  // Floating particles for background (matching ArtWall and About)
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

// Remove cover image
useEffect(() => {
  setArtist(prev => ({...prev, coverImage: ''}));
    const fetchArtist = async () => {
      try {
        setLoading(true);
        
        // Try to get single artist 
        try {
          const response = await api.getArtist(artistId);
          if (response.success && response.data) {
            const artistData = response.data;
            setArtist({
              ...artistData,
              profileImage: artistData.avatar || 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&auto=format',
              coverImage: '/assets/parallaximg.png',
              specialties: artistData.specialization ? [artistData.specialization] : ['Traditional Arts'],
              totalLikes: artistData.likesCount || 0,
              totalViews: artistData.viewsCount || Math.floor(Math.random() * 1000) + 100,
              joinedDate: artistData.createdAt || new Date().toISOString(),
              socialLinks: artistData.socialLinks || {},
              location: artistData.location || 'India'
            });
            // Calculate profile views from total bookmarks across all artworks
            setViews(artistData.viewsCount || 0);
            
            // Fetch artist's artworks
            fetchArtworks(artistId);
            
            
            return;
          }
        } catch (singleArtistError) {
          console.log('Single artist endpoint failed, trying alternative approach:', singleArtistError.message);
        }
        
        // Fallback: Get all artists and find the one with matching ID
        const allArtistsResponse = await api.getArtists();
        if (allArtistsResponse.success && allArtistsResponse.data) {
          const foundArtist = allArtistsResponse.data.find(artist => artist._id === artistId);
          
          if (foundArtist) {
            const artistData = foundArtist;
            setArtist({
              ...artistData,
              profileImage: artistData.avatar || 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop&auto=format',
              coverImage: '/assets/parallaximg.png',
              specialties: artistData.specialization ? [artistData.specialization] : ['Traditional Arts'],
              totalLikes: artistData.likesCount || 0,
              totalViews: artistData.viewsCount || Math.floor(Math.random() * 1000) + 100,
              joinedDate: artistData.createdAt || new Date().toISOString(),
              socialLinks: artistData.socialLinks || {},
              location: artistData.location || 'India'
            });
            // Calculate profile views from total bookmarks across all artworks
            setViews(artistData.viewsCount || 0);
            
            // Fetch artist's artworks
            fetchArtworks(artistId);
            
          } else {
            console.log('Artist not found in all artists list');
            setArtist(null);
          }
        } else {
          console.log('Failed to fetch all artists');
          setArtist(null);
        }
      } catch (err) {
        console.error('Error fetching artist:', err);
        setArtist(null);
      } finally {
        setLoading(false);
      }
    };

    if (artistId) {
      fetchArtist();
    }
  }, [artistId, isAuthenticated, user]);

  // Fetch artworks for the artist
  const fetchArtworks = async (userId) => {
    try {
      setArtworksLoading(true);
      const response = await api.getArtworks({ userId });
      if (response.success && response.data) {
        setArtworks(response.data);
        
        // Calculate aggregate statistics from artworks
        const totalLikes = response.data.reduce((sum, artwork) => sum + (artwork.likes || 0), 0);
        const totalBookmarks = response.data.reduce((sum, artwork) => sum + (artwork.bookmarks || 0), 0);
        const totalViews = response.data.reduce((sum, artwork) => sum + (artwork.views || 0), 0);
        
        // Update artist statistics with calculated values
        setArtist(prevArtist => ({
          ...prevArtist,
          totalLikes: totalLikes,
          totalBookmarks: totalBookmarks,
          totalViews: totalViews
        }));
        
        // Use actual views from artworks
        setViews(totalViews);
      } else {
        setArtworks([]);
      }
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setArtworks([]);
    } finally {
      setArtworksLoading(false);
    }
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8E6DA]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#E05264] mx-auto mb-4"></div>
          <p className="text-xl font-lora font-semibold text-[#E05264] leading-relaxed">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8E6DA]">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-6xl font-dm-serif mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent drop-shadow-lg">Artist Not Found</h2>
          <p className="text-xl font-lora font-semibold text-[#E05264] mb-6 leading-relaxed">The artist you're looking for doesn't exist.</p>
          <motion.button
            onClick={() => navigate('/art-wall')}
            className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-dm-serif"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Art Wall
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8E6DA] overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      {/* Header */}
      <motion.div
        className="relative h-80 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <LazyImage
          src={artist.coverImage}
          alt={`${artist.name} cover`}
          className="w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          aspectRatio=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        


        {/* Profile info overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end gap-6">
            
            <motion.div
              className="text-white flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-6xl font-dm-serif font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-lg">{artist.name}</h1>
                  <VerificationBadge isVerified={artist.isVerified} size="lg" />
                </div>
                <div className="flex items-center gap-3">
                  <FollowButton 
                    userId={artist._id} 
                    className="px-6 py-3 text-sm font-dm-serif shadow-xl"
                    onFollowChange={(isFollowing, count) => {
                      // Optional: Update local state if needed
                      console.log('Follow status changed:', isFollowing, count);
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/90 mb-3">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt size={14} />
                  <span>{artist.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt size={14} />
                  <span>Joined {formatDate(artist.joinedDate)}</span>
                </div>
              </div>
              {/* About text inline */}
              {artist.bio && (
                <p className="text-white/90 text-lg font-lora leading-relaxed max-w-2xl">
                  {artist.bio}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Section - Seamlessly connected to hero */}
      <div className="relative z-10">
        <div className="flex">
          {/* Stats Sidebar */}
          <aside className="w-80 flex-shrink-0 bg-[#F8E6DA]">
            <div className="h-full px-6 py-8">
              {/* Statistics */}
              <div className="mb-8">
                <h4 className="text-2xl font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent mb-6">Statistics</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#134856]">
                      <FaHeart className="text-red-500" />
                      <span className="font-lora">Likes</span>
                    </div>
                    <span className="text-[#134856] font-dm-serif font-bold text-xl">{artist.totalLikes || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#134856]">
                      <FaBookmark className="text-amber-600" />
                      <span className="font-lora">Bookmarks</span>
                    </div>
                    <span className="text-[#134856] font-dm-serif font-bold text-xl">{artist.totalBookmarks || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#134856]">
                      <FaEye className="text-green-600" />
                      <span className="font-lora">Views</span>
                    </div>
                    <span className="text-[#134856] font-dm-serif font-bold text-xl">{views}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#E05264]/30 mb-6"></div>

              {/* Specialties */}
              <div className="mb-8">
                <h4 className="text-xl font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent mb-4">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {artist.specialties && artist.specialties.length > 0 ? (
                    artist.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-[#1d7c6f]/20 to-[#f58c8c]/20 text-[#134856] px-3 py-1 rounded-full text-sm font-lora font-semibold"
                      >
                        {specialty}
                      </span>
                    ))
                  ) : (
                    <span className="bg-gradient-to-r from-[#1d7c6f]/20 to-[#f58c8c]/20 text-[#134856] px-3 py-1 rounded-full text-sm font-lora font-semibold">
                      Traditional Arts
                    </span>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {artist.socialLinks && Object.keys(artist.socialLinks).length > 0 && (
                <>
                  <div className="h-px bg-[#E05264]/30 mb-6"></div>
                  <div>
                    <h4 className="text-xl font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent mb-4">Connect</h4>
                    <div className="space-y-2">
                      {Object.entries(artist.socialLinks).map(([platform, handle]) => (
                        <div key={platform} className="flex items-center gap-2">
                          <span className="capitalize font-lora font-semibold text-[#134856]">{platform}:</span>
                          <span className="font-lora text-[#E05264]">{handle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-[#F8E6DA]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {/* Artworks Header */}
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-4xl font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
                  Artworks ({artworks.length})
                </h2>
                <p className="text-[#134856] text-sm mt-1 font-lora">
                  Browse {artist.name}'s art collection
                </p>
              </div>

              {/* Artworks Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks.map((artwork, index) => (
                    <motion.div
                      key={artwork.id}
                      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => setSelectedArtwork(artwork)}
                    >
                      <div className="relative">
                        <LazyImage
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="w-full h-48 group-hover:scale-110 transition-transform duration-500"
                          aspectRatio=""
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-amber-600/90 text-white px-3 py-1 rounded-full text-xs font-dm-serif font-semibold backdrop-blur-sm">
                            {artwork.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-lg font-dm-serif font-bold text-amber-900 mb-2">{artwork.title}</h3>
                        <p className="text-amber-700 font-lora text-sm mb-3 line-clamp-2 leading-relaxed">{artwork.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1 text-red-500">
                              <FaHeart size={12} />
                              <span>{artwork.likes || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-amber-600">
                              <FaBookmark size={12} />
                              <span>{artwork.bookmarks || 0}</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(artwork.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {artworks.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-4xl font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent drop-shadow-lg mb-2">No artworks yet</h3>
                    <p className="text-lg font-lora font-semibold text-[#E05264] leading-relaxed">This artist hasn't shared any artworks yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Artwork Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <LazyImage
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  className="w-full h-96"
                  aspectRatio=""
                />
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent mb-2">{selectedArtwork.title}</h3>
                <p className="text-[#E05264] font-lora mb-4 leading-relaxed">{selectedArtwork.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-red-500">
                      <FaHeart />
                      <span>{selectedArtwork.likes || 0} likes</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-500">
                      <FaBookmark />
                      <span>{selectedArtwork.bookmarks || 0} bookmarks</span>
                    </div>
                  </div>
                  <span className="text-gray-500">
                    {new Date(selectedArtwork.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons at bottom */}
      <div className="flex justify-center gap-4 pb-8">
        <motion.button
          onClick={() => navigate('/art-wall')}
          className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-dm-serif text-sm font-semibold flex items-center gap-2"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft size={14} />
          <span>Back to Art Wall</span>
        </motion.button>
        
        <motion.button
          onClick={() => navigate('/artists')}
          className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-dm-serif text-sm font-semibold flex items-center gap-2"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft size={14} />
          <span>Back to Artists</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ArtistProfile;
