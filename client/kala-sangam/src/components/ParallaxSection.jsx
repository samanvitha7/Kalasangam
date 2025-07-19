import React, { useEffect, useState } from "react";

const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden bg-black">
        {/* Background Image */}
        <img
          src="/assets/parallaximg.png"
          alt="Hero Background"
className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            transform: `scale(${1 + scrollY * 0.0003})`,
            transition: "transform 0.1s ease-out",
          }}
        />

        {/* Animated Text */}
<div
          className={`absolute w-full text-center transition-transform duration-[2000ms] ease-out ${
            scrollY > 300 ? "opacity-100" : "opacity-0"
          } z-20`}
          style={{
            transform: `translateY(${-100 + Math.min(scrollY * 0.15, 80)}px)`,
          }}
        >
          <h1 className="text-white text-[6vw] md:text-[4vw] font-lora font-bold drop-shadow-[0_0_2px_#F6A100]">
            Kala Sangam
          </h1>

        </div>

        {/* Lotus Overlay - Now in front and much larger */}
        <img
          src="/assets/lotus-hidden.png"
          alt="Lotus"
          className="absolute left-1/2 transform -translate-x-1/2 w-[130vw] max-w-[1260px] z-30 pointer-events-none"
          style={{ bottom: '-100px' }}
        />
      </section>


      {/* Decorative Divider (flipped) */}
      <div className="relative w-full h-24 bg-gradient-to-t from-coral-red via-muted-fuchsia to-teal-blue overflow-hidden">
        <svg className="absolute top-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40L50,45C100,50,200,60,300,58C400,55,500,45,600,48C700,50,800,65,900,68C1000,70,1100,60,1150,55L1200,50L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" fill="#1E5E75" />
          <path d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" fill="#DA639B" />
          <path d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" fill="#E85A4F" opacity="0.9" />
        </svg>
      </div>
    </>
  );
};

export default ParallaxSection;

