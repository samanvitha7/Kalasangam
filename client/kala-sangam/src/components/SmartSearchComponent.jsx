import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaStar, FaClock, FaUser, FaPalette, FaHistory, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Error Boundary Component
class SmartSearchErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SmartSearch Error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Search Error</h3>
          <p className="text-red-600 text-sm mb-2">Something went wrong with the search component.</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Try Again
          </button>
          <details className="mt-2 text-xs text-red-500">
            <summary>Error Details</summary>
            <pre>{this.state.error && this.state.error.toString()}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

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

  // Handle navigation to specific items
  const handleItemClick = (item, type) => {
    if (type === 'artwork') {
      // Navigate to art wall with specific artwork highlighted
      navigate('/art-wall', { state: { highlightArtwork: item._id || item.id } });
    } else if (type === 'artist') {
      navigate(`/artist/${item._id || item.id}`);
    } else if (type === 'event') {
      navigate('/events', { state: { highlightEvent: item._id || item.id } });
    }
  };

  // Optimize initial load by removing API test

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
          const response = await api.getSearchSuggestions(searchTerm);
          if (response?.success) {
            setSuggestions(response.suggestions || []);
          }
        } catch (error) {
          // Silently handle errors to improve user experience
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

  // Save to recent searches
  const saveToRecentSearches = (query) => {
    const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
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
    <div className="relative flex items-center group" ref={searchRef}>
      {/* Search Icon */}
      <button
        className="font-winky font-[500] transition-all duration-300 ease-in-out hover:text-rosehover whitespace-nowrap text-[1.35rem] text-deep-teal"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FaSearch size={20} />
      </button>
      
      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        Search
      </div>

      {/* Search Dropdown */}
      {showDropdown && (
        <div className={`absolute top-full right-0 mt-2 w-80 rounded-xl shadow-2xl border transition-all duration-300 z-50 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-deep-teal/20'
            : 'bg-white/90 backdrop-blur-md border-deep-teal/30'
        }`}>
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200/50">
            <div className={`relative flex items-center w-full rounded-full transition-all duration-300 ${
              scrolled 
                ? 'bg-white/90 backdrop-blur-sm border border-deep-teal/20' 
                : 'bg-white/80 backdrop-blur-sm border border-deep-teal/30'
            }`}>
              <FaSearch className="absolute left-3 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search artists, artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className={`w-full pl-10 pr-10 py-2.5 rounded-full bg-transparent text-sm font-medium placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                  scrolled ? 'text-deep-teal' : 'text-deep-teal'
                }`}
                autoFocus
              />

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>
          </div>
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4 border-b border-gray-200/50">
              <h4 className="text-sm font-semibold text-deep-teal mb-2 flex items-center gap-2">
                <FaPalette size={12} className="text-coral-red" />
                Suggestions
              </h4>
              <div className="space-y-1">
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-deep-teal/10 rounded-lg transition-colors duration-200 font-medium"
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
                <h4 className="text-sm font-semibold text-deep-teal flex items-center gap-2">
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
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-deep-teal/10 rounded-lg transition-colors duration-200 flex items-center gap-2"
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
              <h4 className="text-sm font-semibold text-deep-teal mb-2 flex items-center gap-2">
                <FaClock size={12} className="text-saffronglow" />
                Trending Searches
              </h4>
              <div className="space-y-1">
                {trending.slice(0, 6).map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(trend)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-deep-teal/10 rounded-lg transition-colors duration-200"
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
              <div className="inline-flex items-center gap-2 text-sm text-deep-teal">
                <div className="w-4 h-4 border-2 border-deep-teal/30 border-t-deep-teal rounded-full animate-spin"></div>
                Searching...
              </div>
            </div>
          )}

          {/* Default suggestions when no search term or API suggestions */}
          {!loading && suggestions.length === 0 && (
            <div className="p-4">
              <h4 className="text-sm font-semibold text-deep-teal mb-2 flex items-center gap-2">
                <FaStar size={12} className="text-coral-red" />
                {searchTerm.length > 0 ? 'Try these suggestions' : 'Popular searches'}
              </h4>
              <div className="space-y-1">
                {[
                  'beautiful odissi dance',
                  'traditional madhubani art',
                  'kathak dance performance',
                  'south indian classical music',
                  'folk art from rajasthan',
                  'contemporary indian artists'
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-deep-teal/10 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
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
  const navigate = useNavigate();

  // Handle navigation to specific items
  const handleItemClick = (item, type) => {
    if (type === 'artwork') {
      // Navigate to art wall with specific artwork highlighted
      navigate('/art-wall', { state: { highlightArtwork: item._id || item.id } });
    } else if (type === 'artist') {
      navigate(`/artist/${item._id || item.id}`);
    } else if (type === 'event') {
      navigate('/events', { state: { highlightEvent: item._id || item.id } });
    }
  };

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
          <FaSearch className="absolute left-4 text-deep-teal/60" size={20} />
          <input
            type="text"
            placeholder="Ask me anything... 'show me beautiful odissi dance', 'find spiritual art from south india'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white border-2 border-deep-teal/20 focus:border-deep-teal focus:outline-none text-lg font-medium placeholder-gray-500 shadow-lg transition-all duration-300"
          />
          <FaStar className="absolute right-4 text-coral-red/60" size={20} />
        </div>
      </div>

      {/* Search Insights */}
      {insights && (
        <div className="mb-6 p-4 bg-gradient-to-r from-deep-teal/10 to-coral-red/10 rounded-xl border border-deep-teal/20">
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-coral-red" size={14} />
            <span className="text-sm font-semibold text-deep-teal">AI Analysis</span>
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
          <div className="inline-flex items-center gap-3 text-deep-teal">
            <div className="w-6 h-6 border-2 border-deep-teal/30 border-t-deep-teal rounded-full animate-spin"></div>
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
              <h3 className="text-2xl font-bold text-deep-teal mb-4 flex items-center gap-2">
                🎨 Artworks ({results.artworks.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.artworks.map((artwork) => (
                  <div 
                    key={artwork._id || artwork.id} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                    onClick={() => handleItemClick(artwork, 'artwork')}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <FaExternalLinkAlt className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-deep-teal mb-2 group-hover:text-coral-red transition-colors duration-200">{artwork.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{artwork.description?.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{artwork.category || 'Art'}</span>
                        {artwork.relevanceScore && (
                          <span className="bg-coral-red/20 text-coral-red px-2 py-1 rounded-full text-xs font-medium">
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
              <h3 className="text-2xl font-bold text-deep-teal mb-4 flex items-center gap-2">
                📅 Events ({results.events.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.events.map((event) => (
                  <div 
                    key={event._id || event.id} 
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                    onClick={() => handleItemClick(event, 'event')}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-deep-teal group-hover:text-coral-red transition-colors duration-200 flex-1">{event.title}</h4>
                      <FaExternalLinkAlt className="text-gray-400 group-hover:text-coral-red transition-colors duration-200 ml-2 mt-1" size={14} />
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{event.description?.substring(0, 150)}...</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{event.type || 'Event'}</span>
                      <span className="text-xs">
                        {event.location ? (
                          typeof event.location === 'string' 
                            ? event.location
                            : `${event.location.venue || event.location.city || event.location.address || 'Location TBD'}`
                        ) : 'Location TBD'}
                      </span>
                      {event.relevanceScore && (
                        <span className="bg-coral-red/20 text-coral-red px-2 py-1 rounded-full text-xs font-medium">
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
              <h3 className="text-2xl font-bold text-deep-teal mb-4 flex items-center gap-2">
                👥 Artists ({results.artists.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.artists.map((artist) => (
                  <div 
                    key={artist._id || artist.id} 
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                    onClick={() => handleItemClick(artist, 'artist')}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      {artist.profilePicture ? (
                        <img src={artist.profilePicture} alt={artist.username} className="w-12 h-12 rounded-full object-cover group-hover:ring-2 group-hover:ring-coral-red/50 transition-all duration-200" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-deep-teal/20 flex items-center justify-center text-deep-teal font-bold group-hover:bg-coral-red/20 group-hover:text-coral-red transition-all duration-200">
                          {artist.username?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-deep-teal group-hover:text-coral-red transition-colors duration-200">{artist.username}</h4>
                        <p className="text-gray-500 text-sm">{artist.specialization}</p>
                      </div>
                      <FaExternalLinkAlt className="text-gray-400 group-hover:text-coral-red transition-colors duration-200" size={14} />
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{artist.bio?.substring(0, 100)}...</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{artist.location || 'Location not specified'}</span>
                      {artist.relevanceScore && (
                        <span className="bg-coral-red/20 text-coral-red px-2 py-1 rounded-full text-xs font-medium">
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

// Wrapped components with error boundaries
const SafeSmartSearchComponent = (props) => (
  <SmartSearchErrorBoundary>
    <SmartSearchComponent {...props} />
  </SmartSearchErrorBoundary>
);

const SafeHeaderSmartSearch = (props) => (
  <SmartSearchErrorBoundary>
    <HeaderSmartSearch {...props} />
  </SmartSearchErrorBoundary>
);

export { SafeHeaderSmartSearch as HeaderSmartSearch };
export default SafeSmartSearchComponent;

