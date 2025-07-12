// pages/IndiaMapPage.jsx
import IndiaMap from "../components/IndiaMap";

export default function IndiaMapPage() {
  return (
    <div className="p-8 text-center bg-[#fffef2] min-h-screen">
      <h1 className="text-4xl font-bold text-[#9b2226] mb-8">
        Explore Indian States
      </h1>
      <IndiaMap />
    </div>
  );
}
