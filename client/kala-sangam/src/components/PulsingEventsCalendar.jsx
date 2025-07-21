import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const PulsingHeart = ({ event, onClick, isActive }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 2000 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type) => {
    switch (type) {
      case 'workshop': return '🎨';
      case 'performance': return '🎵';
      case 'exhibition': return '🖼️';
      case 'event': return '🎊';
      default: return '🎭';
    }
  };

  const getEventColor = (category) => {
    switch (category) {
      case 'music': return 'bg-gradient-to-br from-blue-400 to-indigo-500';
      case 'dance': return 'bg-gradient-to-br from-purple-400 to-pink-500';
      case 'art': return 'bg-gradient-to-br from-green-400 to-teal-500';
      case 'crafts': return 'bg-gradient-to-br from-yellow-400 to-orange-500';
      default: return 'bg-gradient-to-br from-orange-400 to-red-500';
    }
  };

  return (
    <motion.div
      className={`relative cursor-pointer group ${isActive ? 'z-20' : 'z-10'}`}
      onClick={() => onClick(event)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${getEventColor(event.category)} ${pulse ? 'shadow-lg shadow-current' : ''}`}
        animate={{
          scale: pulse ? 1.2 : 1,
          boxShadow: pulse ? '0 0 25px rgba(239, 68, 68, 0.6)' : '0 0 10px rgba(0,0,0,0.2)'
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.span 
          className="text-2xl filter drop-shadow-md"
          animate={{ rotate: pulse ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {getEventIcon(event.type)}
        </motion.span>
      </motion.div>
      
      {/* Ripple effect */}
      <AnimatePresence>
        {pulse && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-current opacity-30"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        {event.title}
      </div>
    </motion.div>
  );
};

const CircularCalendar = ({ events, onEventClick, selectedEvent }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const getEventPositions = () => {
    return events.map((event, index) => {
      const angle = (index * 360) / events.length;
      const radius = 150;
      const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
      const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
      return { event, x, y, angle };
    });
  };

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Calendar background circle */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 shadow-2xl"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Month indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center bg-white/80 rounded-full px-6 py-4 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 font-yatra">{months[currentMonth]}</h3>
          <p className="text-sm text-gray-600">Cultural Calendar</p>
        </div>
      </div>

      {/* Events positioned around the circle */}
      {getEventPositions().map(({ event, x, y }, index) => (
        <div
          key={event._id}
          className="absolute"
          style={{
            left: `calc(50% + ${x}px - 32px)`,
            top: `calc(50% + ${y}px - 32px)`,
          }}
        >
          <PulsingHeart 
            event={event} 
            onClick={onEventClick}
            isActive={selectedEvent?._id === event._id}
          />
        </div>
      ))}

      {/* Month navigation */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          onClick={() => setCurrentMonth((prev) => (prev - 1 + 12) % 12)}
          className="px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => setCurrentMonth((prev) => (prev + 1) % 12)}
          className="px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
};

const EventDetailsCard = ({ event, onClose }) => {
  if (!event) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = new Date(event.date) > new Date();

  const getTimeRemaining = () => {
    if (!isUpcoming) return null;
    
    const now = new Date();
    const eventDate = new Date(event.date);
    const diff = eventDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const countdown = getTimeRemaining();

  const getCategoryColor = (category) => {
    switch (category) {
      case 'music': return 'bg-blue-100 text-blue-600';
      case 'dance': return 'bg-purple-100 text-purple-600';
      case 'art': return 'bg-green-100 text-green-600';
      case 'crafts': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-orange-100 text-orange-600';
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.imageUrl || `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop`} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.type === 'workshop' ? 'bg-purple-100 text-purple-600' : 
              event.type === 'performance' ? 'bg-blue-100 text-blue-600' :
              event.type === 'exhibition' ? 'bg-green-100 text-green-600' :
              'bg-orange-100 text-orange-600'
            }`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
            {isUpcoming && (
              <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                Upcoming
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-yatra">{event.title}</h3>
          <p className="text-sm text-gray-600 mb-2">📅 {formatDate(event.date)}</p>
          <p className="text-sm text-gray-600 mb-3">🕒 {event.time}</p>
          <p className="text-sm text-gray-600 mb-3">
            📍 {event.location.venue}, {event.location.city}, {event.location.state}
          </p>
          <p className="text-gray-700 mb-4 text-sm">{event.description}</p>
          
          {event.instructor && (
            <p className="text-sm text-gray-600 mb-3">👨‍🏫 Instructor: {event.instructor}</p>
          )}

          {event.price > 0 && (
            <p className="text-sm text-gray-600 mb-3">💰 Price: ₹{event.price}</p>
          )}

          {event.maxParticipants && (
            <p className="text-sm text-gray-600 mb-3">👥 Max Participants: {event.maxParticipants}</p>
          )}
          
          {isUpcoming && countdown && (
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-600 mb-1">Time Remaining:</p>
              <div className="flex space-x-4 text-center">
                <div>
                  <span className="block text-lg font-bold text-pink-600">{countdown.days}</span>
                  <span className="text-xs text-gray-500">Days</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-pink-600">{countdown.hours}</span>
                  <span className="text-xs text-gray-500">Hours</span>
                </div>
                <div>
                  <span className="block text-lg font-bold text-pink-600">{countdown.minutes}</span>
                  <span className="text-xs text-gray-500">Minutes</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            {event.contactEmail && (
              <button 
                onClick={() => window.open(`mailto:${event.contactEmail}`, '_blank')}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Contact
              </button>
            )}
            {event.registrationRequired && (
              <button 
                onClick={() => window.open(`mailto:${event.contactEmail || 'events@kalasangam.com'}?subject=Registration for ${event.title}`, '_blank')}
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
              >
                Register
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SeasonalBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-orange-300 to-pink-300 opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20],
            x: [-10, 10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function PulsingEventsCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailSubscription, setEmailSubscription] = useState('');

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        
        // Fetch all events
        const allEventsResponse = await api.getEvents({ upcoming: 'false' });
        const allEvents = allEventsResponse.data || [];
        
        // Fetch only upcoming events
        const upcomingEventsResponse = await api.getEvents({ upcoming: 'true' });
        const upcomingEventsData = upcomingEventsResponse.data || [];
        
        setEvents(allEvents.slice(0, 12)); // Limit to 12 for circular display
        setUpcomingEvents(upcomingEventsData.slice(0, 5)); // Show top 5 upcoming events
        
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const handleEmailSubscription = (e) => {
    e.preventDefault();
    if (emailSubscription) {
      alert('Thank you for subscribing! You will receive notifications about new events.');
      setEmailSubscription('');
    }
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-16 overflow-hidden flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-lg text-gray-600 font-lora">Loading cultural events...</p>
        </motion.div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-16 overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-16 overflow-hidden">
      <SeasonalBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent font-yatra">
            Cultural Events Calendar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover upcoming festivals, workshops, and performances. Each pulse reveals new opportunities to immerse yourself in India's rich cultural heritage.
          </p>
        </motion.div>

        {events.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Circular Calendar */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CircularCalendar 
                events={events} 
                onEventClick={handleEventClick}
                selectedEvent={selectedEvent}
              />
            </motion.div>

            {/* Upcoming Events List */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6 font-yatra">Upcoming Events</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event._id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border border-white/20"
                    onClick={() => handleEventClick(event)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        event.category === 'music' ? 'bg-gradient-to-br from-blue-400 to-indigo-500' :
                        event.category === 'dance' ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                        event.category === 'art' ? 'bg-gradient-to-br from-green-400 to-teal-500' :
                        event.category === 'crafts' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                        'bg-gradient-to-br from-orange-400 to-red-500'
                      }`}>
                        {event.type === 'workshop' ? '🎨' : 
                         event.type === 'performance' ? '🎵' : 
                         event.type === 'exhibition' ? '🖼️' : '🎊'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.location.city}, {event.location.state}</p>
                        <p className="text-xs text-pink-600 font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })} • {event.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <p className="text-gray-500 text-center py-8">No upcoming events found.</p>
                )}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No events available at the moment.</p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/30">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-yatra">Don't Miss Out!</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to get notifications about new events and workshops in your area.
            </p>
            <form onSubmit={handleEmailSubscription} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailSubscription}
                onChange={(e) => setEmailSubscription(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 flex-1 max-w-xs"
                required
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsCard 
            event={selectedEvent} 
            onClose={closeEventDetails}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
