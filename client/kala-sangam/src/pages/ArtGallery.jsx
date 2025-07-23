import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArtFormCard from "../components/ArtFormCard";

export default function ArtGallery() {
  const navigate = useNavigate();
  const [artforms, setArtforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const stateFromQuery = searchParams.get("state");
  const [selectedState, setSelectedState] = useState(stateFromQuery || "");
  const [zoomImg, setZoomImg] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize page with proper animations
  const [pageReady, setPageReady] = useState(false);
  
  useEffect(() => {
    // Ensure page is ready before showing animations
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stateFromURL = searchParams.get("state");
    if (stateFromURL) {
      setSelectedState(stateFromURL);
    }
  }, [searchParams]);

  // Fetch artforms data
  useEffect(() => {
    const fetchArtforms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/artforms");
        
        if (Array.isArray(response.data)) {
          setArtforms(response.data);
          console.log('Artforms loaded successfully:', response.data.length);
        } else {
          console.error("Expected array but got:", response.data);
          setError("Invalid data format received");
          setArtforms([]);
        }
      } catch (err) {
        console.error("Error fetching artforms:", err);
        setError("Failed to load art forms. Please try refreshing the page.");
        setArtforms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtforms();
  }, []);

  const filtered = selectedState
    ? artforms.filter((art) => art.origin === selectedState)
    : artforms;

  // Debug logging (only log important information)
  useEffect(() => {
    if (artforms.length > 0) {
      console.log(`Art Gallery: Loaded ${artforms.length} artforms, showing ${filtered.length} filtered results`);
    }
  }, [artforms, filtered]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setZoomImg(null);
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleImageClick = (imgSrc) => {
    setZoomImg(imgSrc);
    setIsFullscreen(false);
  };

  return (
    <div className="bg-warm-sand min-h-screen font-lora">
      {/* Full Bleed Divider */}
      <div className="w-full h-20 bg-gradient-to-r from-tealblue via-coral-red to-muted-fuchsia relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-tealblue/20 via-coral-red/20 to-muted-fuchsia/20"></div>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#134856" 
            opacity="0.8"
          />
          <path d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#E85A4F"
            opacity="0.9"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className={`mb-8 transition-all duration-1000 ${pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl font-bold text-center text-tealblue mb-8 font-lora">
            Explore Indian Art Forms
          </h1>
        </div>





      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tealblue mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 font-lora">Loading art forms...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center items-center py-16">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <p className="text-red-600 font-lora text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition font-lora"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content - Only show when not loading and no error */}
      {!loading && !error && (
        <>
          <div className={`mb-8 flex justify-center transition-all duration-1000 delay-300 ${pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <select
              className="border border-coral-red/50 rounded px-5 py-3 text-lg shadow-sm bg-mist-blush text-deep-charcoal font-lora"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={artforms.length === 0}
            >
              <option value="">All States</option>
              {[...new Set(artforms.map((art) => art.origin))].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Art Cards */}
          {filtered.length > 0 ? (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600 font-lora">
                  Showing {filtered.length} art form{filtered.length !== 1 ? 's' : ''}
                  {selectedState && ` from ${selectedState}`}
                </p>
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-auto transition-all duration-1000 delay-500 ${pageReady ? 'opacity-100' : 'opacity-0'}`}>
                {filtered.map((art, index) => (
                  <div 
                    key={art._id} 
                    className={`w-full transition-all duration-700 ${pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${Math.min(index * 100, 1000)}ms` }}
                  >
                    <ArtFormCard
                      {...art}
                      onImageClick={handleImageClick}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 font-lora text-lg">
                {selectedState ? `No art forms found for ${selectedState}` : 'No art forms available'}
              </p>
            </div>
          )}
        </>
      )}

      {/* Zoom Modal */}
      {zoomImg && (
        <div
          onClick={() => {
            setZoomImg(null);
            setIsFullscreen(false);
          }}
          className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-md flex flex-col items-center justify-center z-50 cursor-zoom-out p-4"
        >
          <img
            src={zoomImg}
            alt="Zoomed art"
            className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-zoom-in select-none ${
              isFullscreen ? "w-full h-full" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{ userSelect: "auto" }}
          />

          <button
            onClick={e => {
              e.stopPropagation();
              setIsFullscreen(f => !f);
            }}
            className="mt-6 px-6 py-2 bg-tealblue text-white rounded-full shadow-lg hover:bg-coral-red focus:outline-none focus:ring-4 focus:ring-golden-saffron transition font-lora font-bold"
          >
            {isFullscreen ? "Fit to Screen" : "Full Screen"}
          </button>
        </div>
      )}

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/map")}
          className="px-8 py-3 bg-tealblue text-white font-bold rounded-full shadow-md hover:bg-coral-red transition font-lora"
        >
          ← Back to India Map
        </button>
      </div>
      </div>
    </div>
  );
}

