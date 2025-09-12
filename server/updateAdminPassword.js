require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function updateAdminPassword() {
  try {
    // Connect to MongoDB Atlas using the actual MONGO_URI from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas');

    // Find admin user
    let adminUser = await User.findOne({ email: 'admin@test.com' });
    
    if (adminUser) {
      console.log('Admin user found, updating password...');
      console.log(`Existing admin: ${adminUser.name} (${adminUser.email})`);
      adminUser.password = 'admin123456789';
      adminUser.isEmailVerified = true;
      await adminUser.save();
      
      console.log('✅ Admin password updated successfully!');
      console.log('Admin Login credentials:');
      console.log(`Email: ${adminUser.email}`);
      console.log(`Password: admin123456789`);
      console.log(`Role: ${adminUser.role}`);
      
      // Test the password
      const isMatch = await adminUser.comparePassword('admin123456789');
      console.log(`Password verification: ${isMatch ? '✅ SUCCESS' : '❌ FAILED'}`);
    } else {
      console.log('❌ Admin user not found with email: admin@test.com');
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

updateAdminPassword();
