const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Artwork = require("./models/Artwork");
const Event = require("./models/Event");
const ArtForm = require("./models/ArtForm");
require("dotenv").config();

// Sample artist data with diverse profiles
const artistsData = [
  {
    name: "Priya Sharma",
    email: "priya.sharma@kalasangam.com",
    password: "priya123",
    bio: "Traditional Madhubani artist from Bihar, preserving ancient storytelling through vibrant paintings.",
    location: "Patna, Bihar",
    specialization: "Madhubani Painting",
    socialLinks: {
      instagram: "https://instagram.com/priya_madhubani",
      website: "https://priyasharmaart.com"
    }
  },
  {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@kalasangam.com", 
    password: "rajesh123",
    bio: "Master sculptor specializing in traditional stone carving and bronze casting techniques.",
    location: "Jaipur, Rajasthan",
    specialization: "Stone Sculpture",
    socialLinks: {
      instagram: "https://instagram.com/rajesh_sculptor",
      behance: "https://behance.net/rajeshkumar"
    }
  },
  {
    name: "Kavya Nair",
    phoneNumber: "+91-9876543210",
    password: "kavya123",
    bio: "Bharatanatyam dancer and choreographer, blending classical traditions with contemporary expressions.",
    location: "Chennai, Tamil Nadu", 
    specialization: "Bharatanatyam Dance",
    socialLinks: {
      youtube: "https://youtube.com/kavyanair",
      instagram: "https://instagram.com/kavya_bharatanatyam"
    }
  },
  {
    name: "Arjun Patel",
    email: "arjun.patel@kalasangam.com",
    password: "arjun123",
    bio: "Contemporary artist exploring the intersection of traditional Warli art with modern themes.",
    location: "Mumbai, Maharashtra",
    specialization: "Warli Art",
    socialLinks: {
      website: "https://arjunpatelart.com",
      linkedin: "https://linkedin.com/in/arjunpatel"
    }
  },
  {
    name: "Meera Reddy",
    phoneNumber: "+91-8765432109", 
    password: "meera123",
    bio: "Kalamkari textile artist specializing in natural dye processes and storytelling through fabric.",
    location: "Hyderabad, Telangana",
    specialization: "Kalamkari Textile Art",
    socialLinks: {
      instagram: "https://instagram.com/meera_kalamkari",
      website: "https://meerareddy.art"
    }
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@kalasangam.com",
    password: "vikram123", 
    bio: "Traditional woodcarver from Kashmir, creating intricate patterns inspired by Mughal architecture.",
    location: "Srinagar, Kashmir",
    specialization: "Wood Carving",
    socialLinks: {
      instagram: "https://instagram.com/vikram_woodart"
    }
  }
];

