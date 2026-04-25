import Image from "next/image";
import Link from "next/link";

export default function WhoWeAreHero() {
  return (
    <section className="md:h-screen bg-white md:px-20 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-6 lg:items-center w-full h-full">
        <div className="w-full h-[300px] md:h-[700px] relative">
          <Image src="/about-us/img-1.png" alt="Who We Are" fill className="object-contain" />
        </div>
        <div className="">
          <h1 className="text-head lg:text-[45px] text-[32px] mb-6">
            Membership That Pays for Itself
          </h1>
          <p className="text-body mb-6 text-[18px] leading-[1.6] max-w-xl">
            Renu Plus is a membership designed to help you save on essential purchases. Members enjoy a wide range of discounts at various retailers, suppliers, and vendors, including restaurants, hotels, rental services, etc.
          </p>
        </div>
      </div>
    </section>
  );
}
