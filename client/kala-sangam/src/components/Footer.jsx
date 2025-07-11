export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#ffe6eb] via-[#fdf2e9] to-[#fefae0] text-[#582f0e] pt-12 pb-6 mt-16 border-t border-[#e9dcc9]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4">About KalaSangam</h2>
          <p className="text-sm leading-relaxed text-[#7b3e19]">
            KalaSangam is a digital tribute to India’s rich heritage of traditional arts —
            from Madhubani and Warli to Kathakali and Pattachitra. We connect culture, creativity,
            and community across 29 states.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4">Explore</h2>
          <ul className="text-sm space-y-2 text-[#7b3e19]">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Traditional Arts</a></li>
            <li><a href="#" className="hover:underline">States</a></li>
            <li><a href="#" className="hover:underline">Gallery</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter or Contact */}
        <div>
          <h2 className="text-xl font-bold font-serif mb-4">Get In Touch</h2>
          <p className="text-sm text-[#7b3e19] mb-4">
            We'd love to hear from artists, enthusiasts, and collaborators.
          </p>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border border-[#d4a373] rounded bg-white text-sm text-[#582f0e] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#9b2226] text-white text-sm rounded hover:bg-[#7b1e21] transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-xs text-[#8a5a44]">
        © 2025 KalaSangam. All rights reserved.
      </div>
    </footer>
  );
}
