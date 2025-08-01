// src/components/ProfilePictureUpload.jsx
import { useState, useRef } from "react";
import { toast } from "react-toastify";

const AVATAR_COLORS = [
  { name: 'Teal', bg: 'bg-teal-500', text: 'text-white' },
  { name: 'Coral', bg: 'bg-coral-red', text: 'text-white' },
  { name: 'Purple', bg: 'bg-purple-500', text: 'text-white' },
  { name: 'Blue', bg: 'bg-blue-500', text: 'text-white' },
  { name: 'Green', bg: 'bg-green-500', text: 'text-white' },
  { name: 'Pink', bg: 'bg-pink-500', text: 'text-white' },
  { name: 'Orange', bg: 'bg-orange-500', text: 'text-white' },
  { name: 'Indigo', bg: 'bg-indigo-500', text: 'text-white' },
];

export default function ProfilePictureUpload({ 
  currentAvatar, 
  userName, 
  onAvatarChange, 
  isEditing = false 
}) {
  const [avatarType, setAvatarType] = useState(
    currentAvatar?.startsWith('http') || currentAvatar?.startsWith('data:') ? 'image' : 
    currentAvatar?.startsWith('color:') ? 'color' : 'initials'
  );
  const [selectedColor, setSelectedColor] = useState(
    currentAvatar?.startsWith('color:') ? (() => {
      const parts = currentAvatar.split(':');
      return parts.length > 1 ? parts[1] : 'bg-teal-500';
    })() : 'bg-teal-500'
  );
  const [previewImage, setPreviewImage] = useState(
    avatarType === 'image' ? currentAvatar : null
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();

  const userInitials = userName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setPreviewImage(imageUrl);
      setAvatarType('image');
      if (onAvatarChange) {
        onAvatarChange(imageUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleColorSelect = (colorClass) => {
    setSelectedColor(colorClass);
    setAvatarType('color');
    setPreviewImage(null);
    if (onAvatarChange) {
      onAvatarChange(`color:${colorClass}`);
    }
  };

  const handleInitialsSelect = () => {
    setAvatarType('initials');
    setPreviewImage(null);
    setSelectedColor('bg-teal-500');
    if (onAvatarChange) {
      onAvatarChange('');
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setAvatarType('initials');
    if (onAvatarChange) {
      onAvatarChange('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderAvatar = () => {
    if (avatarType === 'image' && previewImage) {
      return (
        <img 
          src={previewImage} 
          alt="Profile" 
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
      );
    } else if (avatarType === 'color') {
      return (
        <div className={`w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${selectedColor} text-white`}>
          <span className="text-3xl font-bold">{userInitials}</span>
        </div>
      );
    } else {
      return (
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gray-200 text-gray-600">
          <span className="text-3xl font-bold">{userInitials}</span>
        </div>
      );
    }
  };

  if (!isEditing) {
    return (
      <div className="flex flex-col items-center">
        {renderAvatar()}
        <p className="mt-2 text-sm text-gray-500">Profile Picture</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Avatar Display */}
      <div className="relative">
        {renderAvatar()}
        {avatarType === 'image' && (
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Avatar Type Selector */}
      <div className="flex space-x-4 bg-gray-50 rounded-lg p-2">
        <button
          onClick={handleInitialsSelect}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            avatarType === 'initials' 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Initials
        </button>
        <button
          onClick={() => setAvatarType('color')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            avatarType === 'color' 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Color
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            avatarType === 'image' 
              ? 'bg-white text-teal-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Image
        </button>
      </div>

      {/* Color Selection */}
      {avatarType === 'color' && (
        <div className="flex flex-col items-center space-y-3">
          <p className="text-sm font-medium text-gray-700">Choose a color:</p>
          <div className="grid grid-cols-4 gap-3">
            {AVATAR_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color.bg)}
                className={`w-12 h-12 rounded-full ${color.bg} border-4 transition-all duration-200 ${
                  selectedColor === color.bg 
                    ? 'border-gray-800 scale-110' 
                    : 'border-white hover:scale-105'
                }`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image Upload */}
      {avatarType === 'image' && (
        <div className="w-full max-w-md">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Click to upload
                </button>
                <p className="text-gray-500"> or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4 max-w-md">
        <h4 className="font-medium text-blue-800 mb-2">💡 Profile Picture Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use a high-quality, well-lit photo</li>
          <li>• Square images work best</li>
          <li>• Make sure your face is clearly visible</li>
          <li>• Choose colors that reflect your artistic style</li>
        </ul>
      </div>
    </div>
  );
}
