// src/components/UserArtworks.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { api } from "../services/api";
import ContributeModal from "./ContributeModal";
import { globalEvents, ARTWORK_EVENTS } from "../utils/eventEmitter";

export default function UserArtworks({ userId }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);

  useEffect(() => {
    loadArtworks();
  }, [userId]);

  useEffect(() => {
    const unsubscribeCreated = globalEvents.on(ARTWORK_EVENTS.CREATED, (data) => {
      if (data.userId === userId) loadArtworks();
    });
    const unsubscribeUpdated = globalEvents.on(ARTWORK_EVENTS.UPDATED, (data) => {
      if (data.userId === userId) loadArtworks();
    });
    const unsubscribeDeleted = globalEvents.on(ARTWORK_EVENTS.DELETED, (data) => {
      if (data.userId === userId) loadArtworks();
    });

    const handleStorageChange = (e) => {
      if (e.key === 'artworkCreated') {
        loadArtworks();
        localStorage.removeItem('artworkCreated');
      }
    };

    const handleCustomEvent = () => {
      loadArtworks();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('artworkCreated', handleCustomEvent);

    return () => {
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeDeleted();
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('artworkCreated', handleCustomEvent);
    };
  }, [userId]);

  const loadArtworks = async () => {
    try {
      const currentUser = await api.getCurrentUser();
      if (!currentUser || !currentUser.user) throw new Error('Failed to get current user');
      const currentUserId = currentUser.user.id;

      const response = await api.getArtworks({ userId: currentUserId, limit: 50 });
      const artworksData = response?.data || response || [];
      setArtworks(Array.isArray(artworksData) ? artworksData : []);
    } catch (error) {
      toast.error('Failed to load artworks');
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleArtworkSubmit = async (artworkData) => {
    try {
      if (editingArtwork) {
        const response = await api.updateArtwork(editingArtwork._id || editingArtwork.id, artworkData);
        const updatedArtwork = response.data || response;
        setArtworks(prev => prev.map(a => (a._id || a.id) === (editingArtwork._id || editingArtwork.id) ? updatedArtwork : a));
        toast.success('Your artwork has been updated successfully!');
      } else {
        const response = await api.createArtwork(artworkData);
        const createdArtwork = response.data || response;
        setArtworks([createdArtwork, ...artworks]);
        toast.success('Your artwork has been added successfully!');
      }
      setShowModal(false);
      setEditingArtwork(null);
    } catch {
      toast.error(editingArtwork ? 'Failed to update artwork' : 'Failed to create artwork');
    }
  };

  const handleEdit = (artwork) => {
    setEditingArtwork(artwork);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingArtwork(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingArtwork(null);
  };

  const handleDelete = async (artworkId) => {
    const confirmed = window.confirm("Are you sure you want to delete this artwork?");
    if (!confirmed) return;

    try {
      await api.deleteArtwork(artworkId);
      setArtworks(prev => prev.filter(a => a._id !== artworkId));
      toast.success("Artwork deleted successfully");
    } catch {
      toast.error("Failed to delete artwork");
    }
  };

  const filteredArtworks = artworks.filter(artwork => {
    if (filter === 'all') return true;
    if (filter === 'published') return artwork.isPublic && artwork.isActive;
    if (filter === 'draft') return !artwork.isPublic || !artwork.isActive;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-xl font-serif text-transparent bg-gradient-to-r from-[#E05264] to-[#134856] bg-clip-text">
          Loading your artworks...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-transparent bg-gradient-to-r from-[#E05264] to-[#134856] bg-clip-text mb-2">
            My Artworks
          </h2>
          <p className="text-gray-600 font-serif">{artworks.length} total artworks</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="px-6 py-3 bg-gradient-to-r from-[#E05264] to-[#F7A072] text-white rounded-full hover:shadow-lg transition-all duration-300 font-serif font-medium"
        >
          + Add New Artwork
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-8">
        {[
          { id: 'all', label: 'All', count: artworks.length },
          { id: 'published', label: 'Published', count: artworks.filter(a => a.isPublic && a.isActive).length },
          { id: 'draft', label: 'Drafts', count: artworks.filter(a => !a.isPublic || !a.isActive).length }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full font-serif font-medium transition-all duration-300 ${
              filter === tab.id
                ? 'bg-gradient-to-r from-[#E05264] to-[#F7A072] text-white shadow-lg'
                : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white/90 border border-gray-200/50 hover:shadow-md'
            }`}
          >
            {tab.label} ({tab.count})
          </motion.button>
        ))}
      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No artworks yet</h3>
          <p className="text-gray-500 mb-6">Start sharing your artistic creations with the community!</p>
          <button 
            onClick={handleAddNew}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Create Your First Artwork
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork) => (
            <div key={artwork._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={artwork.imageUrl || artwork.image} 
                  alt={artwork.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    (artwork.isPublic && artwork.isActive) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {(artwork.isPublic && artwork.isActive) ? '✓ Published' : '📝 Draft'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{artwork.title}</h3>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    ⋯
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-3">{artwork.category || artwork.artform}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <span className="text-red-500 mr-1">❤️</span>
                    <span className="text-sm">{(artwork.likes && artwork.likes.length) || 0} likes</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(artwork)}
                      className="px-3 py-1 text-sm text-teal-600 hover:bg-teal-50 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(artwork._id)}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-3">
                  Created {artwork.createdAt ? new Date(artwork.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Unified Stats Section */}
      <div className="mt-12 rounded-2xl p-8 bg-gradient-to-br from-[#1D7C6F] to-[#F48C8C] text-white font-lora grid grid-cols-2 md:grid-cols-4 gap-6 shadow-lg">
        <div className="text-center">
          <div className="text-2xl font-bold">{artworks.length}</div>
          <div>Total Artworks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {artworks.filter(a => a.isPublic && a.isActive).length}
          </div>
          <div>Published</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {artworks.reduce((total, a) => total + ((a.likes?.length) || 0), 0)}
          </div>
          <div>Total Likes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {artworks.length > 0
              ? Math.round(artworks.reduce((total, a) => total + ((a.likes?.length) || 0), 0) / artworks.length)
              : 0}
          </div>
          <div>Avg. Likes</div>
        </div>
      </div>

      <ContributeModal 
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleArtworkSubmit}
        editingArtwork={editingArtwork}
      />
    </div>
  );
}
