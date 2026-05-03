import Image from "next/image";

export default function PartnerLogos() {
  const logos = [
    { src: "/partner-logos/expertVoice.png", alt: "Expert Voice" },
    { src: "/partner-logos/lordco.png", alt: "Lordco" },
    { src: "/partner-logos/rona.png", alt: "Rona" },
    { src: "/partner-logos/slegg.png", alt: "Slegg" },
    { src: "/partner-logos/sunbelt.png", alt: "Sunbelt" },
    { src: "/partner-logos/united-rentals.png", alt: "United Rentals" },
    { src: "/partner-logos/wolseley.png", alt: "Wolseley" }
  ];

  // Double the logos for a flawless infinite scroll loop
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="bg-white pt-30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 text-center w-full">
        <div className="text-foreground font-ppmori-semibold lg:text-[16px] text-[16px] mb-6">
          A Network of Trusted <span className="text-head">Partners</span>
        </div>
      </div>
      <div className="w-full relative">
        {/* Added a subtle gradient overlay to fade the edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-infinite-scroll gap-20 items-center pr-20">
          {doubledLogos.map((logo, index) => (
            <div
              key={`logo-${index}`}
              className="relative h-14 w-auto flex items-center justify-center hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={60}
                className="object-contain max-h-14 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
