import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './LivingArtistMosaic.css';

const LivingArtistMosaic = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                setLoading(true);
                const response = await api.getArtists({ 
                    limit: 6, 
                    sortBy: 'createdAt', 
                    sortOrder: 'desc' 
                });
                
                if (response.success && response.data) {
                    setArtists(response.data.slice(0, 6)); // Limit to 6 for compact display
                } else {
                    setError('No artists found');
                }
            } catch (err) {
                console.error('Error fetching artists:', err);
                setError('Failed to load artists');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    const handleArtistClick = (artistId) => {
        navigate(`/artist/${artistId}`);
    };

    const handleViewAllClick = () => {
        navigate('/artists');
    };

    if (loading) {
        return (
            <div className="mosaic-container">
                <div className="mosaic-header">
                    <h2 className="mosaic-title">Living Artist Mosaic</h2>
                    <div className="loading-shimmer">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="shimmer-tile"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || artists.length === 0) {
        return (
            <div className="mosaic-container">
                <div className="mosaic-header">
                    <h2 className="mosaic-title">Living Artist Mosaic</h2>
                    <p className="mosaic-subtitle">No artists available at the moment</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mosaic-container">
            <motion.div 
                className="mosaic-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="mosaic-title">Living Artist Mosaic</h2>
                <p className="mosaic-subtitle">
                    Meet the talented artists preserving India's cultural heritage
                </p>
            </motion.div>
            
            <motion.div 
                className="mosaic-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <AnimatePresence>
                    {artists.map((artist, index) => (
                        <motion.div 
                            key={artist._id}
                            className={`mosaic-tile ${artist.isNew ? 'new-artist' : ''}`}
                            style={{ 
                                backgroundImage: `url(${
                                    artist.signatureWork || artist.avatar || 
                                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop'
                                })` 
                            }}
                            onClick={() => handleArtistClick(artist._id)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="overlay">
                                <h3>{artist.name}</h3>
                                <div className="artist-info">
                                    <p className="artist-role">
                                        {artist.role === 'Artist' ? 'Traditional Artist' : artist.role}
                                    </p>
                                    <p className="artist-bio">
                                        {artist.bio || 'Passionate about preserving traditional arts'}
                                    </p>
                                    <div className="artist-stats">
                                        <span>👥 {artist.followersCount || 0}</span>
                                        <span>🎨 {artist.artworkCount || 0}</span>
                                    </div>
                                    {artist.isNew && (
                                        <div className="new-badge">
                                            ✨ Recently Joined
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            
            <motion.div 
                className="mosaic-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <button 
                    className="view-all-btn"
                    onClick={handleViewAllClick}
                >
                    View All Artists →
                </button>
                <button 
                    className="art-wall-btn"
                    onClick={() => navigate('/art-wall')}
                >
                    Explore Art Wall 🎨
                </button>
            </motion.div>
        </div>
    );
};

export default LivingArtistMosaic;
