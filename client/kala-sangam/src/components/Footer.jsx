import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-tealblue to-rosered text-white border-t border-rosered/20 px-6 py-10 font-lora font-medium">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

    {/* About Section */}
    <div>
      <h2 className="text-xl font-bold font-serif mb-4 text-rosered">About KalaSangam</h2>
      <p className="text-sm leading-relaxed">
        KalaSangam is a digital tribute to India's rich heritage of traditional arts —
        from Madhubani and Warli to Kathakali and Pattachitra. We connect culture, creativity,
        and community across 29 states.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="text-xl font-bold font-serif mb-4 text-rosered">Explore</h2>
      <ul className="text-sm space-y-2">
        {[
          { to: "/", label: "Home" },
          { to: "/gallery", label: "Traditional Arts" },
          { to: "/art-wall", label: "Art Wall" },
          { to: "/map", label: "States" },
          { to: "/artists", label: "Artists" },
          { to: "/login", label: "Login" },
          { to: "/signup", label: "Sign Up" },
        ].map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className="hover:underline hover:text-saffronglow transition-colors duration-200 font-semibold"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Contact Form */}
    <div>
      <h2 className="text-xl font-bold  text-tealblue font-serif mb-4">Get In Touch</h2>
      <p className="text-sm  mb-4">
        We'd love to hear from artists, enthusiasts, and collaborators.
      </p>
      <form className="space-y-2">
        <input
          type="email"
          placeholder="Your email"
          className="w-full px-3 py-2 border border-blushpeach/30 rounded bg-blushpeach/10 text-sm text-blushpeach placeholder-blushpeach/60 focus:outline-none focus:border-saffronglow focus:ring-1 focus:ring-saffronglow transition-all duration-200"
        />
       <button
          type="submit"
          className="px-5 py-2 rounded font-[550] text-sm bg-blushpeach text-tealblue 
                    hover:bg-tealblue hover:text-blushpeach transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Send
        </button>


      </form>
    </div>
  </div>

  {/* Bottom line */}
  <div className="mt-8 pt-6 border-t border-blushpeach/20">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-xs font-bold">
        © 2025 KalaSangam. All rights reserved.
      </div>
      <div className="flex flex-wrap gap-4 text-xs">
        {[
          { to: "/terms-of-service", label: "Terms of Service" },
          { to: "/privacy-policy", label: "Privacy Policy" },
          { to: "/community-guidelines", label: "Community Guidelines" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className=" hover:text-saffronglow hover:underline transition-colors duration-200 font-semibold"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  </div>
</footer>

  );
}
