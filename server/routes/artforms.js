const express = require("express");
const router = express.Router();
const Art = require("../models/Art");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const { userId, category, search, limit = 20, page = 1 } = req.query;
    
    // Build filter object
    let filter = {};
    if (userId) {
      // For now, we'll simulate filtering by userId since ArtForm doesn't have artist reference
      // In a real scenario, you'd filter by artist field
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { origin: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const artforms = await Art.find(filter)
      .skip(skip)
      .limit(parseInt(limit));
      
    const totalArtforms = await Art.countDocuments(filter);

    // If userId is specified, simulate returning artworks for that specific artist
    if (userId) {
      // Generate some sample artworks for this artist
      const artist = await User.findById(userId);
      if (!artist) {
        return res.json({ success: true, data: [] });
      }
      
      // Create simulated artworks for this artist
      const artworkCount = Math.floor(Math.random() * 4) + 1; // 1-4 artworks
      const simulatedArtworks = Array.from({ length: artworkCount }, (_, index) => ({
        id: `${userId}_artwork_${index}`,
        _id: `${userId}_artwork_${index}`,
        title: `${artist.name}'s Traditional Art ${index + 1}`,
        description: `A beautiful traditional artwork showcasing the rich cultural heritage and artistic skills of ${artist.name}.`,
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop`,
        category: ['Painting', 'Sculpture', 'Dance', 'Music', 'Craft'][Math.floor(Math.random() * 5)],
        artist: artist.name,
        artistId: userId,
        userId: userId,
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50),
        bookmarks: Math.floor(Math.random() * 30),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date()
      }));
      
      return res.json({ success: true, data: simulatedArtworks });
    }

    // Return actual artforms data with proper structure for the frontend
    const enhancedArtforms = artforms.map(artform => ({
      id: artform._id,
      _id: artform._id,
      name: artform.name,
      title: artform.name,
      description: `Traditional art form from ${artform.origin}. This represents the rich cultural heritage and artistic traditions passed down through generations.`,
      image: artform.photoUrl && artform.photoUrl.length > 0 ? artform.photoUrl[0] : null,
      imageUrl: artform.photoUrl && artform.photoUrl.length > 0 ? artform.photoUrl[0] : null,
      photoUrl: artform.photoUrl || [],
      category: 'Traditional Art',
      artist: 'Cultural Heritage',
      artistId: null,
      likes: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 100) + 10,
      bookmarks: Math.floor(Math.random() * 200) + 20,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)),
      updatedAt: new Date(),
      origin: artform.origin
    }));

    res.json({
      success: true,
      data: enhancedArtforms,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalArtforms / limit),
        totalItems: totalArtforms,
        hasNextPage: skip + artforms.length < totalArtforms,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    console.error('Error fetching artforms:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/artforms/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Art.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Artform not found" });
    }
    res.json({ message: "Artform deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting artform", error: err.message });
  }
});

module.exports = router;
