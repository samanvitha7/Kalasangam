const express = require('express');
const router = express.Router();
const ArtistProfile = require('../models/Artist');

// GET all artist profiles
router.get('/', async (req, res) => {
  try {
    const artists = await ArtistProfile.find();
    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch artists", error: err.message });
  }
});

module.exports = router;
