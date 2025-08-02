// API Configuration Utility
// This helps you debug and understand which API endpoint is being used

export const getEnvironmentInfo = () => {
  const isProduction = import.meta.env.PROD;
  const apiUrl = import.meta.env.VITE_API_URL;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
  
  return {
    environment: isProduction ? 'production' : 'development',
    hostname,
    configuredApiUrl: apiUrl,
    isLocalhost: hostname === 'localhost' || hostname === '127.0.0.1',
    buildMode: import.meta.env.MODE
  };
};

export const logApiConfig = () => {
  const info = getEnvironmentInfo();
  
  console.group('🔧 API Configuration');
  console.log('📍 Environment:', info.environment);
  console.log('🌐 Hostname:', info.hostname);
  console.log('⚙️ Build Mode:', info.buildMode);
  console.log('🔗 Configured API URL:', info.configuredApiUrl);
  console.log('🏠 Is Localhost:', info.isLocalhost);
  console.groupEnd();
  
  return info;
};

// Force API URL (useful for debugging)
export const forceApiUrl = (url) => {
  console.warn(`🚨 Forcing API URL to: ${url}`);
  // You can use this in development to override the API URL
  // Just call: forceApiUrl('http://localhost:5050') in your component
  return url;
};

export default {
  getEnvironmentInfo,
  logApiConfig,
  forceApiUrl
};
