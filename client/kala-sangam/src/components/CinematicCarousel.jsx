import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
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
    if (!el) return;

    let animationId;
    let isUserInteracting = false;

    // Check if user is interacting with the carousel
    const handleInteractionStart = () => {
      isUserInteracting = true;
    };

    const handleInteractionEnd = () => {
      setTimeout(() => {
        isUserInteracting = false;
      }, 1000); // Resume auto-scroll after 1 second
    };

    // Smooth auto-scroll function
    const autoScroll = () => {
      if (!isUserInteracting && el.scrollWidth > 0) {
        el.scrollLeft += 1;
        
        // Reset to beginning when reaching the end (accounting for duplicated content)
        if (el.scrollLeft >= (el.scrollWidth - el.clientWidth) / 2) {
          el.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    // Add interaction listeners
    el.addEventListener('mousedown', handleInteractionStart);
    el.addEventListener('touchstart', handleInteractionStart);
    el.addEventListener('mouseup', handleInteractionEnd);
    el.addEventListener('touchend', handleInteractionEnd);
    el.addEventListener('mouseleave', handleInteractionEnd);

    // Start animation
    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener('mousedown', handleInteractionStart);
      el.removeEventListener('touchstart', handleInteractionStart);
      el.removeEventListener('mouseup', handleInteractionEnd);
      el.removeEventListener('touchend', handleInteractionEnd);
      el.removeEventListener('mouseleave', handleInteractionEnd);
    };
  }, []);

  return (
    <>
      <div className="cinema-wrapper bg-[#F8E6DA] min-h-screen">
        <div className="cinema-track" ref={scrollRef} style={{marginTop: '4vh'}}>
          {[...artworks, ...artworks].map((art, i) => (
            <div key={i + art.image} className="cinema-slide">
              <img src={art.image} alt="Artwork" className="cinema-image" />
            </div>
          ))}
        </div>
        
        <div className="cinema-fade" />
        
        <div className="cinema-bottom-wrapper mt-4 mb-24 text-center">
          <h1 className="text-5xl font-dm-serif mb-4 drop-shadow-lg bg-gradient-to-r from-[#134856] to-[#e05264] bg-clip-text text-transparent">
            Beyond the Frame
          </h1>
          <button 
            className="bg-gradient-to-r from-[#134856] to-[#e05264] text-white px-8 py-2 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-lora"
            onClick={() => navigate("/gallery")}
          >
            Explore Gallery →
          </button>
        </div>
      </div>
      
      {/* Fixed Footer that overlays content */}
      <div className="fixed bottom-0 left-0 w-full z-40">
        <Footer />
      </div>
    </>
  );
}