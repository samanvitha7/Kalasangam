import React from 'react';

const FullBleedDivider = () => {
  return (
    <div
      className="w-full h-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #134856 0%, #E05264 40%, #fbd1c6 70%, #fce3d8 100%)",
      }}
    >
      {/* SVG Waves */}
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L0,120Z"
          fill="#fbd1c6"
          opacity="0.5"
        />
        <path
          d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L0,120Z"
          fill="#fce3d8"
          opacity="0"
        />
      </svg>

      {/* Filler div below wave to smooth transition */}
      <div className="absolute bottom-0 w-full h-4 bg-[#fce3d8] z-[-1]" />
    </div>
  );
};

export default FullBleedDivider;
