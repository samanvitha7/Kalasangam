import React from 'react';

const SignupOverlayText = () => {
  return (
    <div className="text-left pointer-events-none max-w-lg">
      <div className="bg-white/100 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full border-2 border-white/50 ring-2 ring-deep-teal/10 drop-shadow-2xl">
        <h1 className="text-3xl xl:text-4xl font-semibold text-deep-teal mb-4 font-dm-serif leading-tight">
          Join our creative community
        </h1>
        <p className="text-base text-gray-600 font-medium leading-relaxed">
          Showcase your traditional art, connect with fellow artists, and preserve India's rich cultural heritage
        </p>
      </div>
    </div>
  );
};

export default SignupOverlayText;
