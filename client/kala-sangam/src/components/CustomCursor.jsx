import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          top: position.y - 6,
          left: position.x - 6,
          width: "12px",
          height: "12px",
          backgroundColor: "#7c2d12",
          borderRadius: "50%",
          position: "fixed",
        }}
      />
      <div
        className="fixed z-[9998] pointer-events-none transition-all duration-150"
        style={{
          top: position.y - 20,
          left: position.x - 20,
          width: "40px",
          height: "40px",
          border: "2px solid #7c2d12",
          borderRadius: "50%",
          position: "fixed",
        }}
      />
    </>
  );
}
