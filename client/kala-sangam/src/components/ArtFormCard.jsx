function ArtFormCard({ name, origin, photoUrl = [], onImageClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 max-w-md 
      transition-transform duration-300 
      hover:scale-105 hover:-translate-y-1 
      border border-rose-200 hover:shadow-[0_0_15px_rgba(244,63,94,0.5)]"
    >
      <div className="grid grid-cols-2 gap-3">
        {photoUrl.slice(0, 4).map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${name} ${index + 1}`}
            className="w-full h-60 object-cover rounded-md cursor-zoom-in"
            onClick={() => onImageClick && onImageClick(url)}
          />
        ))}
      </div>
      <h2 className="text-2xl font-semibold mt-3 text-rose-700">{name}</h2>
      <p className="text-gray-500 text-base italic">{origin}</p>
    </div>
  );
}

export default ArtFormCard;
