import React, { useState, useEffect } from 'react';
import { followingApi } from '../services/followingApi';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUsers, FaUserFriends, FaHeart } from 'react-icons/fa';
import VerificationBadge from './VerificationBadge';
import FollowButton from './FollowButton';

const FollowingLists = ({ showFollowing = true, showFollowers = true, compact = false }) => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('following');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFollowingData();
    }
  }, [isAuthenticated]);

  const fetchFollowingData = async () => {
    try {
      setLoading(true);
      
      const promises = [];
      if (showFollowing) {
        promises.push(followingApi.getFollowing());
      }
      if (showFollowers) {
        promises.push(followingApi.getFollowers());
      }

      const results = await Promise.all(promises);
      
      let followingIndex = 0;
      if (showFollowing) {
        const followingData = results[followingIndex];
        if (followingData.success) {
          setFollowing(followingData.following || []);
        }
        followingIndex++;
      }
      
      if (showFollowers) {
        const followersData = results[followingIndex];
        if (followersData.success) {
          setFollowers(followersData.followers || []);
        }
      }
    } catch (error) {
      console.error('Error fetching following data:', error);
    } finally {
      setLoading(false);
    }
  };

  const UserCard = ({ user, showFollowButton = true }) => (
    <motion.div
      className={`
        bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden
        ${compact ? 'p-3' : 'p-4'}
      `}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3">
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-gray-900 truncate ${compact ? 'text-sm' : 'text-base'}`}>
              {user.name}
            </h3>
            <VerificationBadge isVerified={user.isVerified} size="xs" />
          </div>
          {user.specialization && (
            <p className={`text-gray-600 truncate ${compact ? 'text-xs' : 'text-sm'}`}>
              {user.specialization}
            </p>
          )}
          {user.location && (
            <p className={`text-gray-500 truncate ${compact ? 'text-xs' : 'text-sm'}`}>
              📍 {user.location}
            </p>
          )}
        </div>

        {showFollowButton && (
          <FollowButton 
            userId={user._id} 
            className={compact ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'}
          />
        )}
      </div>
    </motion.div>
  );

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8">
        <FaUsers className="mx-auto text-gray-400 mb-4" size={48} />
        <p className="text-gray-600">Please log in to see your following lists.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading following data...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${compact ? '' : 'max-w-4xl mx-auto'}`}>
      {/* Tab Navigation */}
      {showFollowing && showFollowers && (
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('following')}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-200
              ${activeTab === 'following' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <FaUserFriends size={16} />
            <span>Following ({following.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('followers')}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-200
              ${activeTab === 'followers' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            <FaHeart size={16} />
            <span>Followers ({followers.length})</span>
          </button>
        </div>
      )}

      {/* Following List */}
      {(activeTab === 'following' || !showFollowers) && showFollowing && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaUserFriends className="text-blue-600" />
            Following ({following.length})
          </h3>
          
          {following.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FaUserFriends className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-2">You're not following anyone yet</p>
              <p className="text-gray-500 text-sm">Discover artists and start following to see their latest works!</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {following.map((user) => (
                <UserCard 
                  key={user._id} 
                  user={user} 
                  showFollowButton={false} // Don't show follow button for people we're already following
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Followers List */}
      {(activeTab === 'followers' || !showFollowing) && showFollowers && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FaHeart className="text-red-500" />
            Followers ({followers.length})
          </h3>
          
          {followers.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FaHeart className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-2">No followers yet</p>
              <p className="text-gray-500 text-sm">Share amazing artworks to attract followers!</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {followers.map((user) => (
                <UserCard 
                  key={user._id} 
                  user={user} 
                  showFollowButton={true}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowingLists;
