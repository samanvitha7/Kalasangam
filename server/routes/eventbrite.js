const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const router=express.Router();
const EB_API='https://www.eventbriteapi.com/v3';

//get organization id route
// Removed organization fetching route
router.get('/organization', (req, res) => {
  res.status(200).json({ organization_id: 'mockOrganizationId' });
});

//Get Events for the first organization
// Updated events route to provide hardcoded data
router.get('/events', (req, res) => {
  const mockEvents = [
    {
      id: '1',
      name: 'Traditional Arts Exhibition',
      description: 'Discover traditional arts from around the world.',
      date: '2023-11-01',
      location: 'Art Center, City',
      link: 'http://example.com/event1'
    },
    {
      id: '2',
      name: 'Cultural Dance Show',
      description: 'Experience vibrant cultural dances.',
      date: '2023-12-15',
      location: 'Community Hall, Town',
      link: 'http://example.com/event2'
    }
  ];
  res.status(200).json({ events: mockEvents });
});

module.exports= router;