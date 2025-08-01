import { createContext, useContext, useState, useEffect } from 'react';

const AppReadyContext = createContext({
  isAppReady: false,
  loadingStage: 'initializing'
});

export function AppReadyProvider({ children }) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [loadingStage, setLoadingStage] = useState('initializing');

  useEffect(() => {
    let timeoutId;
    
    const initializeApp = async () => {
      try {
        setLoadingStage('checking-dom');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
          await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
          });
        }

        setLoadingStage('checking-styles');
        
        // Check if CSS is loaded and applied
        const checkStyles = () => {
          const testElement = document.createElement('div');
          testElement.className = 'hidden opacity-0 transition-opacity duration-300 bg-warm-sand text-deep-teal font-lora';
          testElement.style.position = 'absolute';
          testElement.style.left = '-9999px';
          document.body.appendChild(testElement);
          
          const styles = window.getComputedStyle(testElement);
          const hasHidden = styles.display === 'none';
          const hasOpacity = styles.opacity === '0';
          const hasTransition = styles.transitionProperty.includes('opacity');
          const hasCustomBg = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent';
          const hasCustomColor = styles.color !== 'rgba(0, 0, 0, 0)' && styles.color !== 'rgb(0, 0, 0)';
          
          document.body.removeChild(testElement);
          
          return hasHidden && hasOpacity && hasTransition && hasCustomBg && hasCustomColor;
        };

        // Wait for styles to be loaded
        let stylesReady = false;
        let attempts = 0;
        const maxAttempts = 20;
        
        while (!stylesReady && attempts < maxAttempts) {
          stylesReady = checkStyles();
          if (!stylesReady) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
          }
        }

        setLoadingStage('checking-fonts');
        
        // Check fonts
        if (document.fonts) {
          await document.fonts.ready;
        }

        setLoadingStage('finalizing');
        
        // Final delay to ensure everything is rendered
        await new Promise(resolve => setTimeout(resolve, 200));
        
        setLoadingStage('ready');
        setIsAppReady(true);
        
      } catch (error) {
        console.warn('App initialization error:', error);
        // Fallback - proceed anyway
        setLoadingStage('ready');
        setIsAppReady(true);
      }
    };

    // Start initialization
    initializeApp();

    // Fallback timeout
    timeoutId = setTimeout(() => {
      console.warn('App initialization timed out, proceeding anyway');
      setLoadingStage('ready');
      setIsAppReady(true);
    }, 5000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AppReadyContext.Provider value={{ isAppReady, loadingStage }}>
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  const context = useContext(AppReadyContext);
  if (!context) {
    console.warn('useAppReady called outside of AppReadyProvider, using defaults');
    return { isAppReady: true, loadingStage: 'ready' };
  }
  return context;
}

// Higher-order component to wrap components that need to wait for app readiness
export function withAppReady(Component) {
  return function WrappedComponent(props) {
    const { isAppReady } = useAppReady();
    
    if (!isAppReady) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-warm-sand">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-teal mx-auto mb-4"></div>
            <div className="text-deep-charcoal font-lora">Loading...</div>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}
