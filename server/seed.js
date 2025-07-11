const mongoose = require("mongoose");
const ArtForm = require("./models/ArtForm");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await ArtForm.deleteMany({});
  await ArtForm.insertMany([
    {
      name: "Madhubani",
      origin: "Bihar",
      description: "Folk painting with geometric patterns.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Madhubani.jpg"
    },
    {
      name: "Warli",
      origin: "Maharashtra",
      description: "Tribal art with white on mud background.",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Warli_art.jpg"
    },
    {
      name: "Kalamkari",
      origin: "Andhra Pradesh",
      description: "Textile art with hand-drawn patterns.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Kalamkari_art.jpg"
    },
    {
      name: "Pattachitra",
      origin: "Odisha",
      description: "Scroll painting with intricate mythological themes.",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Pattachitra_art.jpg"
    },
    {
      name: "Cheriyal Scrolls",
      origin: "Telangana",
      description: "Hand-painted scrolls narrating folktales.",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Cheriyal_painting.jpg"
    }
  ]);
  console.log("🌟 Seeded DB with art forms!");
  process.exit();
});