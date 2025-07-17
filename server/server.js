const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path=require("path");

require("dotenv").config();

const app = express();

// CORS configuration for development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost on any port
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow local network IPs (for teammates on same network)
    if (origin.match(/^http:\/\/192\.168\./)) {
      return callback(null, true);
    }
    
    // Allow local network IPs (for teammates on same network)
    if (origin.match(/^http:\/\/10\./)) {
      return callback(null, true);
    }
    
    // Allow file:// protocol for local development
    if (origin.startsWith('file://')) {
      return callback(null, true);
    }
    
    // For production, you'd want to add your actual domain here
    // if (origin === 'https://yourdomain.com') {
    //   return callback(null, true);
    // }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(express.json());
//serve atatic image files from /public
app.use("/images",express.static(path.join(__dirname,'public')));
require("dotenv").config();

//routes
const artRoutes=require("./routes/artRoutes");
const authRoutes=require("./routes/auth");
app.use("/api/artforms",artRoutes);
app.use("/api/auth",authRoutes);

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




