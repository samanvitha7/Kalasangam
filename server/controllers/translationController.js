const translationService = require('../utils/translationService');
const Artwork = require('../models/Artwork');
const Event = require('../models/Event');

class TranslationController {
  /**
   * Get supported languages
   */
  async getSupportedLanguages(req, res) {
    try {
      const languages = translationService.getSupportedLanguages();
      res.json({
        success: true,
        languages
      });
    } catch (error) {
      console.error('Error fetching supported languages:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch supported languages'
      });
    }
  }

  /**
   * Translate text to multiple languages
   */
  async translateText(req, res) {
    try {
      const { text, targetLanguages, sourceLanguage = 'en' } = req.body;

      if (!text || !targetLanguages || !Array.isArray(targetLanguages)) {
        return res.status(400).json({
          success: false,
          message: 'Text and target languages are required'
        });
      }

      const translations = await translationService.translateToMultipleLanguages(
        text,
        targetLanguages,
        sourceLanguage
      );

      res.json({
        success: true,
        translations
      });
    } catch (error) {
      console.error('Error translating text:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to translate text'
      });
    }
  }

  /**
   * Translate artwork and update in database
   */
  async translateArtwork(req, res) {
    try {
      const { artworkId } = req.params;
      const { targetLanguages, forceUpdate = false } = req.body;

      if (!targetLanguages || !Array.isArray(targetLanguages)) {
        return res.status(400).json({
          success: false,
          message: 'Target languages are required'
        });
      }

      // Find the artwork
      const artwork = await Artwork.findById(artworkId);
      if (!artwork) {
        return res.status(404).json({
          success: false,
          message: 'Artwork not found'
        });
      }

      // Check if translations already exist and forceUpdate is false
      if (!forceUpdate && artwork.titleTranslations && Object.keys(artwork.titleTranslations).length > 1) {
        return res.json({
          success: true,
          message: 'Translations already exist',
          artwork: artwork.toObject()
        });
      }

      // Translate the artwork
      const translatedData = await translationService.translateArtwork(
        artwork.toObject(),
        targetLanguages
      );

      // Update the artwork with translations
      const updatedArtwork = await Artwork.findByIdAndUpdate(
        artworkId,
        {
          titleTranslations: translatedData.titleTranslations,
          descriptionTranslations: translatedData.descriptionTranslations,
          artformTranslations: translatedData.artformTranslations,
          tagTranslations: translatedData.tagTranslations
        },
        { new: true }
      );

      res.json({
        success: true,
        message: 'Artwork translated successfully',
        artwork: updatedArtwork
      });
    } catch (error) {
      console.error('Error translating artwork:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to translate artwork'
      });
    }
  }

  /**
   * Translate event and update in database
   */
  async translateEvent(req, res) {
    try {
      const { eventId } = req.params;
      const { targetLanguages, forceUpdate = false } = req.body;

      if (!targetLanguages || !Array.isArray(targetLanguages)) {
        return res.status(400).json({
          success: false,
          message: 'Target languages are required'
        });
      }

      // Find the event
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      // Check if translations already exist and forceUpdate is false
      if (!forceUpdate && event.titleTranslations && Object.keys(event.titleTranslations).length > 1) {
        return res.json({
          success: true,
          message: 'Translations already exist',
          event: event.toObject()
        });
      }

      // Translate the event
      const translatedData = await translationService.translateEvent(
        event.toObject(),
        targetLanguages
      );

      // Update the event with translations
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          titleTranslations: translatedData.titleTranslations,
          descriptionTranslations: translatedData.descriptionTranslations,
          instructorTranslations: translatedData.instructorTranslations
        },
        { new: true }
      );

      res.json({
        success: true,
        message: 'Event translated successfully',
        event: updatedEvent
      });
    } catch (error) {
      console.error('Error translating event:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to translate event'
      });
    }
  }

  /**
   * Bulk translate all artworks
   */
  async bulkTranslateArtworks(req, res) {
    try {
      const { targetLanguages, limit = 10, skip = 0 } = req.body;

      if (!targetLanguages || !Array.isArray(targetLanguages)) {
        return res.status(400).json({
          success: false,
          message: 'Target languages are required'
        });
      }

      // Find artworks that need translation
      const artworks = await Artwork.find({
        $or: [
          { titleTranslations: { $exists: false } },
          { titleTranslations: {} },
          { 'titleTranslations.en': { $exists: false } }
        ]
      })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

      const translatedCount = [];
      const errors = [];

      for (const artwork of artworks) {
        try {
          const translatedData = await translationService.translateArtwork(
            artwork.toObject(),
            targetLanguages
          );

          await Artwork.findByIdAndUpdate(artwork._id, {
            titleTranslations: translatedData.titleTranslations,
            descriptionTranslations: translatedData.descriptionTranslations,
            artformTranslations: translatedData.artformTranslations,
            tagTranslations: translatedData.tagTranslations
          });

          translatedCount.push(artwork._id);
        } catch (error) {
          console.error(`Error translating artwork ${artwork._id}:`, error);
          errors.push({
            artworkId: artwork._id,
            error: error.message
          });
        }
      }

      res.json({
        success: true,
        message: `Bulk translation completed`,
        translatedCount: translatedCount.length,
        errorCount: errors.length,
        errors: errors.slice(0, 5) // Return first 5 errors
      });
    } catch (error) {
      console.error('Error in bulk translate artworks:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to bulk translate artworks'
      });
    }
  }

  /**
   * Bulk translate all events
   */
  async bulkTranslateEvents(req, res) {
    try {
      const { targetLanguages, limit = 10, skip = 0 } = req.body;

      if (!targetLanguages || !Array.isArray(targetLanguages)) {
        return res.status(400).json({
          success: false,
          message: 'Target languages are required'
        });
      }

      // Find events that need translation
      const events = await Event.find({
        $or: [
          { titleTranslations: { $exists: false } },
          { titleTranslations: {} },
          { 'titleTranslations.en': { $exists: false } }
        ]
      })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

      const translatedCount = [];
      const errors = [];

      for (const event of events) {
        try {
          const translatedData = await translationService.translateEvent(
            event.toObject(),
            targetLanguages
          );

          await Event.findByIdAndUpdate(event._id, {
            titleTranslations: translatedData.titleTranslations,
            descriptionTranslations: translatedData.descriptionTranslations,
            instructorTranslations: translatedData.instructorTranslations
          });

          translatedCount.push(event._id);
        } catch (error) {
          console.error(`Error translating event ${event._id}:`, error);
          errors.push({
            eventId: event._id,
            error: error.message
          });
        }
      }

      res.json({
        success: true,
        message: `Bulk translation completed`,
        translatedCount: translatedCount.length,
        errorCount: errors.length,
        errors: errors.slice(0, 5) // Return first 5 errors
      });
    } catch (error) {
      console.error('Error in bulk translate events:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to bulk translate events'
      });
    }
  }

  /**
   * Detect language of text
   */
  async detectLanguage(req, res) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: 'Text is required'
        });
      }

      const detectedLanguage = await translationService.detectLanguage(text);

      res.json({
        success: true,
        detectedLanguage,
        languageName: translationService.getSupportedLanguages()[detectedLanguage] || 'Unknown'
      });
    } catch (error) {
      console.error('Error detecting language:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to detect language'
      });
    }
  }

  /**
   * Get artwork with translations in requested language
   */
  async getArtworkTranslation(req, res) {
    try {
      const { artworkId } = req.params;
      const { language = 'en' } = req.query;

      const artwork = await Artwork.findById(artworkId);
      if (!artwork) {
        return res.status(404).json({
          success: false,
          message: 'Artwork not found'
        });
      }

      // Build response with translated content
      const response = {
        ...artwork.toObject(),
        title: artwork.titleTranslations?.[language] || artwork.title,
        description: artwork.descriptionTranslations?.[language] || artwork.description,
        artform: artwork.artformTranslations?.[language] || artwork.artform,
        tags: artwork.tagTranslations?.[language] || artwork.tags
      };

      res.json({
        success: true,
        artwork: response,
        requestedLanguage: language,
        availableLanguages: Object.keys(artwork.titleTranslations || {})
      });
    } catch (error) {
      console.error('Error getting artwork translation:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get artwork translation'
      });
    }
  }

  /**
   * Get event with translations in requested language
   */
  async getEventTranslation(req, res) {
    try {
      const { eventId } = req.params;
      const { language = 'en' } = req.query;

      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }

      // Build response with translated content
      const response = {
        ...event.toObject(),
        title: event.titleTranslations?.[language] || event.title,
        description: event.descriptionTranslations?.[language] || event.description,
        instructor: event.instructorTranslations?.[language] || event.instructor
      };

      res.json({
        success: true,
        event: response,
        requestedLanguage: language,
        availableLanguages: Object.keys(event.titleTranslations || {})
      });
    } catch (error) {
      console.error('Error getting event translation:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get event translation'
      });
    }
  }
}

module.exports = new TranslationController();
