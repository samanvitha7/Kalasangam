const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function findAdmins() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Find all admin users
    const admins = await User.find({ role: 'Admin' }).select('-password');
    
    console.log('\n🔍 Admin accounts found:');
    console.log('='.repeat(50));
    
    if (admins.length === 0) {
      console.log('❌ No admin accounts found in the database.');
    } else {
      admins.forEach((admin, index) => {
        console.log(`\n${index + 1}. Admin Account:`);
        console.log(`   ID: ${admin._id}`);
        console.log(`   Name: ${admin.name}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Role: ${admin.role}`);
        console.log(`   Email Verified: ${admin.isEmailVerified}`);
        console.log(`   Created: ${admin.createdAt}`);
      });
    }

    // Also check total user count
    const totalUsers = await User.countDocuments();
    const artistUsers = await User.countDocuments({ role: 'Artist' });
    
    console.log('\n📊 Database Summary:');
    console.log('='.repeat(30));
    console.log(`Total Users: ${totalUsers}`);
    console.log(`Admin Users: ${admins.length}`);
    console.log(`Artist Users: ${artistUsers}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

findAdmins();
