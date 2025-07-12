// src/pages/IndiaMapPage.jsx
import IndiaMap from '../components/IndiaMap.jsx';

export default function IndiaMapPage({ onStateClick }) {
  return (
    <main className="min-h-screen px-6 py-10 bg-[#fffef2] text-center">
      <h2 className="text-4xl sm:text-5xl font-bold text-[#9b2226] mb-10 tracking-wide font-serif underline decoration-[#582f0e] decoration-4 underline-offset-8">
  Explore States
</h2>

      <div className="mt-10 flex items-center justify-center p-6">
        <IndiaMap onStateClick={onStateClick} />
      </div>
    </main>
  );
}
