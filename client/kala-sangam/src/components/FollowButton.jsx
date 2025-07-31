import React, { useState, useEffect } from 'react';
import { followingApi } from '../services/followingApi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCheck, FaPlus } from 'react-icons/fa';

const FollowButton = ({ userId, className = '', onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userId && userId !== user?.id && userId !== user?._id) {
      checkFollowStatus();
    }
  }, [userId, isAuthenticated, user]);

  const checkFollowStatus = async () => {
    try {
      const following = await followingApi.isFollowing(userId);
      setIsFollowing(following);
    } catch (error) {
      console.error('Error checking follow status:', error);
    }
  };

  const handleFollowToggle = async () => {
    if (!isAuthenticated) {
      alert('Please login to follow artists');
      return;
    }

    if (userId === user?.id || userId === user?._id) {
      alert('You cannot follow yourself');
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (isFollowing) {
        response = await followingApi.unfollowUser(userId);
        setIsFollowing(false);
        setFollowerCount(prev => Math.max(0, prev - 1));
        toast.info('Unfollowed artist');
      } else {
        response = await followingApi.followUser(userId);
        setIsFollowing(true);
        setFollowerCount(prev => prev + 1);
        toast.success('Following artist! They will be notified.');
      }

      // Notify parent component of follow change
      if (onFollowChange) {
        onFollowChange(isFollowing, followerCount);
      }

    } catch (error) {
      console.error('Error toggling follow:', error);
      alert(error.response?.data?.message || 'Failed to update follow status');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show follow button for own profile or if not authenticated
  if (!isAuthenticated || userId === user?.id || userId === user?._id) {
    return null;
  }

  return (
    <button
      onClick={handleFollowToggle}
      disabled={isLoading}
      className={`
        bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all font-dm-serif text-sm font-semibold flex items-center gap-2
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : isFollowing ? (
        <div className="flex items-center space-x-2">
          <FaCheck size={14} />
          <span>Following</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <FaPlus size={14} />
          <span>Follow</span>
        </div>
      )}
    </button>
  );
};

export default FollowButton;
