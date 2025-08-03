const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
require('dotenv').config();

const sampleEvents = [
  {
      _id: "4",
      title: "Kesariya Navratri 3.0 - Grand Celebration",
      description: "Join the most spectacular Navratri celebration of the year! Experience traditional Garba and Dandiya with live music, authentic Gujarati food, and vibrant cultural performances. Dance the night away in traditional attire and celebrate the divine feminine energy.",
      category: "dance",
      type: "event",
      date: "2025-10-01",
      time: "7:00 PM",
      duration: "5 hours",
      location: {
        venue: "Grand Celebration Grounds",
        city: "Ahmedabad",
        state: "Gujarat"
      },
      price: 499,
      currency: "INR",
      language: "Gujarati/Hindi/English",
      ageLimit: "All ages",
      instructor: "Live Musicians & Dandiya Masters",
      registrationRequired: true,
      maxCapacity: 2000,
      organizer: "Kesariya Events",
      tags: ["navratri", "garba", "dandiya", "festival", "traditional", "gujarati", "dance"],
      registrationLink: "https://in.bookmyshow.com/activities/kesariya-navratri-3-0/ET00453920"
    },
    {
      _id: "5",
      title: "Mandala Art Workshop - Sacred Geometry & Meditation",
      description: "Discover the therapeutic art of Mandala creation in this immersive workshop. Learn traditional techniques of sacred geometry while experiencing the meditative benefits of this ancient art form. Create your own beautiful mandala artwork to take home.",
      category: "art",
      type: "workshop",
      date: "2025-09-28",
      time: "10:00 AM",
      duration: "3 hours",
      location: {
        venue: "Art Center Studio",
        city: "Bangalore",
        state: "Karnataka"
      },
      price: 899,
      currency: "INR",
      language: "English/Hindi",
      ageLimit: "12yrs +",
      instructor: "Master Artist Priya Sharma",
      registrationRequired: true,
      maxCapacity: 30,
      organizer: "Mandala Art Academy",
      tags: ["mandala", "art", "meditation", "sacred-geometry", "workshop", "therapeutic"],
      registrationLink: "https://in.bookmyshow.com/events/mandala-art/ET00450258"
    },
    {
      _id: "6",
      title: "Mandala - A Kuchipudi Dance & Classical Vocal Performance",
      description: "Experience the divine fusion of Kuchipudi dance and Carnatic classical vocals in this mesmerizing performance. Witness the artistic storytelling through graceful movements and melodious ragas, presenting traditional tales through the sacred art of dance and music.",
      category: "dance",
      type: "performance",
      date: "2025-08-09",
      time: "7:00 PM",
      duration: "1 hour 15 minutes",
      location: {
        venue: "Rajasthan International Center",
        address: "Rajasthan International Center",
        city: "Jaipur",
        state: "Rajasthan"
      },
      price: 99,
      currency: "INR",
      language: "Hindi",
      ageLimit: "12yrs +",
      instructor: "Classical Artists Ensemble",
      registrationRequired: true,
      maxCapacity: 250,
      organizer: "Classical Arts Foundation",
      tags: ["kuchipudi", "classical-dance", "carnatic-music", "classical-vocal", "performance", "traditional", "classical"],
      registrationLink: "https://in.bookmyshow.com/events/mandala-a-kuchipudi-dance-and-classical-vocal/ET00456479"
    },
    {
      _id: "7",
      title: "Classical Crossover by Kshitij Tarey - Fusion Concert",
      description: "Experience the magical blend of Indian classical music with contemporary sounds in this extraordinary crossover concert. Renowned artist Kshitij Tarey presents a unique musical journey that bridges traditional ragas with modern melodies, creating an unforgettable sonic experience.",
      category: "music",
      type: "performance",
      date: "2025-08-24",
      time: "8:00 PM",
      duration: "1 hour 30 minutes",
      location: {
        venue: "The Studio Theatre",
        address: "NMACC",
        city: "Mumbai",
        state: "Maharashtra"
      },
      price: 750,
      currency: "INR",
      language: "Hindi",
      ageLimit: "5yrs +",
      instructor: "Kshitij Tarey & Musical Ensemble",
      registrationRequired: true,
      maxCapacity: 500,
      organizer: "Classical Fusion Productions",
      tags: ["classical", "crossover", "fusion", "contemporary", "kshitij-tarey", "concert", "music"],
      registrationLink: "https://in.bookmyshow.com/events/classical-crossover-by-kshitij-tarey/ET00455729"
    },
    {
      _id: "8",
      title: "Krishna Music Bliss and Beyond - Devotional Concert",
      description: "Immerse yourself in divine melodies celebrating Lord Krishna through classical ragas and devotional songs. Experience spiritual bliss through soul-stirring performances of bhajans, kirtans, and classical compositions dedicated to the beloved Lord Krishna.",
      category: "music",
      type: "performance",
      date: "2025-08-24",
      time: "4:00 PM",
      duration: "2 Hours",
      location: {
        venue: "Marwad International Center",
        address: "Jodhpur",
        city: "Jodhpur",
        state: "Rajasthan"
      },
      price: 549,
      currency: "INR",
      language: "English/Gujarati/Hindi/Sanskrit/Marathi",
      ageLimit: "All ages",
      instructor: "Pandit Vishnu Mohan Bhatt & Devotional Ensemble",
      registrationRequired: true,
      maxCapacity: 300,
      organizer: "Krishna Cultural Foundation",
      tags: ["krishna", "devotional", "classical", "bhajan", "kirtan", "spiritual", "concert", "contemporary", "folk", "fusion"],
      registrationLink: "https://in.bookmyshow.com/events/krishna-music-bliss-and-beyond/ET00438839"
    },
    {
      _id: "9",
      title: "Lippan Art Workshop - Traditional Mirror Work",
      description: "Discover the beautiful folk art of Lippan from Gujarat in this hands-on workshop. Learn the ancient technique of mirror work and mud relief art that adorns the walls of traditional Kutchi homes. Create your own stunning Lippan artwork using clay, mirrors, and natural pigments.",
      category: "art",
      type: "workshop",
      date: "2025-09-07",
      time: "11:00 AM",
      duration: "4 hours",
      location: {
        venue: "Craft Heritage Center",
        city: "Ahmedabad",
        state: "Gujarat"
      },
      price: 1500,
      currency: "INR",
      language: "Gujarati/Hindi/English",
      ageLimit: "16yrs +",
      instructor: "Master Craftsman Kiran Patel & Team",
      registrationRequired: true,
      maxCapacity: 20,
      organizer: "Gujarat Folk Art Foundation",
      tags: ["lippan", "mirror-work", "gujarati", "folk-art", "traditional", "kutch", "workshop", "clay-art"],
      registrationLink: "https://in.bookmyshow.com/events/lippan-art-workshop/ET00446024"
    },
    {
      _id: "10",
      title: "Bare Hand Pottery - Traditional Clay Crafting",
      description: "Experience the ancient art of pottery making using only your hands and traditional techniques. Learn to shape clay into beautiful vessels and decorative items without the use of modern pottery wheels. Connect with the earth through this timeless craft that has been practiced for thousands of years.",
      category: "crafts",
      type: "workshop",
      date: "2025-08-24",
      time: "12:00 PM",
      duration: "2 Hours",
      location: {
        venue: "Lifafa Cafe and Bistro",
        address: "Hyderabad",
        city: "Hyderabad",
        state: "Telangana"
      },
      price: 899,
      currency: "INR",
      language: "English/Hindi",
      ageLimit: "All age groups",
      instructor: "Master Potter Gopal Sharma",
      registrationRequired: true,
      maxCapacity: 15,
      organizer: "Rajasthan Pottery Guild",
      tags: ["pottery", "clay", "traditional", "handmade", "crafts", "ceramic", "workshop", "bare-hand"],
      registrationLink: "https://in.bookmyshow.com/events/bare-hand-pottery/ET00445004"
    },
    {
      _id: "12",
      title: "Madhubani Painting Art Workshop - Mumbai Edition",
      description: "Immerse yourself in the vibrant world of Madhubani art in Mumbai! Learn the ancient folk painting tradition from Bihar, featuring intricate patterns, mythological themes, and natural pigments. Create your own masterpiece using traditional techniques passed down through generations of women artists.",
      category: "art",
      type: "workshop",
      date: "2025-09-13",
      time: "2:00 PM",
      duration: "4 hours",
      location: {
        venue: "Mumbai Art Studio",
        city: "Mumbai",
        state: "Maharashtra"
      },
      price: 1350,
      currency: "INR",
      language: "Hindi/English/Marathi",
      ageLimit: "14yrs +",
      instructor: "Master Artist Kamala Devi & Mumbai Art Collective",
      registrationRequired: true,
      maxCapacity: 22,
      organizer: "Mumbai Folk Art Society",
      tags: ["madhubani", "folk-art", "painting", "traditional", "workshop", "bihar", "mumbai", "women-artists"],
      registrationLink: "https://in.bookmyshow.com/events/madhubani-painting-art-mumbai/ET00454265"
    },
    {
      _id: "13",
      title: "Terracotta Bead Painting Workshop - Mumbai Crafts",
      description: "Explore the ancient art of terracotta bead painting in this unique workshop! Learn to create and paint beautiful terracotta beads using traditional techniques and natural earth pigments. Discover the timeless craft of pottery and painting combined, creating wearable art pieces you can take home.",
      category: "crafts",
      type: "workshop",
      date: "2025-08-31",
      time: "3:00 PM",
      duration: "3.5 hours",
      location: {
        venue: "Mumbai Pottery & Crafts Center",
        city: "Mumbai",
        state: "Maharashtra"
      },
      price: 1100,
      currency: "INR",
      language: "Hindi/English/Marathi",
      ageLimit: "12yrs +",
      instructor: "Pottery Master Ravi Kulkarni & Crafts Team",
      registrationRequired: true,
      maxCapacity: 18,
      organizer: "Mumbai Traditional Crafts Society",
      tags: ["terracotta", "bead-painting", "pottery", "crafts", "traditional", "mumbai", "workshop", "wearable-art"],
      registrationLink: "https://in.bookmyshow.com/events/terracotta-bead-painting-mumbai/ET00455155"
    },
    {
      _id: "14",
      title: "Pottery Painting Date - Couples Creative Workshop",
      description: "Experience a romantic and creative pottery painting session perfect for couples! Learn traditional pottery techniques while painting beautiful ceramic pieces together. Create lasting memories and take home personalized pottery as a symbol of your shared creativity and love.",
      category: "crafts",
      type: "workshop",
      date: "2025-08-17",
      time: "4:00 PM",
      duration: "1 hour 30 minutes",
      location: {
        venue: "Third Wave Coffee",
        address: "Santacruz West",
        city: "Mumbai",
        state: "Maharashtra"
      },
      price: 1299,
      currency: "INR",
      language: "Bengali/English/Hindi/Kannada/Malayalam",
      ageLimit: "All age groups",
      instructor: "Creative Workshop Artists",
      registrationRequired: true,
      maxCapacity: 20,
      organizer: "Mumbai Creative Arts Center",
      tags: ["pottery", "painting", "couples", "date", "creative", "mumbai", "workshop", "romantic", "ceramic"],
      registrationLink: "https://in.bookmyshow.com/events/pottery-painting-date-mumbai/ET00453954"
    }
    // Add more events here by copying the template above
    // Remember to:
    // 1. Increment the _id ("4", "5", "6", etc.)
    // 2. Add a comma after each event except the last one
    // 3. Use "registrationLink" for working booking URLs
];

async function seedEvents() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/traditional-arts');
    console.log('Connected to MongoDB');

    // Find an admin user to use as creator
    const adminUser = await User.findOne({ role: 'Admin' });
    if (!adminUser) {
      console.error('No admin user found. Please create an admin user first.');
      process.exit(1);
    }
    console.log('Found admin user:', adminUser.name);

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Add createdBy field to all sample events
    const eventsWithCreator = sampleEvents.map(event => ({
      ...event,
      createdBy: adminUser._id
    }));

    // Insert sample events
    await Event.insertMany(eventsWithCreator);
    console.log('Sample events inserted successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error seeding events:', error);
    process.exit(1);
  }
}

// Run the seeding function if this file is executed directly
if (require.main === module) {
  seedEvents();
}

module.exports = { sampleEvents, seedEvents };
