import { useEffect, useRef, useState } from "react";

function SoundVisualizer({ audio }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (!audio) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaElementSource(audio);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      analyserRef.current.fftSize = 64;
    }

    const ctx = canvasRef.current.getContext("2d");
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvasRef.current.width;
    const HEIGHT = canvasRef.current.height;

    function draw() {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      const barWidth = WIDTH / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        ctx.fillStyle = `rgba(124, 45, 18, ${barHeight / 100})`; // brick red
        ctx.fillRect(x, HEIGHT - barHeight, barWidth - 2, barHeight);
        x += barWidth;
      }
    }

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [audio]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      style={{ width: "100%", maxWidth: 300, margin: "20px auto 0 auto", display: "block" }}
    />
  );
}

export default function HeroSection() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sitar-loop.mp3");
      audioRef.current.loop = true;
    }
  }, []);

  // Handle play with AudioContext resume to fix browser autoplay policies
  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (!playing) {
        if (audioRef.current.context && audioRef.current.context.state === "suspended") {
          await audioRef.current.context.resume();
        }
        await audioRef.current.play();
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
    } catch {
      // fallback play/pause
      if (!playing) {
        audioRef.current.play();
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#fef3c7] via-[#f7e8c6] to-[#f0dbb5] text-[#7c2d12] flex flex-col justify-center items-center px-4 text-center max-w-4xl mx-auto"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg yatra-font">
        Kala Sangam
      </h1>

      <p className="mt-4 text-lg md:text-2xl text-[#9b4226] yatra-font">
        Celebrate Indian art through rhythm, color, and soul.
      </p>

      <button
        className="mt-6 px-6 py-3 rounded-full bg-[#7c2d12] text-white shadow-[0_0_15px_#7c2d12] hover:shadow-[0_0_30px_#7c2d12] transition yatra-font"
        onClick={() => alert("Why Kala Sangam? Coming soon!")}
      >
        Why Kala Sangam?
      </button>

      <button
        className="mt-6 ml-4 px-6 py-3 rounded-full border border-[#7c2d12] text-[#7c2d12] hover:bg-[#7c2d12] hover:text-white transition yatra-font"
        onClick={() => {
          const section = document.getElementById("showcase");
          if (section) section.scrollIntoView({ behavior: "smooth" });
        }}
      >
        Scroll to Explore ↓
      </button>

      <button
        className="mt-10 px-6 py-3 rounded-full border border-[#7c2d12] text-[#7c2d12] hover:bg-[#7c2d12] hover:text-white transition yatra-font"
        onClick={togglePlay}
      >
        {playing ? "Pause Music" : "Play Music"}
      </button>

      {playing && <SoundVisualizer audio={audioRef.current} />}
    </section>
  );
}
