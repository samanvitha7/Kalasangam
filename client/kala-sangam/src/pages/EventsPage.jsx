import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Hardcoded event data with links
const HARDCODED_EVENTS = [
  {
    _id: "1",
    title: "Classical Bharatanatyam Workshop",
    description: "Learn the fundamentals of Bharatanatyam dance from expert instructors. This workshop covers basic steps, expressions, and traditional choreography.",
    category: "dance",
    type: "workshop",
    date: "2024-02-15",
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
    date: "2024-02-20",
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
    date: "2024-02-25",
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
    date: "2024-03-01",
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
    date: "2024-03-05",
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
    date: "2024-03-10",
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
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

  // Initialize page animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);


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
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-orange-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-deep-teal font-winky">{normalizedEvent.title}</h3>
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
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            <span><strong>Date:</strong> {new Date(normalizedEvent.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            <span><strong>Time:</strong> {normalizedEvent.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            <span><strong>Location:</strong> {normalizedEvent.location.venue}, {normalizedEvent.location.city}</span>
          </div>
          {normalizedEvent.price > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span><strong>Price:</strong> ₹{normalizedEvent.price}</span>
            </div>
          )}
          {normalizedEvent.instructor && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span><strong>Instructor:</strong> {normalizedEvent.instructor}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            normalizedEvent.type === 'workshop' ? 'bg-purple-100 text-purple-800' :
            normalizedEvent.type === 'event' ? 'bg-indigo-100 text-indigo-800' :
            normalizedEvent.type === 'exhibition' ? 'bg-teal-100 text-teal-800' :
            'bg-red-100 text-red-800'
          }`}>
            {normalizedEvent.type}
          </span>
          
          {normalizedEvent.registrationRequired && (
            <button 
              onClick={() => handleRegisterClick(normalizedEvent.link)}
              className="bg-gradient-to-r from-[#582f0e] to-[#8b4513] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
              Register
            </button>
          )}
          {!normalizedEvent.registrationRequired && normalizedEvent.link && (
            <button 
              onClick={() => handleRegisterClick(normalizedEvent.link)}
              className="bg-gradient-to-r from-[#582f0e] to-[#8b4513] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
            >
              Learn More
            </button>
          )}
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


  // Floating particles for background
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      color: [
        'rgba(155, 34, 38, 0.6)',
        'rgba(251, 146, 60, 0.6)',
        'rgba(245, 158, 11, 0.6)',
        'rgba(236, 72, 153, 0.6)',
        'rgba(139, 69, 19, 0.5)'
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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#FFF4E0] via-[#FFE4B5] to-[#FFF0DC] text-[#462F1A] overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden pt-20 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: pageReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-[#9b2226]/20 to-[#f59e0b]/20 rounded-full blur-3xl opacity-30 top-0 left-0"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-gradient-to-r from-[#ec4899]/20 to-[#f97316]/20 rounded-full blur-3xl opacity-25 bottom-0 right-0"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0],
            opacity: [0.25, 0.4, 0.25]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="relative container mx-auto px-4 text-center z-10">
          <motion.h1 
            className="text-6xl md:text-7xl font-extrabold font-[Yatra One] mb-8 drop-shadow-lg leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 50, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Events & Workshops
          </motion.h1>
          <motion.p 
            className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed text-[#5c3d24] font-medium mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Immerse yourself in India's vibrant cultural landscape. Join workshops, attend performances, and be part of our living heritage.
          </motion.p>
          
          {/* Floating Event Icons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-sm md:text-base"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: pageReady ? 0 : 30, opacity: pageReady ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: "🎭", text: "Cultural Events" },
              { icon: "🛠️", text: "Hands-on Workshops" },
              { icon: "🎨", text: "Art Exhibitions" },
              { icon: "🎵", text: "Music Performances" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-semibold text-[#8b4513]">{item.icon} {item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-6 relative z-10">

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

