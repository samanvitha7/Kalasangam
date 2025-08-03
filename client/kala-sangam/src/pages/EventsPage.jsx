import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaPlus, FaFilter, FaSearch, FaTimes, FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaBookmark, FaHeart, FaCalendarPlus } from 'react-icons/fa';
import { SiGooglecalendar } from 'react-icons/si';
import EventModal from '../components/EventModal';
import api from '../utils/axios';
import { Link } from 'react-router-dom';
import FullBleedDivider from "../components/FullBleedDivider";

// Your Custom Events - Add your own events here
const HARDCODED_EVENTS = [
  {
    _id: "4",
    title: "Kesariya Navratri 3.0 - Grand Celebration",
    description: "Join the most spectacular Navratri celebration of the year! Experience traditional Garba and Dandiya with live music, authentic Gujarati food, and vibrant cultural performances. Dance the night away in traditional attire and celebrate the divine feminine energy.",
    category: "dance",
    type: "event",
    date: "2025-10-01",
    time: "7:00 PM",
    duration: "5 hours",
    location: {
      venue: "Grand Celebration Grounds",
      city: "Ahmedabad",
      state: "Gujarat"
    },
    price: 499,
    currency: "INR",
    language: "Gujarati/Hindi/English",
    ageLimit: "All ages",
    instructor: "Live Musicians & Dandiya Masters",
    registrationRequired: true,
    maxCapacity: 2000,
    organizer: "Kesariya Events",
    tags: ["navratri", "garba", "dandiya", "festival", "traditional", "gujarati", "dance"],
    registrationLink: "https://in.bookmyshow.com/activities/kesariya-navratri-3-0/ET00453920"
  },
  {
    _id: "5",
    title: "Mandala Art Workshop - Sacred Geometry & Meditation",
    description: "Discover the therapeutic art of Mandala creation in this immersive workshop. Learn traditional techniques of sacred geometry while experiencing the meditative benefits of this ancient art form. Create your own beautiful mandala artwork to take home.",
    category: "art",
    type: "workshop",
    date: "2025-09-28",
    time: "10:00 AM",
    duration: "3 hours",
    location: {
      venue: "Art Center Studio",
      city: "Bangalore",
      state: "Karnataka"
    },
    price: 899,
    currency: "INR",
    language: "English/Hindi",
    ageLimit: "12yrs +",
    instructor: "Master Artist Priya Sharma",
    registrationRequired: true,
    maxCapacity: 30,
    organizer: "Mandala Art Academy",
    tags: ["mandala", "art", "meditation", "sacred-geometry", "workshop", "therapeutic"],
    registrationLink: "https://in.bookmyshow.com/events/mandala-art/ET00450258"
  },
  {
    _id: "6",
    title: "Mandala - A Kuchipudi Dance & Classical Vocal Performance",
    description: "Experience the divine fusion of Kuchipudi dance and Carnatic classical vocals in this mesmerizing performance. Witness the artistic storytelling through graceful movements and melodious ragas, presenting traditional tales through the sacred art of dance and music.",
    category: "dance",
    type: "performance",
    date: "2025-08-09",
    time: "7:00 PM",
    duration: "1 hour 15 minutes",
    location: {
      venue: "Rajasthan International Center",
      address: "Rajasthan International Center",
      city: "Jaipur",
      state: "Rajasthan"
    },
    price: 99,
    currency: "INR",
    language: "Hindi",
    ageLimit: "12yrs +",
    instructor: "Classical Artists Ensemble",
    registrationRequired: true,
    maxCapacity: 250,
    organizer: "Classical Arts Foundation",
    tags: ["kuchipudi", "classical-dance", "carnatic-music", "classical-vocal", "performance", "traditional", "classical"],
    registrationLink: "https://in.bookmyshow.com/events/mandala-a-kuchipudi-dance-and-classical-vocal/ET00456479"
  },
  {
    _id: "7",
    title: "Classical Crossover by Kshitij Tarey - Fusion Concert",
    description: "Experience the magical blend of Indian classical music with contemporary sounds in this extraordinary crossover concert. Renowned artist Kshitij Tarey presents a unique musical journey that bridges traditional ragas with modern melodies, creating an unforgettable sonic experience.",
    category: "music",
    type: "performance",
    date: "2025-08-24",
    time: "8:00 PM",
    duration: "1 hour 30 minutes",
    location: {
      venue: "The Studio Theatre",
      address: "NMACC",
      city: "Mumbai",
      state: "Maharashtra"
    },
    price: 750,
    currency: "INR",
    language: "Hindi",
    ageLimit: "5yrs +",
    instructor: "Kshitij Tarey & Musical Ensemble",
    registrationRequired: true,
    maxCapacity: 500,
    organizer: "Classical Fusion Productions",
    tags: ["classical", "crossover", "fusion", "contemporary", "kshitij-tarey", "concert", "music"],
    registrationLink: "https://in.bookmyshow.com/events/classical-crossover-by-kshitij-tarey/ET00455729"
  },
  {
    _id: "8",
    title: "Krishna Music Bliss and Beyond - Devotional Concert",
    description: "Immerse yourself in divine melodies celebrating Lord Krishna through classical ragas and devotional songs. Experience spiritual bliss through soul-stirring performances of bhajans, kirtans, and classical compositions dedicated to the beloved Lord Krishna.",
    category: "music",
    type: "performance",
    date: "2025-08-24",
    time: "4:00 PM",
    duration: "2 Hours",
    location: {
      venue: "Marwad International Center",
      address: "Jodhpur",
      city: "Jodhpur",
      state: "Rajasthan"
    },
    price: 549,
    currency: "INR",
    language: "English/Gujarati/Hindi/Sanskrit/Marathi",
    ageLimit: "All ages",
    instructor: "Pandit Vishnu Mohan Bhatt & Devotional Ensemble",
    registrationRequired: true,
    maxCapacity: 300,
    organizer: "Krishna Cultural Foundation",
    tags: ["krishna", "devotional", "classical", "bhajan", "kirtan", "spiritual", "concert", "contemporary", "folk", "fusion"],
    registrationLink: "https://in.bookmyshow.com/events/krishna-music-bliss-and-beyond/ET00438839"
  },
  {
    _id: "9",
    title: "Lippan Art Workshop - Traditional Mirror Work",
    description: "Discover the beautiful folk art of Lippan from Gujarat in this hands-on workshop. Learn the ancient technique of mirror work and mud relief art that adorns the walls of traditional Kutchi homes. Create your own stunning Lippan artwork using clay, mirrors, and natural pigments.",
    category: "art",
    type: "workshop",
    date: "2025-09-07",
    time: "11:00 AM",
    duration: "4 hours",
    location: {
      venue: "Craft Heritage Center",
      city: "Ahmedabad",
      state: "Gujarat"
    },
    price: 1500,
    currency: "INR",
    language: "Gujarati/Hindi/English",
    ageLimit: "16yrs +",
    instructor: "Master Craftsman Kiran Patel & Team",
    registrationRequired: true,
    maxCapacity: 20,
    organizer: "Gujarat Folk Art Foundation",
    tags: ["lippan", "mirror-work", "gujarati", "folk-art", "traditional", "kutch", "workshop", "clay-art"],
    registrationLink: "https://in.bookmyshow.com/events/lippan-art-workshop/ET00446024"
  },
  {
    _id: "10",
    title: "Bare Hand Pottery - Traditional Clay Crafting",
    description: "Experience the ancient art of pottery making using only your hands and traditional techniques. Learn to shape clay into beautiful vessels and decorative items without the use of modern pottery wheels. Connect with the earth through this timeless craft that has been practiced for thousands of years.",
    category: "crafts",
    type: "workshop",
    date: "2025-08-24",
    time: "12:00 PM",
    duration: "2 Hours",
    location: {
      venue: "Lifafa Cafe and Bistro",
      address: "Hyderabad",
      city: "Hyderabad",
      state: "Telangana"
    },
    price: 899,
    currency: "INR",
    language: "English/Hindi",
    ageLimit: "All age groups",
    instructor: "Master Potter Gopal Sharma",
    registrationRequired: true,
    maxCapacity: 15,
    organizer: "Rajasthan Pottery Guild",
    tags: ["pottery", "clay", "traditional", "handmade", "crafts", "ceramic", "workshop", "bare-hand"],
    registrationLink: "https://in.bookmyshow.com/events/bare-hand-pottery/ET00445004"
  },
  {
    _id: "12",
    title: "Madhubani Painting Art Workshop - Mumbai Edition",
    description: "Immerse yourself in the vibrant world of Madhubani art in Mumbai! Learn the ancient folk painting tradition from Bihar, featuring intricate patterns, mythological themes, and natural pigments. Create your own masterpiece using traditional techniques passed down through generations of women artists.",
    category: "art",
    type: "workshop",
    date: "2025-09-13",
    time: "2:00 PM",
    duration: "4 hours",
    location: {
      venue: "Mumbai Art Studio",
      city: "Mumbai",
      state: "Maharashtra"
    },
    price: 1350,
    currency: "INR",
    language: "Hindi/English/Marathi",
    ageLimit: "14yrs +",
    instructor: "Master Artist Kamala Devi & Mumbai Art Collective",
    registrationRequired: true,
    maxCapacity: 22,
    organizer: "Mumbai Folk Art Society",
    tags: ["madhubani", "folk-art", "painting", "traditional", "workshop", "bihar", "mumbai", "women-artists"],
    registrationLink: "https://in.bookmyshow.com/events/madhubani-painting-art-mumbai/ET00454265"
  },
  {
    _id: "13",
    title: "Terracotta Bead Painting Workshop - Mumbai Crafts",
    description: "Explore the ancient art of terracotta bead painting in this unique workshop! Learn to create and paint beautiful terracotta beads using traditional techniques and natural earth pigments. Discover the timeless craft of pottery and painting combined, creating wearable art pieces you can take home.",
    category: "crafts",
    type: "workshop",
    date: "2025-08-31",
    time: "3:00 PM",
    duration: "3.5 hours",
    location: {
      venue: "Mumbai Pottery & Crafts Center",
      city: "Mumbai",
      state: "Maharashtra"
    },
    price: 1100,
    currency: "INR",
    language: "Hindi/English/Marathi",
    ageLimit: "12yrs +",
    instructor: "Pottery Master Ravi Kulkarni & Crafts Team",
    registrationRequired: true,
    maxCapacity: 18,
    organizer: "Mumbai Traditional Crafts Society",
    tags: ["terracotta", "bead-painting", "pottery", "crafts", "traditional", "mumbai", "workshop", "wearable-art"],
    registrationLink: "https://in.bookmyshow.com/events/terracotta-bead-painting-mumbai/ET00455155"
  },
  {
    _id: "14",
    title: "Pottery Painting Date - Couples Creative Workshop",
    description: "Experience a romantic and creative pottery painting session perfect for couples! Learn traditional pottery techniques while painting beautiful ceramic pieces together. Create lasting memories and take home personalized pottery as a symbol of your shared creativity and love.",
    category: "crafts",
    type: "workshop",
    date: "2025-08-17",
    time: "4:00 PM",
    duration: "1 hour 30 minutes",
    location: {
      venue: "Third Wave Coffee",
      address: "Santacruz West",
      city: "Mumbai",
      state: "Maharashtra"
    },
    price: 1299,
    currency: "INR",
    language: "Bengali/English/Hindi/Kannada/Malayalam",
    ageLimit: "All age groups",
    instructor: "Creative Workshop Artists",
    registrationRequired: true,
    maxCapacity: 20,
    organizer: "Mumbai Creative Arts Center",
    tags: ["pottery", "painting", "couples", "date", "creative", "mumbai", "workshop", "romantic", "ceramic"],
    registrationLink: "https://in.bookmyshow.com/events/pottery-painting-date-mumbai/ET00453954"
  }
  // Add more events here by copying the template above
  // Remember to:
  // 1. Increment the _id ("4", "5", "6", etc.)
  // 2. Add a comma after each event except the last one
  // 3. Use "registrationLink" for working booking URLs
];

