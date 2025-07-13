import WhyWeBuiltThis from "../components/WhyBuilt.jsx";
import MeetTheTeam from "../components/MeetTheTeam.jsx";
import ContactUsSection from '../components/ContactUs.jsx';

function About() {
  return (
    <div className="bg-white text-gray-800">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto">
          A passion project to bridge tradition and tech by four creatively chaotic minds.
        </p>
      </div>

      <WhyWeBuiltThis />
      <MeetTheTeam />
      <ContactUsSection />
    </div>
  );
}

export default About;
