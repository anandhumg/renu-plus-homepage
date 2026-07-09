"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Leaf from "../../../public/common/leaf.svg";
import TargetIcon from "../../../public/become-a-partner/arrow.svg";
import ShoppingBagIcon from "../../../public/become-a-partner/bag.svg";
import MegaphoneIcon from "../../../public/become-a-partner/mic.svg";

const partnerReasons = [
    {
        title: "Reach engaged members",
        description: "Connect with a growing community of members seeking trusted products and services.",
        icon: TargetIcon,
    },
    {
        title: "Increase sales opportunities",
        description: "Attract new customers and encourage repeat business through exclusive member benefits.",
        icon: ShoppingBagIcon,
    },
    {
        title: "Increase brand visibility",
        description: "Showcase your business across the Renu+ website and mobile app.",
        icon: MegaphoneIcon,
    }
];

export default function WhyPartner() {
    return (
        <section className="relative w-full md:py-36 py-20 bg-white overflow-hidden">
            {/* Faint leaf decorator top-left */}
            <div className="absolute top-0 left-0 md:w-48 w-32 md:h-48 h-32 opacity-[0.15] md:opacity-[0.25] pointer-events-none select-none">
                <Image src={Leaf} alt="" fill className="object-contain" />
            </div>

            {/* Faint leaf decorator bottom-right */}
            <div className="absolute bottom-0 right-0 md:w-48 w-32 md:h-48 h-32 opacity-[0.15] md:opacity-[0.25] pointer-events-none select-none rotate-180">
                <Image src={Leaf} alt="" fill className="object-contain" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-foreground font-ppmori-semibold lg:text-[40px] text-[2rem] leading-tight"
                    >
                        Why partner with<br />Renu+
                    </motion.h2>
                </div>

                {/* Reason Columns */}
                <div className="flex md:flex-row flex-col items-center md:items-start justify-between md:space-x-12 lg:space-x-20 space-y-12 md:space-y-0">
                    {partnerReasons.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
                            className="flex flex-col items-center text-center max-w-[207px]"
                        >
                            {/* Gold Thin Border Circle Container around 3D Image Icon */}
                            <div className="flex items-center justify-center rounded-full relative mb-6">
                                <div className="relative aspect-square w-[114px] h-auto">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            <h3 className="font-ppmori-semibold text-head lg:text-[22px] text-[18px] mb-3 leading-snug">
                                {item.title}
                            </h3>

                            <p className="text-sub-foreground font-ppmori text-[15px] md:text-[16px] leading-[1.6] max-w-[260px]">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
