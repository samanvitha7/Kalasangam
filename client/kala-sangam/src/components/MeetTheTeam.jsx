const team = [
  {
    name: "Shreya (Queen ♛)",
    role: "Frontend + Content",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Playing_card_heart_Q.svg",
    funFact: "Knows 4 languages & crocheted the team mascot!"
  },
  {
    name: "Raj (King ♚)",
    role: "Backend + Auth",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Playing_card_spade_K.svg",
    funFact: "Once debugged code at a wedding."
  },
  {
    name: "Ishaan (Ace ♠)",
    role: "Fullstack + Mongo",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Playing_card_club_A.svg",
    funFact: "Owns a flute signed by Hariprasad Chaurasia."
  },
  {
    name: "Meera (Jack ♜)",
    role: "Frontend + Design",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Playing_card_diamond_J.svg",
    funFact: "Can draw perfect rangolis with her non-dominant hand."
  }
];

function MeetTheTeam() {
  return (
    <section className="bg-[#fdfdfd] py-14 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>
      <div className="grid gap-8 md:grid-cols-4 sm:grid-cols-2 justify-items-center">
        {team.map((member, idx) => (
          <div key={idx} className="perspective w-56 h-80 cursor-none">
            <div className="relative w-full h-full duration-500 transform-style-preserve-3d transition-transform hover:rotate-y-180">
              {/* Front Side */}
              <div className="absolute w-full h-full bg-white rounded-lg shadow-md backface-hidden flex flex-col items-center p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-48 object-contain mb-4"
                />
                <h3 className="font-semibold text-xl">{member.name}</h3>
                <p className="text-base text-gray-600">{member.role}</p>
              </div>
              {/* Back Side */}
              <div className="absolute w-full h-full bg-orange-100 rounded-lg shadow-md backface-hidden rotate-y-180 flex items-center justify-center p-6 text-center">
                <p className="text-lg italic">“{member.funFact}”</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MeetTheTeam;
