// Mock translation service for development
// You can replace this with actual Google Translate API when ready

class TranslationService {
  constructor() {
    // Mock translations for common art-related terms
    this.mockTranslations = {
      'hi': { // Hindi
        'painting': 'चित्रकारी',
        'art': 'कला',
        'beautiful': 'सुंदर',
        'traditional': 'पारंपरिक',
        'culture': 'संस्कृति',
        'artist': 'कलाकार',
        'dance': 'नृत्य',
        'music': 'संगीत',
        'sculpture': 'मूर्तिकला',
        'craft': 'शिल्प'
      },
      'bn': { // Bengali
        'painting': 'চিত্রকলা',
        'art': 'শিল্প',
        'beautiful': 'সুন্দর',
        'traditional': 'ঐতিহ্যবাহী',
        'culture': 'সংস্কৃতি',
        'artist': 'শিল্পী',
        'dance': 'নৃত্য',
        'music': 'সঙ্গীত',
        'sculpture': 'ভাস্কর্য',
        'craft': 'কারুশিল্প'
      },
      'ta': { // Tamil
        'painting': 'ஓவியம்',
        'art': 'கலை',
        'beautiful': 'அழகான',
        'traditional': 'பாரம்பரிய',
        'culture': 'கலாச்சாரம்',
        'artist': 'கலைஞர்',
        'dance': 'நடனம்',
        'music': 'இசை',
        'sculpture': 'சிற்பம்',
        'craft': 'கைவினை'
      },
      'te': { // Telugu
        'painting': 'చిత్రలేఖనం',
        'art': 'కళ',
        'beautiful': 'అందమైన',
        'traditional': 'సాంప్రదాయిక',
        'culture': 'సంస్కృతి',
        'artist': 'కళాకారుడు',
        'dance': 'నృత్యం',
        'music': 'సంగీతం',
        'sculpture': 'శిల్పకళ',
        'craft': 'హస్తకళ'
      },
      'mr': { // Marathi
        'painting': 'चित्रकला',
        'art': 'कला',
        'beautiful': 'सुंदर',
        'traditional': 'पारंपारिक',
        'culture': 'संस्कृती',
        'artist': 'कलाकार',
        'dance': 'नृत्य',
        'music': 'संगीत',
        'sculpture': 'शिल्पकला',
        'craft': 'हस्तकला'
      },
      'gu': { // Gujarati
        'painting': 'ચિત્રકારી',
        'art': 'કલા',
        'beautiful': 'સુંદર',
        'traditional': 'પરંપરાગત',
        'culture': 'સંસ્કૃતિ',
        'artist': 'કલાકાર',
        'dance': 'નૃત્ય',
        'music': 'સંગીત',
        'sculpture': 'શિલ્પકલા',
        'craft': 'હસ્તકલા'
      }
    };
    
    // Initialize with mock service for development
    this.useGoogleTranslate = process.env.GOOGLE_TRANSLATE_API_KEY && process.env.GOOGLE_TRANSLATE_API_KEY !== 'your_google_translate_api_key_here';
    
    if (this.useGoogleTranslate) {
      const { Translate } = require('@google-cloud/translate').v2;
      this.translate = new Translate({
        key: process.env.GOOGLE_TRANSLATE_API_KEY
      });
    }
    
    // Supported Indian languages with their codes
    this.supportedLanguages = {
      'hi': 'Hindi',
      'bn': 'Bengali', 
      'te': 'Telugu',
      'mr': 'Marathi',
      'ta': 'Tamil',
      'gu': 'Gujarati',
      'ur': 'Urdu',
      'kn': 'Kannada',
      'ml': 'Malayalam',
      'pa': 'Punjabi',
      'or': 'Odia',
      'as': 'Assamese',
      'ks': 'Kashmiri',
      'sd': 'Sindhi',
      'ne': 'Nepali'
    };
  }

  /**
   * Translate text to a specific language
   * @param {string} text - Text to translate
   * @param {string} targetLanguage - Target language code
   * @param {string} sourceLanguage - Source language code (default: 'en')
   * @returns {Promise<string>} - Translated text
   */
  async translateText(text, targetLanguage, sourceLanguage = 'en') {
    try {
      if (!text || text.trim() === '') {
        return '';
      }

      if (!this.supportedLanguages[targetLanguage]) {
        throw new Error(`Unsupported language: ${targetLanguage}`);
      }

      // If source and target are the same, return original text
      if (sourceLanguage === targetLanguage) {
        return text;
      }

      // Use Google Translate if API key is available
      if (this.useGoogleTranslate) {
        const [translation] = await this.translate.translate(text, {
          from: sourceLanguage,
          to: targetLanguage,
        });
        return translation;
      }

      // Use mock translation for development
      return this.getMockTranslation(text, targetLanguage);
    } catch (error) {
      console.error('Translation error:', error);
      
      // Return original text if translation fails
      return text;
    }
  }

