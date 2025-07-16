const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path=require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
//serve atatic image files from /public
app.use("/images",express.static(path.join(__dirname,'public')));
require("dotenv").config();

//routes
const artRoutes=require("./routes/artRoutes");
app.use("/api/artforms",artRoutes);

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
  .catch(err => console.log(err));




const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




