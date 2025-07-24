import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaComment, FaEye, FaMapMarkerAlt, FaCalendarAlt, FaShare, FaFlag, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import LazyImage from '../components/LazyImage';
import useSmoothScroll from '../hooks/useSmoothScroll';
import ReportModal from '../components/ReportModal';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from "axios";

const ArtistProfile = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artworksLoading, setArtworksLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [views, setViews] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

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

  // Fetch artist data and artworks
  useEffect(() => {
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
              profileImage: artistData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
              coverImage: artistData.signatureWork || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
              specialties: artistData.specialization ? [artistData.specialization] : ['Traditional Arts'],
              totalLikes: artistData.likesCount || 0,
              totalComments: artistData.commentsCount || 0,
              totalViews: artistData.viewsCount || Math.floor(Math.random() * 1000) + 100,
              joinedDate: artistData.createdAt || new Date().toISOString(),
              socialLinks: artistData.socialLinks || {},
              location: artistData.location || 'India'
            });
            setViews(artistData.viewsCount || Math.floor(Math.random() * 1000) + 100);
            
            // Fetch artist's artworks
            fetchArtworks(artistId);
            
            // Check if current user follows this artist
            if (isAuthenticated && user) {
              setIsFollowing(user.following?.includes(artistId) || false);
            }
            
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
              profileImage: artistData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
              coverImage: artistData.signatureWork || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
              specialties: artistData.specialization ? [artistData.specialization] : ['Traditional Arts'],
              totalLikes: artistData.likesCount || 0,
              totalComments: artistData.commentsCount || 0,
              totalViews: artistData.viewsCount || Math.floor(Math.random() * 1000) + 100,
              joinedDate: artistData.createdAt || new Date().toISOString(),
              socialLinks: artistData.socialLinks || {},
              location: artistData.location || 'India'
            });
            setViews(artistData.viewsCount || Math.floor(Math.random() * 1000) + 100);
            
            // Fetch artist's artworks
            fetchArtworks(artistId);
            
            // Check if current user follows this artist
            if (isAuthenticated && user) {
              setIsFollowing(user.following?.includes(artistId) || false);
            }
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

  // Handle follow/unfollow
  const handleFollowToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to follow artists');
      return;
    }

    try {
      setFollowLoading(true);
      const response = await api.toggleFollow(artistId);
      
      if (response.success) {
        setIsFollowing(!isFollowing);
        toast.success(isFollowing ? 'Unfollowed artist' : 'Now following artist');
      } else {
        toast.error(response.message || 'Failed to update follow status');
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
      toast.error('Failed to update follow status');
    } finally {
      setFollowLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${artist.name} - Artist Profile`,
        text: `Check out ${artist.name}'s amazing artwork!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8E6DA]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#E05264] mx-auto mb-4"></div>
          <p className="text-xl font-lora text-[#E05264]">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8E6DA]">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold font-dm-serif mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">Artist Not Found</h2>
          <p className="text-[#E05264] font-lora mb-6">The artist you're looking for doesn't exist.</p>
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
          aspectRatio=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back button */}
        <motion.button
          onClick={() => navigate('/art-wall')}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowLeft size={18} />
        </motion.button>

        {/* Share button */}
        <motion.button
          onClick={handleShare}
          className="absolute top-6 right-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaShare size={18} />
        </motion.button>

        {/* Report button */}
        <motion.button
          onClick={() => setShowReportModal(true)}
          className="absolute top-6 right-6 bg-red-500/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-red-500/40 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Report Artist"
        >
          <FaFlag size={18} />
        </motion.button>

        {/* Profile info overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end gap-6">
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <LazyImage
                src={artist.profileImage}
                alt={artist.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                aspectRatio=""
                placeholder="👤"
              />
            </motion.div>
            
            <motion.div
              className="text-white flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold">{artist.name}</h1>
                {isAuthenticated && user && user._id !== artistId && (
                  <motion.button
                    onClick={handleFollowToggle}
                    disabled={followLoading}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all ${
                      isFollowing
                        ? 'bg-white/20 text-white border border-white/30 hover:bg-red-500/80'
                        : 'bg-white text-amber-900 hover:bg-amber-50'
                    } ${followLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: followLoading ? 1 : 1.05 }}
                    whileTap={{ scale: followLoading ? 1 : 0.95 }}
                  >
                    {followLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    ) : isFollowing ? (
                      <FaUserMinus size={16} />
                    ) : (
                      <FaUserPlus size={16} />
                    )}
                    <span>{followLoading ? 'Loading...' : isFollowing ? 'Unfollow' : 'Follow'}</span>
                  </motion.button>
                )}
              </div>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt size={14} />
                  <span>{artist.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt size={14} />
                  <span>Joined {formatDate(artist.joinedDate)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Statistics</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <FaHeart className="text-red-500 mr-1" />
                    <span className="text-2xl font-bold text-amber-900">{artist.totalLikes}</span>
                  </div>
                  <p className="text-sm text-amber-700">Total Likes</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <FaComment className="text-blue-500 mr-1" />
                    <span className="text-2xl font-bold text-amber-900">{artist.totalComments}</span>
                  </div>
                  <p className="text-sm text-amber-700">Comments</p>
                </div>
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <FaEye className="text-green-500 mr-1" />
                    <span className="text-2xl font-bold text-amber-900">{views}</span>
                  </div>
                  <p className="text-sm text-amber-700">Profile Views</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-4">About</h3>
              <p className="text-amber-700 leading-relaxed">{artist.bio}</p>
            </div>

            {/* Specialties */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {artist.specialties && artist.specialties.length > 0 ? (
                  artist.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))
                ) : (
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    Traditional Arts
                  </span>
                )}
              </div>
            </div>

            {/* Social Links */}
            {artist.socialLinks && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Connect</h3>
                <div className="space-y-2">
                  {Object.entries(artist.socialLinks).map(([platform, handle]) => (
                    <div key={platform} className="flex items-center gap-2">
                      <span className="capitalize font-medium text-amber-800">{platform}:</span>
                      <span className="text-amber-600">{handle}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Artworks grid */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-amber-900">
                Artworks ({artworks.length})
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {artworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="relative">
                    <LazyImage
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-64"
                      aspectRatio=""
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-amber-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {artwork.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{artwork.title}</h3>
                    <p className="text-amber-700 text-sm mb-4 line-clamp-2">{artwork.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-red-500">
                          <FaHeart size={14} />
                          <span>{artwork.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-500">
                          <FaComment size={14} />
                          <span>{artwork.comments}</span>
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
                <h3 className="text-2xl font-semibold text-amber-900 mb-2">No artworks yet</h3>
                <p className="text-amber-700">This artist hasn't shared any artworks yet.</p>
              </div>
            )}
          </motion.div>
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
                <h3 className="text-2xl font-bold text-amber-900 mb-2">{selectedArtwork.title}</h3>
                <p className="text-amber-700 mb-4">{selectedArtwork.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-red-500">
                      <FaHeart />
                      <span>{selectedArtwork.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-500">
                      <FaComment />
                      <span>{selectedArtwork.comments} comments</span>
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

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          type="artist"
          targetId={artist.id}
          targetName={artist.name}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};

export default ArtistProfile;
