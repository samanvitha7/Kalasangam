const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function resetAdminPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const newPassword = 'admin123'; // You can change this password
    const adminEmail = 'admin@test.com';

    // Find the admin user
    const admin = await User.findOne({ email: adminEmail, role: 'Admin' });
    
    if (!admin) {
      console.log('❌ Admin user not found');
      return;
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    console.log('✅ Admin password reset successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 New Password:', newPassword);
    console.log('\n⚠️  Please change this password after logging in for security!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
}

resetAdminPassword();
