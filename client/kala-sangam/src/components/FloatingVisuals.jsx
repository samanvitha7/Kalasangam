import { motion } from "framer-motion";

const visuals = [
  { id: 1, src: "https://png.pngtree.com/element_pic/00/03/29/76568a5fdd29340.png", size: "w-16", top: "top-10", left: "left-20" },
  { id: 2, src: "https://png.pngtree.com/png-vector/20201115/ourmid/pngtree-diwali-diya-png-png-image_2421492.jpg", size: "w-20", top: "top-40", left: "left-[70%]" },
  { id: 3, src: "https://cpng.pikpng.com/pngl/s/42-421749_tabla-hd-png-music-instrument-tabla-png-clipart.png", size: "w-14", top: "top-[75%]", left: "left-[30%]" },
];

export default function FloatingVisuals() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {visuals.map((item) => (
        <motion.img
          key={item.id}
          src={item.src}
          className={`absolute ${item.size} ${item.top} ${item.left} opacity-70`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
