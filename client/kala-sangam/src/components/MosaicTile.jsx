import { useState, useEffect } from "react";

const GRID_SIZE = 4; // 4x4 tiles

export default function MosaicTile({ src, title, artist, description }) {
  const [broken, setBroken] = useState(false);
  const [offsets, setOffsets] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // On broken toggle, generate offsets only once
  useEffect(() => {
    if (broken) {
      const newOffsets = Array(GRID_SIZE * GRID_SIZE)
        .fill(0)
        .map(() => ({
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          rot: (Math.random() - 0.5) * 25,
        }));
      setOffsets(newOffsets);
    } else {
      // Reset offsets to zero for assembled
      setOffsets(Array(GRID_SIZE * GRID_SIZE).fill({ x: 0, y: 0, rot: 0 }));
    }
  }, [broken]);

  // Cycle scatter and reform every 10 seconds (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setBroken(true);
      setTimeout(() => {
        setBroken(false);
      }, 4000);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const pieceSize = 100 / GRID_SIZE;

  // Click zoom toggle and show info
  const toggleZoom = () => {
    setZoomed(!zoomed);
    setShowInfo(!showInfo);
  };

  return (
    <div
      className={`relative cursor-pointer overflow-hidden transition-transform duration-500 ${
        zoomed ? "scale-[2] z-50 shadow-xl rounded-lg" : "scale-100 z-0"
      }`}
      style={{ width: zoomed ? "400px" : "200px", height: zoomed ? "400px" : "200px" }}
      onClick={toggleZoom}
      onMouseEnter={() => !zoomed && setBroken(true)}
      onMouseLeave={() => !zoomed && setBroken(false)}
    >
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          position: "relative",
          gap: "2px",
        }}
      >
        {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => {
          const row = Math.floor(i / GRID_SIZE);
          const col = i % GRID_SIZE;

          // Calculate background position so pieces fit perfectly when assembled
          const bgPosX = (-col * pieceSize).toFixed(2) + "%";
          const bgPosY = (-row * pieceSize).toFixed(2) + "%";

          const offset = offsets[i] || { x: 0, y: 0, rot: 0 };

          return (
            <div
              key={i}
              className="transition-transform duration-700 ease-in-out rounded-sm shadow-sm"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                backgroundPosition: `${bgPosX} ${bgPosY}`,
                width: "100%",
                height: "100%",
                transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rot}deg)`,
                willChange: "transform",
                boxShadow: zoomed
                  ? "0 0 30px rgba(124, 45, 18, 0.7)"
                  : "0 0 8px rgba(124, 45, 18, 0.15)",
              }}
            />
          );
        })}
      </div>

      {showInfo && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#7c2d12cc] text-white p-5 rounded-lg flex flex-col justify-center items-center text-center z-60">
          <h2 className="text-2xl font-bold mb-2 yatra-font">{title}</h2>
          <h3 className="text-xl mb-4 italic">{artist}</h3>
          <p>{description}</p>
          <button
            className="mt-4 px-5 py-2 rounded-full bg-white text-[#7c2d12] font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              setShowInfo(false);
              setZoomed(false);
              setBroken(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
