import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { motion } from "framer-motion";
import { api } from '../services/api';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    city: ''
  });
  const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log('Fetching events...');
      const data = await api.getEvents(); // Fetch all events by default
      console.log('API Response:', data);
      setEvents(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Modify fetch logic for organizer selection
  const fetchEventsByOrganizer = async (organizer) => {
    try {
      setLoading(true);
      const data = await api.getEvents(organizer ? { organizer } : {});
      setEvents(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Failed to fetch events with organizer:', error);
      setEvents([]);
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
    return filteredEvents
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 6);
  };

  const renderEventCard = (event) => (
    <motion.div
      key={event._id}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-orange-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-[#9b2226] font-[Yatra One]">{event.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          event.category === 'dance' ? 'bg-pink-100 text-pink-800' :
          event.category === 'music' ? 'bg-blue-100 text-blue-800' :
          event.category === 'art' ? 'bg-green-100 text-green-800' :
          event.category === 'crafts' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {event.category}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          <span><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          <span><strong>Time:</strong> {event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          <span><strong>Location:</strong> {event.location.venue}, {event.location.city}</span>
        </div>
        {event.price > 0 && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            <span><strong>Price:</strong> ₹{event.price}</span>
          </div>
        )}
        {event.instructor && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            <span><strong>Instructor:</strong> {event.instructor}</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          event.type === 'workshop' ? 'bg-purple-100 text-purple-800' :
          event.type === 'event' ? 'bg-indigo-100 text-indigo-800' :
          event.type === 'exhibition' ? 'bg-teal-100 text-teal-800' :
          'bg-red-100 text-red-800'
        }`}>
          {event.type}
        </span>
        
        {event.registrationRequired && (
          <button className="bg-gradient-to-r from-[#582f0e] to-[#8b4513] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">
            Register
          </button>
        )}
      </div>
    </motion.div>
  );

  const renderCalendarView = () => {
    const selectedDateEvents = getEventsForDate(selectedDate);
    
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#9b2226] font-[Yatra One]">Select Date</h3>
            <Calendar 
              onChange={setSelectedDate} 
              value={selectedDate}
              className="react-calendar-custom"
              tileClassName={({ date }) => {
                const hasEvents = getEventsForDate(date).length > 0;
                return hasEvents ? 'has-events' : '';
              }}
            />
          </div>
        </div>

        {/* Events for selected date */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-[#9b2226] font-[Yatra One]">
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-[#9b2226] font-[Yatra One] mb-4">
            Events & Workshops
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover upcoming traditional arts events, workshops, and exhibitions. 
            Join us in celebrating India's rich cultural heritage.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap gap-4 justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* View Mode Toggle */}
          <div className="flex bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-orange-400 text-white' 
                  : 'text-gray-600 hover:text-orange-400'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-orange-400 text-white' 
                  : 'text-gray-600 hover:text-orange-400'
              }`}
            >
              List View
            </button>
          </div>

{/* Organizer Filter */}
          <select
            onChange={(e) => fetchEventsByOrganizer(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">All Organizers</option>
            <option value="organizer-xyz">Organizer XYZ</option>
            {/* Add more options if needed */}
          </select>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="all">All Categories</option>
              <option value="dance">Dance</option>
              <option value="music">Music</option>
              <option value="art">Art</option>
              <option value="crafts">Crafts</option>
              <option value="general">General</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="all">All Types</option>
              <option value="workshop">Workshop</option>
              <option value="event">Event</option>
              <option value="exhibition">Exhibition</option>
              <option value="performance">Performance</option>
            </select>

            <input
              type="text"
              placeholder="Search by city..."
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {viewMode === 'calendar' ? renderCalendarView() : renderListView()}
        </motion.div>
      </div>
    </div>
  );
}

export default EventsPage;

