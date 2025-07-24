// src/components/UserProfile.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../utils/axios";
import ProfilePictureUpload from "./ProfilePictureUpload";

export default function UserProfile({ profile, stats, onProfileUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile?.name || '',
    avatar: profile?.avatar || '',
    portfolioUrl: profile?.portfolioUrl || '',
    socialLinks: profile?.socialLinks || { instagram: '', twitter: '', website: '' }
  });
  const [saving, setSaving] = useState(false);

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
    <div className="max-w-6xl mx-auto px-2">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2 mb-8">
        <div className="bg-[#F8E6DA] rounded-2xl p-6">

          <motion.div 
            className="flex items-center justify-between mb-6"
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
        </div>
      </div>

      {/* Statistics Cards */}
      <motion.div 
        className="grid md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-[#F8E6DA] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold font-dm-serif mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
              {stats?.likesCount || 0}
            </div>
            <div className="text-[#E05264] font-lora font-semibold">Likes Given</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-[#F8E6DA] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold font-dm-serif mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
              {stats?.bookmarksCount || 0}
            </div>
            <div className="text-[#E05264] font-lora font-semibold">Bookmarks</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-[#F8E6DA] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold font-dm-serif mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
              {stats?.followsCount || 0}
            </div>
            <div className="text-[#E05264] font-lora font-semibold">Following</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-[#F8E6DA] rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold font-dm-serif mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
              {stats?.followersCount || 0}
            </div>
            <div className="text-[#E05264] font-lora font-semibold">Followers</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2 mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="bg-[#F8E6DA] rounded-2xl p-8">
          <h3 className="text-3xl font-bold font-dm-serif mb-6 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Recent Activity
          </h3>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-xl font-lora font-semibold text-[#E05264] mb-2">Activity feed coming soon...</p>
            <p className="text-[#F48C8C] font-lora">Your recent likes, follows, and artwork submissions will appear here.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
