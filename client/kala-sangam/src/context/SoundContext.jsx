import { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [audioData, setAudioData] = useState(new Array(128).fill(0));
  const audioRef = useRef(null);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationRef = useRef(null);

  const setupAudioAnalyzer = () => {
    try {
      if (!audioContextRef.current && audioRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        // Create source from audio element
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        
        // Configure analyser
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        
        console.log('Audio analyzer setup complete');
      }
    } catch (error) {
      console.warn('Audio analysis not supported:', error);
      // Fallback: create fake visualization data
      setInterval(() => {
        if (isPlaying) {
          const fakeData = new Array(128).fill(0).map(() => Math.random() * 100 + 50);
          setAudioData(fakeData);
        }
      }, 100);
    }
  };

  const updateAudioData = () => {
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
  };

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
      // Only stop background music audio, not all audio on the page
      // This allows music page instruments to play without interference
      if (audioRef.current) {
        // Only control our own background audio
      }
      
      audioRef.current.currentTime = 0; // Always start from beginning
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log('Audio started playing');
            // Start audio analysis
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
              audioContextRef.current.resume();
            }
            updateAudioData();
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to beginning
      setIsPlaying(false);
      console.log('Audio stopped and reset');
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [soundEnabled, audioInitialized]);

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
