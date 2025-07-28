const translationService = require('./utils/translationService');

async function testTranslationService() {
  console.log('🚀 Testing AI Translation Assistant...\n');
  
  // Test 1: Get supported languages
  console.log('1. Supported Languages:');
  const languages = translationService.getSupportedLanguages();
  console.log(JSON.stringify(languages, null, 2));
  console.log('\n');
  
  // Test 2: Single text translation
  console.log('2. Single Text Translation:');
  const singleTranslation = await translationService.translateText('art', 'hi');
  console.log(`"art" in Hindi: ${singleTranslation}`);
  console.log('\n');
  
  // Test 3: Multiple language translation
  console.log('3. Multiple Language Translation:');
  const multipleTranslations = await translationService.translateToMultipleLanguages(
    'beautiful painting', 
    ['hi', 'bn', 'ta', 'te']
  );
  console.log('Translations for "beautiful painting":');
  console.log(JSON.stringify(multipleTranslations, null, 2));
  console.log('\n');
  
  // Test 4: Artwork translation
  console.log('4. Artwork Translation:');
  const mockArtwork = {
    title: 'Traditional Dance Performance',
    description: 'A beautiful classical dance performance showcasing Indian culture',
    artform: 'Bharatanatyam',
    tags: ['dance', 'traditional', 'culture']
  };
  
  const translatedArtwork = await translationService.translateArtwork(
    mockArtwork, 
    ['hi', 'bn', 'ta']
  );
  
  console.log('Original Artwork:');
  console.log(JSON.stringify(mockArtwork, null, 2));
  console.log('\nTranslated Artwork:');
  console.log(JSON.stringify(translatedArtwork, null, 2));
  console.log('\n');
  
  // Test 5: Language detection
  console.log('5. Language Detection:');
  const detectedLang = await translationService.detectLanguage('This is English text');
  console.log(`Detected language: ${detectedLang}`);
  console.log('\n');
  
  console.log('✅ Translation service test completed!');
}

// Run the test
testTranslationService().catch(console.error);