  /**
   * Translate text to multiple languages
   * @param {string} text - Text to translate
   * @param {string[]} targetLanguages - Array of target language codes
   * @param {string} sourceLanguage - Source language code (default: 'en')
   * @returns {Promise<Object>} - Object with language codes as keys and translations as values
   */
  async translateToMultipleLanguages(text, targetLanguages, sourceLanguage = 'en') {
    try {
      const translations = {};
      
      // Add original text
      translations[sourceLanguage] = text;

      // Translate to each target language
      const translationPromises = targetLanguages.map(async (lang) => {
        if (lang === sourceLanguage) {
          translations[lang] = text;
          return;
        }
        
        const translation = await this.translateText(text, lang, sourceLanguage);
        translations[lang] = translation;
      });

      await Promise.all(translationPromises);
      
      return translations;
    } catch (error) {
      console.error('Multiple translation error:', error);
      
      // Return object with original text for all languages if translation fails
      const fallback = {};
      [sourceLanguage, ...targetLanguages].forEach(lang => {
        fallback[lang] = text;
      });
      return fallback;
    }
  }

  /**
   * Translate artwork data (title, description, etc.)
   * @param {Object} artworkData - Artwork object with translatable fields
   * @param {string[]} targetLanguages - Array of target language codes
   * @returns {Promise<Object>} - Artwork object with translations
   */
  async translateArtwork(artworkData, targetLanguages) {
    try {
      const translatedArtwork = { ...artworkData };
      
      // Fields to translate
      const fieldsToTranslate = ['title', 'description'];
      
      for (const field of fieldsToTranslate) {
        if (artworkData[field]) {
          const translations = await this.translateToMultipleLanguages(
            artworkData[field], 
            targetLanguages
          );
          
          // Store translations with field prefix
          translatedArtwork[`${field}Translations`] = translations;
        }
      }

      // Translate artform if present
      if (artworkData.artform) {
        const artformTranslations = await this.translateToMultipleLanguages(
          artworkData.artform, 
          targetLanguages
        );
        translatedArtwork.artformTranslations = artformTranslations;
      }

      // Translate tags if present
      if (artworkData.tags && artworkData.tags.length > 0) {
        const tagTranslations = {};
        
        for (const lang of ['en', ...targetLanguages]) {
          tagTranslations[lang] = [];
        }

        for (const tag of artworkData.tags) {
          const translations = await this.translateToMultipleLanguages(tag, targetLanguages);
          
          Object.keys(translations).forEach(lang => {
            tagTranslations[lang].push(translations[lang]);
          });
        }
        
        translatedArtwork.tagTranslations = tagTranslations;
      }

      return translatedArtwork;
    } catch (error) {
      console.error('Artwork translation error:', error);
      return artworkData;
    }
  }

  /**
   * Translate event data
   * @param {Object} eventData - Event object with translatable fields
   * @param {string[]} targetLanguages - Array of target language codes
   * @returns {Promise<Object>} - Event object with translations
   */
  async translateEvent(eventData, targetLanguages) {
    try {
      const translatedEvent = { ...eventData };
      
      // Fields to translate
      const fieldsToTranslate = ['title', 'description'];
      
      for (const field of fieldsToTranslate) {
        if (eventData[field]) {
          const translations = await this.translateToMultipleLanguages(
            eventData[field], 
            targetLanguages
          );
          
          translatedEvent[`${field}Translations`] = translations;
        }
      }

      // Translate instructor name if present
      if (eventData.instructor) {
        const instructorTranslations = await this.translateToMultipleLanguages(
          eventData.instructor, 
          targetLanguages
        );
        translatedEvent.instructorTranslations = instructorTranslations;
      }

      return translatedEvent;
    } catch (error) {
      console.error('Event translation error:', error);
      return eventData;
    }
  }

  /**
   * Get mock translation for development
   * @param {string} text - Text to translate
   * @param {string} targetLanguage - Target language code
   * @returns {string} - Mock translated text
   */
  getMockTranslation(text, targetLanguage) {
    const lowerText = text.toLowerCase();
    
    // Check if we have a direct translation for this text
    if (this.mockTranslations[targetLanguage]) {
      const directTranslation = this.mockTranslations[targetLanguage][lowerText];
      if (directTranslation) {
        return directTranslation;
      }
    }
    
    // For words not in our dictionary, create a simple mock translation
    // by adding a prefix indicating it's translated
    const languageName = this.supportedLanguages[targetLanguage];
    return `[${languageName}] ${text}`;
  }

  /**
   * Get list of supported languages
   * @returns {Object} - Object with language codes and names
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  /**
   * Detect language of given text
   * @param {string} text - Text to detect language for
   * @returns {Promise<string>} - Detected language code
   */
  async detectLanguage(text) {
    try {
      // Use Google Translate if API key is available
      if (this.useGoogleTranslate) {
        const [detection] = await this.translate.detect(text);
        return detection.language;
      }
      
      // Mock language detection for development
      // Simple heuristic: if text contains non-ASCII characters, try to guess
      if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi
      if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
      if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
      if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
      if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
      
      return 'en'; // Default to English
    } catch (error) {
      console.error('Language detection error:', error);
      return 'en'; // Default to English
    }
  }
}

module.exports = new TranslationService();
