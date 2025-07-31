const mongoose = require('mongoose');
const Artwork = require('./models/Artwork');

require('dotenv').config();

async function migrateViews() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kala-sangam');
    console.log('Connected to MongoDB');

    // Find all artworks that don't have a views field or have views as undefined/null
    const artworks = await Artwork.find({
      $or: [
        { views: { $exists: false } },
        { views: null },
        { views: undefined }
      ]
    });

    console.log(`Found ${artworks.length} artworks to update`);

    // Update each artwork to set views to 0
    let updatedCount = 0;
    for (const artwork of artworks) {
      artwork.views = 0;
      await artwork.save();
      updatedCount++;
      
      if (updatedCount % 10 === 0) {
        console.log(`Updated ${updatedCount} artworks...`);
      }
    }

    console.log(`Successfully updated ${updatedCount} artworks with views field`);

    // Verify the migration
    const totalArtworks = await Artwork.countDocuments();
    const artworksWithViews = await Artwork.countDocuments({ views: { $exists: true } });
    
    console.log(`Total artworks: ${totalArtworks}`);
    console.log(`Artworks with views field: ${artworksWithViews}`);
    
    if (totalArtworks === artworksWithViews) {
      console.log('✅ Migration completed successfully!');
    } else {
      console.log('⚠️ Some artworks may still be missing the views field');
    }

  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the migration
migrateViews();
