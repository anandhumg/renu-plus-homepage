"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Leaf1 from "../../../public/common/leaf.svg";

export default function MembershipPromo() {
    return (
        <section className="relative w-full bg-[#FAF8F5] py-24 overflow-hidden flex items-center justify-center">
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
                        className="relative w-full md:h-[80vh] md:w-auto aspect-4/3 md:aspect-[0.69] mx-auto flex items-center justify-center order-2 lg:order-1"
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
                        className="flex flex-col items-start text-left space-y-6 lg:max-w-xl order-1 lg:order-2"
                    >
                        <div>
                            <h2 className="text-foreground font-ppmori-semibold lg:text-[48px] md:text-[40px] text-[32px] leading-[52px]">
                                Your <span className="text-head">membership</span><br />
                                Starts now.
                            </h2>
                        </div>

                        <p className="text-[#4B5563] font-ppmori lg:text-[18px] text-[16px] leading-[1.6]">
                            Get ready to shop and SAVE! Your membership will be available instantly as a virtual card through your secure online profile, so you can start building savings right away.
                        </p>

                        {/* Price Tag Box */}
                        <div className="flex items-center gap-6 py-4 px-6 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                            <div className="flex items-baseline gap-1">
                                <span className="lg:text-[42px] md:text-[36px] text-[28px] font-ppmori-semibold text-foreground">$159</span>
                                <span className="text-[18px] font-ppmori text-foreground/60">/year</span>
                            </div>
                            <div className="h-10 w-px bg-gray-200" />
                            <p className="text-sm font-ppmori text-[#4B5563] max-w-[200px]">
                                Annual flat fee. All premier retailer savings included.
                            </p>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/sign-up-login"
                                className="inline-flex items-center justify-center bg-primary hover:bg-[#A3851D] text-white font-ppmori-semibold text-[15px] tracking-wide rounded-full px-8 py-3.5 h-12 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
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
