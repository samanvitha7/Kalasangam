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
      "https://tawangtourism.in/wp-content/uploads/2015/02/thangka2-e1427971963354.jpg",
"https://neocha-content.oss-cn-hongkong.aliyuncs.com/wp-content/uploads/sites/2/2021/09/lama-thanka-03.jpg",
"https://lookaside.instagram.com/seo/google_widget/crawler/",
"https://lookaside.instagram.com/seo/google_widget/crawler/",
    ]
  },
  {
    name: "Carpet Weaving",
    origin: "Arunachal Pradesh",
    photoUrl: [
     "https://kgnmarbleinlay.com/images/grid-mosaic-carpet-design-21-1-600x877-original.jpg",
"https://kgnmarbleinlay.com/images/grid-mosaic-rug-flooring-5-2-580x800-original.jpg",
"https://tibetancentredarjeeling.com/wp-content/uploads/2021/05/OTH-01.jpg",      
"http://www.abhijna-emuseum.com/wp-content/uploads/2017/03/downloadfile-8-1024x768.jpeg",
    ]
  },
  {
    name: "Bamboo and Cane Craft",
    origin: "Arunachal Pradesh",
    photoUrl: [
      "https://www.shutterstock.com/image-photo/baskets-woven-willow-twigs-container-600nw-565145395.jpg",
"https://5.imimg.com/data5/IH/OU/MY-12266299/bamboo-work-handicraft-500x500.jpg", 
"https://spaindustrialdesign.wordpress.com/wp-content/uploads/2020/12/1-7.jpg",   
"https://i.pinimg.com/originals/9e/3b/80/9e3b80bf667137da577e0afcdb0e19fc.jpg",
     
    ]
  },
  {
    name: "Wood Carving",
    origin: "Arunachal Pradesh",
    photoUrl: [
      "https://www.indianetzone.com/public/admin/uploadImage/2_Wooden_Containers_of_Arunachal_Pradesh.jpg",
"http://www.craftclustersofindia.in/upload/Photo/528_7_06.jpg",
"https://5.imimg.com/data5/WY/TC/MY-3762395/wood-elephant-500x500.jpg",
"https://cdn.shopify.com/s/files/1/2447/5025/files/PC010032.jpg",
      
    ]
  },
  {
    name: "Tribal Masks",
    origin: "Arunachal Pradesh",
    photoUrl: [
    
"https://ethnoflorence.wordpress.com/wp-content/uploads/2014/05/f6e0d-1724963487.jpg",
"https://ethnoflorence.wordpress.com/wp-content/uploads/2024/03/bonhams-monpa-mask.jpg",
"https://www.dorotheum.com/fileadmin/lot-images/39T151102/normal/monpa-indien-bundesstaat-arunachal-pradesh-eine-sehr-alte-maske-fuer-die-sogenannten-cham-taenze-2325190.jpg",
"https://www.sftribal.com/wp-content/uploads/2020/11/9fc16ad4635aa4de8e11dcc4664d454d.jpg",
    ]
  },//assam
  {
    name: "Muga & Eri Silk Weaving",
    origin: "Assam",
    photoUrl: [
      "https://upload.wikimedia.org/wikipedia/commons/c/c0/Assamese_Muga_With_Japi.jpg",
"https://s7ap1.scene7.com/is/image/incredibleindia/muga-silk-assam-craft-hero",   
"https://grandmaslegacy.wordpress.com/wp-content/uploads/2018/02/ahimsasilk.jpg", 
"https://lahelooms.com/cdn/shop/files/DSCF4741.jpg",
    ]
  },
  {
    name: "Jaapi",
    origin: "Assam",
    photoUrl: [
     "https://m.media-amazon.com/images/I/81C1F79G6FL._UF894,1000_QL80_.jpg",
"https://5.imimg.com/data5/SELLER/Default/2021/9/GG/VI/QP/129682126/assamese-jaapi-500x500.jpg",
"https://lookaside.instagram.com/seo/google_widget/crawler/",
"https://live.staticflickr.com/2796/4505309617_e41b7486b5_b.jpg",
    ]
  },
  {
    name: "Gamusa Weaving",
    origin: "Assam",
    photoUrl: [
      "https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2025/04/WhatsApp-Image-2025-04-08-at-44101-PMITG-1744110678212.jpeg",
"https://images.meesho.com/images/products/417177424/xgejo_512.webp",
"https://www.shutterstock.com/image-photo/handicrafts-various-handcrafted-gamusa-handmade-600nw-2613393867.jpg",
"https://i.pinimg.com/736x/27/17/96/271796733dccb8989cd8a0c34bb107b2.jpg",
    ]
  },
  {
    name: "Bell Metal Craft",
    origin: "Assam",
    photoUrl: [
     "https://www.shutterstock.com/image-photo/xorai-traditional-symbols-assam-used-600nw-2272425707.jpg",
"http://www.bharatonline.com/assam/pics/metal-crafts-of-assam.jpg",
"https://www.gitagged.com/wp-content/uploads/2023/10/BDH-TRIBAL-KING-QUEEN-1-300x300.jpg",
"https://i.pinimg.com/736x/74/06/b1/7406b17378f4b619d43dd4ede425d89e.jpg", 
    ]
  },//bihar
  {
    name: "Madhubani",
    origin: "Bihar",
    photoUrl: [
     "https://www.tallengestore.com/cdn/shop/files/Peacock-MadhubaniPainting-FolkArtOfIndia_3779aadb-2eed-4832-a675-cfa74801e772.jpg",
"https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/130372/297360/handmade%2Fdownscaled%2Fh_o55aaeecwq_2000x2000__44375.1724735529.jpg",       
"https://images.meesho.com/images/products/115146265/w3ro7_512.jpg",
"https://5.imimg.com/data5/SELLER/Default/2021/2/HC/HB/NG/79888636/6c869061-0afa-47fd-a37e-9b6fe9e17ac2.jpg",
    ]
  },
  {
    name: "Sikki Grass Craft",
    origin: "Bihar",
    photoUrl: [
     "http://okhai.org/cdn/shop/products/BH04DU01_A.jpg",
"https://lookaside.fbsbx.com/lookaside/crawler/media/",
"https://shop.umsas.org.in/wp-content/uploads/2021/12/DSC_4858.jpg",
"https://itokri.com/cdn/shop/products/0X2A6890_d689e618-57fd-4340-8c8b-1c9f04c1279b.jpg"
    ]
  },
  {
    name: "Sujani Embroidery",
    origin: "Bihar",
    photoUrl: [
     "https://lookaside.fbsbx.com/lookaside/crawler/media/",
"https://shop.gaatha.com/image/data/paulami%20/K4.jpg",
"https://shop.umsas.org.in/wp-content/uploads/2021/12/DSC_2192-scaled-350x500.jpg",
"https://media.assettype.com/homegrown%2Fimport%2Farticle%2F14716-fhtsszjznu-1660901534.jpg",
"https://oaklores.com/2024/12/15/evolution-of-sujani-embroidery-from-mothers-love-to-a-medium-of-social-expression/cushion-cover-amoulee/"
    ]
  },
  {
    name: "Tikuli Art",
    origin: "Bihar",
    photoUrl: [
     "https://m.media-amazon.com/images/I/61exS0DS8RL._AC_UF1000,1000_QL80_.jpg",
"https://umsas.org.in/wp-content/uploads/2020/07/4-1-1.jpg",
"https://m.media-amazon.com/images/I/71j0K1-DXtL._AC_UF894,1000_QL80_.jpg",       
"https://cdn.dollsofindia.com/images/p/madhubani-paintings/tikuli-painting-RM16_l.jpg",
    ]
  },
  {
    name: "Lac Bangles",
    origin: "Bihar",
    photoUrl: [
      "https://m.media-amazon.com/images/I/71i1IWieQ1L.jpg",
"https://aarozandcompany.com/wp-content/uploads/2024/07/aarozandcompany.com-2024-07-03T224946.150-300x300.jpg",
"https://aarozandcompany.com/wp-content/uploads/2025/04/arozandcompany.com-2025-03-08T190255.351.jpg",
"https://rukminid2.flixcart.com/image/300/350/xif0q/bangle-bracelet-armlet/d/a/j/2-4-3-na-6-lac32-lahti-wala-lac-original-imaghn6myjcvzsh9.jpeg",
    ]
  }, //chatisgarh
   {
    name: "Bastar Dhokra Metal Craft",
    origin: "Chhattisgarh",
    photoUrl: [
     "https://vedanshcraft.com/cdn/shop/products/SPPX0245_35a1017e-6205-4472-a0ff-553fff55096c.jpg",
"https://i0.wp.com/beautifulbastar.com/wp-content/uploads/2025/04/bastar-handicrafts.webp",
"http://www.shambhavicreations.co.in/cdn/shop/products/LRM_EXPORT_191263785104619_20191006_162413128_6685d87e-a762-4538-8715-c4319af32836.jpg",
"https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2022/12/dhokra.jpg"
    ]
  },
  {
    name: "Gond Painting",
    origin: "Chhattisgarh",
    photoUrl: [
     "https://images.jdmagicbox.com/quickquotes/images_main/handpainted-gond-art-on-mango-wood-wall-plate-d-10in-2219868445-94y200c3.jpg",
"http://www.bridgebharat.com/cdn/shop/files/BBP0008G00002-F.jpg",
"https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/130739/297726/handmade%2Fdownscaled%2Fh_z3sj8ajwv1n_2000x2000__66689.1727420215.jpg",      
"https://lookaside.instagram.com/seo/google_widget/crawler/"
    ]
  },
  {
    name: "Wood Carving",
    origin: "Chhattisgarh",
    photoUrl: [
      "https://i.pinimg.com/736x/39/91/1c/39911c097881081d045bffdd42c6e76d.jpg",
"https://www.gitagged.com/wp-content/uploads/2018/06/Wooden-Crafts-Online-GI-TAGGED-1.jpg",
"https://png.pngtree.com/thumb_back/fh260/background/20231029/pngtree-repeated-pattern-of-carved-mouldings-on-decorative-natural-brown-wood-panelling-image_13738529.png",
"https://lsmedia.linker-cdn.net/282256/2021/7148019.jpeg",
    ]
  },
  {
    name: "Tumba Art",
    origin: "Chhattisgarh",
    photoUrl: [
      "https://5.imimg.com/data5/SELLER/Default/2020/8/LU/VS/EZ/90775844/tumba-art-lamp-cover-500x500.png",
"https://m.media-amazon.com/images/I/61MgGrEeu2L._UF894,1000_QL80_.jpg",
"https://upload.wikimedia.org/wikipedia/commons/9/9d/Tumba_shilp.JPG",
"https://5.imimg.com/data5/SELLER/Default/2020/8/LT/YB/UN/90775844/tumba-art-lamp-cover-medium-500x500.png"
    ]
  },
  {
    name: "Terracotta",
    origin: "Chhattisgarh",
    photoUrl: [
      "https://reincarnatingraipur.com/wp-content/uploads/2023/11/3d460763b7012dc53e54088a10f43425-758x505.jpg",
"https://srejonee.com/wp-content/uploads/2022/07/elephant-2-300x300.jpg",
"https://www.dsource.in/sites/default/files/gallery/1389/1.jpg",
"https://images.jdmagicbox.com/quickquotes/images_main/terracotta-lamp-diyas-for-home-decoration-set-of-six-oval-2022712522-h1eegsy5.jpg",
    ]
  },
  //goa
  {
    name:"Kaavi Mural Art",
    origin:"Goa",
    photoUrl:[
"https://i.pinimg.com/1200x/5c/4b/ae/5c4bae970dd6fa68db43d9b01db4c85e.jpg",
"https://i.pinimg.com/1200x/bb/ae/0e/bbae0e285b19ecf5ab4fe192788fde39.jpg",
"https://i.pinimg.com/1200x/c7/c0/51/c7c05104eda459e58147a1b99de376cd.jpg",
"https://i.pinimg.com/736x/3c/e8/5c/3ce85c2a7d19cfb2c3ebe8c3c402a543.jpg"

    ]
  },
  {
    name:"Ajulezoe Tiles",
    origin:"Goa",
    photoUrl:
    [
      
"https://i.pinimg.com/1200x/dd/2e/d5/dd2ed5d11d712aad07c86ca56ebff467.jpg",
"https://i.pinimg.com/736x/3a/34/fe/3a34fe335c6f317b52be9463de8639d2.jpg",
"https://i.pinimg.com/1200x/aa/02/6a/aa026a0933b88c757297a231b3693963.jpg",
"https://i.pinimg.com/1200x/d6/75/41/d6754132792a1a3b4fc7fb757e395128.jpg "
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
