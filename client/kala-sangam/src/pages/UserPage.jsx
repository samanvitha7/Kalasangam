// src/pages/UserPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import UserProfile from "../components/UserProfile";
import UserSettings from "../components/UserSettings";
import UserArtworks from "../components/UserArtworks";

export default function UserPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadUserData();
  }, [user, navigate]);

  const loadUserData = async () => {
    try {
      const [profileRes, statsRes] = await Promise.all([
        api.get('/api/users/profile'),
        api.get('/api/users/stats')
      ]);
      
      setProfile(profileRes.data.user);
      setStats(statsRes.data.stats);
    } catch (error) {
      toast.error('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-teal-50 flex items-center justify-center">
        <div className="text-xl text-teal-600">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-teal-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-lg mt-4">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={profile?.avatar || '/default-avatar.png'} 
                alt={user?.name} 
                className="w-12 h-12 rounded-full border-2 border-teal-200" 
              />
              <div>
                <h1 className="text-2xl font-bold text-teal-800">{user?.name}</h1>
                <p className="text-gray-600">Artist Dashboard</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-coral-red text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'artworks', label: 'My Artworks', icon: '🎨' },
              { id: 'likes', label: 'Liked Posts', icon: '❤️' },
              { id: 'settings', label: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'profile' && (
          <UserProfile 
            profile={profile} 
            stats={stats} 
            onProfileUpdate={loadUserData}
          />
        )}
        {activeTab === 'artworks' && (
          <UserArtworks userId={user?.id} />
        )}
        {activeTab === 'likes' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Liked posts functionality coming soon...</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <UserSettings 
            user={user}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}

