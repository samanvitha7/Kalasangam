require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function createSecondArtist() {
  try {
    // Connect to MongoDB Atlas using the actual MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    // Check if second test user already exists
    let testUser2 = await User.findOne({ email: 'artist2@test.com' });
    
    if (testUser2) {
      console.log('Second test user already exists, updating password...');
      console.log(`Existing user: ${testUser2.name} (${testUser2.email})`);
      testUser2.password = 'testartist123456';
      testUser2.isEmailVerified = true;
      await testUser2.save();
    } else {
      console.log('Creating new second test artist...');
      // Create new test artist user
      testUser2 = new User({
        name: 'Maya Patel',
        email: 'artist2@test.com',
        password: 'testartist123456',
        role: 'Artist',
        isEmailVerified: true,
        bio: 'Traditional Indian folk artist specializing in Madhubani paintings',
        location: 'Mumbai, Maharashtra',
        specialization: 'Madhubani Art',
        emailNotifications: {
          enabled: true,
          followNotifications: true,
          likeNotifications: true,
          artworkNotifications: true
        }
      });
      
      await testUser2.save();
    }
    
    console.log('✅ Second test artist created/updated successfully!');
    console.log('Login credentials:');
    console.log(`Email: ${testUser2.email}`);
    console.log(`Password: testartist123456`);
    console.log(`Role: ${testUser2.role}`);
    console.log(`Name: ${testUser2.name}`);
    console.log(`Email Verified: ${testUser2.isEmailVerified}`);
    console.log(`User ID: ${testUser2._id}`);
    
    // Test the password
    const isMatch = await testUser2.comparePassword('testartist123456');
    console.log(`Password verification: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}`);

    // Also let's create a third artist for variety
    let testUser3 = await User.findOne({ email: 'rajesh@test.com' });
    
    if (!testUser3) {
      console.log('\nCreating third test artist...');
      testUser3 = new User({
        name: 'Rajesh Kumar',
        email: 'rajesh@test.com',
        password: 'rajesh987654321',
        role: 'Artist',
        isEmailVerified: true,
        bio: 'Contemporary sculptor and installation artist',
        location: 'Delhi, India',
        specialization: 'Sculpture & Installation Art',
        emailNotifications: {
          enabled: false,
          followNotifications: false,
          likeNotifications: false,
          artworkNotifications: false
        }
      });
      
      await testUser3.save();
      console.log('✅ Third test artist created successfully!');
      console.log('Third artist credentials:');
      console.log(`Email: rajesh@test.com`);
      console.log(`Password: rajesh987654321`);
      console.log(`Name: Rajesh Kumar`);
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

createSecondArtist();
