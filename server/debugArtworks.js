const mongoose = require('mongoose');
const Artwork = require('./models/Artwork');
const User = require('./models/User');

require('dotenv').config();

async function debugArtworks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kala-sangam');
    console.log('Connected to MongoDB');

    // Get sample artworks
    const artworks = await Artwork.find().limit(5);
    console.log('\n=== SAMPLE ARTWORKS ===');
    artworks.forEach((artwork, index) => {
      console.log(`\nArtwork ${index + 1}:`);
      console.log('ID:', artwork._id);
      console.log('Title:', artwork.title);
      console.log('Likes (array):', artwork.likes);
      console.log('Bookmarks (array):', artwork.bookmarks);
      console.log('Likes count:', artwork.likes ? artwork.likes.length : 0);
      console.log('Bookmarks count:', artwork.bookmarks ? artwork.bookmarks.length : 0);
    });

    // Get sample users
    const users = await User.find().limit(3);
    console.log('\n\n=== SAMPLE USERS ===');
    users.forEach((user, index) => {
      console.log(`\nUser ${index + 1}:`);
      console.log('ID:', user._id);
      console.log('Name:', user.name);
      console.log('Likes (array):', user.likes);
      console.log('Bookmarks (array):', user.bookmarks);
      console.log('Likes count:', user.likes ? user.likes.length : 0);
      console.log('Bookmarks count:', user.bookmarks ? user.bookmarks.length : 0);
    });

    // Test the API response structure
    console.log('\n\n=== API RESPONSE TEST ===');
    const testArtworks = await Artwork.find().limit(2).lean();
    const transformedArtworks = testArtworks.map(artwork => ({
      _id: artwork._id,
      id: artwork._id,
      title: artwork.title,
      artist: artwork.artist,
      description: artwork.description,
      imageUrl: artwork.imageUrl,
      image: artwork.imageUrl,
      category: artwork.category,
      artform: artwork.artform,
      likes: artwork.likes ? artwork.likes.length : 0, // Return count for display
      bookmarks: artwork.bookmarks ? artwork.bookmarks.length : 0, // Return count for display
      likesArray: artwork.likes || [], // Return the actual array for likes checking
      bookmarksArray: artwork.bookmarks || [], // Return the actual array for bookmarks checking
      comments: artwork.comments ? artwork.comments.length : 0,
      tags: artwork.tags || [],
      location: artwork.location,
      isPublic: artwork.isPublic,
      isActive: artwork.isActive,
      createdAt: artwork.createdAt,
      updatedAt: artwork.updatedAt,
      userId: artwork.userId
    }));

    console.log('Transformed artwork sample:');
    console.log(JSON.stringify(transformedArtworks[0], null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

debugArtworks();
