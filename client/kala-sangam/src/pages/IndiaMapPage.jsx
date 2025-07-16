import IndiaMap      from "../components/IndiaMap";
import Lottie        from "lottie-react";
import oceanAnim     from "../assets/ocean.json";


export default function IndiaMapPage({ onStateClick }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-center">
       <video
          className="absolute w-full h-auto object-cover -z-10
             translate-x-[0%] translate-y-[-10%]"
          autoPlay
          muted
          loop
          playsInline
        >
        <source
          src="https://v1.pinimg.com/videos/mc/720p/2a/a7/8e/2aa78e42bfd6799f05bb4e92f0944319.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* ───────────────── BACKGROUND LAYERS (still 100 % width) ───────────────── */}
      {/* 🌊 Ocean Lottie OVER video */}
<div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
      <div
        className="w-full h-full origin-center"
        style={{ transform: "translateY(150px)" }}
      >
        <Lottie
          animationData={oceanAnim}
          loop
          autoplay
          className="w-full h-300px object-cover"
        />
      </div>
    </div>

    {/* 🔳 Optional translucent overlay */}
    <div className="absolute inset-0 z-15 bg-black/10 pointer-events-none" />


      {/* ───────────────── CONTENT WRAPPER (max‑width) ───────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-screen-lg px-4">
        {/* 🌟 Heading */}
        <h2 className="mb-10 text-4xl sm:text-5xl font-serif font-bold tracking-wide text-[#9b2226]">
          Explore States
        </h2>

        {/* 🗺️ India Map */}
        <div className="flex items-center justify-center p-6 scale-110 sm:scale-125">
          <IndiaMap onStateClick={onStateClick} />
        </div>
      </div>
    </main>
  );
}
