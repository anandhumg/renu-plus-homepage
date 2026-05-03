import Image from "next/image";
import Link from "next/link";

export default function InvestmentDetail() {
  return (
    <section className="md:my-20 my-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-16 gap-6 items-center">
          <div className="relative w-full h-[400px] md:h-[600px]">
            <Image
              src="/about-us/img-3.png"
              alt="Smart Investment"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-head lg:text-[40px] text-[30px] mb-8">
              Beat Inflation With Exclusive Savings
            </h2>
            <div className="text-body space-y-8 mb-8 text-[18px] leading-[1.6]">
              <p>
                In today's climate of rising prices and inflation, our membership provides a much-needed financial reprieve, helping you make ends meet while enjoying the benefits of significant savings.
              </p>
            </div>
            <Link href="/sign-up-login" className="bg-primary text-[18px] text-white px-6 py-3 rounded-full font-ppmori hover:bg-primary/80 transition-all shadow-md inline-block">
              Join Now & Save
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
