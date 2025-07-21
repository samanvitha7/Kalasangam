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
  },
  {
  "name": "Sea Shell Crafts",
  "origin": "Goa",
  "photoUrl": [
    "https://i.pinimg.com/1200x/b3/9f/f2/b39ff2e14cfc7005560101ca66875bde.jpg",
    "https://i.pinimg.com/736x/ff/2c/17/ff2c174aac37bfe847f93176361a4b0d.jpg",
    "https://i.pinimg.com/736x/0a/ac/05/0aac05abbf8f54848e7d8bd0b248d4b0.jpg",
    "https://i.pinimg.com/1200x/9e/db/54/9edb54ff56e7aa2bbe795780bd449009.jpg"
  ]
},//gujarat
{
  "name": "Patola Weaving",
  "origin": "Gujarat",
  "photoUrl": [
    "https://i.pinimg.com/1200x/1f/d5/5a/1fd55a0fa5d26a0d5d22b5110fb28b44.jpg",
    "https://i.pinimg.com/1200x/df/f6/7c/dff67c46fc36eec4125f81937f7e0246.jpg",
    "https://i.pinimg.com/736x/7d/d5/9b/7dd59b43a877df1ce5a1f158d8e6591d.jpg",
    "https://i.pinimg.com/736x/66/e8/66/66e866cf2b9150994ee0270c020a1a02.jpg"
  ]
},
{
  "name": "Bandhani",
  "origin": "Gujarat",
  "photoUrl": [
    "https://i.pinimg.com/736x/c9/58/dd/c958dd1552d3e22bf23c8226d46087cb.jpg",
    "https://i.pinimg.com/736x/44/8f/47/448f47bf02c072f4bdffb743c87d47e0.jpg",
    "https://i.pinimg.com/736x/8c/c7/ef/8cc7efd20ea4c00deeab02a3866c5fea.jpg",
    "https://i.pinimg.com/1200x/ab/69/46/ab6946a78ae6bbe36b3cabb21f2ed594.jpg"
  ]
},
{
  "name": "Rogan Art",
  "origin": "Gujarat",
  "photoUrl": [
    "https://i.pinimg.com/736x/79/93/a8/7993a8b9d9388edd4bd2eaa204a77c11.jpg",
    "https://i.pinimg.com/1200x/37/f0/43/37f043032b9d8aff4a68d9b3425d8679.jpg",
    "https://i.pinimg.com/474x/e6/4f/c6/e64fc6e6d86234bfdbe5ec3a26cc2aa4.jpg",
    "https://i.pinimg.com/736x/4d/cc/53/4dcc5333770a6f5599dda7eb07317994.jpg"
  ]
},
{
  "name": "Kutchi Embroidery",
  "origin": "Gujarat",
  "photoUrl": [
    "https://i.pinimg.com/736x/f8/21/ce/f821ce267d02c998dcd81d0fbc96328b.jpg",
    "https://i.pinimg.com/1200x/91/74/e0/9174e0b3d7baa9aa0fcbe2ce502681a5.jpg",
    "https://i.pinimg.com/1200x/12/b8/45/12b8456a2187d58ec68b1e392a47045f.jpg",
    "https://i.pinimg.com/1200x/12/68/d4/1268d4a20d69c8166ddc9d9113037144.jpg"
  ]
},//haryana
{
  "name": "Phulkari Embroidery",
  "origin": "Haryana",
  "photoUrl": [
    "https://i.pinimg.com/1200x/8f/b3/84/8fb3841ef8347def71e06569db6280f5.jpg",
    "https://i.pinimg.com/736x/d2/0c/2b/d20c2bf0a272298055f28d4e23c83327.jpg",
    "https://i.pinimg.com/736x/02/4f/9a/024f9ae37f6dcf2f0af43e9ffd98e1c8.jpg",
    "https://i.pinimg.com/736x/9c/1b/c8/9c1bc8dc011b1c22ecefb73505170671.jpg"
  ]
},
{
  "name": "Clay Pottery",
  "origin": "Haryana",
  "photoUrl": [
    "https://i.pinimg.com/1200x/ee/7c/52/ee7c52f031f7cb7545afc41fcaded03a.jpg",
    "https://i.pinimg.com/736x/ec/3a/16/ec3a16fe566c39bfe8ebce1c57173d5d.jpg",
    "https://i.pinimg.com/736x/42/e4/b9/42e4b93be5a56b66ccb54ed7ada94bca.jpg",
    "https://i.pinimg.com/736x/75/c6/00/75c600f67089b0d9cb3188728c98b25d.jpg"
  ]
},
{
  "name": "Folk Puppetry",
  "origin": "Haryana",
  "photoUrl": [
    "https://i.pinimg.com/1200x/cd/fe/f3/cdfef39692454067b0747d2d5832954e.jpg",
    "https://i.pinimg.com/736x/a4/fe/21/a4fe2193cdc2b9d98b83a7b9f6615c95.jpg",
    "https://i.pinimg.com/1200x/4d/67/46/4d67460533d43e82c0ab9f2b06f98752.jpg",
    "https://i.pinimg.com/736x/b9/25/24/b925247dea14c6b0893d8df9cca227d0.jpg"
  ]
},//Himachal Pradesh
{
  "name": "Chamba Rumal",
  "origin": "Himachal Pradesh",
  "photoUrl": [
    "https://i.pinimg.com/736x/5d/3e/6e/5d3e6ec7ff86b7a868361b9239f7a022.jpg",
    "https://i.pinimg.com/736x/dc/b2/b0/dcb2b05689af689ee6a5cafe2f85ad85.jpg",
    "https://i.pinimg.com/736x/95/9d/4c/959d4c9d59ed22339dc3fbea93ef0e41.jpg",
    "https://i.pinimg.com/736x/80/43/a6/8043a65b4826a36cd7defcec12b5b1fb.jpg"
  ]
},
{
  "name": "Miniature Painting",
  "origin": "Himachal Pradesh",
  "photoUrl": [
    "https://i.pinimg.com/1200x/15/3c/86/153c8694141a7bc8db7fc41591ce121b.jpg",
    "https://i.pinimg.com/736x/a4/b2/5d/a4b25d44e473f548c010ff73a708e758.jpg",
    "https://i.pinimg.com/736x/7b/36/fc/7b36fcf56339eeb164429d9d4763ac93.jpg",
    "https://i.pinimg.com/736x/9a/8c/88/9a8c886dc72217e04adf6c0da9639e70.jpg"
  ]
},
{
  "name": "Kullu Shawl Weaving",
  "origin": "Himachal Pradesh",
  "photoUrl": [
    "https://i.pinimg.com/736x/01/f8/ab/01f8ab0f4b3c210b1212e193dd2efd4f.jpg",
    "https://i.pinimg.com/1200x/63/eb/1f/63eb1f09793f606b1bd50f9ceda0c006.jpg",
    "https://i.pinimg.com/1200x/f2/d4/0f/f2d40fc084ae1f8c911c86a92f86a70a.jpg",
    "https://i.pinimg.com/736x/cd/b2/fb/cdb2fb7e60e94567677609e92bd6f8e9.jpg"
  ]
},//jharkhand
{
  "name": "Sohrai & Khovar Painting",
  "origin": "Jharkhand",
  "photoUrl": [
    "https://i.pinimg.com/736x/45/5e/32/455e32b0c9adc713654671b3b37fa57a.jpg",
    "https://i.pinimg.com/736x/7e/53/b4/7e53b4af804dbf8365be28427e56e6e0.jpg",
    "https://i.pinimg.com/736x/f3/81/52/f3815275d24a5c8c1417e6d029a194c6.jpg",
    "https://i.pinimg.com/1200x/50/51/fc/5051fc9064dc1d27d70e660dc226659a.jpg"
  ]
},
{
  "name": "Dokra Art",
  "origin": "Jharkhand",
  "photoUrl": [
    "https://i.pinimg.com/736x/bb/df/08/bbdf08d5d8cecf433f4b8a376cd7148b.jpg",
    "https://i.pinimg.com/736x/aa/03/02/aa0302c9c8f909f7bd7e7cfd24972a63.jpg",
    "https://i.pinimg.com/1200x/09/26/48/0926483158c4079df18ab049e3e51950.jpg",
    "https://i.pinimg.com/736x/09/b5/8f/09b58fe42de19efcdad3d473c5198167.jpg"
  ]
},
{
  "name": "Terracotta",
  "origin": "Jharkhand",
  "photoUrl": [
    "https://i.pinimg.com/736x/a3/ca/09/a3ca09527479dd452a6ac0e6f83883d5.jpg",
    "https://i.pinimg.com/736x/d4/b5/56/d4b556af4d7d946896793a6c7cb78fe1.jpg",
    "https://i.pinimg.com/736x/62/39/eb/6239ebb43c12eb4b3b31a00bb17ff1de.jpg",
    "https://i.pinimg.com/1200x/4f/e8/c0/4fe8c00283b7a32d35d87cb9d13cc193.jpg"
  ]
},//karnataka
{
  "name": "Mysore Painting",
  "origin": "Karnataka",
  "photoUrl": [
    "https://i.pinimg.com/1200x/c8/be/6e/c8be6e15b9f2244e978a78e794896fd3.jpg",
    "https://i.pinimg.com/1200x/0b/ef/1c/0bef1cfc947a2f84375c9a0d9a27f074.jpg",
    "https://i.pinimg.com/736x/b9/99/32/b99932086dfde03aa76627d98252716f.jpg",
    "https://i.pinimg.com/736x/5f/52/e6/5f52e6f3807b65b1197c8c0c6ba99505.jpg"
  ]
},
{
  "name": "Kasuti Embroidery",
  "origin": "Karnataka",
  "photoUrl": [
    "https://i.pinimg.com/1200x/76/b4/47/76b4475bc4ce279abcdd00ace20369dd.jpg",
    "https://i.pinimg.com/736x/2f/59/9a/2f599a44c33eacda5c4bc2fc20f0bf0e.jpg",
    "https://i.pinimg.com/1200x/e6/ac/6c/e6ac6c43fb813fd58452efe6bc0534c9.jpg",
    "https://i.pinimg.com/736x/85/2f/35/852f3568c8433fafe7f2999258b4e050.jpg"
  ]
},
{
  "name": "Channapatna Toys",
  "origin": "Karnataka",
  "photoUrl": [
    "https://i.pinimg.com/736x/57/fb/d3/57fbd3b79de754fc992a23deda390f42.jpg",
    "https://i.pinimg.com/1200x/8f/85/59/8f8559acc9731369eeaeeea499f761a5.jpg",
    "https://i.pinimg.com/1200x/bd/cc/51/bdcc51fc2201bdf7cf10eceb10853c38.jpg",
    "https://i.pinimg.com/1200x/36/9f/48/369f488c4f2a50e54067379e85e39acf.jpg"
  ]
},
{
  "name": "Sandalwood Carving",
  "origin": "Karnataka",
  "photoUrl": [
    "https://i.pinimg.com/1200x/7e/bc/6c/7ebc6ca106959f6f940c0dff4b2269eb.jpg",
    "https://i.pinimg.com/1200x/8e/9b/b1/8e9bb1f7a2df92158f8bcfd3bb693d11.jpg",
    "https://i.pinimg.com/1200x/eb/27/40/eb274044717616af44ba103fdea30d38.jpg",
    "https://i.pinimg.com/1200x/1c/95/8f/1c958fcdd27b3690045e4964f57af187.jpg"
  ]
},//kerala
{
  "name": "Kathakali Face Makeup",
  "origin": "Kerala",
  "photoUrl": [
    "https://i.pinimg.com/736x/91/ae/a1/91aea17aec9b45889774c6163e7805a3.jpg",
    "https://i.pinimg.com/736x/c4/cb/26/c4cb2627941e09ad91e10346ade150bb.jpg",
    "https://i.pinimg.com/736x/1c/03/93/1c0393bb444a3c800b27bd4b02067d81.jpg",
    "https://i.pinimg.com/1200x/36/72/cf/3672cf8cc563b41af324bdb09a62fa83.jpg"
  ]
},
{
  "name": "Kerala Murals",
  "origin": "Kerala",
  "photoUrl": [
    "https://i.pinimg.com/1200x/67/73/63/677363c4d80d5b49460947118e5a8533.jpg",
    "https://i.pinimg.com/736x/71/87/9a/71879a5e39a28dedf230c51e5bf5cc2b.jpg",
    "https://i.pinimg.com/1200x/c0/95/54/c09554f960f29ca153ad3c6d7f011229.jpg",
    "https://i.pinimg.com/1200x/62/16/3e/62163e0533a2314427e51ec7668a9e0b.jpg"
  ]
},
{
  "name": "Nettipattam Art",
  "origin": "Kerala",
  "photoUrl": [
    "https://i.pinimg.com/736x/ca/11/d5/ca11d5c500bdb28f3be29263ba75febb.jpg",
    "https://i.pinimg.com/736x/fc/76/ad/fc76adbe7a48edc2e7d62852ec7d9fa1.jpg",
    "https://i.pinimg.com/1200x/a8/44/f3/a844f3928d517d5a9405832f9124f86c.jpg",
    "https://i.pinimg.com/1200x/bb/b8/03/bbb8038a141447680439ec9086ea03a2.jpg"
  ]
},//madhya pradesh
{
  "name": "Gond Painting",
  "origin": "Madhya Pradesh",
  "photoUrl": [
    "https://i.pinimg.com/736x/a6/93/b6/a693b6a6077295da48a830d98b3f57f4.jpg",
    "https://i.pinimg.com/736x/fb/da/e8/fbdae88e36861a8a4166f4fe2b966ad5.jpg",
    "https://i.pinimg.com/736x/e2/64/f8/e264f86b8bf294146cbba6b979eb9c7d.jpg",
    "https://i.pinimg.com/736x/6e/3f/38/6e3f38b5d852a163ca17aceb095a258b.jpg"
  ]
},
{
  "name": "Chanderi & Maheshwari Sarees",
  "origin": "Madhya Pradesh",
  "photoUrl": [
    "https://i.pinimg.com/736x/12/77/69/127769ae8afe1d81021214794cb5e09c.jpg",
    "https://i.pinimg.com/1200x/77/80/dc/7780dc5065eb678bd98f1330c2198395.jpg",
    "https://i.pinimg.com/1200x/2e/34/81/2e348153eb4f15ca753b722cafa89f10.jpg",
    "https://i.pinimg.com/736x/5c/d7/7f/5cd77f5b6772526325af960caf6fa612.jpg"
  ]
},
{
  "name": "Zari Zardozi Work",
  "origin": "Madhya Pradesh",
  "photoUrl": [
    "https://i.pinimg.com/736x/08/be/08/08be08093b692c6c4cac07b19561c9eb.jpg",
    "https://i.pinimg.com/1200x/15/c3/39/15c339e92066ac818c6a9a69ba9dac30.jpg",
    "https://i.pinimg.com/736x/c2/90/d1/c290d149a4776f847784cb78aaf2e06e.jpg",
    "https://i.pinimg.com/1200x/6e/51/68/6e51689b945926fb0397bd577a9a801c.jpg"
  ]
},//maharashtra
{
  "name": "Warli Painting",
  "origin": "Maharashtra",
  "photoUrl": [
    "https://i.pinimg.com/736x/6c/26/c3/6c26c37f51136ad7782cfb3fc03e7ff0.jpg",
    "https://i.pinimg.com/1200x/9b/9c/1a/9b9c1a6cdaf0f0cd9616fd9a1c2d6fc8.jpg",
    "https://i.pinimg.com/736x/db/21/75/db2175c474266fe1b28d3ecc6a3dd2dc.jpg",
    "https://i.pinimg.com/1200x/25/d4/76/25d476044a6f55eae912430723c996aa.jpg"
  ]
},
{
  "name": "Paithani Sarees",
  "origin": "Maharashtra",
  "photoUrl": [
    "https://i.pinimg.com/1200x/ae/fd/42/aefd4228af97d73e59c9d2baff1cda69.jpg",
    "https://i.pinimg.com/736x/37/22/c2/3722c287ac3eae28d9243e14d33b79ae.jpg",
    "https://i.pinimg.com/1200x/4c/aa/2c/4caa2c33a348564baaff3081e1365099.jpg",
    "https://i.pinimg.com/1200x/53/75/a9/5375a9978b72d1a21d474762c7727102.jpg"
  ]
},
{
  "name": "Mashru Weaving",
  "origin": "Maharashtra",
  "photoUrl": [
    "https://i.pinimg.com/1200x/bb/16/6c/bb166ce5eb64952390bd5aeabe442fe3.jpg",
    "https://i.pinimg.com/736x/74/00/1a/74001a192881fa632d1512d772261356.jpg",
    "https://i.pinimg.com/1200x/86/6a/15/866a153a03785159e7c83fc82afbec90.jpg",
    "https://i.pinimg.com/1200x/43/56/02/435602fb3b86fd1ff91c337616ae6b7d.jpg"
  ]
},
{
  "name": "Kolhapuri Chappals",
  "origin": "Maharashtra",
  "photoUrl": [
    "https://i.pinimg.com/1200x/94/e1/aa/94e1aa918f17c60d88192b2018f48672.jpg",
    "https://i.pinimg.com/736x/cb/10/16/cb10169675674ecf8f497e7476231013.jpg",
    "https://i.pinimg.com/1200x/d4/5a/8d/d45a8d50b2c78a847f46fd3192b08dcc.jpg",
    "https://i.pinimg.com/1200x/e9/59/b7/e959b7e4c5a18ed84ba998ae452b95fa.jpg"
  ]
},//manipur
{
  "name": "Kauna Grass Weaving",
  "origin": "Manipur",
  "photoUrl": [
    "https://i.pinimg.com/1200x/03/2e/d7/032ed717df014c738f3d85a043289fc8.jpg",
    "https://i.pinimg.com/736x/1e/0b/40/1e0b40956864ee6888f4483c231ac5ca.jpg",
    "https://i.pinimg.com/1200x/76/7d/3b/767d3b8f0cd0330813a1ad9e6420b15e.jpg",
    "https://i.pinimg.com/1200x/78/02/f9/7802f91023936a8d55437264a2e1122a.jpg"
  ]
},
{
  "name": "Dance Costumes",
  "origin": "Manipur",
  "photoUrl": [
    "https://i.pinimg.com/736x/17/ad/6c/17ad6ceea19acf87a7880425f62c4d7b.jpg",
    "https://i.pinimg.com/736x/ee/8a/d6/ee8ad64dcf44872b9ab086468eedf797.jpg",
    "https://i.pinimg.com/736x/5d/e4/5b/5de45b672551f3478eba19c6ac9c8a07.jpg",
    "https://i.pinimg.com/736x/5d/e4/5b/5de45b672551f3478eba19c6ac9c8a07.jpg"
  ]
},
{
  "name": "Pung Cholom Art",
  "origin": "Manipur",
  "photoUrl": [
    "https://i.pinimg.com/1200x/71/2c/86/712c8626d35df017c49db72f220b4ce5.jpg",
    "https://i.pinimg.com/1200x/f9/08/d4/f908d4f41ef30cc9fc553c523bfdfb01.jpg",
    "https://i.pinimg.com/1200x/a4/ad/a4/a4ada4a3ced65bcb760c903469b86005.jpg",
    "https://i.pinimg.com/1200x/ef/4a/96/ef4a961d3e74ed33cde3c6ff11b2adad.jpg"
  ]
},





























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
