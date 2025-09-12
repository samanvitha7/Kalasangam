const mongoose = require('mongoose');
const User = require('./models/User');
const Artwork = require('./models/Artwork');
require('dotenv').config();

const diagnoseArtworkCounts = async () => {
  try {
    console.log('🔍 Diagnosing artwork count mismatches...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all users with role Artist
    const users = await User.find({ role: 'Artist' }).select('name email artworks');
    
    console.log(`\n👥 Found ${users.length} artists:`);
    
    let totalMismatches = 0;
    let totalArtworks = 0;
    
    for (const user of users) {
      // Count actual artworks in database for this user
      const actualArtworkCount = await Artwork.countDocuments({ userId: user._id });
      
      // Get stored artwork count from user model
      const storedArtworkCount = user.artworks ? user.artworks.length : 0;
      
      const isMatch = actualArtworkCount === storedArtworkCount;
      totalArtworks += actualArtworkCount;
      
      console.log(`\n📊 ${user.name} (${user.email || 'No email'})`);
      console.log(`   🔗 User ID: ${user._id}`);
      console.log(`   🎨 Actual artworks in DB: ${actualArtworkCount}`);
      console.log(`   📝 Stored in user.artworks: ${storedArtworkCount}`);
      console.log(`   ${isMatch ? '✅' : '❌'} Match: ${isMatch}`);
      
      if (!isMatch) {
        totalMismatches++;
        
        // Show the actual artworks for this user
        const artworks = await Artwork.find({ userId: user._id }).select('title _id');
        console.log(`   📋 Actual artworks:`);
        artworks.forEach((artwork, index) => {
          console.log(`      ${index + 1}. "${artwork.title}" (ID: ${artwork._id})`);
        });
        
        // Show what's stored in user.artworks array
        console.log(`   📋 Stored in user.artworks array:`);
        if (user.artworks && user.artworks.length > 0) {
          user.artworks.forEach((artworkId, index) => {
            console.log(`      ${index + 1}. ${artworkId}`);
          });
        } else {
          console.log(`      (empty array)`);
        }
      }
    }

    // Overall statistics
    console.log(`\n📊 SUMMARY:`);
    console.log(`   Total artists: ${users.length}`);
    console.log(`   Total artworks in database: ${totalArtworks}`);
    console.log(`   Artists with mismatched counts: ${totalMismatches}`);
    console.log(`   Artists with correct counts: ${users.length - totalMismatches}`);
    
    if (totalMismatches > 0) {
      console.log(`\n⚠️  FOUND ${totalMismatches} MISMATCHES!`);
      console.log(`\n🔧 Would you like me to fix these mismatches?`);
      console.log(`   Run: node fixArtworkCounts.js`);
    } else {
      console.log(`\n✅ All artwork counts are correct!`);
    }

    // Check for orphaned artworks (artworks without valid user)
    console.log(`\n🔍 Checking for orphaned artworks...`);
    const allArtworks = await Artwork.find({}).select('title userId artist');
    const userIds = users.map(u => u._id.toString());
    
    let orphanedCount = 0;
    for (const artwork of allArtworks) {
      if (!userIds.includes(artwork.userId.toString())) {
        console.log(`❌ Orphaned artwork: "${artwork.title}" (Artist: ${artwork.artist}, UserID: ${artwork.userId})`);
        orphanedCount++;
      }
    }
    
    if (orphanedCount === 0) {
      console.log(`✅ No orphaned artworks found.`);
    } else {
      console.log(`⚠️  Found ${orphanedCount} orphaned artworks!`);
    }

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error diagnosing artwork counts:', error);
    process.exit(1);
  }
};

// Run the diagnosis
diagnoseArtworkCounts();
