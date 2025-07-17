import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./CinematicCarousel.css";

const artworks = [
  { image: "https://i.pinimg.com/1200x/d4/dc/ee/d4dcee77886a35fc2333c100ee26c667.jpg" },
  { image: "https://i.pinimg.com/1200x/88/41/5c/88415c91056485ac21cf9cc57d77c9fc.jpg" },
  { image: "https://i.pinimg.com/1200x/f5/8e/76/f58e769d404b7a9ff15b04b3b42a42cb.jpg" },
  { image: "https://i.pinimg.com/736x/f0/7a/28/f07a28ec5b5d3082c88fdaa80bf4caed.jpg" },
  { image: "https://i.pinimg.com/736x/09/1e/05/091e051ebfa23b9379cfe0746965d0d2.jpg" },
  { image: "https://i.pinimg.com/736x/2e/cb/2b/2ecb2bb96ddc93835f955677d58917ef.jpg" },
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