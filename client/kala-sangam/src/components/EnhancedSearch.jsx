import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const EnhancedSearch = ({ placeholder = "Search art forms, artists, states...", className = "" }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    state: 'all',
    type: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Sample data for suggestions (in real app, this would come from API)
  const searchData = [
    { id: 1, name: 'Madhubani Painting', category: 'art', state: 'bihar', type: 'painting' },
    { id: 2, name: 'Bharatanatyam', category: 'dance', state: 'tamil nadu', type: 'classical' },
    { id: 3, name: 'Warli Art', category: 'art', state: 'maharashtra', type: 'tribal' },
    { id: 4, name: 'Kathak', category: 'dance', state: 'uttar pradesh', type: 'classical' },
    { id: 5, name: 'Tanjore Painting', category: 'art', state: 'tamil nadu', type: 'painting' },
    { id: 6, name: 'Carnatic Music', category: 'music', state: 'tamil nadu', type: 'classical' },
    { id: 7, name: 'Dhokra Art', category: 'craft', state: 'west bengal', type: 'metal' },
    { id: 8, name: 'Odissi Dance', category: 'dance', state: 'odisha', type: 'classical' },
  ];

  const categories = ['all', 'art', 'dance', 'music', 'craft'];
  const states = ['all', 'bihar', 'tamil nadu', 'maharashtra', 'uttar pradesh', 'west bengal', 'odisha'];
  const types = ['all', 'painting', 'classical', 'tribal', 'metal'];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Generate suggestions based on query and filters
    if (query.length > 0) {
      const filtered = searchData.filter(item => {
        const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = filters.category === 'all' || item.category === filters.category;
        const matchesState = filters.state === 'all' || item.state === filters.state;
        const matchesType = filters.type === 'all' || item.type === filters.type;
        
        return matchesQuery && matchesCategory && matchesState && matchesType;
      });
      setSuggestions(filtered.slice(0, 8));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, filters]);

  const handleSearch = (searchTerm = query) => {
    if (searchTerm.trim()) {
      // Add to recent searches
      const newRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
      
      // Navigate to search results
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&category=${filters.category}&state=${filters.state}&type=${filters.type}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-full shadow-lg border-2 border-gray-100 hover:border-deep-teal/30 transition-all duration-300 focus-within:border-deep-teal focus-within:shadow-xl">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-4" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setIsOpen(true)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
          />
          
          {query && (
            <button
              onClick={clearSearch}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <XMarkIcon className="h-4 w-4 text-gray-400" />
            </button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 mx-2 rounded-full transition-all duration-200 ${
              showFilters ? 'bg-deep-teal text-white' : 'hover:bg-gray-100 text-gray-400'
            }`}
          >
            <FunnelIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={filters.state}
                    onChange={(e) => handleFilterChange('state', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                  >
                    {states.map(state => (
                      <option key={state} value={state}>
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && (suggestions.length > 0 || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-96 overflow-y-auto z-50"
          >
            {/* Recent Searches */}
            {query === '' && recentSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Searches</h4>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4 inline mr-2 text-gray-400" />
                    {search}
                  </button>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearch(item.name)}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800 group-hover:text-deep-teal transition-colors">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {item.category} • {item.state}
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && suggestions.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No suggestions found for "{query}"</p>
                <button
                  onClick={() => handleSearch()}
                  className="mt-2 text-sm text-deep-teal hover:underline"
                >
                  Search anyway
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedSearch;
