import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaPlus, FaFilter, FaSearch, FaTimes, FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaBookmark, FaHeart } from 'react-icons/fa';
import EventModal from '../components/EventModal';
import api from '../utils/axios';
import { Link } from 'react-router-dom';

// Hardcoded event data with links - Updated dates for 2025
const HARDCODED_EVENTS = [
  {
    _id: "1",
    title: "Classical Bharatanatyam Workshop",
    description: "Learn the fundamentals of Bharatanatyam dance from expert instructors. This workshop covers basic steps, expressions, and traditional choreography.",
    category: "dance",
    type: "workshop",
    date: "2025-08-15",
    time: "10:00 AM",
    location: {
      venue: "Cultural Heritage Center",
      city: "Mumbai"
    },
    price: 1500,
    instructor: "Guru Priya Sharma",
    registrationRequired: true,
    link: "https://example.com/bharatanatyam-workshop"
  },
  {
    _id: "2",
    title: "Sitar Recital - Raag Yaman",
    description: "Experience the mesmerizing sounds of classical Indian music with a traditional sitar performance featuring Raag Yaman.",
    category: "music",
    type: "performance",
    date: "2025-08-20",
    time: "7:00 PM",
    location: {
      venue: "Music Academy Auditorium",
      city: "Delhi"
    },
    price: 500,
    instructor: "Pandit Ravi Kumar",
    registrationRequired: true,
    link: "https://example.com/sitar-recital"
  },
  {
    _id: "3",
    title: "Madhubani Painting Exhibition",
    description: "Explore the vibrant world of Madhubani art through this comprehensive exhibition featuring works from renowned artists.",
    category: "art",
    type: "exhibition",
    date: "2025-08-25",
    time: "11:00 AM",
    location: {
      venue: "National Art Gallery",
      city: "Kolkata"
    },
    price: 0,
    registrationRequired: false,
    link: "https://example.com/madhubani-exhibition"
  },
  {
    _id: "4",
    title: "Pottery Making Workshop",
    description: "Hands-on pottery workshop where you'll learn traditional clay molding techniques and create your own masterpiece.",
    category: "crafts",
    type: "workshop",
    date: "2025-09-01",
    time: "2:00 PM",
    location: {
      venue: "Artisan's Studio",
      city: "Jaipur"
    },
    price: 800,
    instructor: "Master Craftsman Ramesh",
    registrationRequired: true,
    link: "https://example.com/pottery-workshop"
  },
  {
    _id: "5",
    title: "Folk Dance Festival",
    description: "Celebrate India's diverse folk traditions with performances from various states including Bhangra, Garba, and Kuchipudi.",
    category: "dance",
    type: "event",
    date: "2025-09-05",
    time: "6:00 PM",
    location: {
      venue: "Open Air Theatre",
      city: "Bangalore"
    },
    price: 300,
    registrationRequired: true,
    link: "https://example.com/folk-dance-festival"
  },
  {
    _id: "6",
    title: "Traditional Jewelry Making",
    description: "Learn the ancient art of traditional jewelry making using authentic techniques and materials.",
    category: "crafts",
    type: "workshop",
    date: "2025-09-10",
    time: "10:30 AM",
    location: {
      venue: "Craft Village",
      city: "Chennai"
    },
    price: 2000,
    instructor: "Artisan Meera Devi",
    registrationRequired: true,
    link: "https://example.com/jewelry-workshop"
  }
];

function EventsPage() {
  const [pageReady, setPageReady] = useState(false);
  const [events, setEvents] = useState([]);
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
      if (response.data.success) {
        setEvents(response.data.data);
      } else {
        // Fallback to hardcoded events if backend fails
        setEvents(HARDCODED_EVENTS);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to hardcoded events
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
    return filteredEvents.filter(event => 
      new Date(event.date).toDateString() === date.toDateString()
    );
  };

  const getUpcomingEvents = () => {
    const filteredEvents = getFilteredEvents();
    const now = new Date();
    const upcoming = filteredEvents
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 6);
    return upcoming;
  };

  const handleRegisterClick = (link) => {
    window.open(link, '_blank');
  };

  const renderEventCard = (event) => {
    // Event data is already normalized since it's hardcoded
    const normalizedEvent = event;

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
            <span><strong>Location:</strong> {normalizedEvent.location.venue}, {normalizedEvent.location.city}</span>
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
          
          <button 
            onClick={() => handleRegisterClick(normalizedEvent.link || '#')}
            className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-md hover:shadow-lg"
          >
            {normalizedEvent.registrationRequired ? 'Register' : 'Learn More'}
          </button>
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


  // Floating particles for background - matching ArtWall colors
  const FloatingParticles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      color: [
        'rgba(19, 72, 86, 0.6)',
        'rgba(224, 82, 100, 0.6)',
        'rgba(244, 140, 140, 0.6)',
        'rgba(29, 124, 111, 0.6)',
        'rgba(255, 215, 0, 0.6)'
      ][Math.floor(Math.random() * 5)],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 8 + Math.random() * 6
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-40"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 25, -25, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.3, 1]
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
    <div className="min-h-screen bg-[#F8E6DA] pt-24 pb-8 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="inline-block text-5xl font-dm-serif mb-6 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Events & Workshops
          </h1>
          <p className="text-lg font-lora font-semibold text-[#E05264] max-w-3xl mx-auto leading-relaxed mb-10">
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
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'calendar' 
                    ? 'bg-gradient-to-r from-[#1d7c6f] to-[#f58c8c] text-white' 
                    : 'text-gray-600 hover:text-[#E05264]'
                }`}
              >
                Calendar View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md transition-colors ${
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

