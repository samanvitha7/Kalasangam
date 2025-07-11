//Moongoose schema for art data
const mongoose=require("mongoose");

const ArtSchema=new MongooseError.Schema({
  name:String,
  photoUrl:String,
  info:String,
  state:String
});

module.exports=mongoose.model("Art",ArtSchema);