// Sample artworks for each artist
const artworksData = [
  // Priya Sharma's artworks (Madhubani)
  [
    {
      title: "Ganga Aarti",
      description: "A vibrant Madhubani painting depicting the evening Ganga Aarti ceremony with traditional motifs and natural pigments.",
      imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800",
      category: "Traditional Art",
      artform: "Madhubani",
      tags: ["madhubani", "ganga", "traditional", "bihar", "folk art"],
      location: "Patna, Bihar"
    },
    {
      title: "Tree of Life",
      description: "Traditional Madhubani tree of life motif with peacocks and fish, symbolizing fertility and prosperity.",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
      category: "Traditional Art", 
      artform: "Madhubani",
      tags: ["tree of life", "peacock", "madhubani", "traditional"],
      location: "Patna, Bihar"
    },
    {
      title: "Durga Maa",
      description: "Powerful depiction of Goddess Durga in traditional Madhubani style, celebrating feminine divine energy.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      category: "Traditional Art",
      artform: "Madhubani", 
      tags: ["durga", "goddess", "madhubani", "spiritual"],
      location: "Patna, Bihar"
    }
  ],
  // Rajesh Kumar's artworks (Sculpture)
  [
    {
      title: "Dancing Shiva",
      description: "Bronze sculpture of Nataraja in cosmic dance pose, representing the eternal cycle of creation and destruction.",
      imageUrl: "https://images.unsplash.com/photo-1604488745147-b76146862ce4?w=800",
      category: "Sculpture",
      artform: "Bronze Casting",
      tags: ["shiva", "nataraja", "bronze", "sculpture", "dance"],
      location: "Jaipur, Rajasthan"
    },
    {
      title: "Rajasthani Elephant",
      description: "Intricately carved stone elephant with traditional Rajasthani motifs and patterns.",
      imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      category: "Sculpture",
      artform: "Stone Carving",
      tags: ["elephant", "rajasthan", "stone", "carving", "traditional"],
      location: "Jaipur, Rajasthan"
    }
  ],
  // Kavya Nair's artworks (Dance)
  [
    {
      title: "Bharatanatyam Recital - Varnam",
      description: "Classical Bharatanatyam performance of traditional Varnam, showcasing pure dance and expression.",
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0c93edf3043?w=800",
      category: "Dance",
      artform: "Bharatanatyam",
      tags: ["bharatanatyam", "varnam", "classical dance", "tamil nadu"],
      location: "Chennai, Tamil Nadu"
    },
    {
      title: "Contemporary Fusion",
      description: "Innovative choreography blending Bharatanatyam with contemporary dance forms.",
      imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800",
      category: "Dance",
      artform: "Bharatanatyam Fusion",
      tags: ["contemporary", "fusion", "bharatanatyam", "modern"],
      location: "Chennai, Tamil Nadu"
    },
    {
      title: "Pushpanjali",
      description: "Traditional Bharatanatyam offering dance dedicated to Lord Ganesha, performed in temple style.",
      imageUrl: "https://images.unsplash.com/photo-1588182137726-8a0d6b0e8659?w=800",
      category: "Dance",
      artform: "Bharatanatyam",
      tags: ["pushpanjali", "ganesha", "temple dance", "classical"],
      location: "Chennai, Tamil Nadu"
    },
    {
      title: "Jatiswaram",
      description: "Pure dance piece showcasing intricate rhythmic patterns and geometric movements of Bharatanatyam.",
      imageUrl: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800",
      category: "Dance",
      artform: "Bharatanatyam",
      tags: ["jatiswaram", "rhythm", "pure dance", "classical"],
      location: "Chennai, Tamil Nadu"
    }
  ],
  // Arjun Patel's artworks (Warli)
  [
    {
      title: "Urban Warli",
      description: "Contemporary interpretation of traditional Warli art depicting modern city life with tribal motifs.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      category: "Traditional Art",
      artform: "Warli",
      tags: ["warli", "urban", "contemporary", "tribal art", "mumbai"],
      location: "Mumbai, Maharashtra"
    },
    {
      title: "Harvest Festival",
      description: "Traditional Warli painting celebrating the harvest season with dancing figures and nature motifs.",
      imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
      category: "Traditional Art",
      artform: "Warli",
      tags: ["harvest", "festival", "warli", "tribal", "traditional"],
      location: "Mumbai, Maharashtra"
    }
  ],
  // Meera Reddy's artworks (Kalamkari)
  [
    {
      title: "Ramayana Saga",
      description: "Hand-painted Kalamkari textile narrating scenes from the Ramayana using natural dyes.",
      imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800",
      category: "Craft",
      artform: "Kalamkari",
      tags: ["kalamkari", "ramayana", "textile", "natural dyes", "storytelling"],
      location: "Hyderabad, Telangana"
    },
    {
      title: "Peacock Paradise",
      description: "Intricate Kalamkari work featuring peacocks and floral motifs in traditional blue and red dyes.",
      imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800",
      category: "Craft",
      artform: "Kalamkari",
      tags: ["peacock", "kalamkari", "floral", "blue", "textile art"],
      location: "Hyderabad, Telangana"
    },
    {
      title: "Tree of Life Tapestry",
      description: "Large Kalamkari tapestry featuring the tree of life motif with birds and animals.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      category: "Craft",
      artform: "Kalamkari",
      tags: ["tree of life", "tapestry", "kalamkari", "animals", "birds"],
      location: "Hyderabad, Telangana"
    }
  ],
  // Vikram Singh's artworks (Wood Carving)
  [
    {
      title: "Chinar Leaf Panel",
      description: "Intricately carved wooden panel featuring the iconic Chinar leaves of Kashmir.",
      imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800",
      category: "Craft",
      artform: "Wood Carving",
      tags: ["chinar", "kashmir", "wood carving", "leaves", "panel"],
      location: "Srinagar, Kashmir"
    },
    {
      title: "Mughal Garden Gate",
      description: "Ornate wooden gate design inspired by Mughal garden architecture with geometric patterns.",
      imageUrl: "https://images.unsplash.com/photo-1574712681043-48dfe9cb4e49?w=800",
      category: "Craft",
      artform: "Wood Carving",
      tags: ["mughal", "garden", "gate", "geometric", "architecture"],
      location: "Srinagar, Kashmir"
    }
  ]
];

