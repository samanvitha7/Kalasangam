import React, { useEffect, useState } from "react";

const ParallaxSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = Math.min(offsetY * 0.6, 200);
  const opacity = 1 - Math.min(offsetY / 400, 1);

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/waterfall.jpg"
          alt="Waterfall"
          className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
        />

        {/* Parallax Text */}
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 pointer-events-none"
          style={{
            transform: `translateY(${translateY}px)`,
            opacity,
            transition: "transform 0.1s ease-out, opacity 0.3s ease-out",
          }}
        >
          <h1 className="text-white text-[10vw] font-serif font-bold drop-shadow-[2px_2px_12px_rgba(0,0,0,0.6)] mix-blend-overlay tracking-wide">
            KALA SANGAM
          </h1>
        </div>
      </section>
      <section className="h-[200vh] bg-white flex items-center justify-center">
        <p className="text-3xl">Scroll down into Kala Sangam →</p>
      </section>


      
    </>
  );
};

export default ParallaxSection;
