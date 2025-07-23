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
  "name": "Coconut Shell Craft",
  "origin": "Andaman and Nicobar",
  "photoUrl": [
    "https://i.pinimg.com/736x/81/b0/1d/81b01db47410a231e896ed3d59a5d967.jpg",
    "https://i.pinimg.com/1200x/07/fc/a2/07fca29de33f678ee26cb669d48c7ece.jpg",
    "https://i.pinimg.com/736x/37/d2/85/37d28503ad9f9e1023b300aee6eb3893.jpg",
    "https://i.pinimg.com/1200x/c4/02/b7/c402b790e54ac78db83a2431822229dc.jpg"
  ]
},
{
  "name": "Tribal Artifacts",
  "origin": "Andaman and Nicobar",
  "photoUrl": [
    "https://i.pinimg.com/736x/8e/d1/1c/8ed11ce0ceb694c42ec5b031ba7aafdc.jpg",
    "https://i.pinimg.com/736x/8d/39/dc/8d39dca013e42f026481f6c2a82b4dc3.jpg",
    "https://i.pinimg.com/736x/64/9a/c7/649ac79e3d87b2c5b32f7cc1806f93d6.jpg",
    "https://i.pinimg.com/736x/d5/ec/99/d5ec992e6f9b5a4ff61b40674e374a87.jpg"
  ]
},
{
  "name": "Shell Craft",
  "origin": "Andaman and Nicobar",
  "photoUrl": [
    "https://i.pinimg.com/1200x/c0/28/19/c02819043e192c585a7a55b9d20f1972.jpg",
    "https://i.pinimg.com/1200x/e9/bf/2e/e9bf2e531bae49a8e14c310c4527593c.jpg",
    "https://i.pinimg.com/736x/ff/64/de/ff64ded2fd17a64d2a76f39eaf4cedec.jpg",
    "https://i.pinimg.com/736x/9b/8b/41/9b8b4169ffc46964e31e9913808648d3.jpg"
  ]
},//andhra pradesh
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
      "https://i.pinimg.com/1200x/8d/3c/b6/8d3cb6c4d5550b17d734228407613c56.jpg",
      "https://i.pinimg.com/736x/a8/b6/9a/a8b69a17e453cd5c9484a7d34b32ab87.jpg",
      "https://i.pinimg.com/736x/47/fc/2a/47fc2a9d612873003b2237b19f9c2e04.jpg",
      "https://i.pinimg.com/736x/24/6c/03/246c03fe2c9af3cd7e6b55c2d1a1acaf.jpg"
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
"https://itokri.com/cdn/shop/files/puppetry_1070x.jpg?v=3542489911708430977",
    ]
  },  //Arunachal Pradesh
   {
    name: "Thangaka Paintings",
    origin: "Arunachal Pradesh",
    photoUrl: [
      "https://tawangtourism.in/wp-content/uploads/2015/02/thangka2-e1427971963354.jpg",
"https://neocha-content.oss-cn-hongkong.aliyuncs.com/wp-content/uploads/sites/2/2021/09/lama-thanka-03.jpg",

"https://traditionalartofnepal.com/wp-content/uploads/2013/06/Thangka-painting-of-Buddhist-Goddess-White-Tara.jpg",
"https://i.pinimg.com/originals/e9/33/27/e93327baa53413edba938433784a5fa3.jpg",
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
"https://i.pinimg.com/736x/f9/0c/df/f90cdfd69e10a8afbfa51260b05ce322.jpg",
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
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9C_79af6hkpW3_JotbyGVJbRHY8qlXMntg&s.jpg",
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
"https://i.pinimg.com/736x/72/57/1b/72571b5114831e3fafd6120a75547138.jpg",
"https://shop.umsas.org.in/wp-content/uploads/2021/12/DSC_4858.jpg",
"https://itokri.com/cdn/shop/products/0X2A6890_d689e618-57fd-4340-8c8b-1c9f04c1279b.jpg"
    ]
  },
  {
    name: "Sujani Embroidery",
    origin: "Bihar",
    photoUrl: [
"https://shop.gaatha.com/image/data/paulami%20/K4.jpg",
"https://shop.umsas.org.in/wp-content/uploads/2021/12/DSC_2192-scaled-350x500.jpg",
"https://media.assettype.com/homegrown%2Fimport%2Farticle%2F14716-fhtsszjznu-1660901534.jpg",
"https://i.pinimg.com/1200x/ce/0b/1f/ce0b1fdf6c3c9707a1ca8106d915dc89.jpg"
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
"https://i.pinimg.com/1200x/87/cd/7b/87cd7b146767f357a479d79cb08c3d05.jpg"
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
  },//delhi
  {
  "name": "Marble Inlay Work",
  "origin": "Delhi",
  "photoUrl": [
    "https://i.pinimg.com/1200x/60/e6/3d/60e63d83a6d05177605fee11e0784d7c.jpg",
    "https://i.pinimg.com/1200x/08/ab/45/08ab4538cb1c7fd042f99cba5d7381fd.jpg",
    "https://i.pinimg.com/1200x/4d/27/41/4d2741dcc84ebe939b849e71b6caed99.jpg",
    "https://i.pinimg.com/1200x/d8/a5/2f/d8a52f47b81737d545f9768aef18d5c1.jpg"
  ]
},
{
  "name": "Lacquerware",
  "origin": "Delhi",
  "photoUrl": [
    "https://i.pinimg.com/1200x/d4/eb/a6/d4eba65ec7d2ae046ce1d5793775560f.jpg",
    "https://i.pinimg.com/736x/f7/03/9a/f7039a49b97321d06d9f016a3e0c0052.jpg",
    "https://i.pinimg.com/1200x/52/9b/21/529b21553cddaa9df50813e6bb0452d2.jpg",
    "https://i.pinimg.com/736x/ef/54/f9/ef54f99d6b003bc3e7c0d57af081dcb2.jpg"
  ]
},
{
  "name": "Zardozi Embroidery",
  "origin": "Delhi",
  "photoUrl": [
    "https://i.pinimg.com/736x/85/a9/1d/85a91d37a182807a4903583d2f043e21.jpg",
    "https://i.pinimg.com/736x/cd/f5/ce/cdf5cedc5d7e59efc07cb8fa87bcafc1.jpg",
    "https://i.pinimg.com/1200x/a8/ea/58/a8ea58a826c6982237e86bb356fefb93.jpg",
    "https://i.pinimg.com/736x/71/3c/3a/713c3af55a918edded206e345b0464d1.jpg"
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
},//ladakh
{
  "name": "Ladakhi Dress Embroidery",
  "origin": "Ladakh",
  "photoUrl": [
    "https://i.pinimg.com/736x/7e/9a/7c/7e9a7c4ee2a8a134e700c4647906db4e.jpg",
    "https://i.pinimg.com/736x/82/48/e0/8248e0c564a582b27dde4bf5cc7aabf9.jpg",
    "https://i.pinimg.com/1200x/00/d8/66/00d866974a87e3c2e3b7f1ebdbaa989e.jpg",
    "https://i.pinimg.com/1200x/52/94/15/529415e3b082dca668a65b336756f09d.jpg"
  ]
},
{
  "name": "Cham Masks",
  "origin": "Ladakh",
  "photoUrl": [
    "https://i.pinimg.com/736x/12/f4/73/12f4734461f9bee2c110326d22b99899.jpg",
    "https://i.pinimg.com/736x/89/b2/b1/89b2b10e0ae629221c24953f17a855ff.jpg",
    "https://i.pinimg.com/1200x/e9/19/fb/e919fb5050e2329f6b28f83f7235efdc.jpg",
    "https://i.pinimg.com/1200x/5c/8a/79/5c8a794d5ac18c34c3eb428ef609bf01.jpg"
  ]
},
{
  "name": "Wool Weaving (Pashmina and Sheep Wool)",
  "origin": "Ladakh",
  "photoUrl": [
    "https://i.pinimg.com/1200x/d6/15/14/d6151419858c054165375d4f206e8948.jpg",
    "https://i.pinimg.com/736x/ac/bf/f2/acbff294881dcff9d6105a4e89ff416f.jpg",
    "https://i.pinimg.com/736x/a4/83/7b/a4837bda20e38be7228c63fa5784300f.jpg",
    "https://i.pinimg.com/736x/2a/8a/76/2a8a7623bd7aa76ed0570527e3b66b1d.jpg"
  ]
},//lakshadeep
{
  "name": "Coir Craft",
  "origin": "Lakshadweep",
  "photoUrl": [
    "https://i.pinimg.com/1200x/ce/35/44/ce3544f4fd0b9634b1c7a8a19d8effab.jpg",
    "https://i.pinimg.com/736x/51/6a/a1/516aa1378286cb8c16a35c5be97854c8.jpg",
    "https://i.pinimg.com/736x/b9/8e/2b/b98e2b40ff838cbc786299bb8a8e2b27.jpg",
    "https://i.pinimg.com/736x/cf/15/a6/cf15a69c7ddc108e14b5dc7f467fdb89.jpg"
  ]
},
{
  "name": "Bamboo & Palm Leaf Craft",
  "origin": "Lakshadweep",
  "photoUrl": [
    "https://i.pinimg.com/736x/fd/bf/6d/fdbf6d05bd82f7a06251a672216fe2de.jpg",
    "https://i.pinimg.com/1200x/5b/ab/d1/5babd148da365102065975f9da72fdb3.jpg",
    "https://i.pinimg.com/1200x/76/c5/05/76c5055485d954371ebf1d313599bdbc.jpg",
    "https://i.pinimg.com/1200x/7c/9b/24/7c9b2494e32515fd516b4f2c4e7053f4.jpg"
  ]
},


//madhya pradesh
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
},//meghalaya
{
  "name": "Khasi Bamboo Baskets",
  "origin": "Meghalaya",
  "photoUrl": [
    "https://i.pinimg.com/1200x/ca/62/23/ca6223b5bf8ae30074aeb962c7f9b505.jpg",
    "https://i.pinimg.com/1200x/64/26/28/642628b89450cc7bcdbf8813c1f49903.jpg",
    "https://i.pinimg.com/736x/8a/2e/c2/8a2ec242a7e88f364c6f9bd5a0c7bd38.jpg",
    "https://i.pinimg.com/1200x/d6/78/12/d6781219ca9b9bc76265fd7ccc471db5.jpg"
  ]
},
{
  "name": "Cane & Bamboo Craft",
  "origin": "Meghalaya",
  "photoUrl": [
    "https://i.pinimg.com/736x/2b/35/7a/2b357ada33ed9ffe76574874fa24c71b.jpg",
    "https://i.pinimg.com/736x/6f/b3/f2/6fb3f27da479e6d3dc274979d1ada8da.jpg",
    "https://i.pinimg.com/736x/42/e4/1b/42e41b4fd3d1aafecf4d67352c802aa6.jpg",
    "https://i.pinimg.com/1200x/92/7b/87/927b87ccd5a299f5ee5fb0b7db7f8f70.jpg"
  ]
},
{
  "name": "Weaving",
  "origin": "Meghalaya",
  "photoUrl": [
    "https://i.pinimg.com/736x/53/b7/7a/53b77ade8165fdbe9b1d0451cd353626.jpg",
    "https://i.pinimg.com/736x/e3/8e/fd/e38efd19709fd5d79d995af0d4f813de.jpg",
    "https://i.pinimg.com/1200x/15/a9/27/15a927cacb70db3783d01250f369d5f3.jpg",
    "https://i.pinimg.com/736x/46/8f/76/468f7661a8f2bfac80a079ea3fa4de12.jpg"
  ]
},//mizoram
{
  "name": "Puan Weaving",
  "origin": "Mizoram",
  "photoUrl": [
    "https://i.pinimg.com/736x/90/8c/62/908c6284e97052ea61badeca7d86faa9.jpg",
    "https://i.pinimg.com/736x/5a/8c/29/5a8c29761d751a31b9bae1e698999ef1.jpg",
    "https://i.pinimg.com/736x/3f/10/92/3f10928e21cac04111cc43c080c33656.jpg",
    "https://i.pinimg.com/1200x/08/9e/1a/089e1ad0f61035f3ba0bcf9fc9d44fdf.jpg"
  ]
},
{
  "name": "Bamboo & Cane Handicrafts",
  "origin": "Mizoram",
  "photoUrl": [
    "https://i.pinimg.com/1200x/67/cd/0a/67cd0afdd86881a9db5018b5d3f8e7b4.jpg",
    "https://i.pinimg.com/736x/c0/5e/3b/c05e3bf840097e91de94c67a09ff97e9.jpg",
    "https://i.pinimg.com/736x/ac/04/7d/ac047de82c9634d64b6a5fc55146f940.jpg",
    "https://i.pinimg.com/736x/84/7f/71/847f71da6be49eb600fe5cf0d304eead.jpg"
  ]
},//nagaland
{
  "name": "Wood Carving",
  "origin": "Nagaland",
  "photoUrl": [
    "https://i.pinimg.com/736x/69/a4/b8/69a4b833204cc9d466bfc3b3ae48ac12.jpg",
    "https://i.pinimg.com/736x/34/72/ae/3472ae40241201be3895851305c83191.jpg",
    "https://i.pinimg.com/736x/4d/c9/49/4dc949af626a88ec3e31ebf25e0d2125.jpg",
    "https://i.pinimg.com/1200x/36/00/e2/3600e224f06e58726fc9ed5bfef21948.jpg"
  ]
},
{
  "name": "Tribal Jewelry",
  "origin": "Nagaland",
  "photoUrl": [
    "https://i.pinimg.com/736x/09/45/ec/0945ec0fd6248084df8c38804a8a10f8.jpg",
    "https://i.pinimg.com/1200x/6d/d0/5b/6dd05bf72ee03cbd147e39c3af42cd81.jpg",
    "https://i.pinimg.com/736x/cc/73/d3/cc73d3955fb89c1c3a076f7bf201e8e3.jpg",
    "https://i.pinimg.com/736x/08/a2/5f/08a25ffed61070e65e175bc3499a1b83.jpg"
  ]
},
{
  "name": "Loin-loom Weaving",
  "origin": "Nagaland",
  "photoUrl": [
    "https://i.pinimg.com/1200x/61/e4/00/61e40091835fd6fa055fc3b6d76bf41f.jpg",
    "https://i.pinimg.com/736x/67/29/5e/67295e5976c39b13651e80d8514cfb65.jpg",
    "https://i.pinimg.com/736x/4b/27/ab/4b27ab0506d7d81f2cda074ea6201788.jpg",
    "https://i.pinimg.com/1200x/a7/33/31/a7333180d8a34438f35fd8144ff023e9.jpg"
  ]
},//odissa
{
  "name": "Silver Filigree (Tarakasi)",
  "origin": "Odisha",
  "photoUrl": [
    "https://i.pinimg.com/736x/c7/e2/a1/c7e2a1966bc45f4ed82d673d1e702f13.jpg",
    "https://i.pinimg.com/1200x/c7/a5/e7/c7a5e7fcbad460492e506f290d1ca589.jpg",
    "https://i.pinimg.com/1200x/b8/d5/9e/b8d59ec2655da6106b1f60089d2f9d31.jpg",
    "https://i.pinimg.com/736x/65/fb/37/65fb379baf744bdfc8e8390fac16bd40.jpg"
  ]
},
{
  "name": "Applique Work of Pipli",
  "origin": "Odisha",
  "photoUrl": [
    "https://i.pinimg.com/736x/70/c9/94/70c994bfd596533aeeaff52e78383645.jpg",
    "https://i.pinimg.com/736x/d0/5d/ab/d05dab795301acb1450777325b8f0384.jpg",
    "https://i.pinimg.com/736x/72/6b/30/726b306231af08647a770fb3901632a0.jpg",
    "https://i.pinimg.com/736x/5f/3a/35/5f3a353178926c5e1ad252162637c6ed.jpg"
  ]
},
{
  "name": "Sambalpuri Sarees",
  "origin": "Odisha",
  "photoUrl": [
    "https://i.pinimg.com/736x/b8/1d/c6/b81dc634ea2f56d2f38d5801da3b430b.jpg",
    "https://i.pinimg.com/736x/be/ae/3b/beae3b043dcbe9d7bec3999d452c152f.jpg",
    "https://i.pinimg.com/1200x/c6/d1/65/c6d1654a13e00e4bafc9e2f6381f2e94.jpg",
    "https://i.pinimg.com/1200x/76/d2/16/76d216dd4181ac15e57def116ac47822.jpg"
  ]
},//punjab
{
  "name": "Phulkari Embroidery",
  "origin": "Punjab",
  "photoUrl": [
    "https://i.pinimg.com/1200x/19/98/df/1998df019fcdb708c7a15ecb0ebff130.jpg",
    "https://i.pinimg.com/1200x/5c/a0/0d/5ca00d338ef69a72d20dc1027434669a.jpg",
    "https://i.pinimg.com/1200x/2b/f6/2f/2bf62f1cf095b5ce93a8cdd8ef824a7c.jpg",
    "https://i.pinimg.com/736x/67/21/77/672177c692f072ee1aa320f9772a68c9.jpg"
  ]
},
{
  "name": "Punjabi Jutti",
  "origin": "Punjab",
  "photoUrl": [
    "https://i.pinimg.com/1200x/3b/98/70/3b98709fe7ea2b0b87a8bdc46f15f9a4.jpg",
    "https://i.pinimg.com/1200x/4c/6b/8b/4c6b8b379be3138e8f3015e854034770.jpg",
    "https://i.pinimg.com/1200x/04/32/bc/0432bcd80039e8d61d3593a4afd6e6e4.jpg",
    "https://i.pinimg.com/736x/6f/60/f6/6f60f6a3ee59aacf20601bc9415ede7b.jpg"
  ]
},
{
  "name": "Wood Inlay Work",
  "origin": "Punjab",
  "photoUrl": [
    "https://i.pinimg.com/736x/9a/7d/ee/9a7dee15fce50343c8237b2daf0e7592.jpg",
    "https://i.pinimg.com/1200x/8c/17/81/8c17810648d262e396f7774ec6d92406.jpg",
    "https://i.pinimg.com/736x/a3/6e/58/a36e58642b3a730563657c6a4e3a9f85.jpg",
    "https://i.pinimg.com/1200x/0a/91/88/0a91884db1dc7d72eed56b3066995ecb.jpg"
  ]
},//rajasthan 
{
  "name": "Meenakari",
  "origin": "Rajasthan",
  "photoUrl": [
    "https://i.pinimg.com/736x/29/87/c3/2987c325884c4b559cdc9693e5d96049.jpg",
    "https://i.pinimg.com/736x/9a/cb/8b/9acb8bb49569d3c657a2d06087d8b637.jpg",
    "https://i.pinimg.com/736x/32/40/90/3240903920c996ae60bab61dd1085177.jpg",
    "https://i.pinimg.com/736x/40/6c/dd/406cdde190928b470748e7a83d2f93f3.jpg"
  ]
},
{
  "name": "Blue Pottery",
  "origin": "Rajasthan",
  "photoUrl": [
    "https://i.pinimg.com/736x/42/d7/bc/42d7bc9c0c54817bf3c31269a989a310.jpg",
    "https://i.pinimg.com/736x/93/e0/0d/93e00d3a44200aa94b68366f6148e775.jpg",
    "https://i.pinimg.com/736x/5a/5a/4d/5a5a4de6611c6ed4de59a4198f0d9bf5.jpg",
    "https://i.pinimg.com/1200x/87/a3/2a/87a32a94dc639473212dc9b8d77d4b46.jpg"
  ]
},
{
  "name": "Kathputli Puppetry",
  "origin": "Rajasthan",
  "photoUrl": [
    "https://i.pinimg.com/736x/73/fd/86/73fd86124c5bf045e17c37795376a36a.jpg",
    "https://i.pinimg.com/736x/82/e9/f1/82e9f1018d208dd68e331de3bad92245.jpg",
    "https://i.pinimg.com/736x/39/76/6b/39766b6b5afc9cc572a2d4788c458b0d.jpg",
    "https://i.pinimg.com/736x/2b/66/71/2b6671d116925fb19b37c8c4647a1083.jpg"
  ]
},//sikkim
{
  "name": "Thangka Painting",
  "origin": "Sikkim",
  "photoUrl": [
    "https://i.pinimg.com/736x/9f/21/c7/9f21c7fd7d48b4d3b5e4f01a0d37b73b.jpg",
    "https://i.pinimg.com/1200x/85/24/73/8524730d2aa68f75e5e2843727123209.jpg",
    "https://i.pinimg.com/1200x/36/3f/a1/363fa1db3986b160eddd92320091dc9b.jpg",
    "https://i.pinimg.com/1200x/cf/2c/d1/cf2cd1b011ba277f4d6243475f471aa3.jpg"
  ]
},
{
  "name": "Handwoven Carpets",
  "origin": "Sikkim",
  "photoUrl": [
    "https://i.pinimg.com/1200x/21/31/d7/2131d738eee089f2e80fcf6d4e590976.jpg",
    "https://i.pinimg.com/736x/e3/73/6f/e3736f9d35bcb2bd614aeabaa30ac030.jpg",
    "https://i.pinimg.com/1200x/fe/67/22/fe6722b97ac1139bc5933189fb1d1dfb.jpg",
    "https://i.pinimg.com/1200x/6d/d3/55/6dd3554f2856c896337d6729d58b4383.jpg"
  ]
},
{
  "name": "Wood Masks",
  "origin": "Sikkim",
  "photoUrl": [
    "https://i.pinimg.com/1200x/94/9a/4f/949a4faba1bdffbdb9945e12ce73efeb.jpg",
    "https://i.pinimg.com/1200x/2a/6c/1e/2a6c1e83960fbb8ff672363d27d47402.jpg",
    "https://i.pinimg.com/736x/92/d3/30/92d3307b3ce0cbc47858c2327f47b848.jpg",
    "https://i.pinimg.com/736x/7e/ed/24/7eed241aa6bdd12cd618306484118a64.jpg"
  ]
},//tamil nadu
{
  "name": "Tanjore Painting",
  "origin": "Tamil Nadu",
  "photoUrl": [
    "https://i.pinimg.com/1200x/74/ec/7d/74ec7dcfe480635112e280acc2aad13d.jpg",
    "https://i.pinimg.com/1200x/9e/d0/f4/9ed0f4e0a4cb55c47ebb8002334ea7cf.jpg",
    "https://i.pinimg.com/1200x/28/13/47/28134784394016ed43bc4dd792de2442.jpg",
    "https://i.pinimg.com/1200x/37/90/92/379092df2582af90c9a8dfb5fdb91524.jpg"
  ]
},
{
  "name": "Temple Art",
  "origin": "Tamil Nadu",
  "photoUrl": [
    "https://i.pinimg.com/736x/04/55/51/045551b39d8cb54476eb077c48ca30a3.jpg",
    "https://i.pinimg.com/736x/a2/e0/11/a2e0112a10215589c11d1e2b33f8dda8.jpg",
    "https://i.pinimg.com/1200x/db/80/c9/db80c90b4296514e713807fcbb3f1161.jpg",
    "https://i.pinimg.com/1200x/94/2f/cb/942fcb3edb34bce390710a00f497e447.jpg"
  ]
},
{
  "name": "Kanchipuram Sarees",
  "origin": "Tamil Nadu",
  "photoUrl": [
    "https://i.pinimg.com/736x/17/63/99/1763997abca270f90325a8ec1f69af8f.jpg",
    "https://i.pinimg.com/736x/b0/89/ed/b089edbd5b58034b9911ac44a3456185.jpg",
    "https://i.pinimg.com/1200x/8b/22/ce/8b22ce3607db94f0412720bb0c82e664.jpg",
    "https://i.pinimg.com/736x/76/77/fc/7677fc48eeb9e8b0650aa65544c8e29b.jpg"
  ]
},//telangana
{
  "origin": "Telangana",
  "name": "Cheriyal Scroll Painting",
  "photoUrl": [
    "https://i.pinimg.com/736x/40/46/e3/4046e37333420c4c5a83af373a8e75ff.jpg",
    "https://i.pinimg.com/1200x/94/bd/20/94bd2087ba9bed6aea008d4df944f389.jpg",
    "https://i.pinimg.com/736x/7d/43/d5/7d43d57193f4409c575d3235e4ca2197.jpg",
    "https://i.pinimg.com/736x/e9/bd/73/e9bd73f2551523c59904ddda5761761e.jpg"
  ]
},
{
  "origin": "Telangana",
  "name": "Bidriware",
  "photoUrl": [
    "https://i.pinimg.com/1200x/52/50/74/52507436103fc3b6fc723c1317377bbc.jpg",
    "https://i.pinimg.com/736x/1c/f5/87/1cf587322c8f82709f9cb808a3f813dd.jpg",
    "https://i.pinimg.com/736x/34/ae/6f/34ae6fa36c955554e246e5de41f1033f.jpg",
    "https://i.pinimg.com/1200x/e5/f9/2a/e5f92aae4dc820d2da5a565230b025da.jpg"
  ]
},
{
  "origin": "Telangana",
  "name": "Pochampally Ikat",
  "photoUrl": [
    "https://i.pinimg.com/1200x/39/e1/66/39e166972c2f9461be9f3725ff63e7d6.jpg",
    "https://i.pinimg.com/736x/1d/be/f9/1dbef93f010bfcaca31fd6b1204939dd.jpg",
    "https://i.pinimg.com/736x/ad/a5/11/ada511147028610151ca2d96cdebf516.jpg",
    "https://i.pinimg.com/1200x/92/e7/31/92e731d74b7f171062687fa4c42c0804.jpg"
  ]
},//tripura
{
  "name": "Cane & Bamboo Craft",
  "origin": "Tripura",
  "photoUrl": [
    "https://i.pinimg.com/736x/2b/35/7a/2b357ada33ed9ffe76574874fa24c71b.jpg",
    "https://i.pinimg.com/736x/6f/b3/f2/6fb3f27da479e6d3dc274979d1ada8da.jpg",
    "https://i.pinimg.com/736x/42/e4/1b/42e41b4fd3d1aafecf4d67352c802aa6.jpg",
    "https://i.pinimg.com/1200x/92/7b/87/927b87ccd5a299f5ee5fb0b7db7f8f70.jpg"
  ]
},
{
  "origin": "Tripura",
  "name": "Riang Tribal Weaving",
  "photoUrl": [
    "https://i.pinimg.com/736x/69/b5/56/69b556f883a78ae73c1c3a6ddb12b16d.jpg",
    "https://i.pinimg.com/1200x/36/a3/ba/36a3bab2c11e43601bcfc4c66cbaf759.jpg",
    "https://i.pinimg.com/736x/74/c8/7f/74c87f39da957fdb7b2ce29df541a859.jpg",
    "https://i.pinimg.com/1200x/be/da/0e/beda0e832f72fb9f088c990f758f5257.jpg"
  ]
},//uttar pradesh
{
  "origin": "Uttar Pradesh",
  "name": "Chikankari",
  "photoUrl": [
    "https://i.pinimg.com/736x/5d/4d/74/5d4d745f65c7e89fdcdf8d266d0a7f45.jpg",
    "https://i.pinimg.com/736x/8a/09/32/8a093246a89c4872dc5e14cfd0eb5ca1.jpg",
    "https://i.pinimg.com/736x/e7/f1/9b/e7f19b207de0d9bea73bce76d1542c2d.jpg",
    "https://i.pinimg.com/1200x/92/62/10/9262109f949406cc81f80feb64e1bdae.jpg"
  ]
},
{
  "origin": "Uttar Pradesh",
  "name": "Zardozi",
  "photoUrl": [
    "https://i.pinimg.com/736x/c7/9c/d6/c79cd6956dd2f59175caae7ffc44d7f0.jpg",
    "https://i.pinimg.com/1200x/7e/9e/1a/7e9e1a09e65a48c7004ba132e3078476.jpg",
    "https://i.pinimg.com/736x/62/8e/80/628e80ea0dd6bad14b29b9cd462f8089.jpg",
    "https://i.pinimg.com/736x/67/a6/03/67a603da51ff19e0562216f741bb254b.jpg"
  ]
},
{
  "origin": "Uttar Pradesh",
  "name": "Banarasi Sarees",
  "photoUrl": [
    "https://i.pinimg.com/736x/ab/1b/11/ab1b119c25a792e88de580244a41fb12.jpg",
    "https://i.pinimg.com/736x/7c/19/a2/7c19a2e5d23b64e6dc4f4c4c07b7841c.jpg",
    "https://i.pinimg.com/474x/62/62/d5/6262d59e0535769742f8237395ad7d28.jpg",
    "https://i.pinimg.com/1200x/ec/b2/ef/ecb2efae59339a973ce97eb9a86462d2.jpg"
  ]
},//uttarkhand
{
  "origin": "Uttarakhand",
  "name": "Aipan Art",
  "photoUrl": [
    "https://i.pinimg.com/736x/cf/05/a8/cf05a8a35fe756fcded9b4cc584f8cb7.jpg",
    "https://i.pinimg.com/1200x/07/68/b0/0768b0af7232da75afa56d80c2e94469.jpg",
    "https://i.pinimg.com/736x/6d/d4/bf/6dd4bfa15ad019ef6798a20cba744ae0.jpg",
    "https://i.pinimg.com/736x/ac/6d/e1/ac6de1ca7a76a5f133182aef4ce30ce8.jpg"
  ]
},
{
  "origin": "Uttarakhand",
  "name": "Ringaal Bamboo Craft",
  "photoUrl": [
    "https://i.pinimg.com/1200x/a2/cb/7d/a2cb7dc0f1f57c6158bf138539350529.jpg",
    "https://i.pinimg.com/1200x/c1/6b/fb/c16bfb6da7f61e31cf80b581e0b8dc49.jpg",
    "https://i.pinimg.com/1200x/76/71/66/7671665b95f70bb9b86886b9dae8d77c.jpg",
    "https://i.pinimg.com/736x/22/31/c2/2231c22394617ec30c5db65b2299c003.jpg"
  ]
},//west bengal
{
  "origin": "West Bengal",
  "name": "Kantha Embroidery",
  "photoUrl": [
    "https://i.pinimg.com/736x/01/af/42/01af420ccd5fb5018311acf710ead4b3.jpg",
    "https://i.pinimg.com/1200x/60/9b/42/609b42193f2f126c66cf9a562830daa2.jpg",
    "https://i.pinimg.com/1200x/b2/47/21/b24721be4da0945c73b57c1ac57c08c0.jpg",
    "https://i.pinimg.com/736x/16/82/61/16826117356f2ff8d931828630293fc4.jpg"
  ]
},
{
  "origin": "West Bengal",
  "name": "Shola Craft",
  "photoUrl": [
    "https://i.pinimg.com/736x/0e/87/27/0e87271348a8e7a1d79b2e9baa89a221.jpg",
    "https://i.pinimg.com/1200x/d0/b3/f3/d0b3f30d5c437c77a2f36f931f1ac09b.jpg",
    "https://i.pinimg.com/1200x/bf/25/a4/bf25a45005db36468393f75a81865f00.jpg",
    "https://i.pinimg.com/736x/c1/66/5e/c1665e957115a9e0f4f5cd2bde5e9131.jpg"
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
