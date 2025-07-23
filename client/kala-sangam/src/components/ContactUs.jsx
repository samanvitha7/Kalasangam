import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function ContactUsSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/contact', formData);

            if (response.data.success) {
                toast.success('Message sent successfully! We will get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.response?.data?.errors) {
                error.response.data.errors.forEach(err => {
                    toast.error(err.msg);
                });
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.section className="relative bg-[#F8E6DA] text-[#134856] py-16 px-6 rounded-lg shadow-lg mt-16 max-w-7xl mx-auto overflow-hidden"
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
                        className="absolute w-3 h-3 bg-[#FFD700] rounded-full opacity-30"
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

            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Left side - Contact Info */}
                <motion.div className="relative z-10"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <motion.h2 className="text-4xl font-extrabold mb-4 font-[Yatra One] text-[#134856]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Let's Work Together
                    </motion.h2>

                    <motion.p className="text-lg mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Interested in collaborating on traditional arts projects or just want to say hi? Reach out and let's create something amazing!
                    </motion.p>

                    <motion.div className="space-y-4 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#1D7C6F] rounded-full"></div>
                            <span>Email: contact@kalasangam.com</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#1D7C6F] rounded-full"></div>
                            <span>Response time: Within 24 hours</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right side - Contact Form */}
                <motion.div className="relative z-10"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <motion.form onSubmit={handleSubmit} className="space-y-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#F48C8C] focus:outline-none focus:ring-2 focus:ring-[#E05264] focus:border-transparent bg-white/80 backdrop-blur-sm"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#F48C8C] focus:outline-none focus:ring-2 focus:ring-[#E05264] focus:border-transparent bg-white/80 backdrop-blur-sm"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#F48C8C] focus:outline-none focus:ring-2 focus:ring-[#E05264] focus:border-transparent bg-white/80 backdrop-blur-sm"
                                placeholder="What's this about?"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border border-[#F48C8C] focus:outline-none focus:ring-2 focus:ring-[#E05264] focus:border-transparent bg-white/80 backdrop-blur-sm resize-none"
                                placeholder="Tell us about your project or inquiry..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-gradient-to-r from-[#E05264] to-[#F48C8C] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                            } hover:ring-2 hover:ring-[#FFD700]`}
                            whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </motion.form>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default ContactUsSection;
