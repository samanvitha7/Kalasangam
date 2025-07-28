import React, { useState, useEffect } from 'react';
import { followingApi } from '../services/followingApi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const FollowButton = ({ userId, className = '', onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userId && userId !== user?._id) {
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

    if (userId === user?._id) {
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
  if (!isAuthenticated || userId === user?._id) {
    return null;
  }

  return (
    <button
      onClick={handleFollowToggle}
      disabled={isLoading}
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${isFollowing 
          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300' 
          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
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
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Following</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Follow</span>
        </div>
      )}
    </button>
  );
};

export default FollowButton;
