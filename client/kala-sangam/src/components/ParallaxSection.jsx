import React, { useEffect, useState } from "react";

const ParallaxSection = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Set up the scroll listener
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax translateY effect for the background image
  const translateY = offsetY * 0.5; // Adjust the factor for stronger/weaker parallax
  const opacity = 1 - Math.min(offsetY / 400, 1); // Fade out text as you scroll down

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Image with Parallax effect */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/f6/a4/88/f6a4884e06dee87423a5b3da2ed20c4c.jpg')", // Replace with your desired image URL
            transform: `translateY(${translateY}px)`, // Parallax effect
            transition: "transform 0.1s ease-out", // Smooth parallax transition
          }}
        />

        {/* Parallax Text */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center"
          style={{
            opacity,
            transition: "opacity 0.3s ease-out", // Smooth opacity transition
          }}
        >
          <h1 className="text-white text-[10vw] font-serif font-bold drop-shadow-[2px_2px_12px_rgba(0,0,0,0.6)] mix-blend-overlay tracking-wide">
            KALA SANGAM
          </h1>
        </div>
      </section>

      {/* Content section */}
      <section className="h-[200vh] bg-white flex items-center justify-center">
        <p className="text-3xl">Scroll down into Kala Sangam →</p>
      </section>
    </>
  );
};

export default ParallaxSection;
