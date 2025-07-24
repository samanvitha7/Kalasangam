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
import { FaUser, FaPalette, FaCalendarAlt, FaHeart, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";

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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'artworks', label: 'My Artworks', icon: FaPalette },
    { id: 'events', label: 'My Events', icon: FaCalendarAlt },
    { id: 'likes', label: 'Liked Posts', icon: FaHeart },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F48C8C]/10 via-white to-[#134856]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#E05264] mx-auto mb-4"></div>
          <p className="text-2xl font-dm-serif text-transparent bg-clip-text bg-gradient-to-r from-[#E05264] to-[#134856]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/10">
      <FloatingParticles />
      <FullBleedDivider />
      
      {/* Header */}
      <header className="bg-blush-peach/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-3 rounded-md text-[#134856] hover:text-[#E05264] hover:bg-[#E05264]/10 transition-all duration-200"
            >
              <FaBars className="w-5 h-5" />
            </button>
            
            {/* Profile section */}
            <div className="flex items-center space-x-5">
              <img
                src={profile?.avatar || '/default-avatar.png'}
                alt={user?.name}
                className="w-12 h-12 rounded-full border-2 border-gradient-to-r from-[#E05264] to-[#134856] shadow-lg"
              />
              <div className="text-left hidden sm:block">
                <h1 className="text-xl font-dm-serif text-transparent bg-clip-text bg-gradient-to-r from-[#E05264] to-[#134856]">{user?.name}</h1>
                <p className="text-base font-lora text-[#134856]/70">Artist Dashboard</p>
              </div>
            </div>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-[#134856] to-[#E05264] text-white hover:from-red-600 hover:to-red-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg font-lora"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-64 bg-blush-peach/95 backdrop-blur-sm border-r border-[#E05264]/20 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 shadow-lg`}>
          <div className="h-full px-4 py-8 overflow-y-autobg-blush-peach/95">
            {/* Navigation Header */}
            <div className="mb-8">
              <h3 className="text-lg font-dm-serif text-transparent bg-clip-text bg-gradient-to-r from-[#134856] to-[#E05264]">Dashboard</h3>
              <div className="mt-2 h-px bg-gradient-to-r from-[#134856]/30 to-[#E05264]/30"></div>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-5 py-4 text-left rounded-full transition-all duration-200 font-lora ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-[#E05264] to-[#E05264]/80 text-white shadow-lg shadow-[#E05264]/30 transform scale-105'
                        : 'text-[#134856] hover:bg-[#E05264]/10 hover:text-[#E05264] hover:shadow-md hover:scale-102'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Page Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 capitalize">
                    {menuItems.find(item => item.id === activeTab)?.label}
                  </h2>
                  <div className="mt-2 h-px bg-gray-200"></div>
                </div>

                {/* Content */}
                <div className="bg-transparent rounded-lg shadow-sm">
                  {activeTab === 'profile' && (
                    <div className="p-6">
                      <UserProfile 
                        profile={profile} 
                        stats={stats} 
                        onProfileUpdate={loadUserData}
                      />
                    </div>
                  )}
                  {activeTab === 'artworks' && (
                    <div className="p-6">
                      <UserArtworks userId={user?.id} />
                    </div>
                  )}
                  {activeTab === 'events' && (
                    <div className="p-6">
                      <UserEvents userId={user?.id} />
                    </div>
                  )}
                  {activeTab === 'likes' && (
                    <div className="p-6">
                      <UserLikedArtworks userId={user?.id} />
                    </div>
                  )}
                  {activeTab === 'settings' && (
                    <div className="p-6">
                      <UserSettings 
                        user={user}
                        onLogout={handleLogout}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

