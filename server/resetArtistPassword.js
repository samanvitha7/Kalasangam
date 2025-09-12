require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function resetArtistPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kala-sangam');
    console.log('Connected to MongoDB');

    // Find all users with artist@test.com (case insensitive)
    const users = await User.find({ email: /^artist@test\.com$/i });
    console.log(`Found ${users.length} users matching artist@test.com`);
    
    if (users.length === 0) {
      console.log('❌ No test user found!');
      
      // Let's see all users to debug
      const allUsers = await User.find({}, 'name email role');
      console.log('\nAll users in database:');
      allUsers.forEach(u => console.log(`- ${u.name} (${u.email}) - Role: ${u.role}`));
      return;
    }

    const user = users[0];
    console.log(`Found user: ${user.name} (${user.email})`);
    
    // Reset password to 'artist123456789'
    const newPassword = 'artist123456789';
    
    // Set the password directly - the pre('save') hook will hash it
    user.password = newPassword;
    user.isEmailVerified = true; // Also make sure email is verified
    await user.save();
    
    console.log('✅ Password successfully reset!');
    console.log('Login credentials:');
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${newPassword}`);
    console.log(`Role: ${user.role}`);
    console.log(`Email Verified: ${user.isEmailVerified}`);
    
    // Test the password using the schema method
    const isMatch = await user.comparePassword(newPassword);
    console.log(`Password verification: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

resetArtistPassword();
