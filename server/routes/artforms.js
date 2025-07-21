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

// DELETE /api/artforms/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ArtForm.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Artform not found" });
    }
    res.json({ message: "Artform deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting artform", error: err.message });
  }
});

module.exports = router;
