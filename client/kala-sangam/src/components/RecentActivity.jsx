import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/axios';

export default function RecentActivity({ userId }) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadActivity();
  }, []);

  // Listen for artwork creation events to refresh activity
  useEffect(() => {
    const handleArtworkCreated = () => {
      console.log('RecentActivity: Artwork created, refreshing activity...');
      loadActivity();
    };
    
    window.addEventListener('artworkCreated', handleArtworkCreated);
    
    return () => {
      window.removeEventListener('artworkCreated', handleArtworkCreated);
    };
  }, []);

  const loadActivity = async () => {
    try {
      setLoading(true);
      // Try to load activity data
      const response = await api.get('/api/users/activity');
      setActivity(response.data.activity);
    } catch (error) {
      console.error('Error loading activity:', error);
      
      // If activity endpoint fails, create mock activity from stats
      try {
        const statsResponse = await api.get('/api/users/stats');
        const stats = statsResponse.data.stats;
        
        // Create mock activity based on available stats
        setActivity({
          likedArtworks: [],
          bookmarkedArtworks: [],
          myArtworks: [],
          totalLikes: stats.likesCount || 0,
          totalBookmarks: stats.bookmarksCount || 0,
          totalArtworks: stats.artworksCount || 0
        });
      } catch (statsError) {
        console.error('Error loading stats fallback:', statsError);
        setError('Failed to load recent activity');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E05264]"></div>
        <span className="ml-3 text-[#134856] font-lora">Loading activity...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-lg font-lora text-red-500">{error}</p>
      </div>
    );
  }

  // Check if we have any activity data to show
  const hasActivities = activity && (
    (activity.likedArtworks && activity.likedArtworks.length > 0) ||
    (activity.bookmarkedArtworks && activity.bookmarkedArtworks.length > 0) ||
    (activity.myArtworks && activity.myArtworks.length > 0)
  );

  // If no activity but we have stats, show just the summary
  if (!activity) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎨</div>
        <p className="text-xl font-lora font-semibold text-[#E05264] mb-2">No recent activity yet</p>
        <p className="text-[#F48C8C] font-lora">Start exploring artworks to build your activity feed!</p>
      </div>
    );
  }

  const ActivityItem = ({ item, type, icon }) => (
    <motion.div
      className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all cursor-pointer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-shrink-0">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] flex items-center justify-center text-white text-xl">
            🎨
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-lg">{icon}</span>
          <p className="text-sm font-semibold text-[#134856] font-lora">
            {type === 'liked' && 'Liked artwork'}
            {type === 'bookmarked' && 'Bookmarked artwork'}
            {type === 'created' && 'Created artwork'}
          </p>
        </div>
        <p className="text-base font-medium text-[#E05264] truncate font-dm-serif">
          {item.title || 'Untitled'}
        </p>
        <p className="text-xs text-[#F48C8C] font-lora">
          {item.category && `${item.category} • `}
          {new Date(item.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>
    </motion.div>
  );

  // Combine and sort all activities by date
  const allActivities = [];

  // Add liked artworks
  if (activity.likedArtworks) {
    activity.likedArtworks.forEach(item => {
      allActivities.push({ ...item, activityType: 'liked', icon: '❤️' });
    });
  }

  // Add bookmarked artworks
  if (activity.bookmarkedArtworks) {
    activity.bookmarkedArtworks.forEach(item => {
      allActivities.push({ ...item, activityType: 'bookmarked', icon: '🔖' });
    });
  }

  // Add user's own artworks
  if (activity.myArtworks) {
    activity.myArtworks.forEach(item => {
      allActivities.push({ ...item, activityType: 'created', icon: '🎨' });
    });
  }

  // Sort by creation date (most recent first)
  allActivities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Take only the most recent 10 items
  const recentActivities = allActivities.slice(0, 10);

  return (
    <div className="space-y-4">
      {/* Activity Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-white/30 rounded-xl">
          <div className="text-2xl font-bold text-[#134856] font-dm-serif">{activity.totalLikes || 0}</div>
          <div className="text-sm text-[#E05264] font-lora">Likes</div>
        </div>
        <div className="text-center p-3 bg-white/30 rounded-xl">
          <div className="text-2xl font-bold text-[#134856] font-dm-serif">{activity.totalBookmarks || 0}</div>
          <div className="text-sm text-[#E05264] font-lora">Bookmarks</div>
        </div>
        <div className="text-center p-3 bg-white/30 rounded-xl">
          <div className="text-2xl font-bold text-[#134856] font-dm-serif">{activity.totalArtworks || 0}</div>
          <div className="text-sm text-[#E05264] font-lora">Artworks</div>
        </div>
      </div>

      {/* Recent Activities List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentActivities.length > 0 ? (
          recentActivities.map((item, index) => (
            <motion.div
              key={`activity-${item._id || item.id}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ActivityItem
                item={item}
                type={item.activityType}
                icon={item.icon}
              />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🎨</div>
            <p className="text-lg font-lora font-semibold text-[#E05264] mb-2">No recent activities to show</p>
            <p className="text-[#F48C8C] font-lora text-sm">
              {(activity.totalLikes + activity.totalBookmarks + activity.totalArtworks) > 0 
                ? "Your detailed activity will appear here as you interact with artworks."
                : "Start exploring artworks to build your activity feed!"
              }
            </p>
          </div>
        )}
      </div>

      {allActivities.length > 10 && (
        <div className="text-center pt-4">
          <p className="text-sm text-[#F48C8C] font-lora">
            Showing latest 10 activities
          </p>
        </div>
      )}
    </div>
  );
}
