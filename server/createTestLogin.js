const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createTestLogin = async () => {
  try {
    console.log('🔑 Creating/updating test artist login...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find the Test Artist account
    let testArtist = await User.findOne({ email: 'artist@test.com' });
    
    if (testArtist) {
      console.log('✅ Found existing Test Artist account');
      console.log(`   Name: ${testArtist.name}`);
      console.log(`   Email: ${testArtist.email}`);
      console.log(`   Role: ${testArtist.role}`);
      
      // Update password to something known
      const newPassword = 'testpassword123';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      await User.updateOne(
        { _id: testArtist._id },
        { 
          $set: { 
            password: hashedPassword,
            isEmailVerified: true 
          } 
        }
      );
      
      console.log('🔧 Updated password for test artist');
    } else {
      console.log('❌ Test Artist account not found. Let me check available artists...');
      
      // Get all artist accounts
      const artists = await User.find({ role: 'Artist' }).select('name email');
      console.log(`\n👥 Available artist accounts (${artists.length}):`);
      artists.forEach((artist, index) => {
        console.log(`${index + 1}. ${artist.name} - ${artist.email}`);
      });
      
      if (artists.length > 0) {
        // Update the first artist's password
        const firstArtist = artists[0];
        const newPassword = 'testpassword123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        await User.updateOne(
          { _id: firstArtist._id },
          { 
            $set: { 
              password: hashedPassword,
              isEmailVerified: true 
            } 
          }
        );
        
        console.log(`\n🔧 Updated password for: ${firstArtist.name}`);
        testArtist = firstArtist;
      }
    }

    if (testArtist) {
      console.log('\n🎉 Test Artist Login Ready!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📧 Email: ${testArtist.email}`);
      console.log(`🔒 Password: testpassword123`);
      console.log(`👤 Name: ${testArtist.name}`);
      console.log(`🎭 Role: ${testArtist.role}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n✅ You can now login with these credentials!');
    } else {
      console.log('❌ No artist accounts found to update');
    }

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error creating test login:', error);
    process.exit(1);
  }
};

// Run the script
createTestLogin();
