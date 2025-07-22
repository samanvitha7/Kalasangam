// src/components/UserEvents.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";
import EventModal from "./EventModal";

export default function UserEvents({ userId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    loadEvents();
  }, [userId]);

  const loadEvents = async () => {
    try {
      const res = await api.get(`/api/users/${userId}/events`);
      setEvents(res.data.events);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      const res = await api.post('/api/users/events', eventData);
      setEvents(prev => [res.data.event, ...prev]);
      toast.success('Event created successfully!');
      setShowEventModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    }
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      const res = await api.put(`/api/users/events/${editingEvent.id}`, eventData);
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? res.data.event : event
      ));
      toast.success('Event updated successfully!');
      setEditingEvent(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      await api.delete(`/api/users/events/${eventId}`);
      setEvents(prev => prev.filter(e => e.id !== eventId));
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
  };

  const closeModals = () => {
    setShowEventModal(false);
    setEditingEvent(null);
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    const eventDate = new Date(event.date);
    const now = new Date();
    
    if (filter === 'upcoming') return eventDate >= now;
    if (filter === 'past') return eventDate < now;
    return true;
  });

  // Categorize events
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl text-teal-600">Loading your events...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-teal-800">My Events</h2>
          <p className="text-gray-600 mt-1">{events.length} total events</p>
        </div>
        
        <button 
          onClick={() => setShowEventModal(true)}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Event
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-8">
        {[
          { id: 'all', label: 'All', count: events.length },
          { id: 'upcoming', label: 'Upcoming', count: upcomingEvents.length },
          { id: 'past', label: 'Past', count: pastEvents.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === tab.id
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No events yet</h3>
          <p className="text-gray-500 mb-6">Start organizing events to engage with the traditional arts community!</p>
          <button 
            onClick={() => setShowEventModal(true)}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Create Your First Event
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate >= new Date();
            
            return (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  {event.imageUrl ? (
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                      <div className="text-6xl text-teal-400">🎭</div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isUpcoming 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {isUpcoming ? '📅 Upcoming' : '🕐 Past'}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{event.title}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{eventDate.toLocaleDateString()} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{event.location.venue}, {event.location.city}</span>
                    </div>
                    {event.price > 0 && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span>₹{event.price}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Created {new Date(event.createdAt).toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(event)}
                        className="px-3 py-1 text-sm text-teal-600 hover:bg-teal-50 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">{events.length}</div>
          <div className="text-purple-800 font-medium">Total Events</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{upcomingEvents.length}</div>
          <div className="text-green-800 font-medium">Upcoming</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{pastEvents.length}</div>
          <div className="text-blue-800 font-medium">Completed</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {events.filter(e => e.registrationRequired).length}
          </div>
          <div className="text-orange-800 font-medium">With Registration</div>
        </div>
      </div>

      {/* Modals */}
      <EventModal
        isOpen={showEventModal}
        onClose={closeModals}
        onSubmit={handleCreateEvent}
      />

      {editingEvent && (
        <EventModal
          isOpen={!!editingEvent}
          onClose={closeModals}
          onSubmit={handleUpdateEvent}
          event={editingEvent}
          isEditing={true}
        />
      )}
    </div>
  );
}
