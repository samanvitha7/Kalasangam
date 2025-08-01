import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  text = '', 
  fullScreen = false
}) => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
  const textClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${
      fullScreen ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : ''
    }`}>
      <div className={`${sizeClass} border-2 border-deep-teal/30 border-t-deep-teal rounded-full animate-spin`}></div>
      {text && (
        <p className={`${textClass} font-medium text-gray-600 animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Specialized loading components for common use cases
export const PageLoader = ({ text = "Loading..." }) => (
  <LoadingSpinner 
    size="lg" 
    color="primary" 
    text={text} 
    fullScreen={true}
    variant="spin"
  />
);

export const ButtonLoader = ({ text = "" }) => (
  <LoadingSpinner 
    size="sm" 
    color="white" 
    text={text}
    variant="spin"
  />
);

export const CardLoader = ({ text = "Loading content..." }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
    <LoadingSpinner 
      size="md" 
      color="primary" 
      text={text}
      variant="dots"
    />
  </div>
);

export const InlineLoader = ({ text = "Loading..." }) => (
  <div className="flex items-center space-x-2">
    <LoadingSpinner 
      size="sm" 
      color="primary" 
      variant="spin"
    />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

export default LoadingSpinner;
