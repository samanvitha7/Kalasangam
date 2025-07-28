const express = require('express');
const smartSearchController = require('../controllers/smartSearchController');

const router = express.Router();

// Smart search routes
router.get('/search', (req, res) => smartSearchController.smartSearch(req, res));
router.get('/suggestions', (req, res) => smartSearchController.getSearchSuggestions(req, res));
router.post('/analyze', (req, res) => smartSearchController.analyzeSearchQuery(req, res));
router.get('/trending', (req, res) => smartSearchController.getTrendingSearches(req, res));
router.post('/advanced', (req, res) => smartSearchController.advancedSearch(req, res));
router.get('/filters', (req, res) => smartSearchController.getSearchFilters(req, res));

module.exports = router;
