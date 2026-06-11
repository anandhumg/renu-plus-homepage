"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Leaf1 from "../../../public/common/leaf.svg";
import { CheckIcon } from "lucide-react";

export default function MembershipPromo() {
    const benefits = [
        "Exclusive discounts from trusted partner retailers",
        "Access to home, lifestyle, and wellness services",
        "Digital membership card for seamless savings",
        "Curated offers and member-only experiences",
        "Benefits that grow as our partner network expands"
    ]
    return (
        <section className="relative w-full bg-white py-24 overflow-hidden flex items-center justify-center">
            {/* Decorative background leaf watermark top-right */}
            <div className="absolute top-[-10%] right-[-10%] md:w-80 md:h-80 w-40 h-40 opacity-[0.06] pointer-events-none select-none z-0 rotate-45">
                <Image src={Leaf1} alt="Leaf decoration" fill className="object-contain" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-12 items-center">
                    {/* Left Column: Phone Image with Virtual Membership Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-full md:h-[85vh] md:w-auto aspect-[0.69] mx-auto hidden md:flex items-center justify-center"
                    >
                        {/* We use /home/img-2.webp which is the hand holding the virtual card phone preview */}
                        <Image
                            src="/how-it-works/img-3.webp"
                            alt="Renu Plus digital membership card on a mobile screen"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>

                    {/* Right Column: Title, Price description, and Join Now button */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-start text-left lg:max-w-xl"
                    >
                        <div>
                            <h2 className="text-foreground font-ppmori-semibold lg:text-[48px] md:text-[40px] text-[2rem] md:leading-[52px] md:mb-0 mb-4">
                                Your <span className="text-head">membership</span><br />
                                Starts now.
                            </h2>
                        </div>
                        <div
                            className="relative w-full aspect-[0.69] md:hidden "
                        >
                            <Image
                                src="/how-it-works/img-3.webp"
                                alt="Renu Plus digital membership card on a mobile screen"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="space-y-5 font-ppmori text-[16px] mt-11">
                            {benefits.map((benefit) => (
                                <div key={benefit} className="flex items-center gap-3">
                                    <CheckIcon />
                                    <span className="text-foreground font-ppmori-regular text-[16px] leading-[24px]">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {/* Price Tag Box */}
                        <div className="flex justify-center md:justify-start items-baseline md:mt-14 mt-8 md:text-left text-center w-full">
                            <span className="font-ppmori-semibold md:text-[60px] text-[40px]">${process.env.NEXT_PUBLIC_PACKAGE_PRICE}</span><span className="font-ppmori text-[32px]">/year</span>
                        </div>
                        <div className="md:mt-10 mt-8 w-full">
                            <Link
                                href="/sign-up-login"
                                className="inline-flex items-center md:w-[410px] w-full leading-0 justify-center bg-primary hover:bg-[#A3851D] text-white font-ppmori-semibold text-[18px] rounded-full px-8 py-3.5 h-12 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                            >
                                Join Renu Plus
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
