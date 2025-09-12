const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const setPriyaPassword = async () => {
  try {
    console.log('🔑 Setting password for Priya Sharma...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find Priya Sharma's account
    const priyaArtist = await User.findOne({ email: 'priya.sharma@artistmail.com' });
    
    if (!priyaArtist) {
      console.log('❌ Priya Sharma account not found with email: priya.sharma@artistmail.com');
      
      // Check if there's a similar name
      const similarUsers = await User.find({ 
        name: { $regex: /priya/i } 
      }).select('name email');
      
      console.log('\n🔍 Found similar users:');
      similarUsers.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`);
      });
      
      process.exit(1);
    }

    console.log('✅ Found Priya Sharma account:');
    console.log(`   Name: ${priyaArtist.name}`);
    console.log(`   Email: ${priyaArtist.email}`);
    console.log(`   Role: ${priyaArtist.role}`);
    
    // Set new password
    const newPassword = 'priya123456';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    await User.updateOne(
      { _id: priyaArtist._id },
      { 
        $set: { 
          password: hashedPassword,
          isEmailVerified: true 
        } 
      }
    );
    
    console.log('🔧 Password updated successfully!');
    
    console.log('\n🎉 Priya Sharma Login Ready!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email: ${priyaArtist.email}`);
    console.log(`🔒 Password: priya123456`);
    console.log(`👤 Name: ${priyaArtist.name}`);
    console.log(`🎭 Role: ${priyaArtist.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✅ You can now login with these credentials!');
    console.log('💡 This account has 3 artworks associated with it:');
    console.log('   - Jagannath Rath Yatra');
    console.log('   - Tree of Life');
    console.log('   - Durga Maa');

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error setting password:', error);
    process.exit(1);
  }
};

// Run the script
setPriyaPassword();
