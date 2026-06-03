"use client";

import Image from "next/image";
import HIWbg from "../../../public/how-it-works/img-1.webp";
import Leaf1 from "../../../public/common/leaf.svg";
import { motion } from "framer-motion";

export default function HIWhero() {
    return (
        <section className="relative w-full min-h-[85vh] bg-[#FAF8F5] flex items-center justify-center pt-28 pb-16 overflow-hidden">
            {/* Decorative background leaf watermark */}
            <div className="absolute top-[-10%] left-[-15%] md:w-60 md:h-60 w-40 h-40 opacity-15 pointer-events-none select-none z-0">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain rotate-30" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col justify-center space-y-6 lg:max-w-xl text-left"
                    >
                        <h1 className="text-foreground font-ppmori-semibold lg:text-[64px] md:text-[50px] text-[36px] leading-[1.1]">
                            How Renu <br />
                            <span className="text-head">Works.</span>
                        </h1>
                        <p className="text-sub-foreground font-ppmori lg:text-[22px] md:text-[18px] text-[16px] leading-[1.5] text-[#4B5563]">
                            A simple guide to unlocking savings, exclusive benefits, and more.
                        </p>
                    </motion.div>

                    {/* Right: Image displaying the Sunset & Bearded Man with a Bicycle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl shadow-black/5"
                    >
                        <Image
                            src={HIWbg}
                            alt="Bearded man leaning on a bicycle, overlooking a sunset"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
