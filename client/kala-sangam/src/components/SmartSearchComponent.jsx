import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaStar, FaClock, FaUser, FaPalette, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Header Smart Search Component - Compact version for navigation
const HeaderSmartSearch = ({ scrolled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [artistSuggestions, setArtistSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trending, setTrending] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchType, setSearchType] = useState('all'); // 'all', 'artists', 'artworks'
  const searchRef = useRef();
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Error parsing recent searches:', error);
      }
    }
  }, []);

  // Get search suggestions and artist suggestions
  useEffect(() => {
    const getSuggestions = async () => {
      if (searchTerm.length > 1) {
        try {
          setLoading(true);
          
          // Get general suggestions
          const suggestionsPromise = api.getSearchSuggestions(searchTerm).catch(() => ({ success: false }));
          
          // Get artist suggestions
          const artistsPromise = api.getArtists({ search: searchTerm, limit: 5 }).catch(() => ({ success: false }));
          
          const [suggestionsResponse, artistsResponse] = await Promise.all([suggestionsPromise, artistsPromise]);
          
          if (suggestionsResponse.success) {
            setSuggestions(suggestionsResponse.suggestions || []);
          } else {
            setSuggestions([]);
          }
          
          if (artistsResponse.success && artistsResponse.data) {
            setArtistSuggestions(artistsResponse.data.slice(0, 5));
          } else {
            setArtistSuggestions([]);
          }
        } catch (error) {
          console.error('Error getting suggestions:', error);
          setSuggestions([]);
          setArtistSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setArtistSuggestions([]);
      }
    };

    const debounce = setTimeout(getSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  // Get trending searches when dropdown opens
  useEffect(() => {
    const getTrending = async () => {
      try {
        const response = await api.getTrendingSearches();
        if (response.success) {
          setTrending(response.trending?.searches || []);
        }
      } catch (error) {
        console.error('Error getting trending searches:', error);
      }
    };

    if (showDropdown && trending.length === 0) {
      getTrending();
    }
  }, [showDropdown, trending.length]);

  // Save search to recent searches
  const saveToRecentSearches = (query) => {
    const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // Handle search submission
  const handleSearch = async (query = searchTerm, type = 'search') => {
    if (query.trim()) {
      setShowDropdown(false);
      setSearchTerm('');
      
      // Save to recent searches
      saveToRecentSearches(query);
      
      if (type === 'artist') {
        // Navigate to artist profile
        navigate(`/artist/${query}`);
      } else {
        // Navigate to search results page
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  // Handle artist selection
  const handleArtistSelect = (artist) => {
    setShowDropdown(false);
    setSearchTerm('');
    saveToRecentSearches(artist.name);
    navigate(`/artist/${artist._id}`);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <div className={`relative flex items-center transition-all duration-300 ${
        scrolled ? 'w-64' : 'w-72'
      }`}>
        <div className={`relative flex items-center w-full rounded-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-sm border border-tealblue/20' 
            : 'bg-white/80 backdrop-blur-sm border border-tealblue/30'
        }`}>
          <FaSearch className={`absolute left-4 transition-colors duration-300 ${
            scrolled ? 'text-tealblue/60' : 'text-tealblue/70'
          }`} size={14} />
          
          <input
            type="text"
            placeholder="Search artists, artworks... (try 'Priya', 'kerala dance')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className={`w-full pl-12 pr-12 py-2.5 rounded-full bg-transparent text-sm font-medium placeholder-gray-500 focus:outline-none transition-all duration-300 ${
              scrolled ? 'text-tealblue' : 'text-tealblue'
            }`}
          />
          
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-10 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={12} />
            </button>
          )}
          
          <FaStar className={`absolute right-4 transition-colors duration-300 ${
            scrolled ? 'text-rosered/60' : 'text-rosered/70'
          }`} size={14} />
        </div>
      </div>

      {/* Search Dropdown */}
      {showDropdown && (
        <div className={`absolute top-full mt-2 w-full max-w-md rounded-xl shadow-2xl z-50 border transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-tealblue/20'
            : 'bg-white/90 backdrop-blur-md border-tealblue/30'
        }`}>
          {/* Artist Suggestions */}
          {artistSuggestions.length > 0 && (
            <div className="p-4 border-b border-gray-200/50">
              <h4 className="text-sm font-semibold text-tealblue mb-2 flex items-center gap-2">
                <FaUser size={12} className="text-rosered" />
                Artists
              </h4>
              <div className="space-y-1">
                {artistSuggestions.map((artist) => (
                  <button
                    key={artist._id}
                    onClick={() => handleArtistSelect(artist)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-tealblue/10 rounded-lg transition-colors duration-200 font-medium flex items-center gap-3"
                  >
                    <img 
                      src={artist.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=134856&color=fff`}
                      alt={artist.name}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{artist.name}</div>
                      {artist.specialization && (
                        <div className="text-xs text-gray-500 truncate">{artist.specialization}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* General Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4 border-b border-gray-200/50">
              <h4 className="text-sm font-semibold text-tealblue mb-2 flex items-center gap-2">
                <FaPalette size={12} className="text-rosered" />
                Suggestions
              </h4>
              <div className="space-y-1">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-tealblue/10 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && searchTerm.length === 0 && (
            <div className="p-4 border-b border-gray-200/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-tealblue flex items-center gap-2">
                  <FaHistory size={12} className="text-saffronglow" />
                  Recent Searches
                </h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-tealblue/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <FaClock size={10} className="text-gray-400" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {trending.length > 0 && searchTerm.length === 0 && (
            <div className="p-4">
              <h4 className="text-sm font-semibold text-tealblue mb-2 flex items-center gap-2">
                <FaClock size={12} className="text-saffronglow" />
                Trending Searches
              </h4>
              <div className="space-y-1">
                {trending.slice(0, 6).map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(trend)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-tealblue/10 rounded-lg transition-colors duration-200"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="p-4 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-tealblue">
                <div className="w-4 h-4 border-2 border-tealblue/30 border-t-tealblue rounded-full animate-spin"></div>
                Searching...
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && suggestions.length === 0 && searchTerm.length > 0 && (
            <div className="p-4 text-center text-sm text-gray-500">
              Start typing to see AI-powered suggestions
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Full Smart Search Component for dedicated search pages
const SmartSearchComponent = ({ initialQuery = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState({ artworks: [], events: [], artists: [] });
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 2) {
      performSearch();
    } else {
      setResults({ artworks: [], events: [], artists: [] });
      setInsights(null);
    }
  }, [searchTerm]);

  const performSearch = async () => {
    try {
      setLoading(true);
      const response = await api.smartSearch({ query: searchTerm, type: 'all', limit: 20 });
      if (response.success) {
        setResults(response.results || { artworks: [], events: [], artists: [] });
        setInsights(response.insights);
      } else {
        console.error('Search failed:', response.message);
        setResults({ artworks: [], events: [], artists: [] });
        setInsights(null);
      }
    } catch (error) {
      console.error('Error performing smart search:', error);
      setResults({ artworks: [], events: [], artists: [] });
      setInsights(null);
    } finally {
      setLoading(false);
    }
  };

  const totalResults = (results.artworks?.length || 0) + (results.events?.length || 0) + (results.artists?.length || 0);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="relative flex items-center">
          <FaSearch className="absolute left-4 text-tealblue/60" size={20} />
          <input
            type="text"
            placeholder="Ask me anything... 'show me beautiful bharatanatyam dance', 'find spiritual art from south india'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white border-2 border-tealblue/20 focus:border-tealblue focus:outline-none text-lg font-medium placeholder-gray-500 shadow-lg transition-all duration-300"
          />
          <FaStar className="absolute right-4 text-rosered/60" size={20} />
        </div>
      </div>

      {/* Search Insights */}
      {insights && (
        <div className="mb-6 p-4 bg-gradient-to-r from-tealblue/10 to-rosered/10 rounded-xl border border-tealblue/20">
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-rosered" size={14} />
            <span className="text-sm font-semibold text-tealblue">AI Analysis</span>
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Intent:</span> {insights.queryAnalysis?.intent} • 
            <span className="font-medium">Confidence:</span> {Math.round((insights.queryAnalysis?.confidence || 0) * 100)}% • 
            <span className="font-medium">Found:</span> {totalResults} results
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 text-tealblue">
            <div className="w-6 h-6 border-2 border-tealblue/30 border-t-tealblue rounded-full animate-spin"></div>
            <span className="text-lg font-medium">AI is searching...</span>
          </div>
        </div>
      )}

      {/* Search Results */}
      {!loading && totalResults > 0 && (
        <div className="space-y-8">
          {/* Artworks */}
          {results.artworks && results.artworks.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-tealblue mb-4 flex items-center gap-2">
                🎨 Artworks ({results.artworks.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.artworks.map((artwork) => (
                  <div key={artwork._id || artwork.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-tealblue mb-2">{artwork.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{artwork.description?.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{artwork.category}</span>
                        {artwork.relevanceScore && (
                          <span className="bg-rosered/20 text-rosered px-2 py-1 rounded-full text-xs font-medium">
                            {Math.round(artwork.relevanceScore * 100)}% match
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {results.events && results.events.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-tealblue mb-4 flex items-center gap-2">
                📅 Events ({results.events.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.events.map((event) => (
                  <div key={event._id || event.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h4 className="font-bold text-tealblue mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{event.description?.substring(0, 150)}...</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{event.type}</span>
                      <span>{event.location}</span>
                      {event.relevanceScore && (
                        <span className="bg-rosered/20 text-rosered px-2 py-1 rounded-full text-xs font-medium">
                          {Math.round(event.relevanceScore * 100)}% match
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artists */}
          {results.artists && results.artists.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-tealblue mb-4 flex items-center gap-2">
                👥 Artists ({results.artists.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.artists.map((artist) => (
                  <div key={artist._id || artist.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4 mb-3">
                      {artist.profilePicture ? (
                        <img src={artist.profilePicture} alt={artist.username} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-tealblue/20 flex items-center justify-center text-tealblue font-bold">
                          {artist.username?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-tealblue">{artist.username}</h4>
                        <p className="text-gray-500 text-sm">{artist.specialization}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{artist.bio?.substring(0, 100)}...</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{artist.location}</span>
                      {artist.relevanceScore && (
                        <span className="bg-rosered/20 text-rosered px-2 py-1 rounded-full text-xs font-medium">
                          {Math.round(artist.relevanceScore * 100)}% match
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {!loading && searchTerm.length > 2 && totalResults === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No results found</h3>
          <p className="text-gray-500 mb-4">Try rephrasing your search or use different keywords</p>
          <div className="text-sm text-gray-400">
            <span className="font-medium">Try:</span> "traditional dance", "madhubani painting", "south indian art"
          </div>
        </div>
      )}
    </div>
  );
};

export { HeaderSmartSearch };
export default SmartSearchComponent;

