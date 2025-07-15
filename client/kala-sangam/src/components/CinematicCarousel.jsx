import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./CinematicCarousel.css";

const artworks = [
  { image: "https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg" },
  { image: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YYh5Fk1u9VsWWr1MhkyQeOzeNbtnnMO96g&s" },
  // Add more artworks here
];

export default function CinematicCarousel() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX, scrollLeft;

    const mouseDownHandler = (e) => {
      isDown = true;
      el.classList.add("dragging");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const mouseLeaveUpHandler = () => {
      isDown = false;
      el.classList.remove("dragging");
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", mouseDownHandler);
    el.addEventListener("mouseleave", mouseLeaveUpHandler);
    el.addEventListener("mouseup", mouseLeaveUpHandler);
    el.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      el.removeEventListener("mousedown", mouseDownHandler);
      el.removeEventListener("mouseleave", mouseLeaveUpHandler);
      el.removeEventListener("mouseup", mouseLeaveUpHandler);
      el.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;

    // Clone the track contents for seamless loop
    const originalContent = el.innerHTML;
    el.innerHTML += originalContent;

    const interval = setInterval(() => {
      el.scrollLeft += 2;
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cinema-wrapper">
      <div className="cinema-title-wrapper">
        <h2 className="cinema-title">Art Showcase</h2>
      </div>
      <div className="cinema-track" ref={scrollRef}>
        {[...artworks, ...artworks].map((art, i) => (
          <div key={i + art.image} className="cinema-slide">
            <img src={art.image} alt="Artwork" className="cinema-image" />
          </div>
        ))}
      </div>
      <div className="cinema-fade" />
      <div className="cinema-bottom-wrapper">
        <button className="cinema-explore-btn" onClick={() => navigate("/gallery")}>Explore More →</button>
      </div>
    </div>
  );
}