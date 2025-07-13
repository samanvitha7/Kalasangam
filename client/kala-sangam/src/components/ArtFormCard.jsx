function ArtFormCard({ name, origin, photoUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md hover:scale-105 transition-transform duration-300">
      <div className="grid grid-cols-2 gap-3">
        {photoUrl.slice(0, 4).map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${name} ${index + 1}`}
            className="w-full h-60 object-cover rounded-md"
          />
        ))}
      </div>
      <h2 className="text-2xl font-semibold mt-3 text-rose-700">{name}</h2>
      <p className="text-gray-500 text-base italic">{origin}</p>
    </div>
  );
}

export default ArtFormCard;
