import { useState } from "react";

function ArtFormCard({ name, origin, photoUrl = [], onImageClick }) {
  const [imageErrors, setImageErrors] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState({});

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }));
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
      <div className="grid grid-cols-2 gap-4 sm:gap-5 mb-6 place-items-center">
        {displayImages.map((url, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-md bg-gray-100 w-full aspect-square max-w-[250px]"
            aria-label={`Image ${index + 1} of ${name || "art form"}`}
          >
            {!imagesLoaded[index] && !imageErrors[index] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin" />
              </div>
            )}

            {imageErrors[index] ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Image not available
              </div>
            ) : (
              <img
                src={url}
                alt={`${name || "Art Form"} ${index + 1}`}
                className={`w-full h-full object-cover cursor-zoom-in transition-opacity duration-300 ${
                  imagesLoaded[index] ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => onImageClick && onImageClick(url)}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                loading="lazy"
              />
            )}
          </div>
        ))}

        {/* Empty slots for missing images */}
        {Array.from({ length: Math.max(0, 4 - displayImages.length) }, (_, index) => (
          <div
            key={`empty-${index}`}
            className="w-full aspect-square max-w-[250px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm"
            aria-label="Empty image slot"
          >
            No image
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <h2 className="text-2xl font-semibold font-lora text-[#134856] mb-3 line-clamp-2 leading-tight">
          {name || "Unknown Art Form"}
        </h2>
        <p className="text-[#E05264] text-lg font-semibold font-lora italic">
          {origin || "Unknown Origin"}
        </p>
      </div>
    </div>
  );
}

export default ArtFormCard;
