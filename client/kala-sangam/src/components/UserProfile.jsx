// src/components/UserProfile.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";
import ProfilePictureUpload from "./ProfilePictureUpload";

export default function UserProfile({ profile, stats, onProfileUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile?.name || '',
    avatar: profile?.avatar || ''
  });
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      name: profile?.name || '',
      avatar: profile?.avatar || ''
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
      avatar: profile?.avatar || ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-teal-800">Artist Profile</h2>
          {!isEditing && (
            <button 
              onClick={handleEdit}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar */}
          <div className="text-center">
            <ProfilePictureUpload 
              currentAvatar={editForm.avatar}
              userName={profile?.name}
              onAvatarChange={(newAvatar) => setEditForm({...editForm, avatar: newAvatar})}
              isEditing={isEditing}
            />
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{profile?.name}</h3>
                <p className="text-gray-600 mb-4">{profile?.email}</p>
                <div className="text-sm text-gray-500">
                  <p>Member since: {new Date(profile?.createdAt).toLocaleDateString()}</p>
                  <p>Last updated: {new Date(profile?.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-2">{stats?.likesCount || 0}</div>
          <div className="text-pink-800 font-medium">Likes Given</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{stats?.followsCount || 0}</div>
          <div className="text-blue-800 font-medium">Following</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{stats?.followersCount || 0}</div>
          <div className="text-green-800 font-medium">Followers</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h3 className="text-2xl font-bold text-teal-800 mb-6">Recent Activity</h3>
        <div className="text-center py-12 text-gray-500">
          <p>Activity feed coming soon...</p>
          <p className="text-sm mt-2">Your recent likes, follows, and artwork submissions will appear here.</p>
        </div>
      </div>
    </div>
  );
}
