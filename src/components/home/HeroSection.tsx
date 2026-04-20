import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="h-screen bg-[#e7dad1]">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-6 lg:items-center w-full h-full">
        <div className="w-full h-full relative">
          <Image src="/home/img-1.jpg" alt="Hero Image" fill className="object-cover" />
        </div>
        <div className="px-4">
          <h2 className="lg:text-[45px] text-[32px] font-kaisei font-medium text-black leading-[1.2] mb-6">
            Discover the Power of Stretching Your Dollar With Renu Plus
          </h2>
          <p className="text-body lg:text-[22px] text-[18px] font-lato font-medium text-black mb-6">
            Enjoy Unbeatable Savings on Home Reno Projects, Dining, Travel, Home & Personal Essentials and more
          </p>
          <Link href="/" className="bg-primary text-[18px] text-white px-6 py-3 rounded-full font-lato hover:bg-primary/80 transition-colors">
            Start Saving Today
          </Link>
        </div>
      </div>
    </section>
  );
}
