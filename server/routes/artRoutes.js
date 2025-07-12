//includes GET,POST and filtering
//include actual backend logic for art cards API

const express=require("express");
const router=express.Router();
const Art=require("../models/Art.js") //imports art model which is connected to mongodb


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

module.exports=router; //this can be imported in server.js and used again