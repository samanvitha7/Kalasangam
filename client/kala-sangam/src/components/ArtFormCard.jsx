import { useState } from 'react';

function ArtFormCard({ name, origin, photoUrl = [], onImageClick }) {
  const [imageErrors, setImageErrors] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState({});

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  const displayImages = photoUrl.slice(0, 4);

  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 w-full
      transition-all duration-300 ease-out
      hover:scale-105 hover:-translate-y-2 hover:shadow-xl
      border border-[#E05264] shadow-[0_0_15px_rgba(224,82,100,0.2)]
      hover:shadow-[0_0_25px_rgba(224,82,100,0.4)]
      transform-gpu will-change-transform"
    >
      <div className="grid grid-cols-2 gap-3 mb-4">
        {displayImages.map((url, index) => (
          <div key={index} className="relative overflow-hidden rounded-md bg-gray-100">
            {/* Loading placeholder */}
            {!imagesLoaded[index] && !imageErrors[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Error state */}
            {imageErrors[index] ? (
              <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-2xl mb-2">🖼️</div>
                  <div className="text-sm">Image not available</div>
                </div>
              </div>
            ) : (
              <img
                src={url}
                alt={`${name} ${index + 1}`}
                className={`w-full h-60 object-cover cursor-zoom-in transition-opacity duration-300 ${
                  imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={() => onImageClick && onImageClick(url)}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                loading="lazy"
              />
            )}
          </div>
        ))}
        
        {/* Fill empty slots if less than 4 images */}
        {Array.from({ length: Math.max(0, 4 - displayImages.length) }, (_, index) => (
          <div key={`empty-${index}`} className="w-full h-60 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-sm">No image</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold font-lora text-[#134856] mb-2 line-clamp-2 leading-tight">{name || 'Unknown Art Form'}</h2>
        <p className="text-[#E05264] text-lg font-semibold font-lora italic">{origin || 'Unknown Origin'}</p>
      </div>
    </div>
  );
}

export default ArtFormCard;
