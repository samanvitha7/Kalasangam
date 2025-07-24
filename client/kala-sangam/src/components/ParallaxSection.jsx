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
         className="absolute inset-0 w-full h-full object-cover z-0 shadow-[inset_0_-80px_60px_-20px_rgba(0,0,0,0.5)]"

        />
      
       <div className="absolute bottom-0 w-full h-48 z-10 pointer-events-none bg-gradient-to-b from-transparent to-tealblue " />


        {/* Animated Text - Rises from 70% to 75% on page load, then starts floating */}
        <div
          className="absolute w-full text-center z-10 transition-all duration-[2s] ease-out"
          style={{
            bottom: isLoaded ? '70%' : '65%',
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
          className="absolute left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[1150px] z-20 pointer-events-none"
          style={{ bottom: '160px' }}
        />
       
      </section>


      {/* Decorative Divider (flipped) */}
      <div className="w-full h-24 bg-gradient-to-b from-tealblue via-rosered to-[#F8E6DA]" />


      
      

    </>
  );
};

export default ParallaxSection;

