import React, { useEffect, useState } from "react";

const ParallaxSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden bg-black">
        {/* Background Image */}
        <img
          src="/assets/parallaximg.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Animated Text - Rises from 70% to 75% on page load, then starts floating */}
        <div
          className="absolute w-full text-center z-10 transition-all duration-[2s] ease-out"
          style={{
            bottom: isLoaded ? '72%' : '65%',
          }}
        >
          <h1 className={`text-white text-[6vw] ml-[5vw] md:text-[6vw] font-dm-serif-display font-bold hover:font-extrabold drop-shadow-[0_0_2px_#F6A100] transition-all duration-300 ease-in-out ${
              isLoaded ? 'animate-float' : ''
            }`}

            style={{
              opacity: isLoaded ? 1 : 0.6,
              animationDelay: '2s', // Start floating after rise animation completes
            }}
          >
            KALA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SANGAM
          </h1>
        </div>

        {/* Lotus Overlay - Top layer that initially hides part of the text */}
        <img
          src="/assets/lotus-hidden.png"
          alt="Lotus"
          className="absolute left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[1100px] z-20 pointer-events-none"
          style={{ bottom: '100px' }}
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

