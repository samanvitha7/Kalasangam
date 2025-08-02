import StorytellingScroll from "../components/StorytellingScroll.jsx";
import CinematicCarousel from "../components/CinematicCarousel.jsx";
import ParallaxSection from "../components/ParallaxSection.jsx";
import PulsingEventsCalendar from "../components/PulsingEventsCalendar.jsx";
import LivingArtistMosaic from "../components/LivingArtistMosaic.jsx";
import FullPageScroll from "../components/FullPageScroll.jsx";

export default function Home() {
  return (
    <FullPageScroll>
      {/* Section 1: Hero/Parallax */}
      <div className="relative w-full h-full overflow-hidden">
        <ParallaxSection />
      </div>

      {/* Section 2: Storytelling Scroll */}
      <div className="relative w-full h-full bg-gradient-to-br from-amber-50 to-orange-100">
        <StorytellingScroll />
      </div>

      {/* Section 3: Events Calendar */}
      <div className="relative w-full h-full bg-gradient-to-br from-teal-50 to-cyan-100">
        <PulsingEventsCalendar />
      </div>

      {/* Section 4: Art Showcase */}
      <div className="relative w-full h-full bg-gradient-to-br from-rose-50 to-pink-100">
        <LivingArtistMosaic />
      </div>

      {/* Section 5: Cinematic Carousel with Footer (Final Section) */}
      <div className="relative w-full h-full bg-[#F8E6DA]">
        <CinematicCarousel />
      </div>
    </FullPageScroll>
  );
}
