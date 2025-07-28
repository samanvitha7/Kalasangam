class SmartSearchService {
  constructor() {
    // Keywords for different categories and their synonyms
    this.searchKeywords = {
      artforms: {
        dance: ['dance', 'dancing', 'nritya', 'bharatanatyam', 'kathak', 'odissi', 'kuchipudi', 'manipuri', 'mohiniyattam', 'classical dance', 'folk dance'],
        music: ['music', 'sangeet', 'classical music', 'carnatic', 'hindustani', 'raga', 'tabla', 'sitar', 'veena', 'flute', 'instrument'],
        painting: ['painting', 'art', 'canvas', 'madhubani', 'warli', 'miniature', 'oil painting', 'watercolor', 'acrylic', 'portrait', 'landscape'],
        sculpture: ['sculpture', 'carving', 'stone work', 'bronze', 'marble', 'wood carving', 'statue', 'figurine'],
        craft: ['craft', 'handicraft', 'pottery', 'weaving', 'embroidery', 'textile', 'handmade', 'artisan', 'traditional craft'],
        traditional: ['traditional', 'heritage', 'cultural', 'ancient', 'classical', 'folk', 'ethnic', 'indigenous', 'authentic']
      },
      emotions: {
        beautiful: ['beautiful', 'gorgeous', 'stunning', 'lovely', 'pretty', 'elegant', 'graceful', 'aesthetic'],
        peaceful: ['peaceful', 'calm', 'serene', 'tranquil', 'meditative', 'soothing', 'relaxing'],
        vibrant: ['vibrant', 'colorful', 'bright', 'lively', 'energetic', 'dynamic', 'vivid'],
        spiritual: ['spiritual', 'divine', 'sacred', 'holy', 'religious', 'devotional', 'mystical']
      },
      regions: {
        south: ['south indian', 'southern', 'kerala', 'tamil nadu', 'karnataka', 'andhra pradesh', 'telangana'],
        north: ['north indian', 'northern', 'punjab', 'haryana', 'rajasthan', 'uttar pradesh', 'himachal pradesh'],
        west: ['western', 'gujarat', 'maharashtra', 'goa', 'rajasthan'],
        east: ['eastern', 'west bengal', 'odisha', 'assam', 'bihar', 'jharkhand'],
        central: ['central', 'madhya pradesh', 'chhattisgarh']
      },
      time: {
        recent: ['recent', 'new', 'latest', 'current', 'modern', 'contemporary'],
        old: ['old', 'ancient', 'vintage', 'historic', 'classic', 'antique'],
        popular: ['popular', 'trending', 'famous', 'well-known', 'celebrated', 'renowned']
      }
    };

    // Intent patterns for natural language understanding
    this.intentPatterns = [
      {
        pattern: /show me (.*) art/i,
        intent: 'search_artform',
        extract: (match) => match[1]
      },
      {
        pattern: /find (.*) paintings/i,
        intent: 'search_painting',
        extract: (match) => match[1]
      },
      {
        pattern: /i want to see (.*)/i,
        intent: 'general_search',
        extract: (match) => match[1]
      },
      {
        pattern: /search for (.*)/i,
        intent: 'general_search',
        extract: (match) => match[1]
      },
      {
        pattern: /(.*) dance performances/i,
        intent: 'search_dance',
        extract: (match) => match[1]
      },
      {
        pattern: /(.*) from (.*)/i,
        intent: 'search_regional',
        extract: (match) => ({ artform: match[1], region: match[2] })
      },
      {
        pattern: /what is (.*)/i,
        intent: 'information_search',
        extract: (match) => match[1]
      }
    ];
  }

  /**
   * Analyze search query using natural language processing
   * @param {string} query - User search query
   * @returns {Object} - Analyzed query with intent and keywords
   */
  analyzeQuery(query) {
    const analysis = {
      originalQuery: query,
      intent: 'general_search',
      keywords: [],
      categories: [],
      filters: {},
      confidence: 0.5
    };

    const lowerQuery = query.toLowerCase();

    // Check for intent patterns
    for (const pattern of this.intentPatterns) {
      const match = lowerQuery.match(pattern.pattern);
      if (match) {
        analysis.intent = pattern.intent;
        analysis.extractedData = pattern.extract(match);
        analysis.confidence += 0.2;
        break;
      }
    }

    // Extract keywords and categories
    Object.keys(this.searchKeywords).forEach(category => {
      Object.keys(this.searchKeywords[category]).forEach(subcategory => {
        const keywords = this.searchKeywords[category][subcategory];
        keywords.forEach(keyword => {
          if (lowerQuery.includes(keyword)) {
            analysis.keywords.push(keyword);
            if (!analysis.categories.includes(category)) {
              analysis.categories.push(category);
            }
            analysis.filters[category] = subcategory;
            analysis.confidence += 0.1;
          }
        });
      });
    });

    // Extract specific terms
    const words = lowerQuery.split(' ').filter(word => word.length > 2);
    analysis.searchTerms = words;

    return analysis;
  }

  /**
   * Build MongoDB query based on analyzed search query
   * @param {Object} analysis - Analyzed query object
   * @returns {Object} - MongoDB query object
   */
  buildSearchQuery(analysis, collection = 'artworks') {
    const query = { $and: [] };
    const textSearchTerms = [];

    // Add basic active/public filters
    if (collection === 'artworks') {
      query.$and.push({ isActive: true, isPublic: true });
    } else if (collection === 'events') {
      query.$and.push({ isActive: true });
    }

    // Text search across multiple fields
    if (analysis.searchTerms.length > 0) {
      const textQuery = {
        $or: [
          { title: { $regex: analysis.originalQuery, $options: 'i' } },
          { description: { $regex: analysis.originalQuery, $options: 'i' } },
          { artform: { $regex: analysis.originalQuery, $options: 'i' } },
          { tags: { $in: analysis.searchTerms.map(term => new RegExp(term, 'i')) } }
        ]
      };

      // Add translation search if available
      if (collection === 'artworks') {
        textQuery.$or.push(
          { 'titleTranslations.hi': { $regex: analysis.originalQuery, $options: 'i' } },
          { 'titleTranslations.bn': { $regex: analysis.originalQuery, $options: 'i' } },
          { 'titleTranslations.ta': { $regex: analysis.originalQuery, $options: 'i' } },
          { 'descriptionTranslations.hi': { $regex: analysis.originalQuery, $options: 'i' } },
          { 'descriptionTranslations.bn': { $regex: analysis.originalQuery, $options: 'i' } },
          { 'descriptionTranslations.ta': { $regex: analysis.originalQuery, $options: 'i' } }
        );
      }

      query.$and.push(textQuery);
    }

    // Category-specific filters
    if (analysis.filters.artforms) {
      const artformFilter = {
        $or: [
          { category: { $regex: analysis.filters.artforms, $options: 'i' } },
          { artform: { $regex: analysis.filters.artforms, $options: 'i' } }
        ]
      };
      query.$and.push(artformFilter);
    }

    // Regional filters
    if (analysis.filters.regions) {
      query.$and.push({
        $or: [
          { location: { $regex: analysis.filters.regions, $options: 'i' } },
          { 'location.city': { $regex: analysis.filters.regions, $options: 'i' } },
          { 'location.state': { $regex: analysis.filters.regions, $options: 'i' } }
        ]
      });
    }

    // Remove empty $and if no conditions
    if (query.$and.length === 0) {
      delete query.$and;
    } else if (query.$and.length === 1) {
      return query.$and[0];
    }

    return query;
  }

  /**
   * Generate search suggestions based on partial query
   * @param {string} partialQuery - Partial search query
   * @returns {Array} - Array of search suggestions
   */
  generateSuggestions(partialQuery) {
    const suggestions = [];
    const lowerQuery = partialQuery.toLowerCase();

    // Art form suggestions
    Object.values(this.searchKeywords.artforms).flat().forEach(keyword => {
      if (keyword.includes(lowerQuery) && !suggestions.includes(keyword)) {
        suggestions.push(keyword);
      }
    });

    // Add some popular search patterns
    const popularSearches = [
      'traditional dance performances',
      'beautiful paintings',
      'classical music',
      'folk art',
      'south indian dance',
      'madhubani paintings',
      'contemporary art',
      'spiritual art',
      'colorful crafts',
      'ancient sculptures'
    ];

    popularSearches.forEach(search => {
      if (search.includes(lowerQuery) && !suggestions.includes(search)) {
        suggestions.push(search);
      }
    });

    return suggestions.slice(0, 8); // Return top 8 suggestions
  }

  /**
   * Calculate relevance score for search results
   * @param {Object} item - Database item (artwork/event)
   * @param {Object} analysis - Analyzed query
   * @returns {number} - Relevance score (0-1)
   */
  calculateRelevanceScore(item, analysis) {
    let score = 0;
    const maxScore = 100;

    // Title match (highest weight)
    if (item.title && item.title.toLowerCase().includes(analysis.originalQuery.toLowerCase())) {
      score += 30;
    }

    // Description match
    if (item.description && item.description.toLowerCase().includes(analysis.originalQuery.toLowerCase())) {
      score += 20;
    }

    // Artform match
    if (item.artform && analysis.keywords.some(keyword => 
      item.artform.toLowerCase().includes(keyword.toLowerCase()))) {
      score += 25;
    }

    // Category match
    if (item.category && analysis.keywords.some(keyword => 
      item.category.toLowerCase().includes(keyword.toLowerCase()))) {
      score += 15;
    }

    // Tags match
    if (item.tags && analysis.keywords.some(keyword => 
      item.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())))) {
      score += 10;
    }

    // Translation matches (bonus points)
    if (item.titleTranslations) {
      Object.values(item.titleTranslations).forEach(translation => {
        if (translation && translation.toLowerCase().includes(analysis.originalQuery.toLowerCase())) {
          score += 15;
        }
      });
    }

    // Popularity boost (likes, bookmarks, comments)
    if (item.likes && item.likes.length > 0) {
      score += Math.min(item.likes.length * 0.5, 5);
    }

    if (item.bookmarks && item.bookmarks.length > 0) {
      score += Math.min(item.bookmarks.length * 0.3, 3);
    }

    return Math.min(score / maxScore, 1);
  }

  /**
   * Sort and rank search results by relevance
   * @param {Array} results - Search results array
   * @param {Object} analysis - Analyzed query
   * @returns {Array} - Sorted and ranked results
   */
  rankResults(results, analysis) {
    return results.map(item => ({
      ...item.toObject ? item.toObject() : item,
      relevanceScore: this.calculateRelevanceScore(item, analysis)
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  /**
   * Extract search insights and metadata
   * @param {Object} analysis - Analyzed query
   * @param {Array} results - Search results
   * @returns {Object} - Search insights
   */
  generateSearchInsights(analysis, results) {
    const insights = {
      queryAnalysis: {
        intent: analysis.intent,
        confidence: analysis.confidence,
        detectedCategories: analysis.categories,
        keywords: analysis.keywords
      },
      results: {
        total: results.length,
        highRelevance: results.filter(r => r.relevanceScore > 0.7).length,
        mediumRelevance: results.filter(r => r.relevanceScore > 0.4 && r.relevanceScore <= 0.7).length,
        lowRelevance: results.filter(r => r.relevanceScore <= 0.4).length
      },
      suggestions: this.generateSuggestions(analysis.originalQuery)
    };

    return insights;
  }
}

module.exports = new SmartSearchService();
