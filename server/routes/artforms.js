const express = require("express");
const router = express.Router();
const ArtForm = require("../models/ArtForm");

router.get("/", async (req, res) => {
  try {
    const artforms = await ArtForm.find();
    res.json(artforms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
