// server/data/seedDance.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const danceForm = require("../models/DanceForm");

dotenv.config();

const danceForms = [
  {
    name: "Bharatanatyam",
    origin: "Tamil Nadu",
    
    description: "Bharatanatyam is a classical dance form from Tamil Nadu known for its fixed upper torso, bent legs, intricate footwork, and expressive gestures. It originated in Hindu temples and is one of the oldest and most widely practiced dance styles in India.",
    photos: [
      "https://i.pinimg.com/474x/ac/03/2f/ac032f4de79c1bd13e23661954e25276.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/54/Bharatanatyam_Performance%2C_India_2011.jpg"
    ]
  },
  {
    name: "Kathak",
    origin: "Uttar Pradesh",
    
    description: "Kathak is a storytelling dance form that originated in North India, especially Uttar Pradesh. It combines rhythmic footwork, intricate spins, and facial expressions to narrate stories from Indian epics. Kathak is known for its graceful movements and musical improvisation.",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kathak_Dance_Performance.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Kathak_performance.jpg"
    ]
  },
  {
    name: "Kathakali",
    origin: "Kerala",
    
    description: "Kathakali is a vibrant dance-drama form from Kerala, characterized by elaborate costumes, dramatic makeup, and powerful storytelling. It uses hand gestures, facial expressions, and body movements to depict stories from Indian epics like the Mahabharata and Ramayana.",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Kathakali_dancer.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Kathakali_Performance.jpg"
    ]
  },
  {
    name: "Odissi",
    origin: "Odisha",
    
    description: "Odissi is a classical dance from Odisha known for its fluid movements, sculptural poses, and devotional themes. It combines graceful gestures with strong footwork and traditionally focuses on religious stories, especially of Lord Jagannath.",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Odissi_dancer.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/Odissi_Dance_Performance.jpg"
    ]
  },
  {
    name: "Kuchipudi",
    origin: "Andhra Pradesh",
    
    description: "Kuchipudi is a dance-drama performance art from Andhra Pradesh that blends fast rhythmic footwork with graceful movements and expressive acting. It often includes both dance and spoken dialogue and is traditionally performed by men in temples.",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Kuchipudi_dance.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/Kuchipudi_Performance.jpg"
    ]
  },
  {
    name: "Manipuri",
    origin: "Manipur",
    
    description: "Manipuri is a soft and graceful dance form from Manipur, inspired by Vaishnavism and stories of Lord Krishna and Radha. Known for its rounded movements and devotional expression, it emphasizes spiritual themes and subtle expressions over dramatic gestures.",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/Manipuri_dancer.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/Manipuri_Dance.jpg"
    ]
  },
  {
    name: "Mohiniyattam",
    origin: "Kerala",
    
    description: "Mohiniyattam, meaning 'dance of the enchantress', is a classical dance style from Kerala. Performed by women, it is known for its gentle, flowing movements and emotive expressions. It blends elegance and spirituality, often focusing on themes of love and devotion.",
    photos: [
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Mohiniyattam_dancer.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/ef/Mohiniyattam_Performance.jpg"
    ]
  }
]

async function seedDanceForms() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await danceForm.insertMany(danceForms);
    console.log("✅ Dance forms inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting dance forms:", error);
    mongoose.connection.close();
  }
}

seedDanceForms();
