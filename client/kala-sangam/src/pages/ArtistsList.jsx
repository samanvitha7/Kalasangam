import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';

const ArtistsList = () => {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);

  // Mock artists data - replace with API call
  useEffect(() => {
    const mockArtists = [
      {
        id: 1,
        name: "Rajesh Kumar",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        artForm: "Madhubani Painting",
        location: "Bihar, India",
        artworkCount: 24,
        followers: 1250,
        totalLikes: 3420,
        featured: true
      },
      {
        id: 2,
        name: "Priya Sharma",
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616c6d1b7a1?w=150&h=150&fit=crop&crop=face",
        artForm: "Warli Art",
        location: "Maharashtra, India",
        artworkCount: 18,
        followers: 890,
        totalLikes: 2156,
        featured: false
      },
      {
        id: 3,
        name: "Amit Patel",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        artForm: "Pattachitra",
        location: "Odisha, India",
        artworkCount: 31,
        followers: 1567,
        totalLikes: 4789,
        featured: true
      },
      {
        id: 4,
        name: "Kavitha Rao",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        artForm: "Tanjore Painting",
        location: "Tamil Nadu, India",
        artworkCount: 27,
        followers: 2103,
        totalLikes: 5634,
        featured: true
      },
      {
        id: 5,
        name: "Vikram Singh",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        artForm: "Miniature Painting",
        location: "Rajasthan, India",
        artworkCount: 22,
        followers: 967,
        totalLikes: 2834,
        featured: false
      }
    ];

    setTimeout(() => {
      setArtists(mockArtists);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredArtists = artists
    .filter(artist => 
      artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.artForm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'followers':
          return b.followers - a.followers;
        case 'artworks':
          return b.artworkCount - a.artworkCount;
        case 'likes':
          return b.totalLikes - a.totalLikes;
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
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50"
            >
              <div className="text-center">
                {/* Featured Badge */}
                {artist.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}

                {/* Profile Image */}
                <div className="relative mb-4 mx-auto w-20 h-20 rounded-full overflow-hidden ring-4 ring-amber-200 group-hover:ring-amber-400 transition-all">
                  <LazyImage
                    src={artist.profileImage}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Artist Info */}
                <h3 className="font-bold text-lg text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {artist.name}
                </h3>
                
                <p className="text-amber-700 font-medium text-sm mb-1">
                  {artist.artForm}
                </p>
                
                <p className="text-amber-600 text-xs mb-4">
                  {artist.location}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-bold text-amber-800">{artist.artworkCount}</div>
                    <div className="text-xs text-amber-600">Artworks</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-800">{artist.followers}</div>
                    <div className="text-xs text-amber-600">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-amber-800">{artist.totalLikes}</div>
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
