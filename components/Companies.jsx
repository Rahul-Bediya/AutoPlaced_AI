import Image from "next/image";

export default function Companies() {
  const logos = [
    { src: "/forbes.png", alt: "Forbes" },
    { src: "/yahoo.png", alt: "Yahoo" },
    { src: "/entrepreneur.png", alt: "Entrepreneur" },
    { src: "/cnn.png", alt: "CNN" },
    { src: "/hp.png", alt: "HP" },
  ];

  // Duplicate the list so the scroll looks seamless
  const scrollingLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden relative mt-16 mx-30 opacity-80">
      <div className="flex animate-scroll">
        {scrollingLogos.map((logo, i) => (
          <div key={i} className="flex items-center justify-center mx-8">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={60}
              height={20}
              className="grayscale hover:grayscale-0 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
