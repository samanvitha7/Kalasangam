const axios=require("axios");

const fetchEventbriteEvents=async(req,res)=>{
  try{
    const response=await axios.get("https://www.eventbriteapi.com/v3/users/me/events/",{
      headers:{
         Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`,
      },
    });

    res.status(200).json(response.data);
  }
  catch (error) {
    console.error("Eventbrite API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch events from Eventbrite" });
  }
};

module.exports={fetchEventbriteEvents};