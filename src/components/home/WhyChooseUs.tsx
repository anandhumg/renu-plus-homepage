import Image from "next/image";
import Link from "next/link";

export default function WhyChooseUs() {
    return (
        <section>
            <div className="max-w-7xl md:mt-20 mt-10 mx-auto px-4 md:px-8 grid lg:grid-cols-2 grid-cols-1 items-center gap-5">
                <div>
                    <Image src="/home/img-3.png" alt="Why Choose Us" width={500} height={500} className="object-cover h-full" />
                </div>
                <div className="">
                    <h2 className="text-head lg:text-[40px] text-[30px] mb-10">Why Choose Us</h2>
                    <div className="">
                        <div className="flex md:gap-5 gap-3">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#bc9c22" stroke="#bc9c22" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star mt-1.5"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                            </div>
                            <p className="text-body text-[18px] leading-[1.6] mb-10"><span className="font-semibold">Strong Retail Partnerships –</span> Unmatched savings through exclusive retailer relationships.</p>
                        </div>
                        <div className="flex md:gap-5 gap-3">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#bc9c22" stroke="#bc9c22" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star mt-1.5"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                            </div>
                            <p className="text-body text-[18px] leading-[1.6] mb-10"><span className="font-semibold">Wide Discount Network –</span> Deals on building supplies, outdoor living, home accessories, clothing and much more!</p>
                        </div>
                        <div className="flex md:gap-5 gap-3">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#bc9c22" stroke="#bc9c22" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star mt-1.5"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                            </div>
                            <p className="text-body text-[18px] leading-[1.6] mb-10"><span className="font-semibold">Convenient Access –</span> Use your virtual card online and in-store.</p>
                        </div>
                        <Link href="/" className="bg-primary text-[18px] text-white px-6 py-3 rounded-full font-lato hover:bg-primary/80 transition-colors">
                            Learn About Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}