// Sample events for artists
const eventsData = [
  {
    artistIndex: 0, // Priya Sharma
    title: "Madhubani Art Workshop",
    description: "Learn the traditional art of Madhubani painting with natural pigments and authentic techniques passed down through generations.",
    type: "workshop",
    category: "art",
    date: new Date("2025-08-15"),
    time: "10:00 AM - 4:00 PM",
    location: {
      venue: "Bihar Art Center",
      address: "Gandhi Maidan Road",
      city: "Patna",
      state: "Bihar"
    },
    price: 1500,
    maxParticipants: 20,
    imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800",
    registrationRequired: true,
    contactEmail: "priya.sharma@kalasangam.com",
    contactPhone: "+91-9123456789",
    tags: ["madhubani", "workshop", "traditional art", "bihar"]
  },
  {
    artistIndex: 1, // Rajesh Kumar
    title: "Stone Sculpture Exhibition",
    description: "Exhibition of contemporary stone sculptures blending traditional Rajasthani carving techniques with modern artistic vision.",
    type: "exhibition",
    category: "art",
    date: new Date("2025-08-20"),
    time: "6:00 PM - 9:00 PM",
    location: {
      venue: "Jaipur Art Gallery",
      address: "MI Road",
      city: "Jaipur",
      state: "Rajasthan"
    },
    price: 0,
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    registrationRequired: false,
    contactEmail: "rajesh.kumar@kalasangam.com",
    tags: ["sculpture", "exhibition", "stone carving", "rajasthan"]
  },
  {
    artistIndex: 2, // Kavya Nair
    title: "Bharatanatyam Classical Recital",
    description: "Classical Bharatanatyam performance featuring traditional compositions and contemporary choreography.",
    type: "performance",
    category: "dance",
    date: new Date("2025-09-05"),
    time: "7:00 PM - 9:00 PM",
    location: {
      venue: "Music Academy",
      address: "T. T. K. Road",
      city: "Chennai",
      state: "Tamil Nadu"
    },
    price: 500,
    maxParticipants: 200,
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0c93edf3043?w=800",
    registrationRequired: true,
    contactPhone: "+91-9876543210",
    tags: ["bharatanatyam", "classical dance", "performance", "chennai"]
  },
  {
    artistIndex: 3, // Arjun Patel
    title: "Contemporary Warli Art Exhibition",
    description: "Explore the evolution of Warli art in contemporary contexts, showcasing traditional tribal motifs in modern settings.",
    type: "exhibition",
    category: "art",
    date: new Date("2025-08-25"),
    time: "11:00 AM - 8:00 PM",
    location: {
      venue: "Mumbai Art Society",
      address: "Kala Ghoda",
      city: "Mumbai",
      state: "Maharashtra"
    },
    price: 200,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    registrationRequired: false,
    contactEmail: "arjun.patel@kalasangam.com",
    tags: ["warli", "contemporary art", "tribal art", "mumbai"]
  },
  {
    artistIndex: 4, // Meera Reddy  
    title: "Kalamkari Natural Dyeing Workshop",
    description: "Hands-on workshop on traditional Kalamkari techniques using natural dyes and hand-painting methods.",
    type: "workshop",
    category: "crafts",
    date: new Date("2025-09-10"),
    time: "9:00 AM - 5:00 PM",
    location: {
      venue: "Telangana Handicrafts Center",
      address: "Banjara Hills",
      city: "Hyderabad",
      state: "Telangana"
    },
    price: 2000,
    maxParticipants: 15,
    imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800",
    registrationRequired: true,
    contactPhone: "+91-8765432109",
    tags: ["kalamkari", "natural dyes", "workshop", "textile art"]
  }
];

