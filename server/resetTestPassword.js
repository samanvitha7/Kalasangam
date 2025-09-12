require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function resetTestPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kala-sangam', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Find the test user
    const user = await User.findOne({ email: 'artist@test.com' });
    
    if (!user) {
      console.log('Test user not found!');
      return;
    }

    console.log(`Found user: ${user.name} (${user.email})`);
    
    // Reset password to 'artist123456789'
    const newPassword = 'artist123456789';
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Update the user
    user.password = hashedPassword;
    user.isEmailVerified = true; // Also make sure email is verified
    await user.save();
    
    console.log('✅ Password successfully reset!');
    console.log('Login credentials:');
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${newPassword}`);
    console.log(`Role: ${user.role}`);
    console.log(`Email Verified: ${user.isEmailVerified}`);
    
    // Test the password
    const isMatch = await bcrypt.compare(newPassword, user.password);
    console.log(`Password verification: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

resetTestPassword();
