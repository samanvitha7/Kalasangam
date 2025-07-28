# AI Features Documentation

## Overview
This document describes the two major AI-powered features implemented in the Traditional Arts platform:

1. **AI Translation Assistant** - Translates art descriptions into multiple Indian languages
2. **AI Smart Search** - Intelligent search with natural language processing

---

## 1. AI Translation Assistant

### Features
- Translates artwork titles, descriptions, and metadata into 15+ Indian languages
- Mock translation service (for development) with predefined translations for art terms
- Support for Google Translate API integration (when API key is provided)
- Bulk translation capabilities
- Translation caching in database
- Language detection

### Supported Languages
- Hindi (hi)
- Bengali (bn)
- Telugu (te)
- Marathi (mr)
- Tamil (ta)
- Gujarati (gu)
- Urdu (ur)
- Kannada (kn)
- Malayalam (ml)
- Punjabi (pa)
- Odia (or)
- Assamese (as)
- Kashmiri (ks)
- Sindhi (sd)
- Nepali (ne)

### API Endpoints

#### Get Supported Languages
```http
GET /api/translation/languages
```

#### Translate Text to Multiple Languages
```http
POST /api/translation/translate-text
Content-Type: application/json

{
  "text": "beautiful art",
  "targetLanguages": ["hi", "bn", "ta"],
  "sourceLanguage": "en"
}
```

#### Translate Artwork
```http
POST /api/translation/translate-artwork/:artworkId
Content-Type: application/json

{
  "targetLanguages": ["hi", "bn", "ta"],
  "forceUpdate": false
}
```

#### Get Artwork with Translation
```http
GET /api/translation/get-artwork/:artworkId?language=hi
```

#### Bulk Translate Artworks
```http
POST /api/translation/bulk-translate-artworks
Content-Type: application/json

{
  "targetLanguages": ["hi", "bn", "ta"],
  "limit": 10,
  "skip": 0
}
```

#### Detect Language
```http
POST /api/translation/detect-language
Content-Type: application/json

{
  "text": "यह हिंदी पाठ है"
}
```

### Database Schema Updates
The following fields were added to store translations:

**Artwork Model:**
- `titleTranslations: Object`
- `descriptionTranslations: Object`
- `artformTranslations: Object`
- `tagTranslations: Object`

**Event Model:**
- `titleTranslations: Object`
- `descriptionTranslations: Object`
- `instructorTranslations: Object`

---

## 2. AI Smart Search

### Features
- Natural language query understanding
- Intent recognition (search artform, painting, regional, etc.)
- Keyword extraction and categorization
- Semantic search across artworks, events, and artists
- Relevance scoring algorithm
- Search suggestions and autocomplete
- Advanced filtering options
- Trending searches and popular content

### Search Categories
- **Art Forms**: dance, music, painting, sculpture, craft, traditional
- **Emotions**: beautiful, peaceful, vibrant, spiritual
- **Regions**: north, south, east, west, central India with specific states
- **Time**: recent, old, popular content

### Intent Recognition
The system recognizes various search intents:
- `search_artform`: "show me dance art"
- `search_painting`: "find madhubani paintings"
- `search_regional`: "art from kerala"
- `general_search`: "search for spiritual music"
- `information_search`: "what is bharatanatyam"

### API Endpoints

#### Smart Search
```http
GET /api/smart-search/search?query=traditional%20dance&type=all&limit=20&page=1
```

**Parameters:**
- `query`: Search query string
- `type`: Filter by content type (`all`, `artworks`, `events`, `artists`)
- `limit`: Number of results per page
- `page`: Page number

#### Search Suggestions
```http
GET /api/smart-search/suggestions?query=dance
```

#### Analyze Search Query
```http
POST /api/smart-search/analyze
Content-Type: application/json

{
  "query": "show me beautiful traditional dance from south india"
}
```

#### Get Trending Searches
```http
GET /api/smart-search/trending
```

