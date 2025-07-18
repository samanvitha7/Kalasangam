import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useSoundContext } from "../context/SoundContext.jsx";
import "./SplashScreen.css";

export function LoadingScreen({ onFinish }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 splash-screen">
      <div className="absolute top-6 right-8 text-5xl md:text-6xl font-bold tracking-wide z-30">
        {count}%
      </div>

      <img
        src="/assets/chakra.png"
        alt="Chakra"
        className="chakra-spinner"
      />

      <div className="absolute bottom-6 left-6 welcome-text z-30">
        Welcome to an experience...
      </div>
    </div>
  );
}

export function SoundPrompt({ onContinue }) {
  const [hidden, setHidden] = useState(false);
  const { enableSound, disableSound } = useSoundContext();

  const handleContinue = (withSound) => {
    setHidden(true);
    
    if (withSound) {
      enableSound();
    } else {
      disableSound();
    }
    
    setTimeout(() => {
      onContinue(withSound);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center sound-screen text-[#7c2d12] opacity-100 pointer-events-auto"
      style={{ backgroundColor: "rgba(254, 243, 199, 0.95)" }}

    >
      <div className="text-center px-4 max-w-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 yatra-font">
            Put your headphones on
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto yatra-font">
            Prepare for a world of rhythm, soul, and color.
          </p>
          <div className="space-y-4 md:space-x-4 md:space-y-0 md:flex md:justify-center">
            <button
              onClick={() => handleContinue(true)}
              className="px-8 py-4 rounded-full btn-glow-brick text-lg yatra-font"
              type="button"
            >
              Start the Journey
            </button>
            <button
              onClick={() => handleContinue(false)}
              className="px-8 py-4 rounded-full border border-[#7c2d12] hover:bg-[#7c2d12] hover:text-white text-lg yatra-font"
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
