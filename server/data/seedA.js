//Seed script to insert sample art
const mongoose=require("mongoose");
require("dotenv").config();
const Art=require("../models/Art.js");

// helper function for urls
const buildPhotoUrlsFromNames = (state, fileNames) => {
  return fileNames.map((file) =>
    `http://localhost:5050/images/all-pics/${state}/${file}`
  );
};

const gallerydata=[
  {
    name:"Kalamkari",
     origin:"Andhra Pradesh",
    photoUrl:[
      "http://localhost:5050/images/all-pics/AP/kalamkari_img1.avif",
      "http://localhost:5050/images/all-pics/AP/kalamkari_img2.jpg",
      "http://localhost:5050/images/all-pics/AP/kalamkari_img3.jpg",
      "http://localhost:5050/images/all-pics/AP/kalamkari_img1.webp",
      "http://localhost:5050/images/all-pics/AP/kalamkari_img1.jpg"
    ],
   
  },
  {
    name:"Nirmal",
    origin:"Andhra Pradesh",
    photoUrl:["http://localhost:5050/images/all-pics/AP/nirmal_1.jpg",
      "http://localhost:5050/images/all-pics/AP/nirmal_2.jpg",
      "http://localhost:5050/images/all-pics/AP/nirmal_3.jpeg",
      "http://localhost:5050/images/all-pics/AP/nirmal_4.jpg",
      "http://localhost:5050/images/all-pics/AP/nirmal_5.jpg",
      
    ],
     
  },
  {
    name:"Bhidri",
    origin:"Andhra Pradesh",

    photoUrl:buildPhotoUrlsFromNames("AP",["bhidri_img1.jpg",
      "bhidri_img2.jpg",
       "bhidri_img3.jpg",
       "bhidri_img4.webp",
       "bhidri_img5.webp"
    ]),
  }

];

async function seedDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");

   // await Art.deleteMany();  //wipes previous entries
    await Art.insertMany(gallerydata); //Adds new ones

    console.log("Data seeded successfully");
    mongoose.connection.close();
  }catch(err){
    console.error("sending error:",err);
  }
  }
  seedDB();


