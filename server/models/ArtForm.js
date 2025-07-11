const mongoose = require("mongoose");

const artFormSchema = new mongoose.Schema({
  name: String,
  origin: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("ArtForm", artFormSchema);
