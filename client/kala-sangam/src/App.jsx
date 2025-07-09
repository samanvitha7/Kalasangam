
import IndiaMap from "./components/IndiaMap.jsx";

function App() {
  const handleStateClick = (stateName) => {
    alert("You clicked: " + stateName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl font-bold">Interactive India Map</h1>
        <p className="text-sm">Click on a state to get started</p>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <IndiaMap onStateClick={handleStateClick} />
      </main>

      <footer className="bg-gray-800 text-white text-center py-3">
        <p className="text-sm">© 2025 Made by You • React + Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;

