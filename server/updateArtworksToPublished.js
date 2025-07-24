const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/traditional-arts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Artwork schema (matching your existing model)
const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  imageUrl: { type: String },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublic: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Artwork = mongoose.model('Artwork', artworkSchema);

async function updateArtworksToPublished() {
  try {
    console.log('Connecting to database...');
    
    // Count current draft artworks
    const draftCount = await Artwork.countDocuments({ isPublic: false });
    console.log(`Found ${draftCount} draft artworks`);
    
    // Count current published artworks
    const publishedCount = await Artwork.countDocuments({ isPublic: true });
    console.log(`Found ${publishedCount} published artworks`);
    
    // Update all artworks to published and active
    const result = await Artwork.updateMany(
      {}, // Update all documents
      { 
        $set: { 
          isPublic: true,
          isActive: true,
          updatedAt: new Date()
        } 
      }
    );
    
    console.log(`Updated ${result.modifiedCount} artworks to published status`);
    
    // Verify the update
    const newPublishedCount = await Artwork.countDocuments({ isPublic: true });
    const newDraftCount = await Artwork.countDocuments({ isPublic: false });
    
    console.log(`After update:`);
    console.log(`- Published artworks: ${newPublishedCount}`);
    console.log(`- Draft artworks: ${newDraftCount}`);
    
    console.log('Update completed successfully!');
    
  } catch (error) {
    console.error('Error updating artworks:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the update
updateArtworksToPublished();
