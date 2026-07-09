"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PartnerHeroBg from "../../../public/become-a-partner/become-a-partner-hero.webp";

export default function BecomeAPartnerHero() {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <section className="relative w-full md:h-screen min-h-[80vh] flex md:items-center items-center justify-start overflow-hidden bg-[#FAF8F5]">
            {/* Background Image centered and fully cover the screen with a seamless loading transition */}
            <Image
                src={PartnerHeroBg}
                alt="Business handshake symbolizing partnership"
                fill
                placeholder="blur"
                onLoad={() => setImageLoaded(true)}
                className={`object-cover object-center md:block hidden z-0 transition-all duration-1200 cubic-bezier(0.34, 1.56, 0.64, 1) ${imageLoaded
                    ? "opacity-100 scale-100 filter blur-0"
                    : "opacity-0 scale-[1.03] filter blur-xl"
                    }`}
                priority
            />

            {/* Gradient overlay for readability on desktop */}
            <div className="absolute inset-0 bg-linear-to-r from-[#FAF8F5] via-[#FAF8F5]/85 to-transparent md:block hidden z-10 w-1/2"></div>

            <div className="relative max-w-7xl mx-auto w-full md:py-0 py-20 px-4 sm:px-6 lg:px-8 z-20 text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col space-y-6 max-w-xl"
                >
                    <div className="flex flex-col space-y-2">
                        <h1 className="font-ppmori-semibold text-foreground text-[2.25rem] md:text-[44px] lg:text-[48px] leading-[1.15]">
                            Join our network of<br />
                            trusted retailers
                        </h1>
                    </div>

                    <p className="text-sub-foreground font-ppmori lg:text-[18px] md:text-[18px] text-[1rem] leading-relaxed max-w-[460px]">
                        Partner with Renu+ and connect with a growing community of members looking for quality products, services, and exclusive experiences. Together, we help create more value for customers across Canada.
                    </p>

                    <div className="pt-2">
                        <Link
                            href="mailto:partner@renuplus.shop?subject=Become%20a%20Partner%20Inquiry"
                            className="inline-flex items-center leading-none justify-center bg-primary hover:bg-primary/90 text-white font-ppmori-semibold text-[18px] rounded-full px-8 py-4 shadow-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            Become a Partner
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
