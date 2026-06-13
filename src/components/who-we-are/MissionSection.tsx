"use client";

import { useState } from "react";
import Image from "next/image";
import HIWbg from "../../../public/about-us/img-2.webp";
import HIWbgMob from "../../../public/about-us/img-2-mob.webp";
import { motion } from "framer-motion";

export default function MissionSection() {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <section className="relative w-full px-4 md:h-[135vh] h-screen flex justify-center overflow-hidden bg-[#FAF8F5]">
            {/* Background Image centered and fully cover the screen with a seamless loading transition */}
            <Image
                src={HIWbg}
                alt="Bearded man leaning on a bicycle, overlooking a sunset"
                fill
                placeholder="blur"
                onLoad={() => setImageLoaded(true)}
                className={`object-cover object-center md:block hidden z-0 transition-all duration-1200 cubic-bezier(0.34, 1.56, 0.64, 1) ${imageLoaded
                    ? "opacity-100 scale-100 filter blur-0"
                    : "opacity-0 scale-[1.03] filter blur-xl"
                    }`}
                priority
            />
            <Image
                src={HIWbgMob}
                alt="Bearded man leaning on a bicycle, overlooking a sunset"
                fill
                placeholder="blur"
                onLoad={() => setImageLoaded(true)}
                className={`object-cover object-center md:hidden  z-0 transition-all duration-1200 cubic-bezier(0.34, 1.56, 0.64, 1) ${imageLoaded
                    ? "opacity-100 scale-100 filter blur-0"
                    : "opacity-0 scale-[1.03] filter blur-xl"
                    }`}
                priority
            />
            <div className="relative max-w-7xl mx-auto w-full md:mt-[120px] mt-15 z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col space-y-6 items-center"
                >
                    <h1 className="md:block hidden font-ppmori-semibold text-foreground text-[2rem] md:text-[44px] lg:text-[48px] leading-[1.1]">
                        Helping people get<br /> more from everyday life
                    </h1>
                    <h1 className="md:hidden block font-ppmori-semibold text-foreground text-[1.8rem] md:text-[44px] lg:text-[48px] leading-[1.1]">
                        Helping people get more from everyday life
                    </h1>
                    <p className="text-sub-foreground font-ppmori font-light md:text-[16px] text-[1rem] max-w-[391px] px-2">
                        We believe memberships should do more than offer discounts. Renu+ connects people with trusted experiences, curated services, and real lifestyle value designed around modern living.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}


