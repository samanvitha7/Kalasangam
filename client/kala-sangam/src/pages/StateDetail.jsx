import { useParams } from "react-router-dom";
import stateArtData from "../data/stateArtData.json"; // auto-parsed as JS object

const StateDetail = () => {
  const { stateName } = useParams();
  const stateData = stateArtData[stateName];

  if (!stateData) {
    return <div className="p-6">No data found for {stateName}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-red-800 mb-4">{stateName}</h1>
      <img src={stateData.collage} alt={`${stateName} collage`} className="w-full h-64 object-cover rounded mb-4" />
      <p className="text-lg text-gray-700 mb-6">{stateData.intro}</p>

      <h2 className="text-2xl font-semibold text-red-700 mb-3">Art Forms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {stateData.artForms.map((art, idx) => (
          <div key={idx} className="bg-white shadow p-4 rounded">
            <img src={art.image} alt={art.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-xl font-bold">{art.name}</h3>
            <p className="text-sm text-gray-600">{art.description}</p>
            {art.artists && (
              <p className="text-xs text-gray-500 mt-1">
                <strong>Artists:</strong> {art.artists.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>

      {stateData.facts?.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-red-700 mb-2">Fun Facts</h2>
          <ul className="list-disc list-inside text-gray-700">
            {stateData.facts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default StateDetail;
