const mongoose = require("mongoose");

const danceFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  description: { type: String, required: true },
  photos: [{ type: String }],
});

module.exports = mongoose.model("DanceForm", danceFormSchema);
