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
      <section className="relative w-full h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/parallaximg.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            imageRendering: 'high-quality',
          }}
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <h1 className="text-[6vw] md:text-[4vw] font-lora font-bold tracking-wide drop-shadow-2xl">
              <span className="block text-golden-saffron">
                KALA
              </span>
              <span className="block mt-[-0.5vw] text-muted-fuchsia">
                SANGAM
              </span>
            </h1>
            <p className="text-lg md:text-xl mt-4 opacity-90 font-bold">
              Discover India's Rich Cultural Heritage
            </p>
          </div>
        </div>
      </section>

      {/* Artistic Divider */}
      <div className="relative w-full h-24 bg-gradient-to-b from-coral-red via-muted-fuchsia to-teal-blue overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#E85A4F" 
            opacity="0.9"
          />
          <path d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#DA639B"
          />
          <path d="M0,40L50,45C100,50,200,60,300,58C400,55,500,45,600,48C700,50,800,65,900,68C1000,70,1100,60,1150,55L1200,50L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#1E5E75"
          />
        </svg>
      </div>
    </>
  );
};

export default ParallaxSection;
