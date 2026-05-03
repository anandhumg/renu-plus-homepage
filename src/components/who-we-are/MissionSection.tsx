import Image from "next/image";
import Link from "next/link";

export default function MissionSection() {
  return (
    <section className="lg:py-24 py-10 bg-[#f9f6f4] md:mt-20 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-16 gap-6 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-head lg:text-[40px] text-[30px] mb-8">
              Your Smartest Investment Yet
            </h2>
            <div className="text-body space-y-6 text-[18px] leading-[1.6] mb-6">
              <p>
                For an annual fee of $159, you can easily recoup your investment with just one transaction,
                thanks to the extensive savings available. Whether you're starting a home renovation project,
                pursuing fitness goals, or refreshing your wardrobe, Renu Plus offers valuable support in
                achieving your aspirations.
              </p>
            </div>
            <Link href="/sign-up-login" className="bg-primary text-[18px] text-white px-6 py-3 rounded-full font-ppmori hover:bg-primary/80 transition-all shadow-md inline-block">
              Join Now & Save
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative w-full h-[400px] md:h-[700px]">
            <Image
              src="/about-us/img-2.png"
              alt="Our Mission"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
