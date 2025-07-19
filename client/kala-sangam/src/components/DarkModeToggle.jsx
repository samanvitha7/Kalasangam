import { useState, useEffect } from 'react';

export default function DarkModeToggle({ scrolled }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    // Apply dark mode to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative overflow-hidden rounded-full p-2 transition-all duration-300 
        ${scrolled 
          ? 'bg-teal-blue/50 hover:bg-coral-red/50 border border-muted-fuchsia/30' 
          : 'bg-saffron-mist hover:bg-golden-saffron/30 border border-golden-saffron/50'
        }
        hover:scale-105 shadow-lg hover:shadow-xl
      `}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon (light mode) */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDarkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`}>
          <svg
            className={`w-full h-full ${
              scrolled ? 'text-golden-saffron' : 'text-coral-red'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        </div>
        
        {/* Moon Icon (dark mode) */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
        }`}>
          <svg
            className={`w-full h-full ${
              scrolled ? 'text-muted-fuchsia' : 'text-teal-blue'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
