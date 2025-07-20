import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaComment, FaEye, FaMapMarkerAlt, FaCalendarAlt, FaShare, FaFlag } from 'react-icons/fa';
import LazyImage from '../components/LazyImage';
import useSmoothScroll from '../hooks/useSmoothScroll';
import ReportModal from '../components/ReportModal';

const ArtistProfile = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [views, setViews] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);

  useSmoothScroll();

  // Sample artist data - replace with actual API calls
  const sampleArtists = {
    'priya-sharma': {
      id: 'priya-sharma',
      name: 'Priya Sharma',
      bio: 'A passionate traditional artist specializing in Madhubani paintings. With over 15 years of experience, I strive to preserve and share the beauty of Indian folk art with the world.',
      location: 'Mithila, Bihar',
      joinedDate: '2020-03-15',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      specialties: ['Madhubani', 'Folk Art', 'Traditional Painting'],
      totalLikes: 245,
      totalComments: 89,
      totalViews: 1523,
      socialLinks: {
        instagram: '@priya.madhubani',
        website: 'https://priyamadhubani.com'
      }
    },
    'raj-kumar': {
      id: 'raj-kumar',
      name: 'Raj Kumar',
      bio: 'Contemporary artist exploring the intersection of tradition and modernity through abstract expressions.',
      location: 'Delhi, India',
      joinedDate: '2021-07-20',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop',
      specialties: ['Abstract', 'Contemporary', 'Mixed Media'],
      totalLikes: 189,
      totalComments: 67,
      totalViews: 892,
      socialLinks: {
        instagram: '@raj.abstract',
        behance: 'rajkumar_art'
      }
    }
    // Add more artists as needed
  };

  const sampleArtworks = [
    {
      id: 1,
      title: "Sunset Over Mountains",
      description: "A beautiful landscape painting capturing the golden hour over the Himalayas.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      category: "Landscape",
      likes: 24,
      comments: 8,
      createdAt: "2024-01-15T10:30:00Z",
      artistId: "priya-sharma"
    },
    {
      id: 3,
      title: "Traditional Madhubani",
      description: "A traditional Madhubani painting depicting nature and mythology in classic style.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "Traditional",
      likes: 67,
      comments: 15,
      createdAt: "2024-01-13T09:15:00Z",
      artistId: "priya-sharma"
    },
    {
      id: 2,
      title: "Abstract Emotions",
      description: "An abstract piece exploring human emotions through vibrant colors and dynamic forms.",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      category: "Abstract",
      likes: 31,
      comments: 12,
      createdAt: "2024-01-14T14:20:00Z",
      artistId: "raj-kumar"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const artistData = sampleArtists[artistId];
      if (artistData) {
        setArtist(artistData);
        setArtworks(sampleArtworks.filter(artwork => artwork.artistId === artistId));
        setViews(artistData.totalViews + Math.floor(Math.random() * 10)); // Simulate view increment
      }
      setLoading(false);
    }, 1000);
  }, [artistId]);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold text-amber-900 mb-2">Artist Not Found</h2>
          <p className="text-amber-700 mb-6">The artist you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/art-wall')}
            className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
          >
            Back to Art Wall
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
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
              <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
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
      <div className="container mx-auto px-4 py-8">
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
                {artist.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
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
