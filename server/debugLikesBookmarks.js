const mongoose = require('mongoose');
const Artwork = require('./models/Artwork');
const User = require('./models/User');

require('dotenv').config();

async function debugLikesBookmarks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kala-sangam');
    console.log('Connected to MongoDB');

    // Get all artworks and check their likes/bookmarks structure
    const artworks = await Artwork.find().limit(10);
    console.log('\n=== ARTWORKS LIKES/BOOKMARKS ===');
    artworks.forEach((artwork, index) => {
      console.log(`\nArtwork ${index + 1}: ${artwork.title}`);
      console.log('ID:', artwork._id.toString());
      console.log('Likes array:', artwork.likes);
      console.log('Likes count:', artwork.likes ? artwork.likes.length : 0);
      console.log('Bookmarks array:', artwork.bookmarks);
      console.log('Bookmarks count:', artwork.bookmarks ? artwork.bookmarks.length : 0);
    });

    // Get all users and check their likes/bookmarks structure
    const users = await User.find();
    console.log('\n\n=== USERS LIKES/BOOKMARKS ===');
    users.forEach((user, index) => {
      console.log(`\nUser ${index + 1}: ${user.name}`);
      console.log('ID:', user._id.toString());
      console.log('Likes array:', user.likes);
      console.log('Likes count:', user.likes ? user.likes.length : 0);
      console.log('Bookmarks array:', user.bookmarks);
      console.log('Bookmarks count:', user.bookmarks ? user.bookmarks.length : 0);
    });

    // Test API response transformation
    console.log('\n\n=== API RESPONSE TRANSFORMATION TEST ===');
    const testArtworks = await Artwork.find().limit(3).lean();
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

    transformedArtworks.forEach((artwork, index) => {
      console.log(`\nTransformed Artwork ${index + 1}: ${artwork.title}`);
      console.log('likesArray:', artwork.likesArray);
      console.log('bookmarksArray:', artwork.bookmarksArray);
      console.log('likes count:', artwork.likes);
      console.log('bookmarks count:', artwork.bookmarks);
    });

    // Check if there are any likes/bookmarks relationships
    const artworksWithLikes = await Artwork.find({ 'likes.0': { $exists: true } });
    const artworksWithBookmarks = await Artwork.find({ 'bookmarks.0': { $exists: true } });
    const usersWithLikes = await User.find({ 'likes.0': { $exists: true } });
    const usersWithBookmarks = await User.find({ 'bookmarks.0': { $exists: true } });

    console.log('\n\n=== RELATIONSHIP STATISTICS ===');
    console.log('Artworks with likes:', artworksWithLikes.length);
    console.log('Artworks with bookmarks:', artworksWithBookmarks.length);
    console.log('Users with likes:', usersWithLikes.length);
    console.log('Users with bookmarks:', usersWithBookmarks.length);

    if (artworksWithLikes.length > 0) {
      console.log('\nFirst artwork with likes:');
      console.log('Title:', artworksWithLikes[0].title);
      console.log('Likes:', artworksWithLikes[0].likes);
    }

    if (usersWithLikes.length > 0) {
      console.log('\nFirst user with likes:');
      console.log('Name:', usersWithLikes[0].name);
      console.log('Likes:', usersWithLikes[0].likes);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

debugLikesBookmarks();
