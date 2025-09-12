const mongoose = require('mongoose');
const User = require('./models/User');
const Artwork = require('./models/Artwork');
const Event = require('./models/Event');
require('dotenv').config();

// Known seeded artist emails from the seedDatabase.js file
const SEEDED_ARTIST_EMAILS = [
  'priya.sharma@kalasangam.com',
  'rajesh.kumar@kalasangam.com',
  'arjun.patel@kalasangam.com',
  'vikram.singh@kalasangam.com'
];

// Known seeded artist phone numbers
const SEEDED_ARTIST_PHONES = [
  '+91-9876543210',  // Kavya Nair
  '+91-8765432109'   // Meera Reddy
];

// Known seeded artist names
const SEEDED_ARTIST_NAMES = [
  'Priya Sharma',
  'Rajesh Kumar', 
  'Kavya Nair',
  'Arjun Patel',
  'Meera Reddy',
  'Vikram Singh'
];

const removeDuplicateArtists = async () => {
  try {
    console.log('🧹 Starting duplicate artist removal process...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find all seeded artists (duplicates and originals)
    const seededArtists = await User.find({
      $or: [
        { email: { $in: SEEDED_ARTIST_EMAILS } },
        { phoneNumber: { $in: SEEDED_ARTIST_PHONES } },
        { name: { $in: SEEDED_ARTIST_NAMES } }
      ]
    }).sort({ createdAt: 1 }); // Sort by creation date, oldest first

    console.log(`🔍 Found ${seededArtists.length} total seeded artists`);

    if (seededArtists.length === 0) {
      console.log('✅ No seeded artists found. Nothing to clean up.');
      process.exit(0);
    }

    // Group artists by their unique identifier (email, phone, or name)
    const artistGroups = {};
    
    seededArtists.forEach(artist => {
      let key = artist.email || artist.phoneNumber || artist.name;
      if (!artistGroups[key]) {
        artistGroups[key] = [];
      }
      artistGroups[key].push(artist);
    });

    let totalRemoved = 0;
    let totalArtworksRemoved = 0;
    let totalEventsRemoved = 0;

    // For each group, keep the first (oldest) and remove duplicates
    for (const [key, artists] of Object.entries(artistGroups)) {
      if (artists.length > 1) {
        console.log(`\n👥 Processing artist group: ${key}`);
        console.log(`   Found ${artists.length} duplicates`);
        
        // Keep the first artist, remove the rest
        const [originalArtist, ...duplicates] = artists;
        
        console.log(`   ✅ Keeping original: ${originalArtist.name} (${originalArtist._id})`);
        
        for (const duplicate of duplicates) {
          console.log(`   🗑️  Removing duplicate: ${duplicate.name} (${duplicate._id})`);
          
          // Remove artworks created by this duplicate
          const deletedArtworks = await Artwork.deleteMany({ userId: duplicate._id });
          console.log(`      - Removed ${deletedArtworks.deletedCount} artworks`);
          totalArtworksRemoved += deletedArtworks.deletedCount;
          
          // Remove events created by this duplicate
          const deletedEvents = await Event.deleteMany({ createdBy: duplicate._id });
          console.log(`      - Removed ${deletedEvents.deletedCount} events`);
          totalEventsRemoved += deletedEvents.deletedCount;
          
          // Remove references to this user from other artworks (likes, bookmarks)
          await Artwork.updateMany(
            { likes: duplicate._id },
            { $pull: { likes: duplicate._id } }
          );
          
          await Artwork.updateMany(
            { bookmarks: duplicate._id },
            { $pull: { bookmarks: duplicate._id } }
          );
          
          // Remove the duplicate user
          await User.deleteOne({ _id: duplicate._id });
          totalRemoved++;
          
          console.log(`      ✅ Duplicate artist removed successfully`);
        }
      } else {
        console.log(`✅ ${key}: Only one instance found, no duplicates to remove`);
      }
    }

    // Summary
    console.log('\n🎉 Duplicate removal completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   👥 Artists removed: ${totalRemoved}`);
    console.log(`   🖼️  Artworks removed: ${totalArtworksRemoved}`);
    console.log(`   📅 Events removed: ${totalEventsRemoved}`);
    
    // Show remaining seeded artists
    const remainingArtists = await User.find({
      $or: [
        { email: { $in: SEEDED_ARTIST_EMAILS } },
        { phoneNumber: { $in: SEEDED_ARTIST_PHONES } },
        { name: { $in: SEEDED_ARTIST_NAMES } }
      ]
    });
    
    console.log(`\n✅ Remaining seeded artists: ${remainingArtists.length}`);
    remainingArtists.forEach(artist => {
      console.log(`   - ${artist.name} (${artist.email || artist.phoneNumber})`);
    });

    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error removing duplicate artists:', error);
    process.exit(1);
  }
};

// Run the cleanup
removeDuplicateArtists();
