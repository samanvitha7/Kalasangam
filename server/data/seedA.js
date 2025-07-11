//Seed script to insert sample art
const mongoose=require("mongoose");
require("dotenv").config();
const Art=require("../models/Art.js");

const gallerydata=[
  {
    name:"Kalamkari",
    state:"Andhra Pradesh",
    photoUrl:[
      "http://localhost:5000/images/all-pics/AP/kalamkari_img1.avif",
      "http://localhost:5000/images/all-pics/AP/kalamkari_img2.jpg",
      "http://localhost:5000/images/all-pics/AP/kalamkari_img3.jpg",
      "http://localhost:5000/images/all-pics/AP/kalamkari_img1.webp",
      "http://localhost:5000/images/all-pics/AP/kalamkari_img1.jpg"
    ]
  }
];

async function seedDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");

    await Art.deleteMany();
    await Art.insertMany(gallerydata);

    console.log("Data seeded successfully");
    mongoose.connection.close();
  }catch(err){
    console.error("sending error:",err);
  }
  }
  seedDB();


