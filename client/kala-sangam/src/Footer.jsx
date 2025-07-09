function Footer() {
  return (
    <footer className="bg-[#fff3e0] text-[#4e342e] px-6 py-6 border-t-2 border-[#bf360c] mt-12">
      <div className="max-w-7xl mx-auto text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Left: Copyright */}
        <p className="font-serif">
          © 2025 Soul of India. All rights reserved.
        </p>

        {/* Center: Minimal Links */}
        <div className="flex gap-4">
          <a href="#privacy" className="hover:text-[#bf360c] transition">Privacy</a>
          <a href="#terms" className="hover:text-[#bf360c] transition">Terms</a>
          <a href="#contact" className="hover:text-[#bf360c] transition">Contact</a>
        </div>

        {/* Right: Contact Email */}
        <p className="font-medium">
          soul@indianart.org
        </p>
      </div>
    </footer>
  );
}

export default Footer;
