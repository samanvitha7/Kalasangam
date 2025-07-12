import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import axios from "axios";
import ArtFormCard from "../components/ArtFormCard";

function ArtGallery() {
  const navigate = useNavigate();
  const [artforms, setArtforms] = useState([]);
  const [searchParams] = useSearchParams();
  const stateFromQuery = searchParams.get("state");
  const [selectedState, setSelectedState] = useState(stateFromQuery || "");
  
  useEffect(() => {
    const stateFromURL = searchParams.get("state");
    if (stateFromURL) {
      setSelectedState(stateFromURL);
    }
  }, [searchParams]);


  useEffect(() => {
  axios.get("/api/artforms")
    .then((res) => {
      if (Array.isArray(res.data)) {
        setArtforms(res.data);
      } else {
        console.error("Expected array but got:", res.data);
        setArtforms([]); // fallback to empty array
      }
    })
    .catch((err) => {
      console.error("Error fetching artforms:", err);
      setArtforms([]); // fallback on error
    });
  }, []);


  const filtered = selectedState
    ? artforms.filter((art) => art.origin=== selectedState)
    : artforms;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-rose-800">
        Explore Indian Art Forms
      </h1>



      <div className="mb-6 flex justify-center">
        <select
          className="border rounded px-4 py-2"
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

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filtered.map((art) => (
          <ArtFormCard key={art._id} {...art} />
        ))}
      </div>

      <button
        onClick={() => navigate('/map')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back to India Map
      </button>

    </div>
  );
}

export default ArtGallery;