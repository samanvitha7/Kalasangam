const mongoose = require('mongoose');
const Artwork = require('./models/Artwork');
require('dotenv').config();

const checkActiveStatus = async () => {
  try {
    console.log('🔍 Checking isActive status of all artworks...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all artworks with their active status
    const artworks = await Artwork.find({}).select('title artist userId isActive isPublic');
    
    console.log(`\n🎨 Found ${artworks.length} total artworks:`);
    
    let activeCount = 0;
    let inactiveCount = 0;
    let undefinedCount = 0;
    let publicCount = 0;
    let privateCount = 0;
    let publicUndefinedCount = 0;
    
    artworks.forEach((artwork, index) => {
      const activeStatus = artwork.isActive;
      const publicStatus = artwork.isPublic;
      
      // Count active status
      if (activeStatus === true) {
        activeCount++;
      } else if (activeStatus === false) {
        inactiveCount++;
      } else {
        undefinedCount++;
      }
      
      // Count public status
      if (publicStatus === true) {
        publicCount++;
      } else if (publicStatus === false) {
        privateCount++;
      } else {
        publicUndefinedCount++;
      }
      
      console.log(`${index + 1}. "${artwork.title}" by ${artwork.artist}`);
      console.log(`   isActive: ${activeStatus} (${typeof activeStatus})`);
      console.log(`   isPublic: ${publicStatus} (${typeof publicStatus})`);
      console.log(`   UserID: ${artwork.userId}`);
      console.log('');
    });

    console.log('📊 ACTIVE STATUS SUMMARY:');
    console.log(`   ✅ Active (true): ${activeCount}`);
    console.log(`   ❌ Inactive (false): ${inactiveCount}`);
    console.log(`   ❓ Undefined/null: ${undefinedCount}`);
    
    console.log('\n📊 PUBLIC STATUS SUMMARY:');
    console.log(`   🌍 Public (true): ${publicCount}`);
    console.log(`   🔒 Private (false): ${privateCount}`);
    console.log(`   ❓ Undefined/null: ${publicUndefinedCount}`);

    // Test what the API would return
    console.log('\n🧪 API Filter Test:');
    
    // This is what the API uses: { userId: artistId, isActive: true }
    const activeArtworksAPI = await Artwork.countDocuments({ isActive: true });
    console.log(`   API count (isActive: true): ${activeArtworksAPI}`);
    
    // Test without isActive filter
    const allArtworksCount = await Artwork.countDocuments({});
    console.log(`   Total count (no filter): ${allArtworksCount}`);
    
    // Test with just isPublic filter
    const publicArtworksCount = await Artwork.countDocuments({ isPublic: true });
    console.log(`   Public artworks (isPublic: true): ${publicArtworksCount}`);

    if (activeArtworksAPI !== allArtworksCount) {
      console.log(`\n⚠️  ISSUE FOUND!`);
      console.log(`   API is filtering by isActive: true and only counting ${activeArtworksAPI} artworks`);
      console.log(`   But there are ${allArtworksCount} total artworks in the database`);
      console.log(`   Missing: ${allArtworksCount - activeArtworksAPI} artworks`);
      
      if (undefinedCount > 0) {
        console.log(`\n💡 SOLUTION: ${undefinedCount} artworks have undefined isActive status`);
        console.log(`   These artworks need to be set to isActive: true`);
      }
      if (inactiveCount > 0) {
        console.log(`\n💡 ALTERNATIVE: ${inactiveCount} artworks are set to isActive: false`);
        console.log(`   These might need to be set to isActive: true if they should be visible`);
      }
    } else {
      console.log(`\n✅ No issues found. API filter matches total count.`);
    }

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error checking active status:', error);
    process.exit(1);
  }
};

// Run the check
checkActiveStatus();
