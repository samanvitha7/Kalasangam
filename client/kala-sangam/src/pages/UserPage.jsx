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

  const mainMenuItems = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'artworks', label: 'My Artworks', icon: FaPalette },
    { id: 'events', label: 'My Events', icon: FaCalendarAlt },
    { id: 'likes', label: 'Liked Posts', icon: FaHeart }
  ];

  const accountMenuItems = [
    { id: 'settings', label: 'Settings', icon: FaCog },
    { id: 'logout', label: 'Logout', icon: FaSignOutAlt, isAction: true }
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

  const handleMenuClick = (itemId) => {
    if (itemId === 'logout') {
      handleLogout();
    } else {
      setActiveTab(itemId);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-blush-peach">
      <FloatingParticles />
      <FullBleedDivider />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-2xl shadow-lg text-[#134856] hover:text-[#E05264] transition-all duration-200"
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Combined Container */}
      <div className="px-10 mt-10 mx-auto pb-10">
        <div className="rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-80 md:flex-shrink-0 bg-gradient-to-b from-[#134856] to-[#E05264]`}>
              <div className="h-full px-6 py-8 overflow-y-auto">
                {/* Navigation Header */}
                <div className="mb-8">
                  <h3 className="text-3xl font-bold font-dm-serif text-white">Dashboard</h3>
                  <p className="text-white text-sm mt-1 font-lora">Navigate your workspace</p>
                  <div className="mt-4 h-px bg-white/20"></div>
                  
                  {/* User Info */}
                  <div className="mt-4 flex items-center space-x-3">
                    <img
                      src={profile?.avatar || '/default-avatar.png'}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate font-dm-serif">{user?.name}</p>
                      <p className="text-xs text-white/70 truncate font-lora">Artist Account</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 h-px bg-white/20"></div>
                </div>
                
                {/* Navigation */}
                <nav className="space-y-2">
                  {/* Main Menu Items */}
                  {mainMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all duration-200 font-lora ${
                          isActive
                            ? 'bg-gradient-to-r from-[#E05264] to-[#E05264]/90 text-white shadow-md transform scale-[1.02]'
                            : 'text-white hover:bg-white/10 hover:shadow-sm'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                  
                  {/* Divider */}
                  <div className="mt-6 mb-4 h-px bg-white/20"></div>
                  
                  {/* Account Menu Items */}
                  {accountMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const isLogout = item.id === 'logout';
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full flex items-center px-4 py-3 text-left rounded-2xl transition-all duration-200 font-lora ${
                          isLogout
                            ? 'text-white hover:bg-red-500/20 hover:text-red-200'
                            : isActive
                              ? 'bg-gradient-to-r from-[#E05264] to-[#E05264]/90 text-white shadow-md transform scale-[1.02]'
                              : 'text-white hover:bg-white/10 hover:shadow-sm'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-gray-200"></div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  {/* Integrated Header inside container */}
                  <div className="bg-gradient-to-r from-[#134856] to-[#E05264] px-8 py-6 border-b border-gray-100">
                    <h2 className="text-4xl font-bold text-white capitalize font-dm-serif">
                      {[...mainMenuItems, ...accountMenuItems].find(item => item.id === activeTab && !item.isAction)?.label}
                    </h2>
                    <p className="text-white text-2xl text-sm mt-1 font-lora">
                      {activeTab === 'profile' && 'Manage your artist profile and personal information'}
                      {activeTab === 'artworks' && 'View and manage your uploaded artworks'}
                      {activeTab === 'events' && 'Track your event participation and history'}
                      {activeTab === 'likes' && 'Browse artworks you\'ve liked and saved'}
                      {activeTab === 'settings' && 'Configure your account preferences and settings'}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8">
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
                    {activeTab === 'events' && (
                      <UserEvents userId={user?.id} />
                    )}
                    {activeTab === 'likes' && (
                      <UserLikedArtworks userId={user?.id} />
                    )}
                    {activeTab === 'settings' && (
                      <UserSettings 
                        user={user}
                        onLogout={handleLogout}
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}


