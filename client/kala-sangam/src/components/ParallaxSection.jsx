import React, { useEffect, useState, useRef } from "react";

const ParallaxSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const updateParallax = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Calculate scroll progress differently
        // Use actual scroll position relative to section
        const scrollProgress = Math.max(0, -sectionTop / windowHeight);
        
        setScrollY(scrollProgress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative w-screen h-screen overflow-hidden bg-black">
        {/* Background Image */}
        <img
          src="/assets/parallax.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0 shadow-[inset_0_-80px_60px_-20px_rgba(0,0,0,0.5)]"
        />
      
        <div 
          className="absolute bottom-0 w-full h-48 z-10 pointer-events-none bg-gradient-to-b from-transparent to-deep-teal" 
          style={{ transform: `translateY(${scrollY * 20}px)` }}
        />

        {/* Animated Text - Positioned much higher on screen with responsive positioning */}
        <div
          className="absolute w-full text-center z-10 transition-all duration-[2s] ease-out"
          style={{
            top: isLoaded ? '15vh' : '10vh',
            transform: `translateY(${scrollY * 50}px)`,
          }}
        >
          <h1 className="text-white text-[6vw] md:text-[5.5vw] lg:text-[5vw] xl:text-[4.5vw] 2xl:text-[4vw] 4xl:text-[3.5vw] 5xl:text-[3vw] ml-[2vw] font-dm-serif-display font-bold hover:font-extrabold drop-shadow-[0_0_2px_#F6A100] transition-all duration-300 ease-in-out"
            style={{
              opacity: isLoaded ? 1 : 0.6,
            }}
          >
            KALA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SANGAM
          </h1>
        </div>

        {/* Lotus Overlay - Top layer that initially hides part of the text */}
       {/* <img
          src="/assets/lotus-hidden.png"
          alt="Lotus"
          className="absolute left-1/2 transform -translate-x-1/2 w-[85vw] max-w-[1200px] xl:w-[80vw] 2xl:w-[75vw] z-20 pointer-events-none lotus-responsive"
        /> */}
       
      </section>

      {/* Decorative Divider (flipped) */}
      <div className="w-full h-24 bg-gradient-to-b from-deep-teal via-coral-red to-[#F8E6DA]" />
    </>
  );
};

export default ParallaxSection;

