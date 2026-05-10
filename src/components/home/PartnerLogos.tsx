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

  const doubledLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="bg-white md:py-20 py-12 overflow-hidden">
      <div className=" mx-auto px-4 lg:px-10">

        {/* Wrapper */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">

          {/* Heading */}
          <div className="shrink-0">
            <div className="text-[#030712] font-ppmori text-[16px] leading-[22px]">
              Partnered with leading <br /> retailers across Canada
            </div>
          </div>

          {/* Logos */}
          <div className="relative overflow-hidden flex-1">
            {/* Gradient overlays */}
            <div className="absolute inset-y-0 left-0 md:w-20 w-8 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 md:w-20 w-8 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-infinite-scroll md:gap-20 gap-10 items-center">
              {doubledLogos.map((logo, index) => (
                <div
                  key={`logo-${index}`}
                  className="relative md:h-14 h-8 grayscale hover:grayscale-0 cursor-pointer hover:scale-110 flex items-center justify-center transition-all duration-300"
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

        </div>
      </div>
    </section>
  );
}