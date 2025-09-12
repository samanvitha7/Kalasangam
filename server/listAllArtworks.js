const mongoose = require('mongoose');
const User = require('./models/User');
const Artwork = require('./models/Artwork');
require('dotenv').config();

const listAllArtworks = async () => {
  try {
    console.log('🎨 Listing all artworks and their artists...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all artworks
    const artworks = await Artwork.find({}).select('title artist userId createdAt').sort({ createdAt: 1 });
    
    console.log(`\n🖼️ Found ${artworks.length} total artworks:`);
    
    if (artworks.length === 0) {
      console.log('🔍 No artworks found in the database.');
      process.exit(0);
    }

    // Get all users for reference
    const users = await User.find({}).select('name _id');
    const userMap = {};
    users.forEach(user => {
      userMap[user._id.toString()] = user.name;
    });

    console.log(`\n👥 Available users: ${users.length}`);
    users.forEach(user => {
      console.log(`   - ${user.name} (ID: ${user._id})`);
    });

    console.log(`\n🎨 Artworks and their artists:`);
    
    let mismatchCount = 0;
    artworks.forEach((artwork, index) => {
      const actualUserName = userMap[artwork.userId?.toString()];
      const artistNameInArtwork = artwork.artist;
      const isMatch = actualUserName === artistNameInArtwork;
      
      console.log(`${index + 1}. "${artwork.title}"`);
      console.log(`   📝 Artist in artwork: "${artistNameInArtwork}"`);
      console.log(`   👤 Actual user name: "${actualUserName || 'USER NOT FOUND'}"`);
      console.log(`   🔗 User ID: ${artwork.userId}`);
      console.log(`   ${isMatch ? '✅' : '❌'} Names match: ${isMatch}`);
      
      if (!isMatch) {
        mismatchCount++;
      }
      console.log('');
    });

    console.log(`\n📊 Summary:`);
    console.log(`   Total artworks: ${artworks.length}`);
    console.log(`   Mismatched artist names: ${mismatchCount}`);
    console.log(`   Correctly named: ${artworks.length - mismatchCount}`);

    if (mismatchCount > 0) {
      console.log(`\n⚠️  Found ${mismatchCount} artworks with mismatched artist names that need updating.`);
    } else {
      console.log(`\n✅ All artwork artist names match their corresponding users.`);
    }

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error listing artworks:', error);
    process.exit(1);
  }
};

// Run the script
listAllArtworks();
