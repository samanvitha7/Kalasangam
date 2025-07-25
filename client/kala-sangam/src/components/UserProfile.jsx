// src/components/UserProfile.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../utils/axios";
import ProfilePictureUpload from "./ProfilePictureUpload";
import RecentActivity from "./RecentActivity";
import { globalEvents, ARTWORK_EVENTS } from "../utils/eventEmitter";

export default function UserProfile({ profile, stats, onProfileUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile?.name || '',
    avatar: profile?.avatar || '',
    portfolioUrl: profile?.portfolioUrl || '',
    socialLinks: profile?.socialLinks || { instagram: '', twitter: '', website: '' }
  });
  const [saving, setSaving] = useState(false);
  const [localStats, setLocalStats] = useState(stats);

  // Update local stats when props change
  useEffect(() => {
    setLocalStats(stats);
  }, [stats]);

  // Listen for global events to update stats in real-time
  useEffect(() => {
    // Handle bookmark changes
    const unsubscribeBookmarked = globalEvents.on(ARTWORK_EVENTS.BOOKMARKED, (data) => {
      if (data.userId === profile?.id) {
        setLocalStats(prev => ({
          ...prev,
          bookmarksCount: (prev?.bookmarksCount || 0) + 1
        }));
      }
    });

    const unsubscribeUnbookmarked = globalEvents.on(ARTWORK_EVENTS.UNBOOKMARKED, (data) => {
      if (data.userId === profile?.id) {
        setLocalStats(prev => ({
          ...prev,
          bookmarksCount: Math.max((prev?.bookmarksCount || 0) - 1, 0)
        }));
      }
    });

    // Handle artwork creation
    const unsubscribeCreated = globalEvents.on(ARTWORK_EVENTS.CREATED, (data) => {
      if (data.userId === profile?.id) {
        // Refresh profile data when user creates artwork
        onProfileUpdate?.();
      }
    });

    return () => {
      unsubscribeBookmarked();
      unsubscribeUnbookmarked();
      unsubscribeCreated();
    };
  }, [profile?.id, onProfileUpdate]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      name: profile?.name || '',
      avatar: profile?.avatar || '',
      portfolioUrl: profile?.portfolioUrl || '',
      socialLinks: profile?.socialLinks || { instagram: '', twitter: '', website: '' }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/api/users/profile', editForm);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      onProfileUpdate();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      name: profile?.name || '',
      avatar: profile?.avatar || '',
      portfolioUrl: profile?.portfolioUrl || '',
      socialLinks: profile?.socialLinks || { instagram: '', twitter: '', website: '' }
    });
  };


  return (
    <div className="space-y-8">
        {/* Header Section */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-dm-serif bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Artist Profile
          </h2>
          {!isEditing && (
            <motion.button 
              onClick={handleEdit}
              className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-dm-serif"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </motion.button>
          )}
        </motion.div>

        {/* Profile Information */}
        <motion.div 
          className="grid md:grid-cols-5 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Avatar and Basic Info */}
          <div className="md:col-span-3 flex flex-col lg:flex-row gap-6">
            <div className="text-center lg:text-left">
              <ProfilePictureUpload 
                currentAvatar={editForm.avatar}
                userName={profile?.name}
                onAvatarChange={(newAvatar) => setEditForm({...editForm, avatar: newAvatar})}
                isEditing={isEditing}
              />
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium font-lora text-[#134856] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E05264] focus:border-transparent font-lora"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium font-lora text-[#134856] mb-1">
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={editForm.portfolioUrl}
                      onChange={(e) => setEditForm({...editForm, portfolioUrl: e.target.value})}
                      placeholder="https://your-portfolio.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E05264] focus:border-transparent font-lora"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-3xl font-bold font-dm-serif mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
                    {profile?.name}
                  </h3>
                  <p className="text-xl font-lora font-semibold text-[#E05264] mb-4">{profile?.email}</p>
                  {profile?.portfolioUrl && (
                    <a 
                      href={profile.portfolioUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#134856] hover:text-[#E05264] font-lora font-semibold mb-4 transition-colors"
                    >
                      🌐 Portfolio
                    </a>
                  )}
                  <div className="text-sm font-lora text-[#F48C8C]">
                    <p>Member since: {new Date(profile?.createdAt).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(profile?.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="md:col-span-2">
            {isEditing ? (
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-dm-serif text-[#134856] mb-3">Social Links</h4>
                
                <div>
                  <label className="block text-sm font-medium font-lora text-[#134856] mb-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={editForm.socialLinks.instagram}
                    onChange={(e) => setEditForm({
                      ...editForm, 
                      socialLinks: {...editForm.socialLinks, instagram: e.target.value}
                    })}
                    placeholder="https://instagram.com/username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E05264] focus:border-transparent font-lora text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium font-lora text-[#134856] mb-1">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={editForm.socialLinks.twitter}
                    onChange={(e) => setEditForm({
                      ...editForm, 
                      socialLinks: {...editForm.socialLinks, twitter: e.target.value}
                    })}
                    placeholder="https://twitter.com/username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E05264] focus:border-transparent font-lora text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium font-lora text-[#134856] mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={editForm.socialLinks.website}
                    onChange={(e) => setEditForm({
                      ...editForm, 
                      socialLinks: {...editForm.socialLinks, website: e.target.value}
                    })}
                    placeholder="https://your-website.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E05264] focus:border-transparent font-lora text-sm"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <motion.button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-dm-serif disabled:opacity-50 flex-1"
                    whileHover={{ scale: saving ? 1 : 1.05, y: saving ? 0 : -2 }}
                    whileTap={{ scale: saving ? 1 : 0.95 }}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </motion.button>
                  <motion.button
                    onClick={handleCancel}
                    className="bg-white text-[#134856] border border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 font-dm-serif flex-1"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-bold font-dm-serif text-[#134856] mb-3">Connect</h4>
                <div className="space-y-2">
                  {profile?.socialLinks?.instagram && (
                    <a 
                      href={profile.socialLinks.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-[#134856] hover:text-[#E05264] font-lora transition-colors"
                    >
                      📷 Instagram
                    </a>
                  )}
                  {profile?.socialLinks?.twitter && (
                    <a 
                      href={profile.socialLinks.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-[#134856] hover:text-[#E05264] font-lora transition-colors"
                    >
                      🐦 Twitter
                    </a>
                  )}
                  {profile?.socialLinks?.website && (
                    <a 
                      href={profile.socialLinks.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-[#134856] hover:text-[#E05264] font-lora transition-colors"
                    >
                      🌍 Website
                    </a>
                  )}
                  {(!profile?.socialLinks?.instagram && !profile?.socialLinks?.twitter && !profile?.socialLinks?.website) && (
                    <p className="text-[#F48C8C] font-lora text-sm">No social links added yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Statistics Cards */}
        {/* Unified Statistics Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold font-dm-serif mb-6 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Artist Statistics
          </h3>
          <div className="h-px bg-gradient-to-r from-[#134856]/30 via-[#e05264]/30 to-[#134856]/30 mb-8"></div>

          <motion.div
            className="rounded-3xl p-8 bg-gradient-to-r from-[#1D7C6F] to-[#F48C8C] shadow-[0_0_30px_rgba(244,140,140,0.3)] text-white"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-lora">
              <div>
                <div className="text-3xl font-bold mb-1">{localStats?.likesCount || 0}</div>
                <div className="text-sm font-medium">Likes Given</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{localStats?.bookmarksCount || 0}</div>
                <div className="text-sm font-medium">Bookmarks</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{stats?.followsCount || 0}</div>
                <div className="text-sm font-medium">Following</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{stats?.followersCount || 0}</div>
                <div className="text-sm font-medium">Followers</div>
              </div>
            </div>
          </motion.div>
        </motion.div>


        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold font-dm-serif mb-6 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Recent Activity
          </h3>
          <div className="h-px bg-gradient-to-r from-[#134856]/30 via-[#e05264]/30 to-[#134856]/30 mb-8"></div>
          <div className="bg-gray-50/80 border-2 border-[#e05264]/20 shadow-[0_0_20px_rgba(224,82,100,0.2)] rounded-2xl p-6">
            <RecentActivity userId={profile?.id} />
          </div>
        </motion.div>
    </div>
  );
}
