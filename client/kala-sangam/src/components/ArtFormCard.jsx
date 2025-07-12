function ArtFormCard({ name, origin, photoUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 max-w-sm hover:scale-105 transition-transform duration-300">
      <img src={photoUrl} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-2 text-rose-700">{name}</h2>
      <p className="text-gray-500 text-sm italic">{origin}</p>
    </div>
  );
}

export default ArtFormCard;