require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createTestUserAtlas() {
  try {
    // Connect to MongoDB Atlas using the actual MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');
    console.log('Database URL:', process.env.MONGO_URI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials

    // Check if test user already exists
    let testUser = await User.findOne({ email: 'artist@test.com' });
    
    if (testUser) {
      console.log('Test user already exists, updating password...');
      console.log(`Existing user: ${testUser.name} (${testUser.email})`);
      testUser.password = 'artist123456789';
      testUser.isEmailVerified = true;
      await testUser.save();
    } else {
      console.log('Creating new test user...');
      // Create new test artist user
      testUser = new User({
        name: 'Test Artist',
        email: 'artist@test.com',
        password: 'artist123456789',
        role: 'Artist',
        isEmailVerified: true,
        emailNotifications: {
          enabled: false,
          followNotifications: false,
          likeNotifications: false,
          artworkNotifications: false
        }
      });
      
      await testUser.save();
    }
    
    console.log('✅ Test artist created/updated successfully!');
    console.log('Login credentials:');
    console.log(`Email: ${testUser.email}`);
    console.log(`Password: artist123456789`);
    console.log(`Role: ${testUser.role}`);
    console.log(`Email Verified: ${testUser.isEmailVerified}`);
    console.log(`User ID: ${testUser._id}`);
    
    // Test the password
    const isMatch = await testUser.comparePassword('artist123456789');
    console.log(`Password verification: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}`);

    // Show all existing users for reference
    const allUsers = await User.find({}, 'name email role isEmailVerified').limit(10);
    console.log('\nAll users in database:');
    allUsers.forEach(u => console.log(`- ${u.name} (${u.email}) - Role: ${u.role} - Verified: ${u.isEmailVerified}`));

  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

createTestUserAtlas();
