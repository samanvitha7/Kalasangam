const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
require('dotenv').config();

const sampleEvents = [
  {
    title: "Bharatanatyam Workshop for Beginners",
    description: "Learn the fundamentals of Bharatanatyam, one of India's oldest classical dance forms. This workshop covers basic postures, hand gestures (mudras), and simple choreography.",
    type: "workshop",
    category: "dance",
    date: new Date("2025-08-15T09:00:00.000Z"),
    time: "10:00 AM - 12:00 PM",
    location: {
      venue: "Cultural Heritage Center",
      address: "123 Arts Street",
      city: "Chennai",
      state: "Tamil Nadu"
    },
    instructor: "Priya Sharma",
    price: 500,
    maxParticipants: 20,
    imageUrl: "https://example.com/bharatanatyam-workshop.jpg",
    registrationRequired: true,
    contactEmail: "events@kalasangam.com",
    contactPhone: "+91 9876543210",
    tags: ["bharatanatyam", "classical dance", "beginner", "traditional"]
  },
  {
    title: "Warli Art Exhibition",
    description: "Explore the beautiful tribal art of Warli painting from Maharashtra. This exhibition features works by renowned Warli artists and includes interactive sessions.",
    type: "exhibition",
    category: "art",
    date: new Date("2025-08-20T10:00:00.000Z"),
    endDate: new Date("2025-08-27T18:00:00.000Z"),
    time: "10:00 AM - 6:00 PM",
    location: {
      venue: "National Gallery",
      address: "456 Museum Road",
      city: "Mumbai",
      state: "Maharashtra"
    },
    price: 100,
    imageUrl: "https://example.com/warli-exhibition.jpg",
    registrationRequired: false,
    contactEmail: "gallery@kalasangam.com",
    tags: ["warli", "tribal art", "maharashtra", "exhibition"]
  },
  {
    title: "Sitar Masterclass with Pandit Rajesh Kumar",
    description: "Join us for an exclusive sitar masterclass with renowned musician Pandit Rajesh Kumar. Learn advanced techniques and explore the depth of Indian classical music.",
    type: "workshop",
    category: "music",
    date: new Date("2025-09-05T15:00:00.000Z"),
    time: "3:00 PM - 5:00 PM",
    location: {
      venue: "Music Academy",
      address: "789 Raga Lane",
      city: "Delhi",
      state: "Delhi"
    },
    instructor: "Pandit Rajesh Kumar",
    price: 1500,
    maxParticipants: 15,
    imageUrl: "https://example.com/sitar-masterclass.jpg",
    registrationRequired: true,
    contactEmail: "music@kalasangam.com",
    contactPhone: "+91 9876543211",
    tags: ["sitar", "classical music", "masterclass", "pandit"]
  },
  {
    title: "Kathakali Performance - 'Nalacharitham'",
    description: "Experience the magnificent art of Kathakali with a traditional performance of 'Nalacharitham'. Witness the elaborate costumes, makeup, and storytelling tradition of Kerala.",
    type: "performance",
    category: "dance",
    date: new Date("2025-09-12T19:00:00.000Z"),
    time: "7:00 PM - 9:00 PM",
    location: {
      venue: "Kerala Cultural Center",
      address: "321 Coconut Grove",
      city: "Kochi",
      state: "Kerala"
    },
    price: 300,
    imageUrl: "https://example.com/kathakali-performance.jpg",
    registrationRequired: false,
    contactEmail: "performances@kalasangam.com",
    tags: ["kathakali", "kerala", "performance", "nalacharitham"]
  },
  {
    title: "Pottery Workshop - Traditional Indian Techniques",
    description: "Learn traditional Indian pottery techniques including wheel throwing, hand building, and glazing. Create your own ceramic pieces using age-old methods.",
    type: "workshop",
    category: "crafts",
    date: new Date("2025-09-18T10:00:00.000Z"),
    time: "10:00 AM - 4:00 PM",
    location: {
      venue: "Craft Village",
      address: "654 Artisan Street",
      city: "Jaipur",
      state: "Rajasthan"
    },
    instructor: "Master Craftsman Ramesh",
    price: 800,
    maxParticipants: 12,
    imageUrl: "https://example.com/pottery-workshop.jpg",
    registrationRequired: true,
    contactEmail: "crafts@kalasangam.com",
    contactPhone: "+91 9876543212",
    tags: ["pottery", "crafts", "traditional", "rajasthan"]
  },
  {
    title: "Odissi Dance Festival",
    description: "A three-day festival celebrating Odissi dance with performances by leading artists, workshops, and cultural discussions about this classical dance form from Odisha.",
    type: "event",
    category: "dance",
    date: new Date("2025-10-01T09:00:00.000Z"),
    endDate: new Date("2025-10-03T21:00:00.000Z"),
    time: "9:00 AM - 9:00 PM",
    location: {
      venue: "Odisha Cultural Complex",
      address: "987 Temple Square",
      city: "Bhubaneswar",
      state: "Odisha"
    },
    price: 1200,
    imageUrl: "https://example.com/odissi-festival.jpg",
    registrationRequired: true,
    contactEmail: "festival@kalasangam.com",
    contactPhone: "+91 9876543213",
    tags: ["odissi", "dance festival", "odisha", "classical"]
  }
];

async function seedEvents() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
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
