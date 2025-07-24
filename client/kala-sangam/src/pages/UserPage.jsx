// src/pages/UserPage.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import UserProfile from "../components/UserProfile";
import UserSettings from "../components/UserSettings";
import UserArtworks from "../components/UserArtworks";
import UserEvents from "../components/UserEvents";
import UserLikedArtworks from "../components/UserLikedArtworks";
import FullBleedDivider from "../components/FullBleedDivider";

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

  // Floating particles for background (matching ArtWall and About)
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      color: [
        'rgba(19, 72, 86, 0.6)',
        'rgba(224, 82, 100, 0.6)',
        'rgba(244, 140, 140, 0.6)',
        'rgba(29, 124, 111, 0.6)',
        'rgba(255, 215, 0, 0.6)'
      ][Math.floor(Math.random() * 5)],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 8 + Math.random() * 6
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-40"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 25, -25, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: particle.animationDuration,
              repeat: Infinity,
              delay: particle.animationDelay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8E6DA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#E05264] mx-auto mb-4"></div>
          <p className="text-xl font-lora text-[#E05264]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8E6DA] pb-8 overflow-hidden">
      <FullBleedDivider />
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2 mb-8">
            <div className="bg-[#F8E6DA] rounded-2xl p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <motion.img 
                    src={profile?.avatar || '/default-avatar.png'} 
                    alt={user?.name} 
                    className="w-20 h-20 rounded-full border-4 border-white shadow-xl" 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                  <div className="text-left">
                    <h1 className="text-4xl font-dm-serif font-bold mb-2 bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
                      {user?.name}
                    </h1>
                    <p className="text-xl font-lora font-semibold text-[#E05264]">Artist Dashboard</p>
                  </div>
                </div>
                <motion.button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-dm-serif"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <motion.div 
          className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-[#F8E6DA] rounded-2xl p-6">
            <nav className="flex flex-wrap justify-center gap-4">
              {[
                { id: 'profile', label: 'Profile', icon: '👤' },
                { id: 'artworks', label: 'My Artworks', icon: '🎨' },
                { id: 'events', label: 'My Events', icon: '📅' },
                { id: 'likes', label: 'Liked Posts', icon: '❤️' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white shadow-lg'
                      : 'bg-white text-[#134856] hover:bg-gray-50 border border-gray-200'
                  } font-dm-serif`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'profile' && (
              <UserProfile 
                profile={profile} 
                stats={stats} 
                onProfileUpdate={loadUserData}
              />
            )}
            {activeTab === 'artworks' && (
              <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2">
                <div className="bg-[#F8E6DA] rounded-2xl p-8">
                  <UserArtworks userId={user?.id} />
                </div>
              </div>
            )}
            {activeTab === 'events' && (
              <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2">
                <div className="bg-[#F8E6DA] rounded-2xl p-8">
                  <UserEvents userId={user?.id} />
                </div>
              </div>
            )}
            {activeTab === 'likes' && (
              <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2">
                <div className="bg-[#F8E6DA] rounded-2xl p-8">
                  <UserLikedArtworks userId={user?.id} />
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2">
                <div className="bg-[#F8E6DA] rounded-2xl p-8">
                  <UserSettings 
                    user={user}
                    onLogout={handleLogout}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

