// src/components/UserArtworks.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { api } from "../services/api";
import ContributeModal from "./ContributeModal";

export default function UserArtworks({ userId }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, draft
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadArtworks();
  }, [userId]);

  const loadArtworks = async () => {
    try {
      const response = await api.getArtworks({ userId: userId, limit: 50 });
      // Handle both possible response structures
      const artworksData = response?.data || response || [];
      setArtworks(Array.isArray(artworksData) ? artworksData : []);
    } catch (error) {
      console.error('Failed to load artworks:', error);
      toast.error('Failed to load artworks');
      setArtworks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleArtworkSubmit = async (newArtwork) => {
    try {
      const createdArtwork = await api.createArtwork(newArtwork);
      setArtworks([createdArtwork, ...artworks]);
      setShowModal(false);
      toast.success('Your artwork has been added successfully!');
    } catch (error) {
      console.error('Failed to create artwork:', error);
      toast.error('Failed to create artwork');
    }
  };

  const handleDelete = async (artworkId) => {
    const confirmed = window.confirm("Are you sure you want to delete this artwork?");
    if (!confirmed) return;

    try {
      await api.deleteArtwork(artworkId);
      setArtworks(prev => prev.filter(a => a._id !== artworkId));
      toast.success("Artwork deleted successfully");
    } catch (error) {
      console.error('Failed to delete artwork:', error);
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
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-teal-600">Loading your artworks...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-teal-800">My Artworks</h2>
          <p className="text-gray-600 mt-1">{artworks.length} total artworks</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === tab.id
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No artworks yet</h3>
          <p className="text-gray-500 mb-6">Start sharing your artistic creations with the community!</p>
          <button 
            onClick={() => setShowModal(true)}
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
                    <button className="px-3 py-1 text-sm text-teal-600 hover:bg-teal-50 rounded">
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

      {/* Stats */}
      <div className="mt-12 grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">{artworks.length}</div>
          <div className="text-purple-800 font-medium">Total Artworks</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {artworks.filter(a => a.isPublic && a.isActive).length}
          </div>
          <div className="text-green-800 font-medium">Published</div>
        </div>
        
        <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-red-600">
            {artworks.reduce((total, artwork) => total + ((artwork.likes && artwork.likes.length) || 0), 0)}
          </div>
          <div className="text-red-800 font-medium">Total Likes</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {artworks.length > 0 ? Math.round(artworks.reduce((total, artwork) => total + ((artwork.likes && artwork.likes.length) || 0), 0) / artworks.length) : 0}
          </div>
          <div className="text-blue-800 font-medium">Avg. Likes</div>
        </div>
      </div>

      {/* Contribute Modal */}
      <ContributeModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleArtworkSubmit}
      />
    </div>
  );
}
