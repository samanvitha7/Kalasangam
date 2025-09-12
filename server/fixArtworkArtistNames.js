const mongoose = require('mongoose');
const User = require('./models/User');
const Artwork = require('./models/Artwork');
require('dotenv').config();

const fixArtworkArtistNames = async () => {
  try {
    console.log('🔧 Starting artwork artist name fix...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all artworks
    const artworks = await Artwork.find({});
    
    console.log(`\n🖼️ Found ${artworks.length} total artworks to process`);
    
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

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    console.log(`\n🔄 Processing artworks...`);
    
    for (let i = 0; i < artworks.length; i++) {
      const artwork = artworks[i];
      const actualUserName = userMap[artwork.userId?.toString()];
      const currentArtistName = artwork.artist;
      
      console.log(`\n${i + 1}. Processing: "${artwork.title}"`);
      console.log(`   Current artist name: "${currentArtistName}"`);
      console.log(`   Correct user name: "${actualUserName || 'USER NOT FOUND'}"`);
      
      if (!actualUserName) {
        console.log(`   ❌ ERROR: User not found for ID ${artwork.userId}`);
        errorCount++;
        continue;
      }
      
      if (currentArtistName === actualUserName) {
        console.log(`   ✅ SKIP: Names already match`);
        skippedCount++;
        continue;
      }
      
      try {
        // Update the artwork with the correct artist name
        await Artwork.updateOne(
          { _id: artwork._id },
          { $set: { artist: actualUserName } }
        );
        
        console.log(`   🔧 UPDATED: "${currentArtistName}" → "${actualUserName}"`);
        updatedCount++;
        
      } catch (updateError) {
        console.log(`   ❌ ERROR updating: ${updateError.message}`);
        errorCount++;
      }
    }

    // Verify the updates
    console.log(`\n🔍 Verifying updates...`);
    const updatedArtworks = await Artwork.find({});
    let verificationPassed = 0;
    let verificationFailed = 0;
    
    for (const artwork of updatedArtworks) {
      const actualUserName = userMap[artwork.userId?.toString()];
      if (actualUserName && artwork.artist === actualUserName) {
        verificationPassed++;
      } else {
        verificationFailed++;
        console.log(`   ⚠️  Still mismatched: "${artwork.title}" - "${artwork.artist}" vs "${actualUserName}"`);
      }
    }

    // Final summary
    console.log(`\n🎉 Artwork artist name fix completed!`);
    console.log(`📊 Summary:`);
    console.log(`   Total artworks processed: ${artworks.length}`);
    console.log(`   Successfully updated: ${updatedCount}`);
    console.log(`   Skipped (already correct): ${skippedCount}`);
    console.log(`   Errors: ${errorCount}`);
    console.log(`\n✅ Verification:`);
    console.log(`   Correctly named artworks: ${verificationPassed}`);
    console.log(`   Still mismatched: ${verificationFailed}`);
    
    if (verificationFailed === 0) {
      console.log(`\n🎊 SUCCESS: All artwork artist names now match their corresponding users!`);
    } else {
      console.log(`\n⚠️  WARNING: ${verificationFailed} artworks still have mismatched names.`);
    }

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error fixing artwork artist names:', error);
    process.exit(1);
  }
};

// Run the script
fixArtworkArtistNames();
