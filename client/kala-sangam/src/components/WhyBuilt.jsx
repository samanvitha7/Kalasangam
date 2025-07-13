import { useEffect } from "react";

const timeline = [
  {
    title: "The Problem",
    text: "Indian art forms are fading away due to lack of exposure and modern engagement.",
    side: "left"
  },
  {
    title: "Our Mission",
    text: "To preserve and promote these forms through a beautiful, interactive web platform.",
    side: "right"
  },
  {
    title: "The Impact",
    text: "We aim to help artists and enthusiasts connect, learn, and celebrate these crafts.",
    side: "left"
  }
];

function WhyWeBuiltThis() {
  useEffect(() => {
    const cards = document.querySelectorAll(".timeline-card");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach(card => observer.observe(card));
  }, []);

  return (
    <section className="bg-white px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Why We Built This</h2>
      <div className="relative max-w-4xl mx-auto before:absolute before:top-0 before:bottom-0 before:left-1/2 before:w-1 before:bg-gray-300">
        {timeline.map((item, idx) => (
          <div
            key={idx}
            className={`mb-12 flex ${item.side === "left" ? "justify-start" : "justify-end"} w-full`}
          >
            <div
              className="timeline-card bg-white border border-gray-200 max-w-sm rounded-2xl shadow-md p-6 relative z-10 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-orange-300"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <h3 className="text-xl font-bold mb-2 text-orange-700">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyWeBuiltThis;
