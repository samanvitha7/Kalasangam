import WhyWeBuiltThis from "../components/WhyBuilt.jsx";
import MeetTheTeam from "../components/MeetTheTeam.jsx";
import ContactUsSection from "../components/ContactUs.jsx";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-[#FFF4E0] via-[#FFE0B5] to-[#FFD6A5] text-[#462F1A]">
      
     
      <section className="text-center py-20 px-6 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-[#f5c796] rounded-full blur-3xl opacity-30 top-0 left-0 animate-pulse"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold font-[Yatra One] mb-6 drop-shadow-lg">
          About KalaSangam 
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-[#5c3d24] font-medium">
          A creative collision of heritage and code — built by four passionate minds who believe India’s artistic soul belongs in every pixel.
        </p>
      </section>

   
      <section className="bg-white rounded-3xl shadow-xl mx-6 md:mx-20 my-10 p-8 md:p-12">
        <WhyWeBuiltThis />
      </section>

     
      <div className="w-full overflow-hidden">
        <svg className="w-full h-24" viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M-0.00,49.98 C150.00,150.00 349.64,-49.98 500.00,49.98 L500.00,150.00 L-0.00,150.00 Z" 
            style={{ stroke: "none", fill: "#fff" }}></path>
        </svg>
      </div>

      <section className="bg-[#fff4e8] rounded-3xl shadow-xl mx-6 md:mx-20 mb-10 p-8 md:p-12">
        <MeetTheTeam />
      </section>

    
      <div className="h-1 mx-16 rounded-full bg-gradient-to-r from-[#ffc799] to-[#e6a97b] my-8"></div>

      <section className="bg-white rounded-3xl shadow-xl mx-6 md:mx-20 mb-14 p-8 md:p-12">
        <ContactUsSection />
      </section>
    </div>
  );
}
