import { motion } from "framer-motion";

function ContactUsSection() {
return (
    <motion.section className="relative bg-gradient-to-r from-[#fdf6e3] via-[#fae5d3] to-[#ffe6eb] text-[#9b2226] py-16 px-6 md:flex md:items-center md:justify-between md:gap-10 rounded-lg shadow-lg mt-16 max-w-7xl mx-auto overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
    >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-orange-300 rounded-full opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
        
        <motion.div className="md:flex-1 relative z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
        >
            <motion.h2 className="text-4xl font-extrabold mb-4 font-[Yatra One]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
            >
                Let's Work Together
            </motion.h2>
            
            <motion.p className="text-lg mb-6 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
            >
                Interested in collaborating on traditional arts projects or just want to say hi? Reach out and let's create something amazing!
            </motion.p>
            
            <motion.a
                href="mailto:team@example.com"
                className="inline-block bg-gradient-to-r from-[#582f0e] to-[#8b4513] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                Contact Us
            </motion.a>
        </motion.div>
        
        <motion.div className="md:flex-1 md:mt-0 mt-8 relative z-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
        >
            <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.3 }}
            >
                <img
                    src="https://muselot.in/cdn/shop/articles/gond_painting.jpg?v=1676631899&width=1080"
                    alt="Collaboration Illustration"
                    className="w-full max-w-sm rounded-lg shadow-lg mx-auto"
                />
                
                {/* Decorative border elements */}
                <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-70"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                <motion.div
                    className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-50"
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -180, -360]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </motion.div>
        </motion.div>
    </motion.section>
);
}

export default ContactUsSection;
