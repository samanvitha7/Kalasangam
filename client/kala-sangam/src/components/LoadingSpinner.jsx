import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary', 
  text = '', 
  fullScreen = false,
  variant = 'spin'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-deep-teal',
    secondary: 'border-coral-red',
    accent: 'border-saffronglow',
    white: 'border-white'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const SpinnerVariants = {
    spin: ({ size, color }) => (
      <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]}/30 border-t-${colorClasses[color].split('-')[1]}-${colorClasses[color].split('-')[2]} rounded-full animate-spin`}></div>
    ),
    
    dots: ({ size, color }) => (
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    ),

    pulse: ({ size, color }) => (
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}></div>
    ),

    wave: ({ size, color }) => (
      <div className="flex items-end space-x-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-1 ${sizeClasses[size].split(' ')[1]} ${colorClasses[color]} animate-bounce`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.8s'
            }}
          ></div>
        ))}
      </div>
    )
  };

  const LoaderComponent = () => (
    <div className={`flex flex-col items-center justify-center space-y-3 ${
      fullScreen ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : ''
    }`}>
      {SpinnerVariants[variant]({ size, color })}
      {text && (
        <p className={`${textSizeClasses[size]} font-medium text-gray-600 animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );

  return <LoaderComponent />;
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
