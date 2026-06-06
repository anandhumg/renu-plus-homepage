"use client";

import { useState } from "react";
import Image from "next/image";
import HIWbg from "../../../public/how-it-works/img-1.webp";
import { motion } from "framer-motion";

export default function HIWhero() {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <section className="relative w-full h-screen flex md:items-center items-end justify-start overflow-hidden bg-[#FAF8F5]">
            {/* Background Image centered and fully cover the screen with a seamless loading transition */}
            <Image
                src={HIWbg}
                alt="Bearded man leaning on a bicycle, overlooking a sunset"
                fill
                placeholder="blur"
                onLoad={() => setImageLoaded(true)}
                className={`object-cover object-center z-0 transition-all duration-1200 cubic-bezier(0.34, 1.56, 0.64, 1) ${imageLoaded
                    ? "opacity-100 scale-100 filter blur-0"
                    : "opacity-0 scale-[1.03] filter blur-xl"
                    }`}
                priority
            />

            <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-20 text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col space-y-6"
                >
                    <h1 className="font-ppmori-semibold text-foreground text-[40px] md:text-[44px] lg:text-[48px] leading-[1.1]">
                        How Renu+ Works
                    </h1>
                    <p className="text-[#1F2937] font-ppmori lg:text-[18px] md:text-[18px] text-[16px] max-w-[419px]">
                        One membership, hundreds of opportunities to save, explore, and enjoy more from everyday life.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}


