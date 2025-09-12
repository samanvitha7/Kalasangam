const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const adminEmail = 'bolisettysamanvitha@gmail.com';
    const adminPassword = 'sam@kala07';
    const adminName = 'Samanvitha Bolisetty';

    // Check if user already exists
    let user = await User.findOne({ email: adminEmail });

    if (user) {
      console.log('📧 User already exists. Updating role to Admin...');
      
      // Update existing user to Admin role
      user.role = 'Admin';
      user.isEmailVerified = true; // Ensure email is verified for admin
      user.isVerified = true; // Make sure admin is verified
      
      // Update password if needed (it will be hashed automatically due to the pre-save hook)
      user.password = adminPassword;
      
      await user.save();
      console.log('✅ User updated successfully as Admin');
    } else {
      console.log('➕ User does not exist. Creating new admin user...');
      
      // Create new admin user
      user = new User({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'Admin',
        isEmailVerified: true,
        isVerified: true,
        bio: 'System Administrator for Kalasangam Platform',
        location: 'Admin'
      });

      await user.save();
      console.log('✅ Admin user created successfully');
    }

    // Display user details
    console.log('\n🔍 Admin User Details:');
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`User ID: ${user._id}`);
    console.log(`Email Verified: ${user.isEmailVerified}`);
    console.log(`Account Verified: ${user.isVerified}`);
    console.log(`Created At: ${user.createdAt}`);

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    console.log('🎉 Admin account setup completed successfully!');

  } catch (error) {
    console.error('❌ Error setting up admin account:', error);
    process.exit(1);
  }
};

// Run the script
createAdminUser();