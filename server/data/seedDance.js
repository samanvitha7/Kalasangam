const mongoose = require("mongoose");
const dotenv = require("dotenv");
const danceForm = require("../models/DanceForm");

dotenv.config();

const danceForms = [
  {
    name: "Bharatanatyam",
    origin: "Tamil Nadu",
    description:
      "Bharatanatyam is a classical dance form from Tamil Nadu known for its fixed upper torso, bent legs, intricate footwork, and expressive gestures. It originated in Hindu temples and is one of the oldest and most widely practiced dance styles in India.",
  },
  {
    name: "Kathak",
    origin: "Uttar Pradesh",
    description:
      "Kathak is a storytelling dance form that originated in North India, especially Uttar Pradesh. It combines rhythmic footwork, intricate spins, and facial expressions to narrate stories from Indian epics. Kathak is known for its graceful movements and musical improvisation.",
  },
  {
    name: "Kathakali",
    origin: "Kerala",
    description:
      "Kathakali is a vibrant dance-drama form from Kerala, characterized by elaborate costumes, dramatic makeup, and powerful storytelling. It uses hand gestures, facial expressions, and body movements to depict stories from Indian epics like the Mahabharata and Ramayana.",
  },
  {
    name: "Odissi",
    origin: "Odisha",
    description:
      "Odissi is a classical dance from Odisha known for its fluid movements, sculptural poses, and devotional themes. It combines graceful gestures with strong footwork and traditionally focuses on religious stories, especially of Lord Jagannath.",
  },
  {
    name: "Kuchipudi",
    origin: "Andhra Pradesh",
    description:
      "Kuchipudi is a dance-drama performance art from Andhra Pradesh that blends fast rhythmic footwork with graceful movements and expressive acting. It often includes both dance and spoken dialogue and is traditionally performed by men in temples.",
  },
  {
    name: "Manipuri",
    origin: "Manipur",
    description:
      "Manipuri is a soft and graceful dance form from Manipur, inspired by Vaishnavism and stories of Lord Krishna and Radha. Known for its rounded movements and devotional expression, it emphasizes spiritual themes and subtle expressions over dramatic gestures.",
  },
  {
    name: "Mohiniyattam",
    origin: "Kerala",
    description:
      "Mohiniyattam, meaning 'dance of the enchantress', is a classical dance style from Kerala. Performed by women, it is known for its gentle, flowing movements and emotive expressions. It blends elegance and spirituality, often focusing on themes of love and devotion.",
  },
];


async function seedDanceForms() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await danceForm.deleteMany({});
    console.log("🧹 Old dance forms deleted");
    await danceForm.insertMany(danceForms);
    console.log(" Dance forms inserted successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting dance forms:", error);
    mongoose.connection.close();
  }
}

seedDanceForms();
