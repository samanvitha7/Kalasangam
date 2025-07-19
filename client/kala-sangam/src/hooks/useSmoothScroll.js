import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Performance optimizations
    const optimizeScrolling = () => {
      // Reduce motion for users who prefer reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'auto';
        return;
      }

      // Throttle scroll events for better performance
      let ticking = false;
      
      const updateScrollPosition = () => {
        ticking = false;
        // Update any scroll-based animations here if needed
      };

      const requestScrollUpdate = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestScrollUpdate, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', requestScrollUpdate);
      };
    };

    const cleanup = optimizeScrolling();

    // CSS optimizations for smoother scrolling
    const style = document.createElement('style');
    style.textContent = `
      * {
        /* Enable hardware acceleration for transforms */
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-perspective: 1000;
        perspective: 1000;
      }
      
      /* Optimize scroll performance */
      .scroll-smooth {
        scroll-behavior: smooth;
      }
      
      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
      
      /* Optimize rendering layers */
      .will-change-transform {
        will-change: transform;
      }
      
      .will-change-scroll {
        will-change: scroll-position;
      }
      
      /* Smooth momentum scrolling on iOS */
      .scroll-area {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      if (cleanup) cleanup();
      document.head.removeChild(style);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
};

export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    behavior
  });
};

export const scrollToElement = (elementId, offset = 0, behavior = 'smooth') => {
  const element = document.getElementById(elementId);
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior
    });
  }
};

export default useSmoothScroll;
