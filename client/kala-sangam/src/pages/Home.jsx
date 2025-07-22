import StorytellingScroll from "../components/StorytellingScroll.jsx";
import CinematicCarousel from "../components/CinematicCarousel.jsx";
import IndiaMap from "../components/IndiaMap.jsx";
import ParallaxSection from "../components/ParallaxSection.jsx";
import PulsingEventsCalendar from "../components/PulsingEventsCalendar.jsx";
import LivingArtistMosaic from "../components/LivingArtistMosaic.jsx";
export default function Home({ showMap, mapRef, onStateClick }) {

  return (
<main className="relative w-full overflow-x-hidden  text-center font-lora bg-gradient-to-b from-[#fff5f2] via-blushpeach to-[#fce6da]
">
      {/* Fullscreen Parallax Section */}
      <div className="w-full overflow-hidden">
        <ParallaxSection />
      </div>

      <CinematicCarousel />
      <StorytellingScroll />
      
      {/* Cultural Events Calendar Section */}
      <PulsingEventsCalendar />
      
      {/* Living Artist Mosaic Section */}
      <LivingArtistMosaic />

      {showMap && (
        <div
          id="india-map"
          ref={mapRef}
          className="mt-16 flex items-center justify-center p-6"
        >
          <IndiaMap onStateClick={onStateClick} />
        </div>
      )}
    </main>
  );
}
