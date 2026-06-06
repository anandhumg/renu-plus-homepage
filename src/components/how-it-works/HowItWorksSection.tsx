"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Leaf1 from "../../../public/common/leaf.svg"


type Step = {
    id: string;
    label: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    bg: string;
};

const stepsData: Step[] = [
    {
        id: "01",
        label: "Step 01",
        title: "Join Renu+",
        description: "Become a member in minutes through our website or mobile app.",
        buttonText: "Join now",
        buttonLink: "/sign-up-login",
        image: "/how-it-works/step-1.png",
        bg: "#FFFFFF",
    },
    {
        id: "02",
        label: "Step 02",
        title: "Access Your Digital Membership",
        description: "Your membership card is instantly available in the Renu+ app. Carry your membership wherever you go and access exclusive benefits anytime.",
        buttonText: "Join now",
        buttonLink: "/sign-up-login",
        image: "/how-it-works/step-2.png",
        bg: "#FFFFFF",
    },
    {
        id: "03",
        label: "Step 03",
        title: "Discover Exclusive Benefits",
        description: "Explore trusted partners across multiple lifestyle categories. From wellness and dining to home services and travel, find offers designed around your everyday needs.",
        buttonText: "Join now",
        buttonLink: "/how-it-works",
        image: "/how-it-works/step-3.png",
        bg: "#FFFFFF",
    },
    {
        id: "04",
        label: "Step 04",
        title: "Enjoy Savings & Rewards",
        description: "Use your membership with participating partners and start enjoying real value. Save on purchases, access exclusive experiences, and make every membership year worthwhile.",
        buttonText: "Join now",
        buttonLink: "/how-it-works",
        image: "/how-it-works/step-4.png",
        bg: "#FFFFFF",
    },
];

export default function HowItWorks() {
    const [activeIndex, setActiveIndex] = useState(0);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Use IntersectionObserver to track which text block is actively in the center of the screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute("data-index"));
                        setActiveIndex(index);
                    }
                });
            },
            {
                // This creates a horizontal tripwire in the middle of the screen
                rootMargin: "-40% 0px -50% 0px",
                threshold: 0,
            }
        );

        const validRefs = stepRefs.current.filter(Boolean);
        validRefs.forEach((ref) => observer.observe(ref as HTMLDivElement));

        return () => {
            validRefs.forEach((ref) => observer.unobserve(ref as HTMLDivElement));
        };
    }, []);

    // The Framer Motion variants that replicate the original CSS keyframes perfectly
    const imageVariants = {
        active: {
            y: "0%",
            filter: "brightness(1)",
        },
        prev: {
            // Slides up slightly and dims when scrolled past
            y: "-11rem",
            filter: "brightness(0.5)",
        },
        next: {
            // Hides below the container waiting to be scrolled into view
            y: "100%",
            filter: "brightness(1)",
        },
    };

    // The exact easing curve from the original reference for that weighted, premium feel
    const customTransition = {
        duration: 0.8,
        delay: 0.1,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // cubic-bezier(0.4, 0, 0.2, 1)
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 relative">
            <div className="max-w-[1248px] mx-auto">

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
                    {/* Left Side: Sticky Image Track (Hidden on Mobile) */}
                    {/* The sticky wrapper */}
                    <div className="hidden md:block sticky top-25 w-full aspect-[0.8] overflow-hidden">
                        {stepsData.map((step, index) => {
                            // Determine the state of each image based on the active index
                            let state = "next";
                            if (index === activeIndex) state = "active";
                            else if (index < activeIndex) state = "prev";

                            return (
                                <motion.div
                                    key={`img-${step.id}`}
                                    variants={imageVariants}
                                    initial="next"
                                    animate={state}
                                    transition={customTransition}
                                    className="absolute inset-0 w-full h-full overflow-hidden"
                                    style={{ zIndex: index }}
                                >
                                    {/* Optional: Remove the background color div if your images are edge-to-edge */}
                                    <div className="relative w-full h-[80%] flex items-center justify-center  ">
                                        <Image
                                            src={step.image}
                                            alt={step.title}
                                            fill
                                            className="object-contain  rounded-2xl"
                                            // Dev fallback placeholder if images aren't added yet
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Side: Scrolling Text Track */}
                    <div className="flex flex-col pb-24">
                        {stepsData.map((step, index) => (
                            <motion.div
                                key={`text-${step.id}`}
                                data-index={index}
                                ref={(el) => {
                                    stepRefs.current[index] = el;
                                }}
                                // Space the text blocks out so they scroll naturally
                                className="flex flex-col justify-center min-h-[80vh] md:min-h-0 md:h-[80vh] mb-12 md:mb-0 py-8"
                                animate={{
                                    opacity: activeIndex === index ? 1 : 0.3,
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                {/* Mobile Image Fallback (Only shows on small screens) */}
                                <div className="md:hidden w-full aspect-square rounded-2xl overflow-hidden mb-8 relative">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover  rounded-2xl"
                                    />
                                </div>

                                <span className="text-sm font-semibold text-gray-500 mb-3 block">
                                    {step.label}
                                </span>
                                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
                                    {step.description}
                                </p>

                                <div>
                                    <Link
                                        href={step.buttonLink}
                                        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-200"
                                    >
                                        {step.buttonText}
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}