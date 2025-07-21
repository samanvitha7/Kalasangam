//includes GET,POST and filtering
//include actual backend logic for art cards API

const express=require("express");
const router=express.Router();
const Art = require("../models/Art.js");



//this function runs when someone visits localhost:5000/api/artforms
router.get("/",async(req,res)=>{
  try{
    const data=await Art.find(); //fetches all arts collection as array
    res.json(data);
  }
  catch(err){
    res.status(500).json({error:"Server error while fetching artforms"});
  }

})

// DELETE /api/artforms/:id - Delete an artwork (admin only)
router.delete("/:id", async(req,res)=>{
  try{
    const artId = req.params.id;
    const deletedArt = await Art.findByIdAndDelete(artId);
    
    if (!deletedArt) {
      return res.status(404).json({error: "Artwork not found"});
    }
    
    res.json({message: "Artwork deleted successfully", data: deletedArt});
  }
  catch(err){
    res.status(500).json({error: "Server error while deleting artwork"});
  }
})

module.exports=router; //this can be imported in server.js and used again
