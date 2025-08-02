import { useEffect, useRef } from 'react';

const useHardReload = () => {
  const hasReloaded = useRef(false);
  
  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (hasReloaded.current) return;
    
    const currentPath = window.location.pathname;
    const sessionKey = `hardReloaded_${currentPath.replace(/\//g, '_')}`;
    
    // Check if already reloaded for this path
    if (!sessionStorage.getItem(sessionKey)) {
      hasReloaded.current = true;
      
      // Set the flag SYNCHRONOUSLY before reload
      try {
        sessionStorage.setItem(sessionKey, 'true');
        // Force immediate write to storage
        sessionStorage.getItem(sessionKey);
        
        // Use a longer timeout to ensure sessionStorage is written
        setTimeout(() => {
          window.location.reload(true);
        }, 200);
      } catch (error) {
        console.warn('Failed to set sessionStorage for hard reload:', error);
      }
    }
  }, []);
};

export default useHardReload;
