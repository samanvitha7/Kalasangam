const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const verifyProfileFixes = async () => {
  try {
    console.log('🔍 Verifying artist profile fixes...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all artists
    const artists = await User.find({ role: 'Artist' }).select('name socialLinks bio location specialization');
    
    console.log(`👥 Found ${artists.length} artists:`);
    
    artists.forEach((artist, index) => {
      console.log(`\n${index + 1}. ${artist.name}`);
      console.log(`   🔗 Social Links: ${Object.keys(artist.socialLinks || {}).length} platforms`);
      
      if (artist.socialLinks) {
        Object.entries(artist.socialLinks).forEach(([platform, url]) => {
          console.log(`      ${platform}: ${url}`);
        });
      }
      
      console.log(`   📍 Location: ${artist.location || 'Not set'}`);
      console.log(`   🎨 Specialization: ${artist.specialization || 'Not set'}`);
      console.log(`   📝 Bio length: ${artist.bio?.length || 0} characters`);
    });

    console.log(`\n✅ Profile verification completed!`);
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error verifying profiles:', error);
    process.exit(1);
  }
};

// Run verification
verifyProfileFixes();
