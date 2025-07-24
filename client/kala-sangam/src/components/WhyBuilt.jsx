import { motion } from "framer-motion";

const timeline = [
  {
    title: "The Problem",
    text: "Indian art forms are fading away due to lack of exposure and modern engagement.",
    side: "left",
    icon: "⚠️",
    gradient: "from-[#134856] to-[#1D7C6F]",
  },
  {
    title: "Our Mission",
    text: "To preserve and promote these forms through a beautiful, interactive web platform.",
    side: "right",
    icon: "🎯",
    gradient: "from-[#1D7C6F] to-[#E05264]",
  },
  {
    title: "The Impact",
    text: "We aim to help artists and enthusiasts connect, learn, and celebrate these crafts.",
    side: "left",
    icon: "💥",
    gradient: "from-[#E05264] to-[#134856]",
  }
];

function WhyWeBuiltThis() {
  return (
    <section className="relative px-4 py-16 bg-[#F8E6DA]">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-[#E05264] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.h2 
        className="text-4xl font-bold text-center mb-16 text-[#134856] font-[Yatra One]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Why We Built This
      </motion.h2>

      {/* Mobile: Horizontal Scroll */}
      <div className="block md:hidden overflow-x-auto">
        <div className="flex gap-3 px-2 min-w-fit">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-80 bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-6 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-4xl mb-4 text-center"
                animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {item.icon}
              </motion.div>

              <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                {item.title}
              </h3>

              <p className="text-gray-700 text-base leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop: Vertical Timeline */}
      <div className="hidden md:block relative max-w-5xl mx-auto">
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#134856] via-[#1D7C6F] to-[#E05264] rounded-full"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "top" }}
        />

        {timeline.map((item, idx) => (
          <motion.div
            key={idx}
            className={`mb-8 flex ${item.side === "left" ? "justify-start" : "justify-end"} w-full relative`}
            initial={{ opacity: 0, x: item.side === "left" ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center text-white font-bold shadow-lg z-20`}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.3 + 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.2, rotate: 360 }}
            >
              {idx + 1}
            </motion.div>

            <motion.div
              className={`bg-white/95 backdrop-blur-sm border border-white/20 max-w-md rounded-3xl shadow-xl p-8 relative z-10 ${item.side === "left" ? "mr-8" : "ml-8"}`}
              whileHover={{ 
                scale: 1.05, 
                rotateY: item.side === "left" ? 5 : -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
              }}
              style={{ transformStyle: "preserve-3d" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-4xl mb-4 text-center"
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.8
                }}
              >
                {item.icon}
              </motion.div>

              <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                {item.title}
              </h3>

              <p className="text-gray-700 text-base leading-relaxed">
                {item.text}
              </p>

              <motion.div
                className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${item.gradient} rounded-full opacity-60`}
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
              />
              <motion.div
                className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br ${item.gradient} rounded-full opacity-40`}
                animate={{ scale: [1, 1.5, 1], rotate: [0, -180, -360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.7 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyWeBuiltThis;
