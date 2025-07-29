import { useEffect } from 'react';

const useHardReload = () => {
  useEffect(() => {
    // Check if this is the first visit to this page in this session
    const currentPath = window.location.pathname;
    const sessionKey = `hardReloaded_${currentPath.replace(/\//g, '_')}`;
    
    // If page hasn't been hard reloaded in this session, do it once
    if (!sessionStorage.getItem(sessionKey)) {
      // Mark this page as having been reloaded
      sessionStorage.setItem(sessionKey, 'true');
      
      // Small delay to ensure the session storage is set before reload
      setTimeout(() => {
        window.location.reload(true);
      }, 100);
    }
  }, []);
};

export default useHardReload;
