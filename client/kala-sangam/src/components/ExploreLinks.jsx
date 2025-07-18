import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { path: "/map", label: "Explore the Map", color: "bg-green-600" },
  { path: "/gallery", label: "View Art Gallery", color: "bg-purple-600" },
  { path: "/explore/crafts", label: "Learn Traditional Crafts", color: "bg-amber-600" },
  { path: "/contact", label: "Join or Collaborate", color: "bg-blue-600" },
];

export default function ExploreLinks() {
  return (
    <section className="py-24 bg-[#0f0c29] text-white text-center px-4">
      <h2 className="text-3xl font-bold mb-10">Start Your Journey</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {links.map((link, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-4 rounded-xl text-lg font-semibold ${link.color} shadow-lg`}
          >
            <Link to={link.path}>{link.label}</Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
