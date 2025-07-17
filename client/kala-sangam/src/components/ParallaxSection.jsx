import React, { useEffect, useState } from "react";

const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="relative w-full h-[200vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-[300%] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/44/ba/0b/44ba0b635f343fe590b7a27de1175fac.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'high-quality',
            transform: `translateY(${scrollY * -0.8}px)`,
          }}
        />

        {/* Text */}
        <div
          className="absolute left-1/2 text-white text-center z-10"
          style={{
            top: '10%',
            transform: `translate(-50%, -50%) translateY(${scrollY * 0.8}px)`,
          }}
        >
          <h1 className="text-[8vw] md:text-[6vw] font-serif font-bold tracking-wide">
            <span className="block">
              KALA
            </span>
            <span className="block mt-[-1vw]">
              SANGAM
            </span>
          </h1>
          <p className="text-lg md:text-xl mt-4 opacity-90">
            Discover India's Rich Cultural Heritage
          </p>
        </div>
      </section>

      {/* Blue Divider */}
      <div className="relative w-full h-24 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#3b82f6" 
            opacity="0.9"
          />
          <path d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#2563eb"
          />
          <path d="M0,40L50,45C100,50,200,60,300,58C400,55,500,45,600,48C700,50,800,65,900,68C1000,70,1100,60,1150,55L1200,50L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#1d4ed8"
          />
        </svg>
      </div>
    </>
  );
};

export default ParallaxSection;
