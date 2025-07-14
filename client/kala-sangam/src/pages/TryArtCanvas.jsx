import React, { useRef, useState } from 'react';

export default function TryArtCanvas() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvasRef.current.isDrawing = true;
  };

  const draw = (e) => {
    if (!canvasRef.current.isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    canvasRef.current.isDrawing = false;
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="min-h-screen bg-[#fffef2] flex flex-col items-center px-4 py-10">
      <h2 className="text-3xl font-bold mb-4">🎨 Try It Yourself - Traditional Art</h2>

      <div className="flex gap-4 mb-4">
       
        {['#000000', '#FF5733', '#FFC300', '#DAF7A6', '#900C3F'].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="w-8 h-8 rounded-full border-2"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="border-2 border-black bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={clearCanvas}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
}
