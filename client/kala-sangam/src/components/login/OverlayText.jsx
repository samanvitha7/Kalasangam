import React from 'react';

const OverlayText = () => {
  return (
    <div className="text-left pointer-events-none max-w-lg">
      <div className="bg-blush-peach/100 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full border-2 border-white/50 ring-2 ring-deep-teal/10 drop-shadow-2xl">
        <h1 className="text-3xl xl:text-4xl font-bold text-deep-teal mb-4 font-lora leading-tight">
          Log in to get your ideas
        </h1>
        <p className="text-base text-gray-600 font-medium leading-relaxed">
          Discover traditional arts across India
        </p>
      </div>
    </div>
  );
};

export default OverlayText;
