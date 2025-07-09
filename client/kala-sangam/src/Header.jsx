function Header() {
  return (
    <header className="bg-[#fff8e1] px-6 py-4 border-b-2 border-[#bf360c] shadow-sm">
      <div className="flex justify-between items-center">
        {/* Site Title */}
        <h1 className="text-2xl text-[#6d2b1c] font-serif font-bold tracking-wide">
          Soul of India
        </h1>

        {/* Minimal Nav */}
        <nav>
          <ul className="flex gap-6 text-[#4e342e] font-medium text-base">
            <li><a href="#explore" className="hover:text-[#bf360c]">Explore</a></li>
            <li><a href="#gallery" className="hover:text-[#bf360c]">Gallery</a></li>
            <li><a href="#contact" className="hover:text-[#bf360c]">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
