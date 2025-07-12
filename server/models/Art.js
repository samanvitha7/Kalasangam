//Moongoose schema for art data
const mongoose=require("mongoose");

const ArtSchema=new mongoose.Schema({
  name:String,
  photoUrl:[String],
  origin:String
});

module.exports=mongoose.model("Art",ArtSchema);