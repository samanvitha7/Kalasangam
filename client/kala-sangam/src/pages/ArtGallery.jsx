import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArtFormCard from "../components/ArtFormCard";
import AOS from 'aos';
import 'aos/dist/aos.css';




export default function ArtGallery() {
  useEffect(() => {
  AOS.init({
    duration: 1000, // adjust animation speed
    once: true,     // animation happens only once
  });
 }, []);
  const navigate = useNavigate();
  const [artforms, setArtforms] = useState([]);
  const [searchParams] = useSearchParams();
  const stateFromQuery = searchParams.get("state");
  const [selectedState, setSelectedState] = useState(stateFromQuery || "");
  const [zoomImg, setZoomImg] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const stateFromURL = searchParams.get("state");
    if (stateFromURL) {
      setSelectedState(stateFromURL);
    }
  }, [searchParams]);

  useEffect(() => {
    axios
      .get("/api/artforms")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setArtforms(res.data);
        } else {
          console.error("Expected array but got:", res.data);
          setArtforms([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching artforms:", err);
        setArtforms([]);
      });
  }, []);

  const filtered = selectedState
    ? artforms.filter((art) => art.origin === selectedState)
    : artforms;

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
    <div className="">
      {/* Full Bleed Divider */}
      <div className="w-full h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 via-purple-700/20 to-pink-700/20"></div>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#2563eb" 
            opacity="0.8"
          />
          <path d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#7c3aed"
            opacity="0.9"
          />
        </svg>
      </div>
      
      <div className="px-4 md:px-8 py-6 pt-12 max-w-screen-2xl mx-auto">
        <div data-aos="fade-up" className="mb-8">
          <h1 className="text-4xl font-bold text-center text-rose-800 mb-8">
            Explore Indian Art Forms
          </h1>
        </div>





      <div className="mb-8 flex justify-center">
        <select
          className="border border-rose-400 rounded px-5 py-3 text-lg shadow-sm"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">All States</option>
          {[...new Set(artforms.map((art) => art.origin))].map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15">

        {filtered.map((art) => (
          <ArtFormCard
            key={art._id}
            {...art}
            onImageClick={handleImageClick}
          />
        ))}
      </div>

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
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen((f) => !f);
            }}
            className="mt-6 px-6 py-2 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-400 transition"
          >
            {isFullscreen ? "Fit to Screen" : "Full Screen"}
          </button>
        </div>
      )}

      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/map")}
          className="px-8 py-3 bg-rose-600 text-white font-semibold rounded-full shadow-md hover:bg-rose-700 transition"
        >
          ← Back to India Map
        </button>
      </div>
      </div>
    </div>
  );
}

