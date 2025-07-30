import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaFlag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LazyImage from './LazyImage';
import ReportModal from './ReportModal';
import { api } from '../services/api';

const ArtCard = ({ artwork, index, currentUser, isBookmarked: initialBookmarked, onLike, onBookmark, onImageClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked || false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  // Initialize liked and bookmarked states based on current user data
  useEffect(() => {
    if (currentUser && currentUser.likes) {
      // Check if the current artwork ID is in the user's likes array
      const artworkIdStr = artwork.id ? artwork.id.toString() : artwork._id?.toString();
      const isLikedByUser = currentUser.likes.some(likeId => 
        likeId.toString() === artworkIdStr
      );
      setIsLiked(isLikedByUser);
    }
    if (initialBookmarked !== undefined) {
      setIsBookmarked(initialBookmarked);
    } else if (currentUser && currentUser.bookmarks) {
      // Check if the current artwork ID is in the user's bookmarks array
      const artworkIdStr = artwork.id ? artwork.id.toString() : artwork._id?.toString();
      const isBookmarkedByUser = currentUser.bookmarks.some(bookmarkId => 
        bookmarkId.toString() === artworkIdStr
      );
      setIsBookmarked(isBookmarkedByUser);
    }
  }, [currentUser, artwork.id, artwork._id, initialBookmarked]);
  
  const animations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.4, delay: index * 0.1 }
  };

  const handleLike = () => {
    if (!currentUser) {
      toast.error('Please login or create an account to like artworks', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const previousState = isLiked;
    setIsLiked(!isLiked);
    
    api.toggleLike(artwork.id)
        .then(() => onLike(artwork.id))
        .catch((error) => {
            // Revert the state on error
            setIsLiked(previousState);
            console.error('Failed to toggle like:', error);
            toast.error('Failed to update like. Please try again.', {
                position: 'top-center',
                autoClose: 3000,
            });
        });
  };

  const handleBookmark = () => {
    if (!currentUser) {
      toast.error('Please login or create an account to bookmark artworks', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);
    
    api.toggleBookmark(artwork.id)
      .then(() => {
        onBookmark(artwork.id);
        // Show success message
        toast.success(
          previousState ? 'Removed from bookmarks' : 'Added to bookmarks', 
          {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      })
      .catch((error) => {
        // Revert the state on error
        setIsBookmarked(previousState);
        console.error('Failed to toggle bookmark:', error);
        toast.error('Failed to update bookmark. Please try again.', {
          position: 'top-center',
          autoClose: 3000,
        });
      });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <motion.div 
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
        {...animations}
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <LazyImage
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-64 group-hover:scale-110 transition-transform duration-500 cursor-pointer"
          aspectRatio=""
          placeholder="🎨"
          onClick={() => onImageClick && onImageClick(artwork)}
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-amber-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            {artwork.category}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          {/* Report Button */}
          <motion.button
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              if (!currentUser) {
                toast.error('Please login to report content', {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
                return;
              }
              setIsReportModalOpen(true);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Report artwork"
          >
            <FaFlag size={14} />
          </motion.button>
          
          {/* Bookmark Button */}
          <motion.button
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
              isBookmarked ? 'bg-amber-600 text-white' : 'bg-white/80 text-amber-600 hover:bg-amber-50'
            }`}
            onClick={handleBookmark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            {isBookmarked ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
          </motion.button>
          
          {/* Like Button */}
          <motion.button
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-red-500 hover:bg-red-50'
            }`}
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
          </motion.button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col space-y-4">
        {/* Title */}
        <motion.h3 
          className="text-xl font-bold text-amber-900 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {artwork.title}
        </motion.h3>
        
        {/* Description */}
        <motion.p 
          className="text-sm text-amber-700 leading-relaxed line-clamp-3 flex-grow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {artwork.description}
        </motion.p>
        
        {/* Footer */}
        <motion.div 
          className="flex items-center justify-between pt-4 border-t border-amber-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <div className="flex flex-col">
            <div className="text-sm">
              <span className="text-amber-700">By: </span>
              <Link 
                to={(() => {
                  const artistId = artwork.userId || artwork.artistId;
                  console.log('ArtCard - artwork.userId:', artwork.userId, 'type:', typeof artwork.userId);
                  console.log('ArtCard - artwork.artistId:', artwork.artistId, 'type:', typeof artwork.artistId);
                  console.log('ArtCard - final artistId:', artistId, 'type:', typeof artistId);
                  return artistId ? `/artist/${artistId}` : "#";
                })()}
                className="font-semibold text-amber-800 hover:text-amber-600 hover:underline transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                {artwork.artist}
              </Link>
            </div>
            <span className="text-xs text-gray-500">{formatDate(artwork.createdAt)}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-red-500">
              <FaHeart size={14} />
              <span className="text-sm font-medium">{artwork.likeCount ?? artwork.likes?.length ?? 0}</span>
            </div>
            <div className="flex items-center space-x-1 text-amber-600">
              <FaBookmark size={14} />
              <span className="text-sm font-medium">{artwork.bookmarkCount ?? artwork.bookmarks?.length ?? 0}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
    
    {/* Report Modal */}
    <ReportModal
      isOpen={isReportModalOpen}
      onClose={() => setIsReportModalOpen(false)}
      reportType="artwork"
      reportedItemId={artwork.id}
      reportedItemTitle={artwork.title}
    />
    </>
  );
};

export default ArtCard;

