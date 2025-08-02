import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BackgroundImageGrid = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define possible row spans to simulate variable height masonry
  const rowSpanOptions = [1, 2, 3]; // adjust to taste

  useEffect(() => {
    const fetchArtformImages = async () => {
      try {
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
        const response = await axios.get(`${API_URL}/api/artforms?limit=50`);
        
        let artforms = [];
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          artforms = response.data.data;
        } else if (Array.isArray(response.data)) {
          artforms = response.data;
        }

        const extractedImages = [];
        artforms.forEach((artform) => {
          if (artform.photoUrl && Array.isArray(artform.photoUrl)) {
            artform.photoUrl.forEach((url) => {
              if (url && url.trim()) {
                extractedImages.push({
                  url: url.trim(),
                  alt: `${artform.name || 'Traditional art'} from ${artform.origin || 'India'}`,
                  artformName: artform.name,
                  origin: artform.origin,
                  // assign a random row span for staggered effect
                  rowSpan: rowSpanOptions[Math.floor(Math.random() * rowSpanOptions.length)]
                });
              }
            });
          }
        });

        const shuffledImages = extractedImages
          .sort(() => Math.random() - 0.5)
          .slice(0, 40); // adjust count as needed

        setImages(shuffledImages);
      } catch (err) {
        console.error('Error fetching artform images:', err);
        setError(err.message);
        setImages([
          {
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
            alt: 'Traditional art',
            rowSpan: 2
          },
          {
            url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
            alt: 'Food art',
            rowSpan: 1
          },
          {
            url: 'https://images.unsplash.com/photo-1577308856961-8e0ec50d0c4b?w=300&h=500&fit=crop',
            alt: 'Traditional craft',
            rowSpan: 3
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtformImages();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-blush-peach/20 to-coral-pink/10">
        <div className="grid grid-cols-5 gap-6 p-8 h-full">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse"
              style={{ gridRowEnd: `span ${[1, 2, 3][i % 3]}` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="grid grid-cols-5 gap-6 p-8 h-full overflow-y-auto auto-rows-[160px]">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer`}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              gridRowEnd: `span ${image.rowSpan || 1}`
            }}
            aria-label={image.alt}
            title={`${image.artformName || 'Traditional Art'} - ${image.origin || 'India'}`}
          />
        ))}
      </div>

      {images.length === 0 && (
        <div className="w-full h-full bg-gradient-to-br from-blush-peach/30 to-coral-pink/20 flex items-center justify-center">
          <div className="text-center text-deep-teal/50">
            <div className="text-4xl mb-2">🎨</div>
            <p className="text-sm font-lora">Loading beautiful art...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundImageGrid;
