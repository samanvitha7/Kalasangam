import React from 'react';

const OverlayText = () => {
  return (
    <div className="text-left pointer-events-none max-w-lg">
      <div className="bg-white/100 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full border-2 border-white/50 ring-2 ring-deep-teal/10 drop-shadow-2xl">
        <h1 className="text-4xl xl:text-5xl font-bold text-deep-teal mb-4 font-lora leading-tight">
          Log in to get your ideas
        </h1>
        <p className="text-lg text-gray-600 font-medium leading-relaxed">
          Discover traditional arts and culinary inspirations from across India
        </p>
      </div>
    </div>
  );
};

export default OverlayText;
