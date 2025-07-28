import { useState } from 'react';
import { useSoundContext } from '../context/SoundContext.jsx';

export default function FloatingSoundToggle() {
  const { soundEnabled, isPlaying, volume, audioData, toggleSound, forceStopAllAudio, changeVolume } = useSoundContext();
  const [showControls, setShowControls] = useState(false);

  const handleDoubleClick = () => {
    console.log('Force stopping all audio');
    forceStopAllAudio();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    e.preventDefault();
    e.stopPropagation();
    changeVolume(newVolume);
  };

  // Audio visualization bars
  const AudioVisualizer = () => {
    const bars = audioData.slice(0, 32); // Use first 32 frequency bins
    return (
      <div className="flex items-end justify-center gap-1 h-12 w-32">
        {bars.map((value, index) => {
          const height = Math.max(2, (value / 255) * 48);
          return (
            <div
              key={index}
              className="bg-gradient-to-t from-deep-teal to-coral-red rounded-sm transition-all duration-100"
              style={{
                width: '2px',
                height: `${height}px`,
                opacity: isPlaying ? 1 : 0.3,
                transform: `scaleY(${isPlaying ? 1 : 0.3})`
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Controls Panel */}
      {showControls && (
        <div className="bg-mist-blush/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-coral-red/20 min-w-[200px]">
          {/* Audio Visualizer */}
          <div className="mb-4">
            <div className="text-xs font-medium text-deep-teal mb-2">Audio Visualizer</div>
            <div className="bg-warm-sand rounded-lg p-2">
              <AudioVisualizer />
            </div>
          </div>
          
          {/* Volume Control */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-deep-teal">Volume</label>
              <span className="text-xs text-deep-charcoal/70">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1E5E75 0%, #1E5E75 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={forceStopAllAudio}
              className="flex-1 px-3 py-2 bg-coral-red text-white text-xs rounded-md hover:bg-muted-fuchsia transition-colors"
            >
              Force Stop
            </button>
            <button
              onClick={() => changeVolume(0.5)}
              className="flex-1 px-3 py-2 bg-deep-teal text-white text-xs rounded-md hover:bg-indigo-purple transition-colors"
            >
              Reset Volume
            </button>
          </div>
        </div>
      )}
      
      {/* Main Toggle Button */}
      <button
        onClick={toggleSound}
        onDoubleClick={handleDoubleClick}
        className={`
          p-3 rounded-full shadow-lg transition-all duration-300
          ${soundEnabled 
            ? 'bg-deep-teal hover:bg-coral-red text-white' 
            : 'bg-deep-charcoal hover:bg-muted-fuchsia text-white'
          }
          hover:scale-105 active:scale-95
        `}
        title={soundEnabled ? 'Turn off sound (double-click to force stop)' : 'Turn on sound'}
      >
        <div className="relative w-6 h-6">
          {/* Sound Wave Animation */}
          {soundEnabled && isPlaying && (
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white/30 animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white/50 animate-ping" style={{animationDelay: '0.3s'}}></div>
            </div>
          )}
          
          {/* Speaker Icon */}
          <svg
            className="w-full h-full"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {soundEnabled ? (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            ) : (
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            )}
          </svg>
        </div>
      </button>
      
      {/* Controls Toggle */}
      <button
        onClick={() => setShowControls(!showControls)}
        className={`
          px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
          ${showControls 
            ? 'bg-deep-teal text-white' 
            : soundEnabled 
              ? 'bg-saffron-mist text-coral-red hover:bg-golden-saffron' 
              : 'bg-mist-blush text-deep-charcoal hover:bg-warm-sand'
          }
        `}
      >
        {showControls ? '🔽 Controls' : soundEnabled ? (isPlaying ? '🎵 Playing' : '⏸️ Ready') : '🔇 Off'}
      </button>
    </div>
  );
}
