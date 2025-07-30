import { motion } from "framer-motion";
import { useState } from "react";

const team = [
  {
    name: "NAINA",
    role: "Frontend Developer",
    image: "/images/naina1.jpg",
    funFact: "Wrote her first JavaScript app before learning to ride a bike.",
    color: "from-[#4bb5a5] to-[#1D7C6F]",
    skills: ["React", "UI/UX", "Animation"]
  },
  {
    name: "SAMANVITHA",
    role: "Full Stack Developer",
    image: "/images/sam.jpg",
    funFact: "Has a playlist for debugging — and it actually works!",
    color: "from-[#5a8fa0] to-[#134856]",
    skills: ["Node.js", "MongoDB", "APIs"]
  },
  {
    name: "SHREYA",
    role: "Full Stack Developer",
    image: "/images/shreya.jpg",
    funFact: "Built a design system while eating pani puri — didn’t spill a byte.",
    color: "from-[#f17887] to-[#E05264]",
    skills: ["React", "Animation", "Node.js"]
  },
  {
    name: "VAISHALI",
    role: "Frontend Developer",
    image: "/images/Vaishalii.jpg",
    funFact: "Her debug sessions are so calm, even the console errors feel shy.",
    color: "from-[#f7b7bb] to-[#F48C8C]",
    skills: ["Tailwindcss", "Research", "UI/UX"]
  }
];

function MeetTheTeam() {
  const [flipped, setFlipped] = useState({});

  const handleCardClick = (idx) => {
    setFlipped((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="relative pt-8 pb-11 px-6">
      {/* Floating background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#F48C8C] to-[#E05264] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.3, 1] }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <motion.h2
  className="text-4xl md:text-5xl font-bold font-dm-serif mb-6 text-lotus-green text-center relative -top-3"


        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Meet the Creative Minds
      </motion.h2>

      {/* Cards Grid */}
      <div className="grid gap-10 md:grid-cols-4 sm:grid-cols-2 justify-center items-start max-w-6xl mx-auto">
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            className="w-64 h-96 group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            viewport={{ once: true }}
            style={{ perspective: "1000px" }}
            onClick={() => handleCardClick(idx)}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: flipped[idx] ? 180 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d", willChange: "transform", height: "100%" }}
            >
              {/* FRONT SIDE */}
              <div
                className="absolute w-full h-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col justify-between p-6 border border-white/20"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/* Decorative floating dots */}
                <motion.div
                  className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${member.color} rounded-full opacity-70`}
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                />
                <motion.div
                  className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br ${member.color} rounded-full opacity-50`}
                  animate={{ scale: [1, 1.5, 1], rotate: [0, -180, -360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.7 }}
                />

                {/* Profile Image */}
                <motion.div
                  className="w-40 h-40 rounded-full mb-4 overflow-hidden shadow-lg border-4 border-white mx-auto"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </motion.div>

                {/* Name & Role */}
                <motion.h3
                  className={`font-bold text-xl text-center bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}
                >
                  {member.name}
                </motion.h3>
                <p className="text-gray-600 text-sm text-center">{member.role}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {member.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${member.color} text-white font-medium shadow-md`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Hint */}
                <motion.div
                  className="text-xs text-gray-400 text-center mt-3"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Click for fun fact! 
                </motion.div>
              </div>

              {/* BACK SIDE */}
              <div
                className={`absolute w-full h-full bg-gradient-to-br ${member.color} rounded-2xl shadow-xl flex flex-col justify-center items-center p-6 text-center`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  💡
                </motion.div>
                <p className="text-lg italic font-medium leading-relaxed text-white">
                  "{member.funFact}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default MeetTheTeam;
