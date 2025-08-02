import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const SoundContext = createContext({
  soundEnabled: false,
  isPlaying: false,
  volume: 0.3,
  audioData: new Array(128).fill(0),
  toggleSound: () => {},
  enableSound: () => {},
  disableSound: () => {},
  forceStopAllAudio: () => {},
  changeVolume: () => {}
});

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    console.warn('useSoundContext called outside of SoundProvider, using defaults');
    return {
      soundEnabled: false,
      isPlaying: false,
      volume: 0.3,
      audioData: new Array(128).fill(0),
      toggleSound: () => {},
      enableSound: () => {},
      disableSound: () => {},
      forceStopAllAudio: () => {},
      changeVolume: () => {}
    };
  }
  return context;
};

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [audioData, setAudioData] = useState(new Array(128).fill(40)); // Start with better baseline data
  const audioRef = useRef(null);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);
  const sourceRef = useRef(null);
  const [audioError, setAudioError] = useState(null);
  const fallbackIntervalRef = useRef(null);

  // Start fallback animation immediately
  useEffect(() => {
    const startFallbackAnimation = () => {
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
      }
      
      fallbackIntervalRef.current = setInterval(() => {
        if (isPlaying) {
          const fakeData = new Array(128).fill(0).map((_, index) => {
            // Create smoother, less flickering bars
            const time = Date.now() * 0.002; // Slower time progression
            const bass = Math.sin(time + index * 0.1) * 40 + 80;
            const mid = Math.sin(time * 0.8 + index * 0.15) * 30 + 70;
            const high = Math.sin(time * 1.2 + index * 0.2) * 20 + 60;
            const smoothRandom = Math.sin(time * 0.5 + index) * 25; // Smooth "random" component
            
            // Combine frequencies for smoother animation
            const combined = (bass + mid + high + smoothRandom) / 4 + 60;
            return Math.max(40, Math.min(200, combined));
          });
          setAudioData(fakeData);
        } else {
          // Even when not playing, show some baseline activity
          const baselineData = new Array(128).fill(0).map((_, index) => {
            return Math.max(20, 35 + Math.sin(Date.now() * 0.001 + index * 0.3) * 12);
          });
          setAudioData(baselineData);
        }
      }, 120);
    };

    startFallbackAnimation();

    return () => {
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
      }
    };
  }, [isPlaying]);

  const setupAudioAnalyzer = useCallback(() => {
    try {
      // Check if Web Audio API is supported
      if (!window.AudioContext && !window.webkitAudioContext) {
        console.warn('Web Audio API not supported');
        return;
      }
      
      if (!audioContextRef.current && audioRef.current && !sourceRef.current) {
        // Create AudioContext safely
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
          throw new Error('AudioContext not available');
        }
        
        audioContextRef.current = new AudioContextClass();
        if (!audioContextRef.current) {
          throw new Error('Failed to create AudioContext');
        }
        
        analyserRef.current = audioContextRef.current.createAnalyser();
        if (!analyserRef.current) {
          throw new Error('Failed to create analyser');
        }
        
        // Create source from audio element (only once)
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        if (!sourceRef.current) {
          throw new Error('Failed to create media element source');
        }
        
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        
        // Configure analyser
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        
        console.log('Audio analyzer setup complete');
        setAudioError(null);
      }
    } catch (error) {
      console.warn('Audio analysis not supported:', error);
      setAudioError(error?.message || 'Unknown audio error');
      // Clean up any partial setup
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {
          console.warn('Error closing AudioContext:', e);
        }
        audioContextRef.current = null;
      }
      analyserRef.current = null;
      sourceRef.current = null;
      dataArrayRef.current = null;
    }
  }, [isPlaying]);

  const updateAudioData = useCallback(() => {
    if (analyserRef.current && dataArrayRef.current && isPlaying) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      setAudioData(Array.from(dataArrayRef.current));
      animationRef.current = requestAnimationFrame(updateAudioData);
    } else if (isPlaying) {
      // Fallback animation if analyzer isn't working
      const fakeData = new Array(128).fill(0).map(() => {
        return Math.random() * 100 + Math.sin(Date.now() * 0.01) * 50 + 50;
      });
      setAudioData(fakeData);
      animationRef.current = requestAnimationFrame(updateAudioData);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioInitialized) {
      // Create audio element only once
      audioRef.current = new Audio('/sitar-loop.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      audioRef.current.preload = 'auto';
      
      // Add event listeners
      audioRef.current.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
        setupAudioAnalyzer();
        setAudioInitialized(true);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioInitialized]);

  useEffect(() => {
    if (!audioRef.current || !audioInitialized) return;
    
    if (soundEnabled) {
      try {
        audioRef.current.currentTime = 0; // Always start from beginning
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              console.log('Audio started playing');
              // Start audio analysis
              if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume().catch(err => {
                  console.warn('Failed to resume AudioContext:', err);
                });
              }
              updateAudioData();
            })
            .catch((error) => {
              console.error('Error playing audio:', error);
              setIsPlaying(false);
            });
        }
      } catch (error) {
        console.error('Error in audio setup:', error);
        setIsPlaying(false);
      }
    } else {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0; // Reset to beginning
        }
        setIsPlaying(false);
        console.log('Audio stopped and reset');
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } catch (error) {
        console.error('Error stopping audio:', error);
        setIsPlaying(false);
      }
    }
  }, [soundEnabled, audioInitialized, updateAudioData]);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleSound = () => {
    console.log('Toggling sound from', soundEnabled, 'to', !soundEnabled);
    setSoundEnabled(!soundEnabled);
  };

  const enableSound = () => {
    console.log('Enabling sound');
    setSoundEnabled(true);
  };

  const disableSound = () => {
    console.log('Disabling sound');
    setSoundEnabled(false);
  };

  const forceStopAllAudio = () => {
    // Force stop all audio on the page
    document.querySelectorAll('audio').forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setSoundEnabled(false);
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const changeVolume = (newVolume) => {
    console.log('Changing volume to:', newVolume);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      console.log('Volume set to:', audioRef.current.volume);
    }
  };

  return (
    <SoundContext.Provider value={{
      soundEnabled,
      isPlaying,
      volume,
      audioData,
      toggleSound,
      enableSound,
      disableSound,
      forceStopAllAudio,
      changeVolume
    }}>
      {children}
    </SoundContext.Provider>
  );
};
