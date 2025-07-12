function ArtFormCard({ name, origin, photoUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 max-w-md hover:scale-105 transition-transform duration-300">
      {/* ✅ Grid of multiple images */}
      <div className="grid grid-cols-2 gap-2">
        {photoUrl.slice(0, 4).map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${name} ${index + 1}`}
            className="w-full h-32 object-cover rounded"
            referrerPolicy="no-referrer" // ✅ Helps with external image loading
          />
        ))}
      </div>

      {/* ✅ Art name and origin */}
      <h2 className="text-xl font-semibold mt-3 text-rose-700">{name}</h2>
      <p className="text-gray-500 text-sm italic">{origin}</p>
    </div>
  );
}

export default ArtFormCard;
