import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useSoundContext } from "../context/SoundContext.jsx";
import "./SplashScreen.css";
import { useMemo } from "react";

// Particle component for performance
const Particle = ({ color, delay, duration }) => {
  const { initialX, initialY, size, driftDistance, horizontalDrift } = useMemo(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const s = 1 + Math.random() * 2.5;
    const drift = 40 + Math.random() * 60;
    const hDrift = -20 + Math.random() * 40;
    return {
      initialX: x,
      initialY: y,
      size: s,
      driftDistance: drift,
      horizontalDrift: hDrift
    };
  }, []);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        top: 0,
        left: 0
      }}
      initial={{
        x: initialX,
        y: initialY,
        opacity: 0,
        scale: 0
      }}
      animate={{
        y: initialY - driftDistance,
        x: initialX + horizontalDrift,
        opacity: [0, 0.3, 0.8, 0.6, 0],
        scale: [0, 0.5, 1, 0.8, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1
      }}
    />
  );
};


export function LoadingScreen({ onFinish }) {
  const colors = ['#1E5E75', '#E85A4F', '#F6A100', '#DA639B', '#6D47A2']; // Color scheme
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFinish();
    }, 6000); // 6 seconds total - logo stays large for longer

    return () => {
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" 
         style={{
           backgroundImage: 'url(/assets/logoremoved.png)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           backgroundColor: '#edd5c0' // Light creamy white background
         }}>
      
      {/* Many particles to fill the screen */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {Array.from({ length: 120 }, (_, i) => (
          <Particle
            key={i}
            color={colors[i % colors.length]}
            delay={i * 0.05}
            duration={3 + Math.random() * 2}
          />
        ))}
      </div>


      
      {/* Center logo with glow effect and floating animation */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.5, 1.4, 1.4, 1.4],
          opacity: [0, 1, 1, 1],
          y: [0, 0, -8, 8] // Gentle floating effect during the hold phase
        }}
        transition={{
          duration: 6,
          times: [0, 0.4, 0.7, 1],
          ease: "easeOut"
        }}
      >
        
        {/* Logo with gentle floating animation */}
        <motion.img
          src="/assets/logo.png"
          alt="Logo"
          className="relative z-10 max-w-md max-h-md object-contain"
          animate={{
            y: [0, -4, 4] // Subtle floating motion
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}

export function SoundPrompt({ onContinue }) {
  const [hidden, setHidden] = useState(false);
  const { enableSound, disableSound } = useSoundContext();
  const navigate = useNavigate();

  const handleContinue = (withSound) => {
    setHidden(true);
    
    if (withSound) {
      enableSound();
    } else {
      disableSound();
    }
    
    setTimeout(() => {
      onContinue(withSound);
      navigate('/home');
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: 'url(/assets/logoremoved.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#edd5c0' // off-white/creamy background
      }}
    >
      <div className="text-center px-4 max-w-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-lora text-teal-blue">
            Ready to Explore? 
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-lora text-deep-charcoal">
            Prepare for a world of rhythm, soul, and color.
          </p>
          <div className="space-y-4 md:space-x-4 md:space-y-0 md:flex md:justify-center">
            <button
              onClick={() => handleContinue(true)}
              className="px-8 py-4 rounded-full bg-teal-blue text-off-white hover:bg-coral-red transition-all font-bold font-lora text-lg shadow-lg"
              type="button"
            >
              Continue with Sound
            </button>
            <button
              onClick={() => handleContinue(false)}
              className="px-8 py-4 rounded-full border-2 border-teal-blue text-teal-blue hover:bg-muted-fuchsia hover:text-off-white hover:border-muted-fuchsia transition-all font-bold font-lora text-lg"
              type="button"
            >
              Continue without Sound
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function SoundToggle({ soundOn, setSoundOn }) {
  return (
    <button
      className="fixed top-5 right-5 z-50 bg-white text-black px-4 py-2 rounded-full shadow-lg"
      onClick={() => setSoundOn(!soundOn)}
    >
      {soundOn ? "Sound On" : "Sound Off"}
    </button>
  );
}


export default function SplashScreen({ onContinue }) {
  const [phase, setPhase] = useState("loading");

  const handleLoadingFinish = () => {
    setPhase("prompt");
  };

  const handlePromptContinue = (withSound) => {
    setPhase("done");
    onContinue(withSound);
  };

  if (phase === "loading") {
    return <LoadingScreen onFinish={handleLoadingFinish} />;
  }

  if (phase === "prompt") {
    return <SoundPrompt onContinue={handlePromptContinue} />;
  }

  return null;
}
