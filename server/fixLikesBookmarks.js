const mongoose = require('mongoose');
const Artwork = require('./models/Artwork');
const User = require('./models/User');

require('dotenv').config();

async function fixLikesBookmarks() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kala-sangam');
    console.log('Connected to MongoDB');

    // Get all artworks with their likes and bookmarks
    const artworks = await Artwork.find();
    console.log(`Found ${artworks.length} artworks`);

    // Get all users
    const users = await User.find();
    console.log(`Found ${users.length} users`);

    // Initialize user likes and bookmarks tracking
    const userLikes = {};
    const userBookmarks = {};

    // Initialize each user's arrays
    users.forEach(user => {
      userLikes[user._id.toString()] = [];
      userBookmarks[user._id.toString()] = [];
    });

    // Process each artwork to build user likes/bookmarks
    artworks.forEach(artwork => {
      const artworkId = artwork._id.toString();
      
      // Process likes
      if (artwork.likes && artwork.likes.length > 0) {
        artwork.likes.forEach(userId => {
          const userIdStr = userId.toString();
          if (userLikes[userIdStr]) {
            userLikes[userIdStr].push(artworkId);
          }
        });
      }

      // Process bookmarks
      if (artwork.bookmarks && artwork.bookmarks.length > 0) {
        artwork.bookmarks.forEach(userId => {
          const userIdStr = userId.toString();
          if (userBookmarks[userIdStr]) {
            userBookmarks[userIdStr].push(artworkId);
          }
        });
      }
    });

    // Update each user's likes and bookmarks
    let updatedUsers = 0;
    for (const user of users) {
      const userId = user._id.toString();
      const newLikes = userLikes[userId] || [];
      const newBookmarks = userBookmarks[userId] || [];

      // Only update if there are changes
      if (newLikes.length > 0 || newBookmarks.length > 0) {
        await User.findByIdAndUpdate(userId, {
          likes: newLikes,
          bookmarks: newBookmarks
        });
        
        console.log(`Updated ${user.name}: ${newLikes.length} likes, ${newBookmarks.length} bookmarks`);
        updatedUsers++;
      }
    }

    console.log(`\nSummary:`);
    console.log(`- Updated ${updatedUsers} users with likes/bookmarks data`);
    
    // Verify the fix
    console.log('\n=== VERIFICATION ===');
    const updatedUsersData = await User.find({ $or: [
      { 'likes.0': { $exists: true } },
      { 'bookmarks.0': { $exists: true } }
    ]});

    updatedUsersData.forEach(user => {
      console.log(`${user.name}: ${user.likes.length} likes, ${user.bookmarks.length} bookmarks`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

fixLikesBookmarks();
