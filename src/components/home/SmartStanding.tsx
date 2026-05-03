import Image from "next/image";
import RenuCardImage from "../../../public/home/img-2.webp"
import Link from "next/link";
export default function SmartStanding() {
    const price = process.env.NEXT_PUBLIC_PACKAGE_PRICE || "49";
    return (
        <section className="pt-20 bg-background">
            <div className="max-w-7xl mx-auto md:px-20 px-4">
                <div className="text-center mb-12 ">
                    <p className="md:text-[50px] text-[30px] font-ppmori-semibold text-foreground md:leading-13 leading-10">Your gateway to </p>
                    <p className="md:text-[50px] text-[30px] font-ppmori-semibold text-head">Smarter Spending.</p>
                    <p className="md:text-[20px] text-[15px] text-sub-foreground font-ppmori md:my-8 my-4">Affordable price & Unlimited savings</p>
                    <div className="flex items-center justify-center">
                        <span className="text-[40px] text-foreground font-ppmori-semibold">${price}</span>
                        <span className="text-[24px] text-foreground font-ppmori">/Year</span>
                    </div>
                </div>
                <div className="md:flex hidden mx-auto md:ml-4 md:px-10 px-4 gap-10 font-ppmori text-head text-[20px] justify-center">
                    <p className="">Access to 200+ retail stores</p>
                    <p>|</p>
                    <p>Digital discount ID card</p>
                    <p>|</p>
                    <p>Exclusive membership discounts</p>
                </div>
                <div className="flex md:hidden mx-auto font-ppmori text-head text-[16px] justify-center items-center">
                    <ul className="list-disc space-y-4">
                        <li>Access to 200+ retail stores</li><li>Digital discount ID card</li><li>Exclusive membership discounts</li>
                    </ul>
                </div>
                <div className="my-10 flex justify-center">
                    <button className="bg-primary text-[18px] font-ppmori-semibold text-white px-6 py-3 h-12  rounded-full  hover:bg-primary/80 transition-colors cursor-pointer">
                        Subscribe Now
                    </button>
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