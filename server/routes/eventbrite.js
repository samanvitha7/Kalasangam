const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const router=express.Router();
const EB_API='https://www.eventbriteapi.com/v3';

//get organization id route
router.get('/organization',async(req,res)=>{
  try{
    const response=await axios.get(`${EB_API}/users/me/organizations/`,{
      headers:{
        Authorization:`Bearer ${process.env.EVENTBRITE_TOKEN}`
      }
    });

    const organizations=response.data.organizations;
    if(organizations.lenght===0){
      return res.status(404).json({error:'No organization found'});
    }

    res.json({organization_id:organizations[0].id});
  }
  catch(error){
    console.error(error?.response?.data||error.message);
    res.status(500).json({error:"Failed to fetch organization"});
  }
});

//Get Events for the first organization
router.get('/events',async(req,res)=>{
  try{
    const orgRes=await axios.get(`${EB_API}/users/me/organizations/`, {
      headers:{
        Authorization:`Bearer ${process.env.EVENTBRITE_TOKEN}`
      }
    });

    const organizationId = orgRes.data.organizations[0].id;
    const eventsRes = await axios.get(`${EB_API}/organizations/${organizationId}/events/`, {
      headers: {
        Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`
      }
    });
    res.json(eventsRes.data);
  }
  catch(error){
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports= router;