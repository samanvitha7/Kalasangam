function ContactUsSection() {
return (
    <section className="bg-gradient-to-r from-[#fdf6e3] via-[#fae5d3] to-[#ffe6eb] text-[#9b2226] py-16 px-6 md:flex md:items-center md:justify-between md:gap-10 rounded-lg shadow-lg mt-16 max-w-7xl mx-auto">
        <div className="md:flex-1">
            <h2 className="text-4xl font-extrabold mb-4">
                Let’s Work Together
            </h2>
            <p className="text-lg mb-6 max-w-md">
                Interested in collaborating on traditional arts projects or just want to say hi? Reach out and let’s create something amazing!
            </p>
            <a
                href="mailto:team@example.com"
                className="inline-block text-[#582f0e] font-semibold px-6 py-3 rounded-lg shadow hover:text-[#9b2226] transition"
            >
                Contact Us
            </a>
        </div>
        <div className="md:flex-1 md:mt-0">
            <img
                src="https://muselot.in/cdn/shop/articles/gond_painting.jpg?v=1676631899&width=1080"
                alt="Collaboration Illustration"
                className="w-full max-w-sm rounded-lg shadow-lg mx-auto"
            />
        </div>
    </section>
);
}

export default ContactUsSection;
