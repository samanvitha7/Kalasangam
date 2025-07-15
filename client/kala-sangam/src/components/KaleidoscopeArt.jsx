import React, { useRef, useEffect, useState } from "react";

const placeholderImage =
  "https://images.unsplash.com/photo-1530639836231-4a8b4140c15a?auto=format&fit=crop&w=800&q=80";

export default function KaleidoscopeArt() {
  const canvasRef = useRef(null);
  const [rotating, setRotating] = useState(true);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    const numSlices = 12;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.95;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = placeholderImage;

    let rotation = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);

      for (let i = 0; i < numSlices; i++) {
        ctx.save();
        ctx.rotate((i * 2 * Math.PI) / numSlices);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(radius * Math.tan(Math.PI / numSlices), -radius);
        ctx.lineTo(-radius * Math.tan(Math.PI / numSlices), -radius);
        ctx.closePath();
        ctx.clip();

        if (i % 2 === 0) {
          ctx.scale(1, 1);
        } else {
          ctx.scale(1, -1);
        }

        const imgScale = zoomed ? 2.5 : 1.5;
        ctx.drawImage(
          img,
          -radius * imgScale / 2,
          -radius * imgScale,
          radius * imgScale,
          radius * imgScale
        );

        ctx.restore();
      }

      ctx.restore();

      if (rotating) {
        rotation += 0.005;
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    img.onload = () => {
      draw();
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotating, zoomed]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        margin: "2rem auto",
        cursor: "pointer",
        userSelect: "none",
        // Removed any background color here to keep it transparent
      }}
      onClick={() => setZoomed(!zoomed)}
      title="Click to zoom and see info"
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 12,
          boxShadow: "0 0 20px rgba(124, 45, 18, 0.6)",
          backgroundColor: "transparent",
          display: "block",
          margin: "0 auto",
        }}
      />
      {zoomed && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "rgba(124, 45, 18, 0.9)",
            color: "#fef3c7",
            borderRadius: 12,
            fontFamily: "'Yatra One', cursive",
            fontSize: 18,
            boxShadow: "0 0 10px #7c2d12",
            textAlign: "center",
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2>Art of the Day</h2>
          <p>
            "Harmony of Tradition" <br />
            An evocative Indian art piece celebrating rhythm and colors.
          </p>
          <small>Click the kaleidoscope to toggle zoom</small>
        </div>
      )}
    </div>
  );
}
