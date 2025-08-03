import axios from 'axios';

// Smart API URL detection with fallback
const getApiUrl = () => {
  // Check if we're running in a browser environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If running on localhost, use local backend
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5050';
    }
    
    // If deployed, use production backend
    return 'https://traditional-arts-backend.onrender.com';
  }
  
  // For Node.js environment, default to local
  return 'http://localhost:5050';
};

const API_URL = getApiUrl();

// Event data from the image
const eventData = {
  title: "Classical Music Concert",
  description: "Experience the mesmerizing sounds of traditional Indian classical music in an intimate concert setting. This performance will showcase the depth and beauty of classical ragas, featuring renowned musicians.",
  category: "music",
  type: "performance", 
  date: "2025-08-09", // Sat 9 Aug 2025
  time: "7:00 PM",
  duration: "1 hour 15 minutes",
  location: {
    venue: "Rajasthan International Center",
    city: "Jaipur",
    state: "Rajasthan"
  },
  price: 99,
  currency: "INR",
  language: "Hindi",
  ageLimit: "12yrs +",
  registrationRequired: true,
  maxCapacity: 150,
  organizer: "Rajasthan International Center",
  tags: ["classical", "music", "traditional", "rajasthan", "concert"],
  // Additional fields for booking system
  bookingUrl: "https://rajasthaninternationalcenter.com/book-classical-concert",
  contactEmail: "events@rajasthaninternationalcenter.com",
  contactPhone: "+91-141-2234567",
  status: "upcoming"
};

async function addEventToDatabase() {
  try {
    console.log('🎵 Adding Classical Music Concert to database...\n');
    console.log('Event Details:');
    console.log('📅 Date:', eventData.date);
    console.log('🕰️ Time:', eventData.time);
    console.log('📍 Venue:', `${eventData.location.venue}, ${eventData.location.city}`);
    console.log('💰 Price: ₹', eventData.price);
    console.log('🎭 Category:', eventData.category);
    console.log('🎪 Type:', eventData.type);
    console.log('\n');

    // Make API request to create the event
    const response = await axios.post(`${API_URL}/api/events`, eventData, {
      headers: {
        'Content-Type': 'application/json',
        // Note: You might need to add authentication token here if required
        // 'Authorization': `Bearer ${YOUR_TOKEN}`
      }
    });

    if (response.status === 201 || response.status === 200) {
      console.log('✅ Event added successfully!');
      console.log('Event ID:', response.data.data?._id || response.data.event?._id);
      console.log('\nThe event should now be visible on your Events page and calendar.');
      
      // Test if the event is retrievable
      console.log('\n🔍 Verifying event was added...');
      const verifyResponse = await axios.get(`${API_URL}/api/events`);
      const addedEvent = verifyResponse.data.data?.find(event => 
        event.title === eventData.title && 
        event.date === eventData.date
      );
      
      if (addedEvent) {
        console.log('✅ Event verification successful!');
        console.log('Event is now live on the website.');
      } else {
        console.log('⚠️ Event added but not found in verification check.');
      }
    }

  } catch (error) {
    console.error('❌ Error adding event to database:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Make sure the backend server is running');
      console.error('   For local development: Run "node server.js" in your server directory');
      console.error('   Or check if your production server is accessible');
    } else if (error.response?.status === 401) {
      console.error('\n🔐 Authentication required');
      console.error('   You may need to log in as an admin or artist to create events');
      console.error('   Add your auth token to the script or create the event through the web interface');
    } else if (error.response?.status === 400) {
      console.error('\n📝 Data validation error');
      console.error('   Check if all required fields are present and valid');
      console.error('   Server response:', error.response.data);
    }
  }
}

// Alternative method: Generate SQL/MongoDB insert statement
function generateDatabaseInsertStatements() {
  console.log('\n📋 Alternative: Database Insert Statements\n');
  
  // MongoDB insert statement
  console.log('MongoDB Insert Statement:');
  console.log('------------------------');
  console.log('db.events.insertOne(');
  console.log(JSON.stringify(eventData, null, 2));
  console.log(');');
  
  console.log('\n');
  
  // SQL insert statement (if using SQL database)
  console.log('SQL Insert Statement (if using SQL):');
  console.log('----------------------------------');
  console.log(`INSERT INTO events (
    title, description, category, type, date, time, duration, 
    venue, city, state, price, language, age_limit, 
    registration_required, max_capacity, organizer, status
  ) VALUES (
    '${eventData.title}',
    '${eventData.description}',
    '${eventData.category}',
    '${eventData.type}',
    '${eventData.date}',
    '${eventData.time}',
    '${eventData.duration}',
    '${eventData.location.venue}',
    '${eventData.location.city}',
    '${eventData.location.state}',
    ${eventData.price},
    '${eventData.language}',
    '${eventData.ageLimit}',
    ${eventData.registrationRequired},
    ${eventData.maxCapacity},
    '${eventData.organizer}',
    '${eventData.status}'
  );`);
}

// Run the script
console.log('🎭 KalaSangam Event Database Script');
console.log('===================================\n');

addEventToDatabase().then(() => {
  generateDatabaseInsertStatements();
}).catch(() => {
  console.log('\n📋 Since API call failed, here are the database insert statements:');
  generateDatabaseInsertStatements();
});