// Art forms data
const artFormsData = [
  { name: "Madhubani", origin: "Bihar", image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800" },
  { name: "Warli", origin: "Maharashtra", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800" },
  { name: "Kalamkari", origin: "Andhra Pradesh", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800" },
  { name: "Pattachitra", origin: "Odisha", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800" },
  { name: "Stone Carving", origin: "Rajasthan", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800" },
  { name: "Wood Carving", origin: "Kashmir", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800" },
  { name: "Bharatanatyam", origin: "Tamil Nadu", image: "https://images.unsplash.com/photo-1594736797933-d0c93edf3043?w=800" }
];

const seedDatabase = async () => {
  try {
    console.log("🚀 Starting comprehensive database seeding...");
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await User.deleteMany({});
    await Artwork.deleteMany({});  
    await Event.deleteMany({});
    await ArtForm.deleteMany({});
    console.log("✅ Cleared existing data");

    // Seed art forms first
    console.log("🎨 Seeding art forms...");
    const seededArtForms = await ArtForm.insertMany(artFormsData);
    console.log(`✅ Seeded ${seededArtForms.length} art forms`);

    // Create artist users
    console.log("👥 Creating artist users...");
    const createdUsers = [];
    
    for (let i = 0; i < artistsData.length; i++) {
      const artistData = artistsData[i];
      
      try {
        const userData = {
          ...artistData,
          role: "Artist",
          isEmailVerified: true,
          avatar: `https://images.unsplash.com/photo-${1500000000 + i}00-${1600000000 + i}00-${1700000000 + i}00?w=400&h=400&fit=crop&crop=face`,
          coverImage: `https://images.unsplash.com/photo-${1580000000 + i}00-${1690000000 + i}00-${1750000000 + i}00?w=1200&h=400&fit=crop`
        };
        
        // Ensure either email or phoneNumber is set, but not both as undefined
        if (!userData.email && !userData.phoneNumber) {
          userData.email = `artist${i}@kalasangam.com`;
        }
        
        const user = new User(userData);
        const savedUser = await user.save();
        createdUsers.push(savedUser);
        console.log(`✅ Created artist: ${savedUser.name} (${savedUser.email || savedUser.phoneNumber})`);
      } catch (error) {
        console.error(`❌ Error creating user ${artistData.name}:`, error.message);
        throw error;
      }
    }

    // Create artworks for each artist
    console.log("🖼️ Creating artworks...");
    const createdArtworks = [];
    
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      const userArtworks = artworksData[i] || [];
      
      for (const artworkData of userArtworks) {
        const artwork = new Artwork({
          ...artworkData,
          userId: user._id,
          artist: user.name,
          likes: [], // Will be populated later
          bookmarks: [] // Will be populated later
        });
        
        const savedArtwork = await artwork.save();
        createdArtworks.push(savedArtwork);
        console.log(`✅ Created artwork: "${savedArtwork.title}" by ${user.name}`);
      }
    }

    // Create cross-likes and bookmarks (each artist likes and bookmarks all other artists' works)
    console.log("❤️ Creating likes and bookmarks...");
    let totalLikes = 0;
    let totalBookmarks = 0;
    
    for (const artwork of createdArtworks) {
      for (const user of createdUsers) {
        // Don't let users like/bookmark their own work
        if (user._id.toString() !== artwork.userId.toString()) {
          // Add like
          artwork.likes.push(user._id);
          totalLikes++;
          
          // Add bookmark (50% chance for variety)
          if (Math.random() > 0.3) {
            artwork.bookmarks.push(user._id);
            totalBookmarks++;
          }
        }
      }
      await artwork.save();
    }
    
    console.log(`✅ Created ${totalLikes} likes and ${totalBookmarks} bookmarks`);

    // Create events for some artists
    console.log("📅 Creating events...");
    const createdEvents = [];
    
    for (const eventData of eventsData) {
      const { artistIndex, ...eventInfo } = eventData;
      const artist = createdUsers[artistIndex];
      
      const event = new Event({
        ...eventInfo,
        createdBy: artist._id
      });
      
      const savedEvent = await event.save();
      createdEvents.push(savedEvent);
      console.log(`✅ Created event: "${savedEvent.title}" by ${artist.name}`);
    }

    // Summary
    console.log("\n🎉 Database seeding completed successfully!");
    console.log(`📊 Summary:`);
    console.log(`   👥 Users: ${createdUsers.length} artists`);
    console.log(`   🖼️ Artworks: ${createdArtworks.length} pieces`);
    console.log(`   📅 Events: ${createdEvents.length} events`);
    console.log(`   🎨 Art Forms: ${seededArtForms.length} forms`);
    console.log(`   ❤️ Total Likes: ${totalLikes}`);
    console.log(`   🔖 Total Bookmarks: ${totalBookmarks}`);
    
    console.log(`\n🔐 Login Credentials:`);
    for (const user of createdUsers) {
      console.log(`   ${user.name}: ${user.email || user.phoneNumber} / Password: ${artistsData.find(a => a.name === user.name).password}`);
    }
    
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase();
