import { motion } from "framer-motion";

export default function MissionSection() {
  return (
    <motion.section
      className="py-24 px-6 max-w-4xl mx-auto text-white"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-pink-500 mb-4">Why Kala Sangam?</h2>
      <p className="text-lg text-gray-300 leading-relaxed">
        Kala Sangam was built to preserve and promote the soul of Indian art —
        from classical dance to ancient painting styles. Our platform brings
        centuries of culture to a digital stage, where anyone can explore and engage.
      </p>
    </motion.section>
  );
}
