import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // 👈 combine useState + useEffect
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom"; // 👈 useLocation imported

function ContactUsSection() {
  const location = useLocation(); // ✅ moved inside the function

  // ✅ Scroll to contact section if #contact in URL
  useEffect(() => {
    if (location.hash === "#contact") {
      const el = document.getElementById("contact-section");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }

    // ✅ Pre-fill email if passed via URL query
    const params = new URLSearchParams(location.search);
    const emailFromURL = params.get("email");
    if (emailFromURL) {
      setFormData((prev) => ({ ...prev, email: emailFromURL }));
    }
  }, [location]);

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
        error.response.data.errors.forEach(err => toast.error(err.msg));
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <motion.section
      id="contact-section"
      className="relative bg-[#F8E6DA] py-16 px-6 rounded-2xl shadow-2xl mt-16 max-w-7xl mx-auto overflow-hidden font-[Poppins]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Background Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3  rounded-full opacity-30"
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

      <div className="grid md:grid-cols-2 gap-10 items-start relative z-10">
        {/* Left - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4 font-dm-serif bg-gradient-to-r from-[#1D7C6F] to-[#F48C8C] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Let's Work Together
          </motion.h2>

          <motion.p
            className="text-xl mb-6 leading-relaxed font-lora bg-gradient-to-r from-[#1D7C6F] to-[#F48C8C] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Interested in collaborating on traditional arts projects or just want to say hi? Reach out and let's create something amazing!
          </motion.p>

          <motion.div
            className="space-y-4 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#1D7C6F] rounded-full"></div>
              <span className="text-lg bg-gradient-to-r from-[#1D7C6F] to-[#F48C8C] bg-clip-text text-transparent">Email: contact@kalasangam.com</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#1D7C6F] rounded-full"></div>
              <span className="text-lg bg-gradient-to-r from-[#1D7C6F] to-[#F48C8C] bg-clip-text text-transparent">Response time: Within 24 hours</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {['name', 'email', 'subject'].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium mb-2 bg-gradient-to-r from-[#1D7C6F] to-[#F48C8C] bg-clip-text text-transparent"
                >
                  {field === 'email' ? 'Email Address' : field === 'name' ? 'Your Name' : 'Subject'}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#F48C8C] focus:outline-none focus:ring-2 focus:ring-[#1D7C6F] focus:border-transparent bg-white/80 backdrop-blur-sm"
                  placeholder={
                    field === 'name' ? 'Enter your full name'
                      : field === 'email' ? 'your@email.com'
                      : "What's this about?"
                  }
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 bg-gradient-to-r from-[#1D7C6F] to-[#F48C8C] bg-clip-text text-transparent"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-[#F48C8C] focus:outline-none focus:ring-2 focus:ring-[#1D7C6F] focus:border-transparent bg-white/80 backdrop-blur-sm resize-none"
                placeholder="Tell us about your project or inquiry..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-[#1D7C6F] to-[#F48C8C] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
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
