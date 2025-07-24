const mongoose = require('mongoose');
const Artwork = require('./models/Artwork');
const User = require('./models/User');
const ArtForm = require('./models/ArtForm');

require('dotenv').config();

async function debugDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kala-sangam');
    console.log('Connected to MongoDB');

    // Check all collections
    const artworkCount = await Artwork.countDocuments();
    const userCount = await User.countDocuments();
    const artformCount = await ArtForm.countDocuments();

    console.log('\n=== DATABASE OVERVIEW ===');
    console.log('Artworks:', artworkCount);
    console.log('Users:', userCount);
    console.log('ArtForms:', artformCount);

    // Get sample ArtForms if they exist
    if (artformCount > 0) {
      const artforms = await ArtForm.find().limit(3);
      console.log('\n=== SAMPLE ARTFORMS ===');
      artforms.forEach((artform, index) => {
        console.log(`\nArtForm ${index + 1}:`);
        console.log('ID:', artform._id);
        console.log('Name:', artform.name);
        console.log('Description:', artform.description);
        console.log('State:', artform.state);
        console.log('Category:', artform.category);
        console.log('Image:', artform.image);
        if (artform.likes) console.log('Likes:', artform.likes);
        if (artform.bookmarks) console.log('Bookmarks:', artform.bookmarks);
      });
    }

    // Check collections directly
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('\n=== ALL COLLECTIONS ===');
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`);
    });

    // Check if there are documents in common collections
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      if (count > 0) {
        console.log(`\n=== ${collection.name.toUpperCase()} (${count} documents) ===`);
        const sample = await db.collection(collection.name).findOne();
        console.log('Sample document structure:', Object.keys(sample));
        
        // Show first document for artforms
        if (collection.name === 'artforms' || collection.name === 'artForm') {
          console.log('First document:', JSON.stringify(sample, null, 2));
        }
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

debugDatabase();
