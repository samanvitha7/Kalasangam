import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaBookmark, FaImage } from 'react-icons/fa';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import ArtCard from './ArtCard';

const UserLikedArtworks = ({ userId }) => {
  const [likedArtworks, setLikedArtworks] = useState([]);
  const [bookmarkedArtworks, setBookmarkedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('liked');

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get current user data with their likes and bookmarks arrays
      const userResponse = await api.getCurrentUser();
      if (!userResponse || !userResponse.user) {
        throw new Error('Failed to get current user');
      }
      
      const currentUser = userResponse.user;
      const userLikes = currentUser.likes || [];
      const userBookmarks = currentUser.bookmarks || [];
      
      console.log('Loading liked/bookmarked artworks for user:', currentUser.id);
      console.log('User likes array:', userLikes);
      console.log('User bookmarks array:', userBookmarks);
      
      // If user has no likes or bookmarks, set empty arrays
      if (userLikes.length === 0 && userBookmarks.length === 0) {
        console.log('User has no likes or bookmarks');
        setLikedArtworks([]);
        setBookmarkedArtworks([]);
        return;
      }
      
      // Get all artworks to find the ones user liked/bookmarked
      const artworksResponse = await api.getArtworks({ limit: 200 });
      const artworksData = artworksResponse?.data || artworksResponse || [];
      
      console.log('All artworks loaded:', artworksData.length);
      
      if (Array.isArray(artworksData)) {
        // Transform artworks and filter by user's likes/bookmarks
        const allArtworks = artworksData.map(artwork => ({
          id: artwork._id || artwork.id,
          title: artwork.title || artwork.name,
          description: artwork.description,
          artist: artwork.artist || 'Cultural Heritage',
          imageUrl: artwork.imageUrl || artwork.image,
          category: artwork.category || 'Traditional Art',
          likes: artwork.likes || 0,
          bookmarks: artwork.bookmarks || 0,
          createdAt: artwork.createdAt || new Date().toISOString(),
          userId: artwork.userId || artwork.artistId,
          origin: artwork.origin,
          likesArray: artwork.likesArray || [],
          bookmarksArray: artwork.bookmarksArray || []
        }));
        
        // Filter liked artworks - artworks whose ID is in user's likes array
        const liked = allArtworks.filter(artwork => {
          const artworkId = artwork.id.toString();
          const isLiked = userLikes.some(likedId => likedId.toString() === artworkId);
          if (isLiked) {
            console.log('Found liked artwork:', artwork.title);
          }
          return isLiked;
        });
        
        // Filter bookmarked artworks - artworks whose ID is in user's bookmarks array
        const bookmarked = allArtworks.filter(artwork => {
          const artworkId = artwork.id.toString();
          const isBookmarked = userBookmarks.some(bookmarkedId => bookmarkedId.toString() === artworkId);
          if (isBookmarked) {
            console.log('Found bookmarked artwork:', artwork.title);
          }
          return isBookmarked;
        });
        
        console.log('Filtered liked artworks:', liked.length);
        console.log('Filtered bookmarked artworks:', bookmarked.length);
        
        setLikedArtworks(liked);
        setBookmarkedArtworks(bookmarked);
      } else {
        console.log('No artworks data or invalid format');
        setLikedArtworks([]);
        setBookmarkedArtworks([]);
      }
    } catch (error) {
      console.error('Error fetching user artwork data:', error);
      toast.error('Failed to load your artworks');
      setLikedArtworks([]);
      setBookmarkedArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (artworkId) => {
    try {
      await api.toggleLike(artworkId);
      // Remove from liked artworks since user unliked it
      setLikedArtworks(prev => prev.filter(artwork => artwork.id !== artworkId));
      toast.success('Artwork unliked');
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  const handleBookmark = async (artworkId) => {
    try {
      await api.toggleBookmark(artworkId);
      // Remove from bookmarked artworks since user unbookmarked it
      setBookmarkedArtworks(prev => prev.filter(artwork => artwork.id !== artworkId));
      toast.success('Bookmark removed');
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

  const currentArtworks = activeTab === 'liked' ? likedArtworks : bookmarkedArtworks;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E05264]"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
          <button
            onClick={() => setActiveTab('liked')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'liked'
                ? 'bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white shadow-lg'
                : 'text-[#134856] hover:bg-gray-50'
            } font-dm-serif`}
          >
            <FaHeart className="text-red-500" />
            Liked Artworks ({likedArtworks.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarked')}
            className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'bookmarked'
                ? 'bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white shadow-lg'
                : 'text-[#134856] hover:bg-gray-50'
            } font-dm-serif`}
          >
            <FaBookmark className="text-amber-600" />
            Bookmarked ({bookmarkedArtworks.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {currentArtworks.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">
            {activeTab === 'liked' ? '❤️' : '🔖'}
          </div>
          <h3 className="text-2xl font-semibold font-dm-serif mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            No {activeTab === 'liked' ? 'Liked' : 'Bookmarked'} Artworks
          </h3>
          <p className="text-[#E05264] font-lora mb-4">
            You haven't {activeTab === 'liked' ? 'liked' : 'bookmarked'} any artworks yet.
          </p>
          <p className="text-gray-500 font-lora">
            Visit the Art Wall to discover and {activeTab === 'liked' ? 'like' : 'bookmark'} amazing artworks!
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {currentArtworks.map((artwork, index) => (
            <ArtCard
              key={artwork.id}
              artwork={artwork}
              index={index}
              currentUser={{ likes: likedArtworks.map(a => a.id) }}
              isBookmarked={activeTab === 'bookmarked' || bookmarkedArtworks.some(a => a.id === artwork.id)}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onImageClick={() => {}} // Implement if needed
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default UserLikedArtworks;
