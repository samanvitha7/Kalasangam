import { useEffect } from 'react';

const useHardReload = () => {
  useEffect(() => {
    const currentPath = window.location.pathname;
    const sessionKey = `hardReloaded_${currentPath.replace(/\//g, '_')}`;
    
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, 'true');
      
    
      setTimeout(() => {
        window.location.reload(true);
      }, 100);
    }
  }, []);
};

export default useHardReload;
