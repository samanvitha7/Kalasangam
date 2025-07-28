const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path=require("path");
const eventbriteRoutes= require("./routes/eventbrite.js");
require("dotenv").config();

const app = express();

// CORS configuration for development
const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS Request from origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('Allowing request with no origin');
      return callback(null, true);
    }
    
    // Allow localhost on any port
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      console.log('Allowing localhost origin:', origin);
      return callback(null, true);
    }
    
    // Allow local network IPs (for teammates on same network)
    if (origin.match(/^http:\/\/192\.168\./)) {
      console.log('Allowing local network IP:', origin);
      return callback(null, true);
    }
    
    // Allow local network IPs (for teammates on same network)
    if (origin.match(/^http:\/\/10\./)) {
      console.log('Allowing local network IP:', origin);
      return callback(null, true);
    }
    
    // Allow file:// protocol for local development
    if (origin.startsWith('file://')) {
      console.log('Allowing file:// origin:', origin);
      return callback(null, true);
    }
    
    // Allow Render frontend domain
    if (origin && origin.includes('.onrender.com')) {
      console.log('Allowing Render domain:', origin);
      return callback(null, true);
    }
    
    // For development, allow any origin temporarily
    // Remove this in production!
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      console.log('Development mode - allowing origin:', origin);
      return callback(null, true);
    }
    
    // For production, you'd want to add your actual domain here
    // if (origin === 'https://yourdomain.com') {
    //   return callback(null, true);
    // }
    
    console.log('CORS blocked origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(express.json());
//serve atatic image files from /public
app.use("/images",express.static(path.join(__dirname,'public')));
require("dotenv").config();

app.use('/api/eventbrite',eventbriteRoutes);

//routes
const artRoutes=require("./routes/artRoutes");
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const contactRoutes=require("./routes/contactRoutes");
const eventRoutes=require("./routes/eventRoutes");
const reportRoutes=require("./routes/reports");
const artformRoutes = require("./routes/artforms");
const artistRoutes = require('./routes/artists');
const artworkRoutes = require('./routes/artworks');
const emailVerificationRoutes = require('./routes/emailVerification');
const smartSearchRoutes = require('./routes/smartSearchRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const followingRoutes = require('./routes/followingRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes');
const healthRoutes = require('./routes/health');
app.use("/api/artforms", artformRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/contact",contactRoutes);
app.use("/api/events",eventRoutes);
app.use("/api/reports",reportRoutes);
app.use("/api/artforms-legacy",artRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/email-verification', emailVerificationRoutes);
app.use('/api/smart-search', smartSearchRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/following', followingRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api', healthRoutes);

const DanceForm = require("./models/DanceForm");

app.get("/api/danceforms", async (req, res) => {
  try {
    const dances = await DanceForm.find();
    res.json(dances);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dance forms" });
  }
});


//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));




const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




