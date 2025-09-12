require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createTestArtist() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kala-sangam');
    console.log('Connected to MongoDB');
    console.log('Database URL:', process.env.MONGODB_URI || 'mongodb://localhost:27017/kala-sangam');

    // Check if test user already exists
    let testUser = await User.findOne({ email: 'artist@test.com' });
    
    if (testUser) {
      console.log('Test user already exists, updating password...');
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

    // Let's also create a test admin user for completeness
    let adminUser = await User.findOne({ email: 'admin@test.com' });
    
    if (!adminUser) {
      console.log('\nCreating test admin user...');
      adminUser = new User({
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'admin123456789',
        role: 'Admin',
        isEmailVerified: true,
        emailNotifications: {
          enabled: false,
          followNotifications: false,
          likeNotifications: false,
          artworkNotifications: false
        }
      });
      
      await adminUser.save();
      console.log('✅ Test admin created successfully!');
      console.log('Admin credentials:');
      console.log(`Email: admin@test.com`);
      console.log(`Password: admin123456789`);
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

createTestArtist();
