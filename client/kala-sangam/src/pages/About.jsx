import WhyWeBuiltThis from "../components/WhyBuilt.jsx";
import MeetTheTeam from "../components/MeetTheTeam.jsx";
import ContactUsSection from "../components/ContactUs.jsx";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-[#FFF4E0] via-[#FFE0B5] to-[#FFD6A5] text-[#462F1A]">
      {/* Full Bleed Divider */}
      <div className="w-full h-20 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 via-blue-600/20 to-indigo-700/20"></div>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0L50,10C100,20,200,40,300,45C400,50,500,40,600,35C700,30,800,30,900,35C1000,40,1100,50,1150,55L1200,60L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#14b8a6" 
            opacity="0.8"
          />
          <path d="M0,20L50,25C100,30,200,40,300,42C400,45,500,40,600,38C700,35,800,35,900,40C1000,45,1100,55,1150,60L1200,65L1200,120L1150,120C1100,120,1000,120,900,120C800,120,700,120,600,120C500,120,400,120,300,120C200,120,100,120,50,120L0,120Z" 
            fill="#3b82f6"
            opacity="0.9"
          />
        </svg>
      </div>
      
      <section className="text-center py-20 px-6 relative overflow-hidden pt-12">
        <div className="absolute w-96 h-96 bg-[#f5c796] rounded-full blur-3xl opacity-30 top-0 left-0 animate-pulse"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold font-[Yatra One] mb-6 drop-shadow-lg">
          About KalaSangam 
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-[#5c3d24] font-medium">
          A creative collision of heritage and code — built by four passionate minds who believe India's artistic soul belongs in every pixel.
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
    <ContactUsSection />
    <svg className="w-full h-16" viewBox="0 0 500 150" preserveAspectRatio="none">
      <path d="M0,0 C150,100 350,0 500,100 L500,00 L0,0 Z" fill="#fff4e8" />
    </svg>

    </div>
  );
}
