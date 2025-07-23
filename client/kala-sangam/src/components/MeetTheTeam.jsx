import { motion } from "framer-motion";
import { useState } from "react";

const team = [
  {
    name: "NAINA",
    role: "Frontend Developer",
    image: "/images/naina.jpg",
    funFact: "Wrote her first JavaScript app before learning to ride a bike.",
    color: "from-[#ff6b6b] to-[#ee5a24]",
    skills: ["React", "UI/UX", "Animation"]
  },
  {
    name: "SAMANVITHA",
    role: "Full Stack Developer",
    image: "/images/sam.jpg",
    funFact: "Has a playlist for debugging — and it actually works!",
    color: "from-[#4834d4] to-[#686de0]",
    skills: ["Node.js", "MongoDB", "APIs"]
  },
  {
    name: "SHREYA",
    role: "UI/UX Designer",
    image: "/images/shreya.jpg",
    funFact: "Owns a flute signed by Hariprasad Chaurasia.",
    color: "from-[#00d2d3] to-[#01a3a4]",
    skills: ["Design", "Research", "Prototyping"]
  },
  {
    name: "VAISHALI",
    role: "Backend Developer",
    image: "/images/Vaishalii.jpg",
    funFact: "Her debug sessions are so calm, even the console errors feel shy.",
    color: "from-[#ff9ff3] to-[#f368e0]",
    skills: ["Python", "Database", "Architecture"]
  }
];

function MeetTheTeam() {
  const [flipped, setFlipped] = useState({});

  const handleCardClick = (idx) => {
    setFlipped({ ...flipped, [idx]: !flipped[idx] });
  };

  return (
    <section className="relative py-14 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.h2 
        className="text-4xl font-bold text-center mb-16 text-[#8b4513] font-[Yatra One]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Meet the Creative Minds
      </motion.h2>
      
      <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2 justify-items-center max-w-6xl mx-auto">
        {team.map((member, idx) => (
          <motion.div 
            key={idx} 
            className="w-64 h-96 group cursor-pointer"
            initial={{ opacity: 0, y: 50, rotateY: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            viewport={{ once: true }}
            style={{
              perspective: "1000px"
            }}
            onClick={() => handleCardClick(idx)}
          >
            <motion.div 
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              animate={{
                rotateY: flipped[idx] ? 180 : 0
              }}
              transition={{
                duration: 0.7,
                ease: "easeInOut"
              }}
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              {/* Front Side */}
              <div 
                className="absolute w-full h-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl flex flex-col items-center p-6 border border-white/20"
                style={{
                  backfaceVisibility: "hidden"
                }}
              >
                {/* Floating decorative elements */}
                <motion.div
                  className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${member.color} rounded-full opacity-70`}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.5
                  }}
                />
                
                <motion.div
                  className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br ${member.color} rounded-full opacity-50`}
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, -180, -360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.7
                  }}
                />
                
                <motion.div
                  className="w-40 h-40 rounded-full mb-4 overflow-hidden shadow-lg border-4 border-white"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.h3 
                  className={`font-bold text-xl mb-2 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {member.name}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 text-sm mb-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {member.role}
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-2 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {member.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skillIdx}
                      className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${member.color} text-white font-medium shadow-md`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.div
                  className="mt-auto text-xs text-gray-400 text-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Click for fun fact! 🖱️
                </motion.div>
              </div>
              
              {/* Back Side */}
              <div 
                className={`absolute w-full h-full bg-gradient-to-br ${member.color} rounded-2xl shadow-xl flex items-center justify-center p-6 text-center`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <div className="text-white">
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    💡
                  </motion.div>
                  <motion.p 
                    className="text-lg italic font-medium leading-relaxed"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    "{member.funFact}"
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default MeetTheTeam;
