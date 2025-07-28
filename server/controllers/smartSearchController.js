const smartSearchService = require('../utils/smartSearchService');
const Artwork = require('../models/Artwork');
const Event = require('../models/Event');
const User = require('../models/User');

class SmartSearchController {
  /**
   * Perform smart search across all content types
   */
  async smartSearch(req, res) {
    try {
      const { query, type = 'all', limit = 20, page = 1 } = req.query;

      if (!query || query.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      // Analyze the search query
      const analysis = smartSearchService.analyzeQuery(query);

      let results = {
        artworks: [],
        events: [],
        artists: []
      };

      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Search artworks
      if (type === 'all' || type === 'artworks') {
        const artworkQuery = smartSearchService.buildSearchQuery(analysis, 'artworks');
        const artworks = await Artwork.find(artworkQuery)
          .populate('userId', 'username profilePicture')
          .limit(parseInt(limit))
          .skip(skip);
        
        results.artworks = smartSearchService.rankResults(artworks, analysis);
      }

      // Search events
      if (type === 'all' || type === 'events') {
        const eventQuery = smartSearchService.buildSearchQuery(analysis, 'events');
        const events = await Event.find(eventQuery)
          .populate('createdBy', 'username profilePicture')
          .limit(parseInt(limit))
          .skip(skip);
        
        results.events = smartSearchService.rankResults(events, analysis);
      }

      // Search artists/users
      if (type === 'all' || type === 'artists') {
        const userQuery = {
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { bio: { $regex: query, $options: 'i' } },
            { specialization: { $regex: query, $options: 'i' } }
          ],
          isActive: true
        };
        
        const users = await User.find(userQuery)
          .select('username bio profilePicture specialization location createdAt')
          .limit(parseInt(limit))
          .skip(skip);
        
        results.artists = smartSearchService.rankResults(users, analysis);
      }

      // Generate search insights
      const allResults = [...results.artworks, ...results.events, ...results.artists];
      const insights = smartSearchService.generateSearchInsights(analysis, allResults);

      res.json({
        success: true,
        query: query,
        analysis: analysis,
        results: results,
        insights: insights,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: allResults.length
        }
      });
    } catch (error) {
      console.error('Smart search error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to perform smart search'
      });
    }
  }

  /**
   * Get search suggestions based on partial query
   */
  async getSearchSuggestions(req, res) {
    try {
      const { query } = req.query;

      if (!query || query.length < 2) {
        return res.json({
          success: true,
          suggestions: []
        });
      }

      const suggestions = smartSearchService.generateSuggestions(query);
      
      // Also get some actual content suggestions from database
      const contentSuggestions = await this.getContentSuggestions(query);
      
      const allSuggestions = [...suggestions, ...contentSuggestions]
        .filter((suggestion, index, self) => self.indexOf(suggestion) === index)
        .slice(0, 10);

      res.json({
        success: true,
        suggestions: allSuggestions
      });
    } catch (error) {
      console.error('Search suggestions error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get search suggestions'
      });
    }
  }

  /**
   * Get content-based suggestions from database
   */
  async getContentSuggestions(query) {
    try {
      const suggestions = [];

      // Get artwork titles and artforms
      const artworks = await Artwork.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { artform: { $regex: query, $options: 'i' } }
        ]
      }).select('title artform').limit(5);

      artworks.forEach(artwork => {
        if (artwork.title.toLowerCase().includes(query.toLowerCase())) {
          suggestions.push(artwork.title);
        }
        if (artwork.artform && artwork.artform.toLowerCase().includes(query.toLowerCase())) {
          suggestions.push(artwork.artform);
        }
      });

      // Get event titles
      const events = await Event.find({
        title: { $regex: query, $options: 'i' }
      }).select('title').limit(3);

      events.forEach(event => {
        suggestions.push(event.title);
      });

      return suggestions;
    } catch (error) {
      console.error('Content suggestions error:', error);
      return [];
    }
  }

  /**
   * Analyze search query and return analysis details
   */
  async analyzeSearchQuery(req, res) {
    try {
      const { query } = req.body;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Query is required'
        });
      }

      const analysis = smartSearchService.analyzeQuery(query);

      res.json({
        success: true,
        analysis: analysis
      });
    } catch (error) {
      console.error('Query analysis error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to analyze query'
      });
    }
  }

  /**
   * Get trending searches and popular content
   */
  async getTrendingSearches(req, res) {
    try {
      // For now, return static trending searches
      // In production, you'd track actual search queries
      const trending = [
        'bharatanatyam dance',
        'madhubani painting',
        'classical music',
        'traditional crafts',
        'south indian art',
        'contemporary sculptures',
        'folk dance performances',
        'spiritual art',
        'colorful paintings',
        'ancient traditions'
      ];

      // Get popular artworks (most liked/bookmarked)
      const popularArtworks = await Artwork.aggregate([
        { $match: { isActive: true, isPublic: true } },
        {
          $addFields: {
            popularity: {
              $add: [
                { $size: { $ifNull: ['$likes', []] } },
                { $multiply: [{ $size: { $ifNull: ['$bookmarks', []] } }, 2] },
                { $size: { $ifNull: ['$comments', []] } }
              ]
            }
          }
        },
        { $sort: { popularity: -1 } },
        { $limit: 10 },
        {
          $project: {
            title: 1,
            artform: 1,
            category: 1,
            imageUrl: 1,
            popularity: 1
          }
        }
      ]);

      // Get recent events
      const recentEvents = await Event.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title type category date location');

      res.json({
        success: true,
        trending: {
          searches: trending,
          artworks: popularArtworks,
          events: recentEvents
        }
      });
    } catch (error) {
      console.error('Trending searches error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get trending searches'
      });
    }
  }

  /**
   * Advanced search with filters
   */
  async advancedSearch(req, res) {
    try {
      const {
        query,
        category,
        artform,
        location,
        dateRange,
        sortBy = 'relevance',
        limit = 20,
        page = 1
      } = req.body;

      let searchQuery = {};
      let results = [];

      // Build base query
      if (query) {
        const analysis = smartSearchService.analyzeQuery(query);
        searchQuery = smartSearchService.buildSearchQuery(analysis, 'artworks');
      } else {
        searchQuery = { isActive: true, isPublic: true };
      }

      // Add advanced filters
      if (category) {
        searchQuery.category = { $regex: category, $options: 'i' };
      }

      if (artform) {
        searchQuery.artform = { $regex: artform, $options: 'i' };
      }

      if (location) {
        searchQuery.location = { $regex: location, $options: 'i' };
      }

      if (dateRange) {
        const { start, end } = dateRange;
        searchQuery.createdAt = {
          $gte: new Date(start),
          $lte: new Date(end)
        };
      }

      // Execute search
      let sortOptions = {};
      switch (sortBy) {
        case 'date':
          sortOptions = { createdAt: -1 };
          break;
        case 'popular':
          // Use aggregation for popularity sorting
          results = await Artwork.aggregate([
            { $match: searchQuery },
            {
              $addFields: {
                popularity: {
                  $add: [
                    { $size: { $ifNull: ['$likes', []] } },
                    { $multiply: [{ $size: { $ifNull: ['$bookmarks', []] } }, 2] }
                  ]
                }
              }
            },
            { $sort: { popularity: -1 } },
            { $skip: (parseInt(page) - 1) * parseInt(limit) },
            { $limit: parseInt(limit) }
          ]);
          break;
        default: // relevance
          results = await Artwork.find(searchQuery)
            .populate('userId', 'username profilePicture')
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
          
          if (query) {
            const analysis = smartSearchService.analyzeQuery(query);
            results = smartSearchService.rankResults(results, analysis);
          }
      }

      // If not using aggregation, execute normal find
      if (results.length === 0 && sortBy !== 'popular') {
        results = await Artwork.find(searchQuery)
          .populate('userId', 'username profilePicture')
          .sort(sortOptions)
          .limit(parseInt(limit))
          .skip((parseInt(page) - 1) * parseInt(limit));
      }

      // Get total count for pagination
      const totalCount = await Artwork.countDocuments(searchQuery);

      res.json({
        success: true,
        results: results,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount,
          pages: Math.ceil(totalCount / parseInt(limit))
        },
        appliedFilters: {
          query,
          category,
          artform,
          location,
          dateRange,
          sortBy
        }
      });
    } catch (error) {
      console.error('Advanced search error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to perform advanced search'
      });
    }
  }

  /**
   * Get search filters and categories
   */
  async getSearchFilters(req, res) {
    try {
      // Get unique categories and artforms from database
      const categories = await Artwork.distinct('category', { isActive: true });
      const artforms = await Artwork.distinct('artform', { isActive: true });
      const locations = await Artwork.distinct('location', { isActive: true });

      // Get event types and categories
      const eventTypes = await Event.distinct('type', { isActive: true });
      const eventCategories = await Event.distinct('category', { isActive: true });

      res.json({
        success: true,
        filters: {
          artwork: {
            categories: categories.filter(Boolean),
            artforms: artforms.filter(Boolean),
            locations: locations.filter(Boolean)
          },
          event: {
            types: eventTypes.filter(Boolean),
            categories: eventCategories.filter(Boolean)
          },
          sortOptions: [
            { value: 'relevance', label: 'Most Relevant' },
            { value: 'date', label: 'Most Recent' },
            { value: 'popular', label: 'Most Popular' }
          ]
        }
      });
    } catch (error) {
      console.error('Search filters error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get search filters'
      });
    }
  }
}

module.exports = new SmartSearchController();
