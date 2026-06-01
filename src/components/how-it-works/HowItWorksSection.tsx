"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Leaf1 from "../../../public/common/leaf.svg";

const stepsData = [
    {
        id: "01",
        label: "Step 01",
        title: "Join Renu+",
        description:
            "Become a member in minutes through our website or mobile app.",
        buttonText: "Sign Up",
        buttonLink: "/sign-up-login",
        image: "/home/img-1.webp",
        bg: "#FAF8F5",
    },
    {
        id: "02",
        label: "Step 02",
        title: "Access Your Digital Membership",
        description:
            "Your membership card is instantly available in the Renu+ app. Carry your membership wherever you go and access exclusive benefits anytime.",
        buttonText: "Get Card",
        buttonLink: "/sign-up-login",
        image: "/home/img-6.webp",
        bg: "#F5F0E8",
    },
    {
        id: "03",
        label: "Step 03",
        title: "Discover Exclusive Benefits",
        description:
            "Explore trusted partners across multiple lifestyle categories. From wellness and dining to home services and travel, find offers designed around your everyday needs.",
        buttonText: "Discover",
        buttonLink: "/how-it-works",
        image: "/home/img-5.webp",
        bg: "#EFF5F0",
    },
    {
        id: "04",
        label: "Step 04",
        title: "Enjoy Savings & Rewards",
        description:
            "Use your membership with participating partners and start enjoying real value. Save on purchases, access exclusive experiences, and make every membership year worthwhile.",
        buttonText: "Share Life",
        buttonLink: "/how-it-works",
        image: "/how-it-works/img-2.png",
        bg: "#F0EFF5",
    },
];

const CARD_OFFSET = 20; // px gap between stacked cards at top

const sparkIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#bc9c22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
        <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z" />
        <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z" />
    </svg>
);

function Card({ step, index, total, containerProgress }: any) {
    // Each card occupies 1/total of the scroll range
    const segmentSize = 1 / total;
    const start = index * segmentSize;
    const end = (index + 1) * segmentSize;

    // translateY: card enters from below (100vh) and settles at 0
    const y = useTransform(
        containerProgress,
        [start, end],
        ["100vh", "0vh"]
    );

    // When a later card comes in, scale this one down slightly (Apple feel)
    // The scale-down starts when the NEXT card begins entering
    const scaleStart = end;
    const scaleEnd = end + segmentSize;
    const scale = useTransform(
        containerProgress,
        [scaleStart, scaleEnd],
        [1, 0.94]
    );

    // Slight vertical nudge upward as next card stacks
    const stackedY = useTransform(
        containerProgress,
        [scaleStart, scaleEnd],
        ["0%", `-${CARD_OFFSET}px`]
    );

    // Combine y (entry) and stackedY (being pushed up)
    // For the first card (index 0), it's always visible, only scales/nudges
    const isFirst = index === 0;

    return (
        <div
            className="sticky top-20 h-[90vh] w-full flex items-center justify-center overflow-hidden"
            style={{ zIndex: index + 1 }}
        >
            <motion.div
                style={{
                    y: isFirst ? stackedY : y,
                    scale: index < total - 1 ? scale : 1,
                    transformOrigin: "top center",
                }}
                className="absolute inset-0 will-change-transform"
            >
                {/* Full-screen background */}
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: "#ffffff" }}
                />

                {/* Leaf decoration */}
                <div className="absolute top-0 left-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                    <Image src={Leaf1} alt="Leaf" fill className="object-contain" />
                </div>
                {/* Decorative leaf bottom-right */}
                <div className="absolute bottom-0 right-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                    <Image src={Leaf1} alt="Leaf" fill className="object-contain rotate-180" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full w-full flex items-center justify-center px-6 md:px-16 lg:px-24">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 w-full max-w-7xl">
                        {/* Image */}
                        <div className="relative aspect-[0.8] w-[480px] h-auto overflow-hidden rounded-3xl">
                            <Image
                                src={step.image}
                                alt={step.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-[#4B5563] font-ppmori text-[16px]">
                                    {step.label}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-[36px] font-ppmori-semibold text-foreground mb-6">
                                {step.title}
                            </h2>

                            <p className="text-[#4B5563] text-[16px] font-normal font-ppmori mb-10 max-w-sm leading-[24px] tracking-[0px]">
                                {step.description}
                            </p>

                            <Link
                                href={step.buttonLink}
                                className="inline-flex w-fit items-center justify-center rounded-full bg-[#bc9c22] hover:bg-[#a98a1d] active:scale-95 text-white px-6 py-3 font-ppmori-semibold text-[18px] transition-all duration-200"
                            >
                                <span className="leading-none translate-y-[0.5px]">
                                    Join now
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function HowItWorksSection() {
    const containerRef = useRef(null);
    const total = stepsData.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section
            ref={containerRef}
            className="relative"
            // Each card gets 1 viewport-height of scroll; first card is already visible
            // so we need (n-1) extra scroll lengths + a little buffer for last scale
            style={{ height: `${(total + 0.5) * 100}vh` }}
        >
            {stepsData.map((step, index) => (
                <Card
                    key={step.id}
                    step={step}
                    index={index}
                    total={total}
                    containerProgress={scrollYProgress}
                />
            ))}
        </section>
    );
}