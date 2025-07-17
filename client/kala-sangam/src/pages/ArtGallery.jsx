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
    <div className="px-4 md:px-8 py-6 pt-24 max-w-screen-2xl mx-auto">

      <div data-aos="fade-up" className="mb-8">
        {/* Full-bleed border */}
        <div className="w-full h-[2px] bg-rose-600"></div>

        {/* Heading with padding top and bottom equal to border height */}
        <h1 className="text-4xl font-bold text-center text-rose-800 mt-8">
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
  );
}

