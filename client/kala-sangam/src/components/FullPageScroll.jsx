import React, { useEffect, useRef, useState } from 'react';

const FullPageScroll = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const sectionsRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const sections = React.Children.toArray(children);
  const totalSections = sections.length;

  const scrollToSection = (sectionIndex) => {
    if (sectionIndex < 0 || sectionIndex >= totalSections || isScrolling) return;
    
    setIsScrolling(true);
    setCurrentSection(sectionIndex);
    
    const targetY = -sectionIndex * 100;
    if (sectionsRef.current) {
      sectionsRef.current.style.transform = `translateY(${targetY}vh)`;
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Check if the target element is within a scrollable area
      const target = e.target;
      const scrollableElement = target.closest('.overflow-y-auto, .overflow-auto');
      
      // If we're in a scrollable area, allow normal scrolling
      if (scrollableElement) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
        const isAtTop = scrollTop === 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        
        // Only prevent default and handle full-page scroll if we're at the boundaries
        if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
          return; // Allow normal scrolling within the element
        }
      }
      
      e.preventDefault();
      
      if (isScrolling) return;
      
      if (e.deltaY > 30 && currentSection < totalSections - 1) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < -30 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, isScrolling, totalSections, scrollToSection]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={{ height: '100vh', width: '100vw' }}
    >
      <div
        ref={sectionsRef}
        className="relative w-full transition-transform duration-700 ease-out"
        style={{ 
          height: `${totalSections * 100}vh`,
          transform: `translateY(${-currentSection * 100}vh)`
        }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className="relative w-full flex items-center justify-center"
            style={{ height: '100vh' }}
          >
            <div className="w-full h-full">
              {section}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullPageScroll;
