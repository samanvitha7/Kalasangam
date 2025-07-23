import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import { api } from '../services/api';

const ArtistsList = () => {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  // Fetch artists from API
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.getArtists();
        if (response.success && response.data) {
          setArtists(response.data);
        } else {
          console.error('No artists found in response:', response);
          setArtists([]);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = artists
    .filter(artist => 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artist.artForm && artist.artForm.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (artist.location && artist.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'followers':
          return (b.followers || 0) - (a.followers || 0);
        case 'artworks':
          return (b.artworks ? b.artworks.length : 0) - (a.artworks ? a.artworks.length : 0);
        case 'likes':
          return (b.totalLikes || 0) - (a.totalLikes || 0);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800 font-medium">Loading artists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Traditional Artists
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Discover talented artists preserving India's rich traditional art heritage
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search artists by name, art form, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80"
              />
            </div>
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80"
              >
                <option value="name">Sort by Name</option>
                <option value="followers">Sort by Followers</option>
                <option value="artworks">Sort by Artworks</option>
                <option value="likes">Sort by Likes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Artists Count */}
        <div className="mb-6">
          <p className="text-amber-700 font-medium">
            {filteredArtists.length} artist{filteredArtists.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <Link
              key={artist._id}
              to={`/artist/${artist._id}`}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="text-center">
                {/* Featured Badge - could be based on premium status or other criteria */}
                {artist.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}

                {/* Profile Image */}
                <div className="relative mb-4 mx-auto w-20 h-20 rounded-full overflow-hidden ring-4 ring-amber-200 group-hover:ring-amber-400 transition-all">
                  <LazyImage
                    src={artist.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=f59e0b&color=ffffff&size=150`}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Artist Info */}
                <h3 className="font-bold text-lg text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {artist.name}
                </h3>
                
                <p className="text-amber-700 font-medium text-sm mb-1">
                  {artist.artForm || 'Traditional Artist'}
                </p>
                
                <p className="text-amber-600 text-xs mb-4">
                  {artist.location || 'India'}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-bold text-amber-800">{artist.artworks ? artist.artworks.length : 0}</div>
                    <div className="text-xs text-amber-600">Artworks</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-800">{artist.followers || 0}</div>
                    <div className="text-xs text-amber-600">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-800">{artist.totalLikes || 0}</div>
                    <div className="text-xs text-amber-600">Likes</div>
                  </div>
                </div>

                {/* View Profile Button */}
                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                  View Profile
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-amber-800 mb-2">No artists found</h3>
            <p className="text-amber-600">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Are you an artist?</h2>
          <p className="mb-6 opacity-90">
            Join our community of traditional artists and showcase your work to art lovers worldwide.
          </p>
          <Link
            to="/signup"
            className="inline-block px-6 py-3 bg-white text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors duration-300"
          >
            Become an Artist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistsList;
