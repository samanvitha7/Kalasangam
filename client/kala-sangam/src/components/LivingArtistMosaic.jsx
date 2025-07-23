import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './LivingArtistMosaic.css';

const LivingArtistMosaic = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
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
                    const artistData = response.data.slice(0, 6);
                    setArtists(artistData);
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

    // Rotate through artists every 3 seconds
    useEffect(() => {
        if (artists.length > 0) {
            const interval = setInterval(() => {
                setCurrentArtistIndex((prevIndex) => (prevIndex + 1) % artists.length);
            }, 3000);
            
            return () => clearInterval(interval);
        }
    }, [artists]);

    const handleArtistClick = (artistId) => {
        navigate(`/artist/${artistId}`);
    };

    const handleViewAllClick = () => {
        navigate('/artists');
    };

    if (loading) {
        return (
            <div className="grid-container">
                <div className="container">
                    <div className="header">
                        <h1 className="title">Living Artists</h1>
                        <p className="subtitle">
                            Discover talented artists preserving India's rich cultural heritage through traditional arts.
                        </p>
                    </div>
                    
                    {/* Loading skeleton */}
                    <div className="artist-grid">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="artist-card animate-pulse">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-gray-200 rounded"></div>
                                        <div className="h-3 bg-gray-200 rounded"></div>
                                        <div className="h-3 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || artists.length === 0) {
        return (
            <div className="grid-container">
                <div className="container">
                    <div className="header">
                        <h1 className="title">Living Artists</h1>
                        <p className="subtitle">
                            {error ? 'Unable to load artists at the moment.' : 'No artists available right now.'}
                        </p>
                    </div>
                    
                    <div className="artist-grid">
                        <div className="col-span-full text-center py-16">
                            <p className="text-gray-500 text-lg">Check back soon for amazing artists!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid-container">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="title">
                        Living Artists
                    </h1>
                    <p className="subtitle">
                        Discover talented artists preserving India's rich cultural heritage through traditional arts.
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="artist-grid">
                        <AnimatePresence>
                            {artists.slice(0, 6).map((artist, index) => (
                                <motion.div
                                    key={artist._id}
                                    className="artist-card p-6 hover:shadow-lg transition-shadow border border-orange-100"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    onClick={() => handleArtistClick(artist._id)}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-[#9b2226] font-[Yatra One]">{artist.name}</h3>
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                                            Artist
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-4 line-clamp-2">{artist.bio || 'Passionate about preserving traditional arts'}</p>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                            <span><strong>Specialization:</strong> {artist.specialization || 'Traditional Arts'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                            <span><strong>Location:</strong> {artist.location || 'India'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                                            <span><strong>Experience:</strong> {artist.experience || '10+ years'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                            Active
                                        </span>
                                        
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleArtistClick(artist._id);
                                            }}
                                            className="bg-gradient-to-r from-[#582f0e] to-[#8b4513] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="footer">
                        <button onClick={handleViewAllClick}>View All Artists</button>
                        <button onClick={() => navigate('/art-wall')}>Explore Art Wall</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LivingArtistMosaic;
