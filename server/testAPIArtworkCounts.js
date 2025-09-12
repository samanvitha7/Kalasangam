const mongoose = require('mongoose');
const User = require('./models/User');
const Artwork = require('./models/Artwork');
require('dotenv').config();

const testAPIArtworkCounts = async () => {
  try {
    console.log('🧪 Testing API artwork count responses...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Simulate what the API endpoints should return
    console.log('\n🔍 Testing User API responses...');
    
    // Get all artists
    const artists = await User.find({ role: 'Artist' }).select('name email artworks');
    
    for (const artist of artists) {
      const actualArtworkCount = await Artwork.countDocuments({ userId: artist._id });
      const storedCount = artist.artworks ? artist.artworks.length : 0;
      
      console.log(`\n👤 ${artist.name}`);
      console.log(`   Database count: ${actualArtworkCount}`);
      console.log(`   User.artworks length: ${storedCount}`);
      console.log(`   API should return: ${actualArtworkCount} (from database count)`);
      
      // Check if the user.artworks array contains the correct IDs
      if (actualArtworkCount > 0) {
        const actualArtworks = await Artwork.find({ userId: artist._id }).select('_id title');
        const actualIds = actualArtworks.map(a => a._id.toString()).sort();
        const storedIds = (artist.artworks || []).map(id => id.toString()).sort();
        
        const idsMatch = JSON.stringify(actualIds) === JSON.stringify(storedIds);
        console.log(`   Artwork IDs match: ${idsMatch ? '✅' : '❌'}`);
        
        if (!idsMatch) {
          console.log(`   Actual artwork IDs: [${actualIds.join(', ')}]`);
          console.log(`   Stored artwork IDs: [${storedIds.join(', ')}]`);
        }
      }
    }

    // Test the actual API endpoint simulation
    console.log('\n🌐 Simulating API endpoint responses...');
    
    // Simulate GET /api/users/:id (what frontend would call)
    for (const artist of artists) {
      const artworkCount = await Artwork.countDocuments({ userId: artist._id });
      
      // This is what the API should return
      const apiResponse = {
        _id: artist._id,
        name: artist.name,
        email: artist.email,
        role: artist.role,
        artworkCount: artworkCount, // This should be calculated dynamically
        // NOT from user.artworks.length
      };
      
      console.log(`\n📡 API Response for ${artist.name}:`);
      console.log(`   artworkCount: ${apiResponse.artworkCount}`);
    }

    // Check if there's a specific API route that returns artwork counts
    console.log('\n🔍 Checking common API patterns...');
    
    // Pattern 1: Count from database directly (CORRECT)
    const totalArtworksFromDB = await Artwork.countDocuments({});
    console.log(`📊 Total artworks (from Artwork collection): ${totalArtworksFromDB}`);
    
    // Pattern 2: Count from user.artworks arrays (POTENTIALLY INCORRECT)
    const totalFromUserArrays = await User.aggregate([
      { $match: { role: 'Artist' } },
      { $project: { artworkCount: { $size: { $ifNull: ['$artworks', []] } } } },
      { $group: { _id: null, total: { $sum: '$artworkCount' } } }
    ]);
    
    const totalFromArrays = totalFromUserArrays[0]?.total || 0;
    console.log(`📊 Total artworks (from user.artworks arrays): ${totalFromArrays}`);
    
    if (totalArtworksFromDB !== totalFromArrays) {
      console.log(`⚠️  MISMATCH: Database has ${totalArtworksFromDB} but user arrays total ${totalFromArrays}`);
    } else {
      console.log(`✅ Counts match between database and user arrays`);
    }

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error testing API artwork counts:', error);
    process.exit(1);
  }
};

// Run the test
testAPIArtworkCounts();
