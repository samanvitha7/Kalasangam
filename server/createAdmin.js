const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createTestAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kalasangam');
    
    // Create test admin
    const adminUser = await User.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'Admin',
      isEmailVerified: true
    });

    // Create test artist
    const artistUser = await User.create({
      name: 'Test Artist',
      email: 'artist@test.com',
      password: 'artist123',
      role: 'Artist',
      isEmailVerified: true
    });

    // Create test viewer
    const viewerUser = await User.create({
      name: 'Test Viewer',
      email: 'viewer@test.com',
      password: 'viewer123',
      role: 'Viewer',
      isEmailVerified: true
    });

    console.log('✅ Test users created successfully!');
    console.log('\nAdmin Login:');
    console.log('Email: admin@test.com');
    console.log('Password: admin123');
    console.log('\nArtist Login:');
    console.log('Email: artist@test.com');
    console.log('Password: artist123');
    console.log('\nViewer Login:');
    console.log('Email: viewer@test.com');
    console.log('Password: viewer123');

    process.exit(0);
  } catch (error) {
    console.error('Error creating test users:', error.message);
    process.exit(1);
  }
};

createTestAdmins();
