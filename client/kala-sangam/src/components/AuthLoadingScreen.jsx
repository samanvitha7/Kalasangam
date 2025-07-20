import React from 'react';

const AuthLoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbebd8] to-[#f4d3a7] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          {/* Spinner */}
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#74404b] border-t-transparent"></div>
        </div>
        <h2 className="text-2xl font-bold text-[#74404b] mb-2">Loading...</h2>
        <p className="text-[#74404b] opacity-70">Checking authentication status</p>
      </div>
    </div>
  );
};

export default AuthLoadingScreen;