function EventsPage() {
  const [pageReady, setPageReady] = useState(false);
  const [events, setEvents] = useState(HARDCODED_EVENTS);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { user, isAuthenticated } = useAuth();

// Initialize page animations and fetch events
  useEffect(() => {
    console.log('Events:', HARDCODED_EVENTS);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    fetchEvents();
    return () => clearTimeout(timer);
  }, []);

  // Handle event creation
  const handleCreateEvent = async (eventData) => {
    try {
      const response = await api.post('/api/events', eventData);
      if (response.data.success) {
        toast.success('Event created successfully!');
        fetchEvents(); // Refresh events list
        setShowCreateModal(false);
      } else {
        toast.error(response.data.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  // Handle event editing
  const handleEditEvent = async (eventData) => {
    try {
      const response = await api.put(`/api/events/${editingEvent._id}`, eventData);
      if (response.data.success) {
        toast.success('Event updated successfully!');
        fetchEvents(); // Refresh events list
        setEditingEvent(null);
      } else {
        toast.error(response.data.message || 'Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error(error.response?.data?.message || 'Failed to update event');
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await api.delete(`/api/events/${eventId}`);
        if (response.data.success) {
          toast.success('Event deleted successfully!');
          fetchEvents(); // Refresh events list
        } else {
          toast.error(response.data.message || 'Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error(error.response?.data?.message || 'Failed to delete event');
      }
    }
  };

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/events');
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        // Check if the backend events have the necessary registration link fields
        const backendEvents = response.data.data;
        const hasRegistrationLinks = backendEvents.some(event => 
          event.registrationLink || event.link
        );
        
        if (hasRegistrationLinks) {
          console.log('Using backend events with registration links');
          setEvents(backendEvents);
        } else {
          console.log('Backend events missing registration links, using hardcoded events');
          setEvents(HARDCODED_EVENTS);
        }
      } else {
        // Fallback to hardcoded events if backend fails or returns empty data
        console.log('Backend returned no events, using hardcoded events');
        setEvents(HARDCODED_EVENTS);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to hardcoded events
      console.log('Backend error, using hardcoded events');
      setEvents(HARDCODED_EVENTS);
      toast.error('Failed to load events from server, showing sample events');
    } finally {
      setLoading(false);
    }
  };


  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const getFilteredEvents = () => {
    let filtered = [...events];

    // Apply filters
    if (filters.category !== 'all') {
      filtered = filtered.filter(event => event.category === filters.category);
    }
    if (filters.type !== 'all') {
      filtered = filtered.filter(event => event.type === filters.type);
    }
    if (filters.city) {
      filtered = filtered.filter(event => 
        event.location.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    return filtered;
  };

  const getEventsForDate = (date) => {
    const filteredEvents = getFilteredEvents();
    
    const matchingEvents = filteredEvents.filter(event => {
      // Parse the event date as a local date to avoid timezone issues
      const eventDateParts = event.date.split('-');
      const eventDate = new Date(parseInt(eventDateParts[0]), parseInt(eventDateParts[1]) - 1, parseInt(eventDateParts[2]));
      const eventDateString = eventDate.toDateString();
      const selectedDateString = date.toDateString();
      return eventDateString === selectedDateString;
    });
    
    return matchingEvents;
  };

  const getUpcomingEvents = () => {
    const filteredEvents = getFilteredEvents();
    const now = new Date();
    const upcoming = filteredEvents
      .filter(event => {
        // Parse the event date as a local date to avoid timezone issues
        const eventDateParts = event.date.split('-');
        const eventDate = new Date(parseInt(eventDateParts[0]), parseInt(eventDateParts[1]) - 1, parseInt(eventDateParts[2]));
        return eventDate >= now;
      })
      .sort((a, b) => {
        const aDateParts = a.date.split('-');
        const bDateParts = b.date.split('-');
        const aDate = new Date(parseInt(aDateParts[0]), parseInt(aDateParts[1]) - 1, parseInt(aDateParts[2]));
        const bDate = new Date(parseInt(bDateParts[0]), parseInt(bDateParts[1]) - 1, parseInt(bDateParts[2]));
        return aDate - bDate;
      })
      .slice(0, 6);
    return upcoming;
  };

  const handleRegisterClick = (link) => {
    console.log('Register button clicked, link:', link);
    console.log('Link type:', typeof link);
    console.log('Link === "#":', link === '#');
    console.log('!link:', !link);
    if (link && link !== '#') {
      console.log('Opening link:', link);
      window.open(link, '_blank');
    } else {
      console.error('No valid registration link found, link value:', link);
      alert('No registration link available for this event');
    }
  };

  // Generate Google Calendar URL for an event
  const generateGoogleCalendarUrl = (event) => {
    const baseUrl = 'https://calendar.google.com/calendar/render';
    
    // Format date and time for Google Calendar
    const eventDate = new Date(event.date);
    const [hours, minutes] = event.time.split(/[: ]/);
    const isPM = event.time.toLowerCase().includes('pm');
    let hour24 = parseInt(hours);
    
    if (isPM && hour24 !== 12) hour24 += 12;
    if (!isPM && hour24 === 12) hour24 = 0;
    
    eventDate.setHours(hour24, parseInt(minutes) || 0, 0, 0);
    
    // Create end time (assume 2 hours duration)
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);
    
    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatDateForGoogle = (date) => {
      if (!date || isNaN(date.getTime())) return '';
      const isoString = date.toISOString();
      if (!isoString) return '';
      const replaced = isoString.replace(/[-:]/g, '');
      const parts = replaced.split('.');
      return parts.length > 0 ? parts[0] + 'Z' : '';
    };
    
    const startTime = formatDateForGoogle(eventDate);
    const endTime = formatDateForGoogle(endDate);
    
    // Construct event details without double encoding
    const title = event.title;
    const details = (
      `${event.description}\n\n` +
      `Category: ${event.category}\n` +
      `Type: ${event.type}\n` +
      (event.instructor ? `Instructor: ${event.instructor}\n` : '') +
      (event.price > 0 ? `Price: ₹${event.price}\n` : '') +
      (event.link ? `More Info: ${event.link}` : '')
    );
    const location = `${event.location.venue}, ${event.location.city}`;
    
    // Build the URL with proper encoding
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${startTime}/${endTime}`,
      details: details,
      location: location,
      trp: 'false'
    });
    
    return `${baseUrl}?${params.toString()}`;
  };

  const handleAddToGoogleCalendar = (event) => {
    const googleCalendarUrl = generateGoogleCalendarUrl(event);
    window.open(googleCalendarUrl, '_blank');
  };

  const renderEventCard = (event) => {
    // Event data is already normalized since it's hardcoded
    const normalizedEvent = event;
    console.log('Rendering event card for:', normalizedEvent.title);
    console.log('Full Event object:', JSON.stringify(normalizedEvent, null, 2));
    console.log('Event object keys:', Object.keys(normalizedEvent));
    console.log('registrationLink:', normalizedEvent.registrationLink);
    console.log('link:', normalizedEvent.link);

    return (

      <motion.div
        key={normalizedEvent._id}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-orange-100 hover:shadow-[0_0_20px_rgba(19,72,86,0.3)] group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ 
          y: -5,
          boxShadow: "0 20px 40px rgba(224, 82, 100, 0.2)"
        }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-[#134856] font-dm-serif group-hover:text-[#e05264] transition-colors">{normalizedEvent.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            normalizedEvent.category === 'dance' ? 'bg-pink-100 text-pink-800' :
            normalizedEvent.category === 'music' ? 'bg-blue-100 text-blue-800' :
            normalizedEvent.category === 'art' ? 'bg-green-100 text-green-800' :
            normalizedEvent.category === 'crafts' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {normalizedEvent.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{normalizedEvent.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-[#134856] to-[#e05264] rounded-full"></span>
            <span><strong>Date:</strong> {new Date(normalizedEvent.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-[#134856] to-[#e05264] rounded-full"></span>
            <span><strong>Time:</strong> {normalizedEvent.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-[#134856] to-[#e05264] rounded-full"></span>
            <span><strong>Location:</strong> {normalizedEvent.location.venue}, {normalizedEvent.location.city}, {normalizedEvent.location.state}</span>
          </div>
          {normalizedEvent.price > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-[#134856] to-[#e05264] rounded-full"></span>
              <span><strong>Price:</strong> ₹{normalizedEvent.price}</span>
            </div>
          )}
          {normalizedEvent.instructor && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-[#134856] to-[#e05264] rounded-full"></span>
              <span><strong>Instructor:</strong> {normalizedEvent.instructor}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            normalizedEvent.type === 'workshop' ? 'bg-purple-100 text-purple-800' :
            normalizedEvent.type === 'event' ? 'bg-indigo-100 text-indigo-800' :
            normalizedEvent.type === 'exhibition' ? 'bg-teal-100 text-teal-800' :
            'bg-red-100 text-red-800'
          }`}>
            {normalizedEvent.type}
          </span>
          
          <div className="flex gap-2">
            <button 
              onClick={() => handleAddToGoogleCalendar(normalizedEvent)}
              className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-md hover:shadow-lg flex items-center gap-2"
              title="Add to Google Calendar"
            >
              <SiGooglecalendar className="text-base" />
              <span className="hidden sm:inline">Add to Calendar</span>
            </button>
            
            <button 
              onClick={() => handleRegisterClick(normalizedEvent.registrationLink || normalizedEvent.link || '#')}
              className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-md hover:shadow-lg"
            >
              {normalizedEvent.registrationRequired ? 'Book Now' : 'Learn More'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderCalendarView = () => {
    const selectedDateEvents = getEventsForDate(selectedDate);
    
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#134856] font-dm-serif">Select Date</h3>
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate}
              className="react-calendar-custom"
              tileClassName={({ date }) => {
                const hasEvents = getEventsForDate(date).length > 0;
                return hasEvents ? 'has-events' : '';
              }}
            />
            <style jsx>{`
              .react-calendar-custom {
                width: 100%;
                background: white;
                border: 1px solid #e0e7ff;
                border-radius: 8px;
                font-family: inherit;
                line-height: 1.125em;
              }
              
              .react-calendar-custom .react-calendar__navigation button {
                color: #134856;
                min-width: 44px;
                background: none;
                font-size: 16px;
                margin-top: 8px;
              }
              
              .react-calendar-custom .react-calendar__navigation button:enabled:hover,
              .react-calendar-custom .react-calendar__navigation button:enabled:focus {
                background-color: #f4f3f0;
                color: #e05264;
              }
              
              .react-calendar-custom .react-calendar__tile {
                max-width: 100%;
                padding: 10px 6px;
                background: none;
                text-align: center;
                line-height: 16px;
                font: inherit;
                font-size: 0.833em;
                color: #134856;
              }
              
              .react-calendar-custom .react-calendar__tile:enabled:hover,
              .react-calendar-custom .react-calendar__tile:enabled:focus {
                background-color: #f4f3f0;
                color: #e05264;
              }
              
              .react-calendar-custom .react-calendar__tile--active {
                background: linear-gradient(135deg, #134856 0%, #e05264 100%);
                color: white;
              }
              
              .react-calendar-custom .react-calendar__tile--active:enabled:hover,
              .react-calendar-custom .react-calendar__tile--active:enabled:focus {
                background: linear-gradient(135deg, #e05264 0%, #134856 100%);
              }
              
              .react-calendar-custom .has-events {
                background: linear-gradient(135deg, #f4c8c3 0%, #fde8e8 100%);
                border-radius: 4px;
                position: relative;
              }
              
              .react-calendar-custom .has-events::after {
                content: '';
                position: absolute;
                bottom: 2px;
                left: 50%;
                transform: translateX(-50%);
                width: 6px;
                height: 6px;
                background: #e05264;
                border-radius: 50%;
              }
            `}</style>
          </div>
        </div>

        {/* Events for selected date */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#134856] font-dm-serif">
              Events on {selectedDate.toLocaleDateString()}
            </h3>
            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No events scheduled for this date.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateEvents.map(renderEventCard)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const upcomingEvents = getUpcomingEvents();
    
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{upcomingEvents && upcomingEvents.map(renderEventCard)}
      </div>
    );
  };


  // Enhanced floating particles - same as Crafts page
  const FloatingParticles = () => {
    const particles = Array.from({ length: 21 }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 6, // Bigger particles 6-14px
      color: [
        'rgba(19, 72, 86, 0.6)',
        'rgba(224, 82, 100, 0.6)',
        'rgba(29, 124, 111, 0.6)',
      ][Math.floor(Math.random() * 3)],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 8 + Math.random() * 6,
    }));

    return (
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 20, -20, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: particle.animationDuration,
              repeat: Infinity,
              delay: particle.animationDelay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8E6DA] pb-8 overflow-hidden">

      <FullBleedDivider />
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Vertical Divider Line */}
        
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="inline-block text-6xl pt-10 font-dm-serif mb-8 pb-2 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent" style={{ lineHeight: '1.2' }}>
            Events & Workshops
          </h1>
          <p className="text-lg font-lora font-semibold text-xl text-[#E05264] max-w-3xl mx-auto leading-relaxed mb-10">
            Immerse yourself in India's vibrant cultural landscape. Join workshops, attend performances, and be part of our living heritage.
          </p>
          
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isAuthenticated && user && (user.role === 'Artist' || user.role === 'Admin') && (
              <motion.button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-dm-serif"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus className="text-white" />
                Create Event
              </motion.button>
            )}
            
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg shadow-sm p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-8 py-4 rounded-md transition-colors ${
                  viewMode === 'calendar' 
                    ? 'bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white' 
                    : 'text-gray-600 hover:text-[#E05264]'
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-8 py-4 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white' 
                    : 'text-gray-600 hover:text-[#E05264]'
                }`}
              >
                List View
              </button>
            </div>
          </div>
        </motion.section>

        {/* Search and Filter Controls */}
        <motion.div 
          className="bg-gradient-to-br from-[#1d7c6f] to-[#f58c8c] rounded-3xl shadow-2xl p-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-[#F8E6DA] rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, cities..."
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Filter and Sort */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-gray-600" />
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="dance">Dance</option>
                    <option value="music">Music</option>
                    <option value="art">Art</option>
                    <option value="crafts">Crafts</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="workshop">Workshop</option>
                  <option value="event">Event</option>
                  <option value="exhibition">Exhibition</option>
                  <option value="performance">Performance</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600"></div>
          </div>
        )}

        {/* Events Grid/Calendar */}
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {viewMode === 'calendar' ? renderCalendarView() : renderListView()}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {!loading && getFilteredEvents().length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-dm-serif font-bold mb-6">Do you organize events?</h2>
          <p className="text-xl font-lora mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join our platform to showcase your cultural events and workshops. Connect with art enthusiasts and help preserve India's rich cultural heritage through meaningful experiences.
          </p>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-[#134856] font-semibold font-dm-serif rounded-full hover:bg-[#F8E6DA] transition-colors duration-300 shadow-lg"
            >
              Become an Event Organizer
            </Link>
          </motion.div>
        </motion.div>

        {/* Event Modal */}
        <EventModal
          isOpen={showCreateModal || editingEvent !== null}
          onClose={() => {
            setShowCreateModal(false);
            setEditingEvent(null);
          }}
          onSubmit={editingEvent ? handleEditEvent : handleCreateEvent}
          event={editingEvent}
        />
      </div>
    </div>
  );
}

export default EventsPage;

