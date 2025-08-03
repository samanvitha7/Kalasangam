import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Enhanced floating particles - optimized count
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
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
    animationDuration: 8 + Math.random() * 7,
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
            y: [0, -60, 0],
            x: [0, 25, -25, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
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

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const eventSymbols = {
  music: ['🎵', '🎼', '🎤', '🎸', '🥁', '🎹'],
  dance: ['💃', '🕺', '👯', '🎭', '🌟', '✨'],
  art: ['🎨', '🖌️', '🖼️', '🎪', '🌈', '🎭'],
  crafts: ['🧵', '🪡', '🏺', '🔨', '✂️', '🎁'],
  default: ['🎊', '🎉', '⭐', '🌟', '✨', '🎈']
};

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
      case 'music': return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c]';
      case 'dance': return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c]';
      case 'art': return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c]';
      case 'crafts': return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c]';
      default: return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c]';
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

const CircularCalendar = ({ events, onEventClick, selectedEvent, onMonthChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  
  // Notify parent component when month changes
  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(currentMonth);
    }
  }, [currentMonth, onMonthChange]);

  // Filter events by the selected month
  const getEventsForCurrentMonth = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth;
    });
  };

  const getEventPositions = () => {
    const monthEvents = getEventsForCurrentMonth();
    return monthEvents.map((event, index) => {
      const angle = (index * 360) / monthEvents.length;
      const radius = 140; // Adjusted for larger container
      const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
      const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
      return { event, x, y, angle };
    });
  };

  return (
    <div className="relative w-96 h-96 mx-auto">{/* Increased back to match right column */}
      {/* Calendar background circle */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-orange-300 via-pink-300 to-purple-300 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 shadow-2xl"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Month indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c] rounded-full px-6 py-4 shadow-lg">
          <h3 className="text-2xl font-bold text-white font-yatra">{months[currentMonth]}</h3>
          <p className="text-sm text-white/90">{getEventsForCurrentMonth().length} Events</p>
        </div>
      </div>

      {/* Events positioned around the circle */}
      {getEventPositions().length > 0 ? (
        getEventPositions().map(({ event, x, y }, index) => (
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
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400 mt-20">
            <div className="text-4xl mb-2">📅</div>
            <p className="text-sm">No events this month</p>
          </div>
        </div>
      )}

      {/* Month navigation */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <motion.button
          onClick={() => setCurrentMonth((prev) => (prev - 1 + 12) % 12)}
          className="px-4 py-2 bg-gradient-to-r from-[#134856] to-[#e05264] text-white rounded-full hover:from-[#0f3e4a] hover:to-[#d03e56] transition-all duration-300 shadow-lg font-semibold text-sm"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          ← 
        </motion.button>
        <motion.button
          onClick={() => setCurrentMonth((prev) => (prev + 1) % 12)}
          className="px-4 py-2 bg-gradient-to-r from-[#134856] to-[#e05264] text-white rounded-full hover:from-[#0f3e4a] hover:to-[#d03e56] transition-all duration-300 shadow-lg font-semibold text-sm"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
           →
        </motion.button>
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
      case 'music': return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c] text-blue';
      case 'dance': return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c] text-blue';
      case 'art': return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c] text-blue';
      case 'crafts': return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c] text-blue';
      default: return 'bg-gradient-to-br from-[#1D7C6F] to-[#F48c8c] text-blue';
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


export default function PulsingEventsCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailSubscription, setEmailSubscription] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const navigate = useNavigate();
  
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching events...');
        
        // Fetch all events (including past events for circular display)
        const allEventsResponse = await api.getEvents({ upcoming: 'false' });
        console.log('All events response:', allEventsResponse);
        const allEvents = allEventsResponse.data || allEventsResponse || [];
        
        // Fetch only upcoming events
        const upcomingEventsResponse = await api.getEvents({ upcoming: 'true' });
        console.log('Upcoming events response:', upcomingEventsResponse);
        const upcomingEventsData = upcomingEventsResponse.data || upcomingEventsResponse || [];
        
        console.log('Setting events:', {
          allEvents: allEvents?.length || 0,
          upcomingEvents: upcomingEventsData?.length || 0
        });
        
        // Sort events by date for better month-wise organization
        const sortedEvents = allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setEvents(sortedEvents); // Keep all events for month filtering
        setUpcomingEvents(upcomingEventsData.slice(0, 5)); // Show top 5 upcoming events
        // Ensure arrays exist before calling slice
        const safeAllEvents = Array.isArray(allEvents) ? allEvents : [];
        const safeUpcomingEvents = Array.isArray(upcomingEventsData) ? upcomingEventsData : [];
        
        setEvents(safeAllEvents.slice(0, 12)); // Limit to 12 for circular display
        setUpcomingEvents(safeUpcomingEvents.slice(0, 5)); // Show top 5 upcoming events
        
      } catch (err) {
        console.error('Error fetching events:', err);
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          response: err.response
        });
        setError(`Failed to load events: ${err.message}`);
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
    <section className="relative bg-[#F8E6DA] py-8 overflow-hidden min-h-screen w-full flex flex-col justify-center items-center">
      {/* Floating Particles */}
      <FloatingParticles />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {events.length > 0 ? (
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-16 items-center min-h-[80vh] max-w-full">
            {/* Left Column - Calendar and View All Events Button */}
            <motion.div
              className="flex flex-col items-center justify-center h-full"
              style={{ gap: '4rem' }} // Gap between calendar and button
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CircularCalendar 
                events={events} 
                onEventClick={() => navigate('/events')}
                selectedEvent={selectedEvent}
                onMonthChange={handleMonthChange}
              />
              
              {/* View All Events Button - Centered under calendar */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={() => navigate('/events')}
                  className="px-8 py-3 bg-gradient-to-r from-[#134856] to-[#e05264] text-white rounded-full hover:from-[#0f3e4a] hover:to-[#d03e56] transition-all duration-300 shadow-lg font-semibold text-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Events →
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Title, Description and Month Events */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl font-dm-serif mb-4 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
                  What's Happening
                </h1>
                <p className="text-lg font-lora text-lg font-semibold text-[#E05264] leading-relaxed mb-8">
                  Looking for your next cultural adventure? Explore upcoming events and workshops. There’s always something new.
                </p>
              </motion.div>
              
              {/* Current Month Events - Artist Card Style */}
              <motion.div
                className="flex flex-col items-center justify-center space-y-6 ml-12"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="grid grid-cols-2 gap-20 max-w-6xl">
                  {(() => {
                    const monthEvents = events.filter(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getMonth() === selectedMonth;
                    });
                    
                    const eventsToShow = monthEvents.slice(0, 4);
                    
                    return eventsToShow.length > 0 ? eventsToShow.map((event, index) => (
                      <motion.div
                        key={event._id}
                        className="relative group cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        onClick={() => navigate('/events')}
                      >
                        <div className="bg-white backdrop-blur-lg rounded-[2rem] border-2 border-white/50 shadow-2xl overflow-hidden aspect-square p-8 w-80 h-80">
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            
                            
                            <h3 className="font-dm-serif font-bold bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent text-2xl mb-3">
                              {event.title}
                            </h3>
                            <p className="text-[#134856]/70 font-lora text-base mb-4">
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)} Event
                            </p>
                            <p className="text-[#134856]/60 font-lora text-sm leading-relaxed mb-4">
                              {event.description ? event.description.slice(0, 90) + '...' : 'Join us for this exciting cultural event'}
                            </p>
                            <div className="flex flex-col items-center gap-2 text-base text-[#134856]/60">
                              <span>📍 {event.location.city}, {event.location.state}</span>
                              <span className="bg-gradient-to-r from-[#134856]/10 to-[#e05264]/10 px-4 py-2 rounded-full">
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                          
                          {/* Hover overlay with deep teal text */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#134856]/20 to-[#e05264]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-[2rem]">
                            <span className="text-[#134856] font-lora font-bold text-xl text-center drop-shadow-lg">
                              Click for details
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )) : (
                      // Show placeholder cards when no events
                      Array.from({ length: 4 }, (_, index) => (
                        <motion.div
                          key={`placeholder-${index}`}
                          className="relative group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        >
                          <div className="bg-white/50 backdrop-blur-lg rounded-[2rem] border-2 border-white/30 shadow-lg overflow-hidden aspect-square p-8 w-80 h-80">
                            <div className="flex flex-col items-center justify-center h-full text-center">
                              <div className="text-4xl mb-4 opacity-30">📅</div>
                              <h3 className="font-dm-serif font-bold text-[#134856]/30 text-2xl mb-3">
                                No Events
                              </h3>
                              <p className="text-[#134856]/30 font-lora text-base mb-4">
                                {months[selectedMonth]}
                              </p>
                              <p className="text-[#134856]/30 font-lora text-sm leading-relaxed">
                                Check other months or stay tuned for upcoming events!
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    );
                  })()
                  }
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No events available at the moment.</p>
          </div>
        )}
        
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
