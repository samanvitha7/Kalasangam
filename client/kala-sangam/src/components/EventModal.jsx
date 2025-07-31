import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaImage } from 'react-icons/fa';

const EventModal = ({ isOpen, onClose, onSubmit, event = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'event',
    category: 'general',
    date: '',
    time: '',
    location: {
      venue: '',
      address: '',
      city: '',
      state: ''
    },
    instructor: '',
    price: 0,
    maxParticipants: '',
    imageUrl: '',
    registrationRequired: false,
    registrationLink: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Effect to populate form when editing
  useEffect(() => {
    if (isEditing && event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        type: event.type || 'event',
        category: event.category || 'general',
        date: event.date ? (() => {
          try {
            const eventDate = new Date(event.date);
            if (!isNaN(eventDate.getTime())) {
              return eventDate.toISOString().split('T')[0];
            }
            return '';
          } catch (error) {
            console.warn('Invalid date format for event:', event.date);
            return '';
          }
        })() : '',
        time: event.time || '',
        location: {
          venue: event.location?.venue || '',
          address: event.location?.address || '',
          city: event.location?.city || '',
          state: event.location?.state || ''
        },
        instructor: event.instructor || '',
        price: event.price || 0,
        maxParticipants: event.maxParticipants || '',
        imageUrl: event.imageUrl || '',
        registrationRequired: event.registrationRequired || false,
        registrationLink: event.registrationLink || '',
        contactEmail: event.contactEmail || '',
        contactPhone: event.contactPhone || ''
      });
      
      // Set image preview if there's an existing image
      if (event.imageUrl) {
        setImagePreview(event.imageUrl);
      }
    } else if (!isEditing) {
      // Reset form for new event creation
      setFormData({
        title: '',
        description: '',
        type: 'event',
        category: 'general',
        date: '',
        time: '',
        location: {
          venue: '',
          address: '',
          city: '',
          state: ''
        },
        instructor: '',
        price: 0,
        maxParticipants: '',
        imageUrl: '',
        registrationRequired: false,
        registrationLink: '',
        contactEmail: '',
        contactPhone: ''
      });
      setImagePreview(null);
    }
  }, [isEditing, event]);

  const eventTypes = ['workshop', 'event', 'exhibition', 'performance'];
  const categories = ['music', 'dance', 'art', 'crafts', 'general'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested object properties like location.venue
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setFormData(prev => ({
          ...prev,
          imageUrl: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Event name is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Event name must be 200 characters or less';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (!isEditing) {
      // Only validate future dates for new events, allow past dates when editing
      const eventDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        newErrors.date = 'Event date must be today or in the future';
      }
    }
    
    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.location.venue.trim()) {
      newErrors['location.venue'] = 'Venue is required';
    }
    
    if (!formData.location.address.trim()) {
      newErrors['location.address'] = 'Address is required';
    }
    
    if (!formData.location.city.trim()) {
      newErrors['location.city'] = 'City is required';
    }
    
    if (!formData.location.state.trim()) {
      newErrors['location.state'] = 'State is required';
    }

    if (formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    if (formData.maxParticipants && formData.maxParticipants < 1) {
      newErrors.maxParticipants = 'Maximum participants must be at least 1';
    }

    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please provide a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Add a mock artist ID for now - in a real implementation, this would come from the authenticated user
      const eventData = {
        ...formData,
        artist: '60d5ecb74c9b930015a5b2e1' // Mock ObjectId - you'd get this from auth context
      };
      onSubmit(eventData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      type: 'event',
      category: 'general',
      date: '',
      time: '',
      location: {
        venue: '',
        address: '',
        city: '',
        state: ''
      },
      instructor: '',
      price: 0,
      maxParticipants: '',
      imageUrl: '',
      registrationRequired: false,
      contactEmail: '',
      contactPhone: ''
    });
    setImagePreview(null);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-gradient-to-br from-[#F8E6DA]/95 to-[#F4C8C3]/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e05264]/20"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#d4a574]/20 bg-gradient-to-r from-[#134856] to-[#e05264] rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white font-dm-serif">
                {isEditing ? 'Edit Event' : 'Add New Event'}
              </h2>
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Event Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Image (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 transition-colors"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaImage className="w-8 h-8 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> event image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Basic Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Event Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name * <span className="text-xs text-gray-500">({formData.title.length}/200)</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                    maxLength="200"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Instructor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instructor/Artist (Optional)
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    placeholder="Name of instructor or artist..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description * <span className="text-xs text-gray-500">({formData.description.length}/1000)</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-teal-800"
                  maxLength="1000"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              {/* Type and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaClock className="mr-2" />
                    Time *
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="e.g., 10:00 AM, 7:30 PM"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Location *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="location.venue"
                      value={formData.location.venue}
                      onChange={handleChange}
                      placeholder="Venue name"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                    />
                    {errors['location.venue'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['location.venue']}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="location.address"
                      value={formData.location.address}
                      onChange={handleChange}
                      placeholder="Street address"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                    />
                    {errors['location.address'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['location.address']}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="location.city"
                      value={formData.location.city}
                      onChange={handleChange}
                      placeholder="City"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                    />
                    {errors['location.city'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['location.city']}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="location.state"
                      value={formData.location.state}
                      onChange={handleChange}
                      placeholder="State"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                    />
                    {errors['location.state'] && (
                      <p className="text-red-500 text-sm mt-1">{errors['location.state']}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Participants (Optional)
                  </label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    min="1"
                    placeholder="Unlimited"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  />
                  {errors.maxParticipants && (
                    <p className="text-red-500 text-sm mt-1">{errors.maxParticipants}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="registrationRequired"
                    checked={formData.registrationRequired}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Registration Required
                  </label>
                </div>
              </div>

              {/* Registration Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration/Event Link (Optional)
                </label>
                <input
                  type="url"
                  name="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleChange}
                  placeholder="https://example.com/register or https://eventbrite.com/..."
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add a link for registration, tickets, or more information about the event
                </p>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="contact@example.com"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  />
                  {errors.contactEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-teal-800"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#9b2226] to-[#d62d20] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#7a1b1e] hover:to-[#b8251c] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isEditing ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
