import Image from "next/image";
import Link from "next/link";

export default function WhoWeAreHero() {
  return (
    <section className="h-screen bg-[#e7dad1]">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-6 lg:items-center w-full h-full">
        <div className="w-full h-full relative">
          <Image src="/who-we-are/hero.jpg" alt="Who We Are" fill className="object-cover" />
        </div>
        <div className="px-4">
          <h1 className="text-head lg:text-[45px] text-[32px] mb-6">
            Who We Are
          </h1>
          <p className="text-body mb-6 max-w-xl">
            Renu Plus is a membership designed to help you save on essential purchases. Members enjoy a wide range of discounts at various retailers, suppliers, and vendors, including restaurants, hotels, rental services, and much more.
          </p>
          <Link href="/sign-up-login" className="bg-primary text-[18px] text-white px-8 py-4 rounded-full font-lato hover:bg-primary/80 transition-all shadow-md inline-block">
            Join Now & Save
          </Link>
        </div>
      </div>
    </section>
  );
}
