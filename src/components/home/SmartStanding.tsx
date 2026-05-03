import Image from "next/image";
import RenuCardImage from "../../../public/home/img-2.webp"
import Link from "next/link";
export default function SmartStanding() {
    const price = process.env.NEXT_PUBLIC_PACKAGE_PRICE || "49";
    return (
        <section className="pt-20 bg-background">
            <div className="max-w-7xl mx-auto md:px-20 px-4">
                <div className="text-center mb-12 ">
                    <p className="md:text-[50px] text-[32px] font-ppmori-semibold text-foreground leading-[52px]">Your gateway to </p>
                    <p className="md:text-[50px] text-[32px] font-ppmori-semibold text-head">Smarter Spending.</p>
                    <p className="text-[20px] text-sub-foreground font-ppmori my-8">Affordable price & Unlimited savings</p>
                    <div className="flex items-center justify-center">
                        <span className="text-[40px] text-foreground font-ppmori-semibold">${price}</span>
                        <span className="text-[24px] text-foreground font-ppmori">/Year</span>
                    </div>
                </div>
                <div className="mx-auto md:ml-4 md:px-10 px-4 flex gap-10 font-ppmori text-head text-[20px] justify-center">
                    <p className="">Access to 200+ retail stores</p>
                    <p>|</p>
                    <p>Digital discount ID card</p>
                    <p>|</p>
                    <p>Exclusive membership discounts</p>
                </div>
                <div className="my-10 flex justify-center">
                    <Link href="/" className="bg-primary text-[18px] font-ppmori-semibold flex justify-center items-center text-white px-6 py-2  rounded-full font-ppmori hover:bg-primary/80 transition-colors inline-block">
                        <span className="mt-0.5">
                            Subscribe Now
                        </span>
                    </Link>
                </div>
                <div className="flex justify-center  mt-20 ml-10">
                    <div className="relative aspect-[1.06] md:h-screen md:w-auto w-full h-full">
                        <Image src={RenuCardImage} alt="Smart Standing" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </section>
    );
}