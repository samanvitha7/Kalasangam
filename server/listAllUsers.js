const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const listAllUsers = async () => {
  try {
    console.log('📋 Listing all users in the database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get all users
    const users = await User.find({}).select('name email phoneNumber role createdAt').sort({ createdAt: 1 });
    
    console.log(`\n👥 Found ${users.length} total users:`);
    
    if (users.length === 0) {
      console.log('🔍 No users found in the database.');
      process.exit(0);
    }

    // Group users by name to identify potential duplicates
    const usersByName = {};
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.role})`);
      console.log(`   📧 ${user.email || 'No email'}`);
      console.log(`   📱 ${user.phoneNumber || 'No phone'}`);
      console.log(`   📅 Created: ${user.createdAt}`);
      console.log('');
      
      // Group by name for duplicate detection
      if (!usersByName[user.name]) {
        usersByName[user.name] = [];
      }
      usersByName[user.name].push(user);
    });

    // Check for duplicates
    console.log('🔍 Checking for duplicate names...');
    let duplicatesFound = false;
    
    for (const [name, userList] of Object.entries(usersByName)) {
      if (userList.length > 1) {
        console.log(`⚠️  DUPLICATE FOUND: "${name}" appears ${userList.length} times`);
        userList.forEach((user, index) => {
          console.log(`   ${index + 1}. ID: ${user._id} | Email: ${user.email || 'None'} | Phone: ${user.phoneNumber || 'None'} | Created: ${user.createdAt}`);
        });
        console.log('');
        duplicatesFound = true;
      }
    }
    
    if (!duplicatesFound) {
      console.log('✅ No duplicate names found.');
    }

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error listing users:', error);
    process.exit(1);
  }
};

// Run the script
listAllUsers();
