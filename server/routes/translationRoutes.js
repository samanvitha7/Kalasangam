const express = require('express');
const translationController = require('../controllers/translationController');

const router = express.Router();

// Routes for translation
router.get('/languages', translationController.getSupportedLanguages);
router.post('/translate-text', translationController.translateText);
router.post('/translate-artwork/:artworkId', translationController.translateArtwork);
router.post('/translate-event/:eventId', translationController.translateEvent);
router.get('/get-artwork/:artworkId', translationController.getArtworkTranslation);
router.get('/get-event/:eventId', translationController.getEventTranslation);
router.post('/bulk-translate-artworks', translationController.bulkTranslateArtworks);
router.post('/bulk-translate-events', translationController.bulkTranslateEvents);
router.post('/detect-language', translationController.detectLanguage);

module.exports = router;