#### Advanced Search with Filters
```http
POST /api/smart-search/advanced
Content-Type: application/json

{
  "query": "traditional art",
  "category": "Dance",
  "artform": "Bharatanatyam",
  "location": "Tamil Nadu",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  },
  "sortBy": "relevance",
  "limit": 20,
  "page": 1
}
```

#### Get Search Filters
```http
GET /api/smart-search/filters
```

### Relevance Scoring Algorithm

The system calculates relevance scores based on:
- **Title Match** (30 points): Direct match in artwork/event title
- **Description Match** (20 points): Match in description text
- **Art Form Match** (25 points): Match in art form field
- **Category Match** (15 points): Match in category
- **Tags Match** (10 points): Match in tags array
- **Translation Match** (15 points): Match in translated content
- **Popularity Boost** (up to 8 points): Based on likes, bookmarks, comments

### Search Insights

Each search returns detailed insights:
```json
{
  "queryAnalysis": {
    "intent": "search_regional",
    "confidence": 0.9,
    "detectedCategories": ["artforms", "regions"],
    "keywords": ["dance", "traditional", "south indian"]
  },
  "results": {
    "total": 15,
    "highRelevance": 5,
    "mediumRelevance": 7,
    "lowRelevance": 3
  },
  "suggestions": ["traditional dance performances", "south indian art"]
}
```

---

## Implementation Details

### File Structure
```
server/
├── utils/
│   ├── translationService.js      # Translation logic
│   └── smartSearchService.js      # Search algorithms
├── controllers/
│   ├── translationController.js   # Translation API handlers
│   └── smartSearchController.js   # Search API handlers
├── routes/
│   ├── translationRoutes.js       # Translation endpoints
│   └── smartSearchRoutes.js       # Search endpoints
└── models/
    ├── Artwork.js                 # Updated with translation fields
    └── Event.js                   # Updated with translation fields
```

### Environment Variables
```env
# Google Translate API (optional - uses mock service if not provided)
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here
```

### Testing

Both features include comprehensive test scripts:
- `test-translation.js` - Tests translation functionality
- `test-smart-search.js` - Tests search algorithms

Run tests:
```bash
node test-translation.js
node test-smart-search.js
```

---

## Usage Examples

### Translation Example
```javascript
// Translate artwork to Hindi and Tamil
const response = await fetch('/api/translation/translate-artwork/12345', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    targetLanguages: ['hi', 'ta']
  })
});
```

### Smart Search Example
```javascript
// Search for traditional dance with natural language
const response = await fetch('/api/smart-search/search?query=show me beautiful bharatanatyam dance');
const data = await response.json();

// Access ranked results
console.log(data.results.artworks); // Sorted by relevance
console.log(data.insights); // Search analytics
```

---

## Future Enhancements

### Translation
1. **Real-time Translation**: Integrate with Google Translate API for production
2. **Translation Quality**: Add translation validation and user feedback
3. **Voice Translation**: Support for audio description translations
4. **Custom Dictionaries**: Art-specific terminology databases

### Smart Search
1. **Machine Learning**: Train models on user search patterns
2. **Image Search**: Visual similarity search for artworks
3. **Voice Search**: Speech-to-text search capabilities
4. **Personalization**: User preference-based result ranking
5. **Search Analytics**: Track and analyze search behavior

---

## Performance Considerations

- **Translation Caching**: Translations are stored in database to avoid re-computation
- **Search Indexing**: Consider adding text search indexes for better performance
- **Rate Limiting**: Implement rate limiting for API endpoints
- **Pagination**: All search results support pagination
- **Mock Services**: Development-friendly mock services for testing without external APIs

---

## Accessibility Impact

These AI features significantly improve platform accessibility:
- **Language Barriers**: Non-English speakers can access content in their native languages
- **Cultural Context**: Regional language translations preserve cultural nuances
- **Search Usability**: Natural language search makes the platform more intuitive
- **Content Discovery**: Smart search helps users discover relevant art forms

The platform is now more inclusive and accessible to a broader audience of traditional art enthusiasts across India.
