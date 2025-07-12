// ✅ Seed script to insert sample art
const mongoose = require("mongoose");
const path=require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const Art = require("../models/Art.js");

// ✅ Helper function (still useful for local testing later)
const buildPhotoUrlsFromNames = (state, fileNames) => {
  return fileNames.map((file) =>
    `http://localhost:5050/images/all-pics/${state}/${file}`
  );
};

const galleryData = [
  {
    name: "Kalamkari",
    origin: "Andhra Pradesh",
    photoUrl: [
      "https://images.saatchiart.com/saatchi/1723300/art/8177590/7243563-HSC00001-7.jpg",
     " https://static.wixstatic.com/media/1b2c9f_cdbe02f1e009485a9236387343c8a688~mv2.jpeg/v1/fill/w_553,h_798,al_c,q_85,enc_avif,quality_auto/1b2c9f_cdbe02f1e009485a9236387343c8a688~mv2.jpeg",
     "https://www.tallengestore.com/cdn/shop/products/kalamkari-cloth-painting-lord-tirupati-balaji-venkateshwara-srikalahasti-CE6TA2_large.jpg?v=1570230018",
     "https://sunyaias-resources.s3.ap-south-1.amazonaws.com/content/d6ea171e-730c-11ec-b85f-477923514423.png"


    ]  
  },
  {
    name: "Bhidriware",
    origin: "Andhra Pradesh",
    photoUrl: [
      "http://www.dsource.in/sites/default/files/resource/bidri-ware-hyderabad/introduction/minigallery/3618/07.jpg",
"http://www.sahapedia.org/sites/default/files/styles/sp_inline_images/public/2.5.jpg?itok=aZmFPQ8Z",
"https://3.imimg.com/data3/QX/YH/MY-3307545/bidri-art.jpg",
"http://peachmode.com/cdn/shop/articles/the-lost-art-of-bidri-peachmode.jpg?v=1668998973&width=1024",
    ]
  },
  {
    name: "Nirmal Paintings",
    origin: "Andhra Pradesh",
    photoUrl: [
     "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCBnnbIIwul7d9FSeVomy54CAiojJJ2jxX6DCyITB0_myqxhvsAN9iWiiDkuD0-DPvuzPg_mRKa1LKLtF_wqrLoORG5ZeSjtzMO9Cdhyphenhyphen2j-k3Cdcng9Zx33rx5Ph2cDKjSUYnDrmmJV3M/s1600/nirmal_painting.jpg",
"https://tsht.telangana.gov.in/GolkoCrafts/images/products/nirmal_paintngs/large/44.jpg",
"https://i.pinimg.com/236x/38/fc/fe/38fcfe054a99bbff1e622812757bb3fb.jpg",
    ]
  },
  {
    name: "Etikoppaka Wooden Toys",
    origin: "Andhra Pradesh",
    photoUrl: [
      "https://www.gitagged.com/wp-content/uploads/2024/01/ETIKOPPA-RAMA-SITA-SET-4P-2-300x300.jpg",
"https://lsmedia.linker-cdn.net/282256/2021/7101297.jpeg",
"https://www.gitagged.com/wp-content/uploads/2021/11/EKT3-FARMER-COUPLE-FGREEN-300x300.jpg",
"https://assets.thehansindia.com/h-upload/2024/12/29/1510496-etikoppaka-toys.webp",
    ]
  },
  {
    name: "Leather Puppetry",
    origin: "Andhra Pradesh",
    photoUrl: [
      "https://theindiacrafthouse.com/cdn/shop/products/AndhraLeatherCraftStringPuppet-Lakshman_17_x9__-TTICH93b_eed274a9-1032-46cc-add8-fc086680ab03@2x.jpg",
"https://www.gitagged.com/wp-content/uploads/2017/08/AP-Leather-Puppet.jpg",      
"https://lsmedia.linker-cdn.net/282256/2021/7130415.jpeg",
"https://www.nimmalakuntaleatherpuppetrycraft.com/images/portfolio-2.jpg",
    ]
  },  //Arunachal Pradesh
   {
    name: "Thangaka Paintings",
    origin: "Arunachal Pradesh",
    photoUrl: [
      "https://images.app.goo.gl/khAR13xPwyw6EJSf9",
      "https://images.app.goo.gl/A7d4qd73Qr6Q1JhH6",
      "https://images.app.goo.gl/ZDQ1BE7Ju5g5c9yb7",
      "https://images.app.goo.gl/khmP97fMfLq1McXq9"
    ]
  },
  {
    name: "Carpet Weaving",
    origin: "Arunachal Pradesh",
    photoUrl: [
      "https://images.app.goo.gl/oy9xSUPUdKkup9Cv5",
      "https://images.app.goo.gl/sCAppZnroXpBiyfV7",
      "https://images.app.goo.gl/zB2LBE7XVLTiJDW48",
      "https://images.app.goo.gl/VobHaQ4fEZd8R7ey6"
    ]
  },
  {
    name: "Bamboo and Cane Craft",
    origin: "Arunachal Pradesh",
    photoUrl: [
      "https://images.app.goo.gl/wACASRAqnKp9nszt6",
      "https://images.app.goo.gl/6EDh8zEHXgyRQxTu6",
      "https://images.app.goo.gl/DbP6VuocCT2ENaQN7",
      "https://images.app.goo.gl/3up45bvjvPeqwAxw9"
    ]
  },
  {
    name: "Wood Carving",
    origin: "Arunachal Pradesh",
    photoUrl: [
      "https://images.app.goo.gl/sua78WyqMFQ3V45s6",
      "https://images.app.goo.gl/aGkxpRdisBHKdDJ79",
      "https://images.app.goo.gl/K8CUoRiVjbFBwELq8",
      "https://images.app.goo.gl/79pFvHtKEaCx7Zeh9"
    ]
  },
  {
    name: "Tribal Masks",
    origin: "Arunachal Pradesh",
    photoUrl: [
      "https://images.app.goo.gl/bbHXxuq3oD5WqgHv9",
      "https://images.app.goo.gl/DEbycDpB1RPUGgp57",
      "https://images.app.goo.gl/Bwzxg9iqruqNFySP9",
      "https://images.app.goo.gl/vxWznD8565y2kDAJ9"
    ]
  },//assam
  {
    name: "Muga & Eri Silk Weaving",
    origin: "Assam",
    photoUrl: [
      "https://images.app.goo.gl/Zc6mn4iJPD73pkZb7",
      "https://images.app.goo.gl/KkUnwNWzike7gmvs9",
      "https://images.app.goo.gl/JmFFAXJoi4jK8iRt9",
      "https://images.app.goo.gl/NHbkq1Uo79cnxmjLA"
    ]
  },
  {
    name: "Jaapi",
    origin: "Assam",
    photoUrl: [
      "https://images.app.goo.gl/vG9VCyhMhojoEMW67",
      "https://images.app.goo.gl/XW5xFhTV2csLQpWk9",
      "https://images.app.goo.gl/GZrz8qSu4iMr9LTQ6",
      "https://images.app.goo.gl/CozdkUvsDFBjKQ8V9"
    ]
  },
  {
    name: "Gamusa Weaving",
    origin: "Assam",
    photoUrl: [
      "https://images.app.goo.gl/SgbchdQmYvuFaq3z5",
      "https://images.app.goo.gl/EMdB2fCyHx8Yx3UZA",
      "https://images.app.goo.gl/y9Hx1Xh28JeAYYJSA",
      "https://images.app.goo.gl/7umoN7jF55fz6xpR8"
    ]
  },
  {
    name: "Bell Metal Craft",
    origin: "Assam",
    photoUrl: [
      "https://images.app.goo.gl/s7hS4dTNRCEWW8G98",
      "https://images.app.goo.gl/F9wvr1WG65YxhYXb9",
      "https://images.app.goo.gl/VXiBGFqkpzEKzraR8",
      "https://images.app.goo.gl/wY8P4CazR5heGLxg8"
    ]
  },//bihar
  {
    name: "Madhubani",
    origin: "Bihar",
    photoUrl: [
      "https://images.app.goo.gl/QTvyn9Pd7UomnygR6",
      "https://images.app.goo.gl/L7qgdG6TmKCFhE1aA",
      "https://images.app.goo.gl/RsomMPf1FFbjMPMP7",
      "https://images.app.goo.gl/rGeZjgnP9qbqaYUM8"
    ]
  },
  {
    name: "Sikki Grass Craft",
    origin: "Bihar",
    photoUrl: [
      "https://images.app.goo.gl/E5iEzeLK51w2UFf78",
      "https://images.app.goo.gl/btDKoN2h458LFfRE9",
      "https://images.app.goo.gl/f1G6zXY6Dx86u5ib9",
      "https://images.app.goo.gl/WBAYja6rdQ3ySm498"
    ]
  },
  {
    name: "Sujani Embroidery",
    origin: "Bihar",
    photoUrl: [
      "https://images.app.goo.gl/3bRc3wzwkUGppuWW9",
      "https://images.app.goo.gl/P2VyoH8AMP1AYH7m7",
      "https://images.app.goo.gl/HofR9HXiwSJJiJpL6",
      "https://images.app.goo.gl/uaMYzFXkU85Q4epP8",
      "https://images.app.goo.gl/3gLxo91NBty6qmsX7"
    ]
  },
  {
    name: "Tikuli Art",
    origin: "Bihar",
    photoUrl: [
      "https://images.app.goo.gl/6vyfVyniGwjCrTji6",
      "https://images.app.goo.gl/bJL9stgNsKniEnqo8",
      "https://images.app.goo.gl/gUAn3w56YPeYupMx7",
      "https://images.app.goo.gl/6XGxqbXBAj7rMnLaA"
    ]
  },
  {
    name: "Lac Bangles",
    origin: "Bihar",
    photoUrl: [
      "https://images.app.goo.gl/pPaMv2181tTiPf1L9",
      "https://images.app.goo.gl/8q72NC21zDxh7bZZ6",
      "https://images.app.goo.gl/uU2fB5fhHxeGonDv7",
      "https://images.app.goo.gl/cPdD9RvoHQhasfEp7"
    ]
  }, //chatisgarh
   {
    name: "Bastar Dhokra Metal Craft",
    origin: "Chhattisgarh",
    photoUrl: [
      "https://images.app.goo.gl/F2egMoCGXWueF3FM6",
      "https://images.app.goo.gl/8ziBHiiCsV9gUPpY8",
      "https://images.app.goo.gl/XuopQeCgLbfZPoRe8",
      "https://images.app.goo.gl/FZ54YAXHYEfmkrri7"
    ]
  },
  {
    name: "Gond Painting",
    origin: "Chhattisgarh",
    photoUrl: [
      "https://images.app.goo.gl/So8Mh4eivn9cUSU29",
      "https://images.app.goo.gl/ohK9aEfdN2To4vLc8",
      "https://images.app.goo.gl/c7CpYWS5z7sZZRjQA",
      "https://images.app.goo.gl/dn6G1mGXcuvSP6rPA"
    ]
  },
  {
    name: "Wood Carving",
    origin: "Chhattisgarh",
    photoUrl: [
      "https://images.app.goo.gl/nA7fiMYsQY5g85gz8",
      "https://images.app.goo.gl/U8oCei28Ynhxdww66",
      "https://images.app.goo.gl/2fYmsNVpAM4ySGrB6",
      "https://images.app.goo.gl/ZrYmdx7kJ4HJ1JQj8"
    ]
  },
  {
    name: "Tumba Art",
    origin: "Chhattisgarh",
    photoUrl: [
      "https://images.app.goo.gl/BMd2SWj1UHHMgbHNA",
      "https://images.app.goo.gl/o4teAP2LXZfWsSu19",
      "https://images.app.goo.gl/YjDdzgYYxux7jLus6",
      "https://images.app.goo.gl/eD2i4c6P5BK427Zy5"
    ]
  },
  {
    name: "Terracotta",
    origin: "Chhattisgarh",
    photoUrl: [
      "https://images.app.goo.gl/Pm4am2ThBpbogTcT8",
      "https://images.app.goo.gl/MkEr87pYq5i9i3r49",
      "https://images.app.goo.gl/LNSYwS6zNXLxLfNj8",
      "https://images.app.goo.gl/bU3Xz1rc8teS2Mp29"
    ]
  }

];

console.log("👉 MONGO_URI:", process.env.MONGO_URI);


async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ connected to MongoDB");

    // ✅ Optional: use this if you want to wipe old entries
     //await Art.deleteMany();
     await Art.deleteMany(); // 🧹 This wipes all existing entries
     await Art.insertMany(galleryData); // 🚀 Insert fresh ones


    
    console.log("✅ Data seeded successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
}

seedDB();
