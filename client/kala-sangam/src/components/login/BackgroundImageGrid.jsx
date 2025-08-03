import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Optimized Image Component
const OptimizedImage = ({ src, alt, className, style, title, onLoad, onError }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setImageError(true);
    if (onError) onError();
  };

  return (
    <div className={`${className} image-item`} style={style} title={title}>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-xl" />
      )}
      {imageError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center rounded-xl">
          <div className="text-gray-500 text-2xl">🎨</div>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
            loading="lazy"
            decoding="async"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-xl" />
          )}
        </>
      )}
    </div>
  );
};

const BackgroundImageGrid = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.4);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Define possible row spans to simulate variable height masonry
  const rowSpanOptions = [1, 2, 3]; // adjust to taste

  // Preload images for better performance
  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setPreloadedImages(prev => new Set([...prev, url]));
        resolve(url);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

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
        
        // Preload first 20 images for better performance
        const imagesToPreload = shuffledImages.slice(0, 20);
        Promise.allSettled(
          imagesToPreload.map(img => preloadImage(img.url))
        ).then(() => {
          console.log('First batch of images preloaded');
        });
        
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
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <style>
          {`
            @keyframes moveUp {
              0% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0); }
            }
            
            @keyframes moveDown {
              0% { transform: translateY(0); }
              50% { transform: translateY(20px); }
              100% { transform: translateY(0); }
            }
            
            .animate-move-up {
              animation: moveUp 8s ease-in-out infinite;
            }
            
            .animate-move-down {
              animation: moveDown 8s ease-in-out infinite;
            }
            
            .animate-move-up-delayed {
              animation: moveUp 8s ease-in-out infinite;
              animation-delay: 2s;
            }
            
            .animate-move-down-delayed {
              animation: moveDown 8s ease-in-out infinite;
              animation-delay: 2s;
            }
            
            .animate-move-up-delayed-2 {
              animation: moveUp 8s ease-in-out infinite;
              animation-delay: 4s;
            }
          `}
        </style>
        <div className="relative h-full">
          <div className="grid grid-cols-5 gap-6 p-8 pt-20 h-full">
            {Array.from({ length: 30 }, (_, i) => {
              const columnIndex = i % 5;
              let animationClass = '';
              
              // Alternate animation for each column
              switch (columnIndex) {
                case 0:
                  animationClass = 'animate-move-up';
                  break;
                case 1:
                  animationClass = 'animate-move-down';
                  break;
                case 2:
                  animationClass = 'animate-move-up-delayed';
                  break;
                case 3:
                  animationClass = 'animate-move-down-delayed';
                  break;
                case 4:
                  animationClass = 'animate-move-up-delayed-2';
                  break;
                default:
                  animationClass = '';
              }
              
              return (
                <div
                  key={i}
                  className={`bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse ${animationClass}`}
                  style={{ gridRowEnd: `span ${[1, 2, 3][i % 3]}` }}
                />
              );
            })}
          </div>
          {/* dark overlay over the placeholder grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
          />
        </div>
      </div>
    );
  }

  // Group images by columns with better distribution
  const groupImagesByColumns = () => {
    const columns = [[], [], [], [], []];
    const minImagesPerColumn = 12; // Ensure each column has at least 12 images
    
    // First, distribute images evenly
    images.forEach((image, index) => {
      columns[index % 5].push(image);
    });
    
    // Fill shorter columns by repeating images to ensure seamless loop
    columns.forEach((column, columnIndex) => {
      while (column.length < minImagesPerColumn) {
        // Add more images by cycling through available ones
        const sourceImages = images.length > 0 ? images : [
          {
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
            alt: 'Traditional art',
            rowSpan: 2
          }
        ];
        const randomImage = sourceImages[Math.floor(Math.random() * sourceImages.length)];
        column.push({
          ...randomImage,
          rowSpan: [1, 2, 3][Math.floor(Math.random() * 3)] // Randomize row spans
        });
      }
    });
    
    return columns;
  };

  const columnImages = groupImagesByColumns();

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <style>
        {`
          @keyframes scrollUpColumn {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          .column-container {
            overflow: hidden;
            position: relative;
            height: 100vh;
          }

          .column-scroll {
            animation: scrollUpColumn 60s linear infinite;
          }

          .column-scroll-delay-1 {
            animation: scrollUpColumn 65s linear infinite;
            animation-delay: -13s;
          }

          .column-scroll-delay-2 {
            animation: scrollUpColumn 70s linear infinite;
            animation-delay: -26s;
          }

          .column-scroll-delay-3 {
            animation: scrollUpColumn 58s linear infinite;
            animation-delay: -39s;
          }

          .column-scroll-delay-4 {
            animation: scrollUpColumn 63s linear infinite;
            animation-delay: -52s;
          }

          .image-item {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transition: all 0.3s ease;
          }

          .image-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%);
            pointer-events: none;
            z-index: 1;
          }

          .image-item:hover::before {
            background: linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.2) 100%);
          }
        `}
      </style>
      <div className="relative h-full">
        <div className="flex gap-6 p-8 pt-20 h-full">
        {columnImages.map((columnImgs, columnIndex) => {
            const animationClass = [
              'column-scroll',
              'column-scroll-delay-1', 
              'column-scroll-delay-2',
              'column-scroll-delay-3',
              'column-scroll-delay-4'
            ][columnIndex];
            
            // Create seamless loop with enough images to cover the full animation cycle
            const loopedImages = [
              ...columnImgs, 
              ...columnImgs, 
              ...columnImgs, 
              ...columnImgs.slice(0, Math.ceil(columnImgs.length / 2))
            ];
            
            return (
              <div key={columnIndex} className="flex-1 column-container">
                <div className={`flex flex-col ${animationClass}`}>
                  {loopedImages.map((image, imageIndex) => (
                    <OptimizedImage
                      key={`${columnIndex}-${imageIndex}`}
                      src={image.url}
                      alt={image.alt}
                      title={`${image.artformName || 'Traditional Art'} - ${image.origin || 'India'}`}
                      className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer flex-shrink-0 mb-6"
                      style={{
                        height: `${(image.rowSpan || 1) * 160 + (image.rowSpan - 1) * 24}px`
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
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
