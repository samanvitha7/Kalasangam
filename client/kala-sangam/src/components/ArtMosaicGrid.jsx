import MosaicTile from "./MosaicTile";

const artPieces = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoK78W6bIzABlHy_kfeuDHEughK0SbYA6QeQ&s",
    title: "Dancing Peacock",
    artist: "Ravi Shankar",
    description: "A vibrant depiction of a dancing peacock in traditional colors.",
  },
  {
    src: "/art2.jpg",
    title: "Temple Sculpture",
    artist: "Anjali Gupta",
    description: "Intricate carvings from an ancient temple in South India.",
  },
  {
    src: "/art3.jpg",
    title: "Rangoli Patterns",
    artist: "Meera Patel",
    description: "Colorful rangoli art made during festive celebrations.",
  },
  // add more pieces here
];

export default function MosaicGrid() {
  return (
    <section
      id="showcase"
      className="p-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
      style={{ perspective: "600px" }}
    >
      {artPieces.map(({ src, title, artist, description }, idx) => (
        <div
          key={idx}
          className="w-full aspect-square rounded-lg shadow-lg overflow-hidden bg-[#fef3c7]"
        >
          <MosaicTile src={src} title={title} artist={artist} description={description} />
        </div>
      ))}
    </section>
  );
}
