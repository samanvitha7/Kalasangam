import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './LivingArtistMosaic.css';

const LivingArtistMosaic = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Removed currentArtistIndex since no carousel
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [hoveredArtist, setHoveredArtist] = useState(null);
    // Removed view modes - only mosaic now
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Helper function to randomly select items from array
    const getRandomItems = (array, count) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                console.log('Fetching artists...');
                setLoading(true);
                setError(null);
                
                // Try to fetch all artists first
                const response = await api.getArtists();
                
                console.log('Artists API response:', response);

                if (response.success && response.data && response.data.length > 0) {
                    // Select 4 random artists from the response
                    const randomArtists = getRandomItems(response.data, 4);
                    console.log('Setting random artists data:', randomArtists);
                    setArtists(randomArtists);
                } else {
                    console.log('No artists found in response, using mock data');
                    // Fallback mock data
                    const mockArtists = [
                        {
                            _id: '1',
                            name: 'Ravi Shankar',
                            specialization: 'Classical Sitar',
                            location: 'Varanasi, Uttar Pradesh',
                            experience: '25+ years',
                            bio: 'A master of classical Indian music, preserving the ancient traditions of sitar playing through generations of knowledge.'
                        },
                        {
                            _id: '2',
                            name: 'Meera Devi',
                            specialization: 'Madhubani Painting',
                            location: 'Mithila, Bihar',
                            experience: '15+ years',
                            bio: 'Renowned for her intricate Madhubani paintings that tell stories of Indian mythology and culture.'
                        },
                        {
                            _id: '3',
                            name: 'Arjun Kumar',
                            specialization: 'Kathak Dance',
                            location: 'Lucknow, Uttar Pradesh',
                            experience: '20+ years',
                            bio: 'A passionate Kathak dancer and teacher, dedicated to preserving this beautiful classical dance form.'
                        },
                        {
                            _id: '4',
                            name: 'Lakshmi Nair',
                            specialization: 'Odissi',
                            location: 'Bhubaneswar, Odisha',
                            experience: '18+ years',
                            bio: 'Expert in Odissi, bringing ancient stories to life through graceful movements and sculpturesque poses.'
                        }
                    ];
                    setArtists(mockArtists);
                }
            } catch (err) {
                console.error('Error fetching artists:', err);
                setError('Failed to load artists');
                // Fallback mock data on error - just 4 artists
                const mockArtists = [
                    {
                        _id: '1',
                        name: 'Ravi Shankar',
                        specialization: 'Classical Sitar',
                        location: 'Varanasi, Uttar Pradesh',
                        experience: '25+ years',
                        bio: 'A master of classical Indian music, preserving the ancient traditions of sitar playing through generations of knowledge.'
                    },
                    {
                        _id: '2',
                        name: 'Meera Devi',
                        specialization: 'Madhubani Painting',
                        location: 'Mithila, Bihar',
                        experience: '15+ years',
                        bio: 'Renowned for her intricate Madhubani paintings that tell stories of Indian mythology and culture.'
                    },
                    {
                        _id: '3',
                        name: 'Arjun Kumar',
                        specialization: 'Kathak Dance',
                        location: 'Lucknow, Uttar Pradesh',
                        experience: '20+ years',
                        bio: 'A passionate Kathak dancer and teacher, dedicated to preserving this beautiful classical dance form.'
                    },
                    {
                        _id: '4',
                        name: 'Lakshmi Nair',
                        specialization: 'Odissi',
                        location: 'Bhubaneswar, Odisha',
                        experience: '18+ years',
                        bio: 'Expert in Odissi, bringing ancient stories to life through graceful movements and sculpturesque poses.'
                    }
                ];
                setArtists(mockArtists);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []); // Empty dependency array - fetch only once on mount

    

    

    // Removed carousel rotation since we only have mosaic view now

    const handleArtistClick = (artistId) => {
        navigate(`/artist/${artistId}`);
    };

    const handleViewAllClick = () => {
        navigate('/artists');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8E6DA] py-16 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="inline-block text-6xl font-dm-serif mb-6 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
                            Living Artists
                        </h1>
                        <p className="text-lg font-lora font-semibold text-[#E05264] max-w-3xl mx-auto leading-relaxed mb-10">
                            Discover talented artists preserving India's rich cultural heritage through traditional arts.
                        </p>
                    </div>
                    
                    {/* Loading skeleton with new design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-lg rounded-3xl border-2 border-white/30 shadow-2xl overflow-hidden min-h-[320px] animate-pulse">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-6 bg-[#134856]/20 rounded w-3/4"></div>
                                        <div className="w-4 h-4 bg-[#e05264]/20 rounded-full"></div>
                                    </div>
                                    <div className="h-4 bg-[#134856]/10 rounded mb-2"></div>
                                    <div className="h-4 bg-[#134856]/10 rounded mb-4 w-2/3"></div>
                                    <div className="space-y-3">
                                        <div className="h-3 bg-[#134856]/10 rounded"></div>
                                        <div className="h-3 bg-[#134856]/10 rounded"></div>
                                        <div className="h-3 bg-[#134856]/10 rounded"></div>
                                    </div>
                                    <div className="mt-6">
                                        <div className="h-10 bg-gradient-to-r from-[#134856]/20 to-[#e05264]/20 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || (!loading && artists.length === 0)) {
        return (
            <div className="min-h-screen bg-[#F8E6DA] py-16 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <h1 className="inline-block text-6xl font-dm-serif mb-6 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
                            Living Artists
                        </h1>
                        <p className="text-lg font-lora font-semibold text-[#E05264] max-w-3xl mx-auto leading-relaxed mb-10">
                            {error ? 'Unable to load artists at the moment.' : 'No artists available right now.'}
                        </p>
                    </div>
                    
                    <div className="text-center py-16">
                        <div className="bg-white/80 backdrop-blur-lg rounded-3xl border-2 border-white/30 shadow-2xl p-12 max-w-md mx-auto">
                            <div className="text-6xl mb-4">🎨</div>
                            <p className="text-[#134856] text-lg font-lora mb-6">
                                {error ? 'Please try again later' : 'Check back soon for amazing artists!'}
                            </p>
                            {error && (
                                <button 
                                    onClick={() => window.location.reload()}
                                    className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-6 py-3 rounded-full font-lora font-semibold hover:scale-105 transition-transform"
                                >
                                    Try Again
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Artist Card Component with 3D Effects
    const ArtistCard = ({ artist, index }) => {
        const [glowIntensity, setGlowIntensity] = useState(0);
        const [isHovered, setIsHovered] = useState(false);

        const cardVariants = {
            hidden: { 
                opacity: 0, 
                y: 20,
                scale: 0.95
            },
            visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                }
            },
            hover: {
                y: -10,
                scale: 1.03,
                transition: {
                    duration: 0.3,
                    ease: "easeOut"
                }
            }
        };

        return (
            <motion.div
                className="relative group cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onHoverStart={() => {
                    setIsHovered(true);
                    setGlowIntensity(1);
                }}
                onHoverEnd={() => {
                    setIsHovered(false);
                    setGlowIntensity(0);
                }}
                onClick={() => setSelectedArtist(artist)}
            >

                {/* Main Card */}
                <motion.div
                    className="relative h-full bg-gradient-to-br from-white/95 via-white/90 to-[#F8E6DA]/80 backdrop-blur-lg rounded-3xl border-2 border-white/30 shadow-2xl overflow-hidden transform-gpu min-h-[320px]"
                >

                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <motion.h3 
                                    className="font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent text-xl"
                                    animate={{
                                        scale: isHovered ? 1.05 : 1
                                    }}
                                >
                                    {artist.name}
                                </motion.h3>
                                <p className="text-[#134856]/70 font-lora text-sm mt-1">
                                    {artist.specialization || 'Traditional Artist'}
                                </p>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="text-[#134856]/80 font-lora leading-relaxed flex-1 text-sm">
                            {artist.bio || 'Passionate about preserving India\'s rich cultural heritage through traditional arts and crafts.'}
                        </p>

                        {/* Details */}
                        <div className="space-y-3 mt-4">
                            {[
                                { icon: '🎨', label: 'Art Form', value: artist.specialization || 'Traditional Arts' },
                                { icon: '📍', label: 'Location', value: artist.location || 'India' },
                                { icon: '⏳', label: 'Experience', value: artist.experience || '10+ years' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-center gap-3 text-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 + idx * 0.1 }}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    <span className="text-[#134856]/60 font-lora font-medium min-w-[70px]">{item.label}:</span>
                                    <span className="text-[#134856] font-lora font-semibold">{item.value}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Action Button */}
                        <motion.button
                            className="mt-6 w-full bg-gradient-to-r from-[#134856] to-[#e05264] text-white 
                                     py-3 rounded-full font-lora font-semibold shadow-lg
                                     hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleArtistClick(artist._id);
                            }}
                        >
                            Explore Portfolio
                        </motion.button>
                    </div>

                </motion.div>
            </motion.div>
        );
    };

    // Removed view mode toggle since we only have mosaic now

    return (
        <div ref={containerRef} className="bg-[#F8E6DA] py-8 relative overflow-hidden">
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1 
                        className="inline-block text-6xl font-dm-serif mb-6 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent"
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(224, 82, 100, 0.3)',
                                '0 0 40px rgba(224, 82, 100, 0.2)',
                                '0 0 20px rgba(224, 82, 100, 0.3)'
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        Living Artists
                    </motion.h1>
                    <motion.p 
                        className="text-lg font-lora font-semibold text-[#E05264] max-w-3xl mx-auto leading-relaxed mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Meet the passionate guardians of India's artistic legacy, each brushstroke and creation telling stories of tradition, innovation, and cultural preservation.
                    </motion.p>
                </motion.div>

                {/* Artists Display - Mosaic Only */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {artists.slice(0, 4).map((artist, index) => (
                        <ArtistCard key={artist._id} artist={artist} index={index} />
                    ))}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                    className="flex flex-wrap gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button 
                        onClick={handleViewAllClick}
                        className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-8 py-4 rounded-full font-lora font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Discover All Artists
                    </motion.button>
                    <motion.button 
                        onClick={() => navigate('/art-wall')}
                        className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-8 py-4 rounded-full font-lora font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Explore Art Gallery
                    </motion.button>
                </motion.div>
            </div>

            {/* Artist Detail Modal */}
            <AnimatePresence>
                {selectedArtist && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedArtist(null)}
                    >
                        <motion.div
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 100 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-3xl font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
                                            {selectedArtist.name}
                                        </h2>
                                        <p className="text-[#134856]/70 font-lora mt-2">{selectedArtist.specialization}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedArtist(null)}
                                        className="text-[#134856] hover:text-[#e05264] text-2xl transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                                
                                <p className="text-[#134856] font-lora leading-relaxed mb-6">
                                    {selectedArtist.bio || 'A passionate artist dedicated to preserving and promoting traditional Indian arts.'}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-[#F8E6DA]/50 p-4 rounded-2xl">
                                        <h4 className="font-dm-serif font-semibold text-[#134856] mb-2">Location</h4>
                                        <p className="font-lora text-[#134856]/80">{selectedArtist.location || 'India'}</p>
                                    </div>
                                    <div className="bg-[#F8E6DA]/50 p-4 rounded-2xl">
                                        <h4 className="font-dm-serif font-semibold text-[#134856] mb-2">Experience</h4>
                                        <p className="font-lora text-[#134856]/80">{selectedArtist.experience || '10+ years'}</p>
                                    </div>
                                </div>
                                
                                <motion.button
                                    onClick={() => {
                                        setSelectedArtist(null);
                                        handleArtistClick(selectedArtist._id);
                                    }}
                                    className="w-full bg-gradient-to-r from-[#134856] to-[#e05264] text-white py-4 rounded-full text-lg font-lora font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Visit Full Profile ✨
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LivingArtistMosaic;
