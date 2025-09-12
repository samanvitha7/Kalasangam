require('dotenv').config();
const mongoose = require('mongoose');

async function debugDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kala-sangam');
    console.log('Connected to MongoDB');
    console.log('Database URL:', process.env.MONGODB_URI || 'mongodb://localhost:27017/kala-sangam');
    
    // Get database info
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('\nCollections in database:');
    collections.forEach(col => console.log(`- ${col.name}`));
    
    // Check users collection directly
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`\nUsers collection count: ${userCount}`);
    
    if (userCount > 0) {
      const users = await usersCollection.find({}, { name: 1, email: 1, role: 1 }).toArray();
      console.log('\nUsers in collection:');
      users.forEach(u => console.log(`- ${u.name} (${u.email}) - Role: ${u.role}`));
      
      // Look for test user specifically
      const testUser = await usersCollection.findOne({ email: 'artist@test.com' });
      if (testUser) {
        console.log('\nTest user found:');
        console.log(JSON.stringify(testUser, null, 2));
      } else {
        console.log('\nNo test user found with email: artist@test.com');
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

debugDB();
