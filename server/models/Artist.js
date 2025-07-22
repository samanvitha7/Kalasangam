// models/Artist.js
const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  name: String,
  email: String,
  bio: String,
  profilePic: String,
  artworks: [String] // or you can ref artwork model
});

module.exports = mongoose.model("ArtistProfile", artistSchema);
