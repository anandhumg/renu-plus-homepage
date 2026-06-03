"use client"

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import Link from "next/link";
import Leaf1 from "../../../public/common/leaf.svg"
import Image from "next/image";

interface Step {
    id: string;
    label: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    bg: string;
}

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

export default function ScrollSteps() {
    // The image that is fully settled and sitting in layer 0
    const [activeIdx, setActiveIdx] = useState(0);
    // The image currently animating in over the top (layer 1)
    const [incomingIdx, setIncomingIdx] = useState<number | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1);

    // Refs so closures always read fresh values without triggering re-renders
    const activeIdxRef = useRef(0);
    const isAnimatingRef = useRef(false);
    // Queue holds the LATEST requested index — we only ever care about the most recent one
    const pendingIdxRef = useRef<number | null>(null);

    const ref0 = useRef<HTMLDivElement>(null);
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const refs = [ref0, ref1, ref2, ref3];

    // ─── Lenis smooth scroll ───────────────────────────────────────────────
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,          // how long a single wheel tick coasts
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        let raf: number;
        function loop(time: number) {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        }
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, []);

    // ─── Start the next slide, called either directly or after animation ends ─
    const startTransition = useCallback((toIdx: number) => {
        const fromIdx = activeIdxRef.current;
        if (toIdx === fromIdx) return;

        isAnimatingRef.current = true;
        pendingIdxRef.current = null;

        setDirection(toIdx > fromIdx ? 1 : -1);
        setIncomingIdx(toIdx);
    }, []);

    // ─── Viewport enter: either start immediately or queue if busy ────────
    const handleViewportEnter = useCallback((idx: number) => {
        if (idx === activeIdxRef.current && !isAnimatingRef.current) return;
        if (idx === activeIdxRef.current) {
            // Scrolled back to the current one while animating — cancel pending
            pendingIdxRef.current = null;
            return;
        }

        if (isAnimatingRef.current) {
            // Busy: store as pending (overwrites any earlier pending — only latest matters)
            pendingIdxRef.current = idx;
        } else {
            startTransition(idx);
        }
    }, [startTransition]);

    // ─── When animation finishes: settle, then drain the queue ────────────
    const handleAnimationComplete = useCallback(() => {
        if (incomingIdx === null) return;

        // Promote incoming → active
        activeIdxRef.current = incomingIdx;
        setActiveIdx(incomingIdx);
        setIncomingIdx(null);
        isAnimatingRef.current = false;

        // If something was queued while we were busy, run it now
        const next = pendingIdxRef.current;
        if (next !== null && next !== activeIdxRef.current) {
            // Small timeout so React can flush the state above before we re-trigger
            setTimeout(() => startTransition(next), 16);
        } else {
            pendingIdxRef.current = null;
        }
    }, [incomingIdx, startTransition]);

    return (
        <motion.section
            animate={{ backgroundColor: stepsData[activeIdx].bg }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative min-h-screen w-full py-20"
        >
            <div className="absolute top-0 left-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain" />
            </div>
            {/* Decorative leaf bottom-right */}
            <div className="absolute bottom-0 right-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain rotate-180" />
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
                {/* ── LEFT: sticky image panel ───────────────────────────── */}
                <div className="hidden md:block h-[80vh] sticky top-[15vh] rounded-2xl overflow-hidden">

                    {/* Layer 0 — settled image, never moves */}
                    <div
                        className="absolute inset-0 flex items-center justify-center p-8"
                        style={{ zIndex: 0 }}
                    >
                        <div className="relative aspect-[0.8] h-[80vh] w-auto">
                            <Image
                                fill
                                src={stepsData[activeIdx].image}
                                alt={stepsData[activeIdx].title}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Layer 1 — incoming image slides over layer 0 */}
                    {incomingIdx !== null && (
                        <motion.div
                            key={`slide-${incomingIdx}`}
                            initial={{ y: direction > 0 ? "100%" : "-100%" }}
                            animate={{ y: "0%" }}
                            transition={{
                                delay: 0.1,
                                duration: 1.3,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            onAnimationComplete={handleAnimationComplete}
                            className="absolute inset-0 flex items-center justify-center p-8 "
                            style={{ zIndex: 1 }}
                        >
                            <div className="relative aspect-[0.8] h-[80vh] w-auto">
                                <Image
                                    fill
                                    src={stepsData[incomingIdx].image}
                                    alt={stepsData[incomingIdx].title}
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* ── RIGHT: scrolling content ───────────────────────────── */}
                <div className="flex flex-col">
                    {stepsData.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            ref={refs[idx]}
                            onViewportEnter={() => handleViewportEnter(idx)}
                            // 0.75 = fire only when the block is well past centre
                            viewport={{ amount: 0.75 }}
                            className="min-h-[60vh] md:min-h-screen flex flex-col justify-center py-12 first:pt-0 last:pb-0"
                        >

                            {/* Mobile fallback */}
                            <div className="block md:hidden mb-6 w-full h-64 bg-white rounded-xl overflow-hidden p-4">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="h-full w-full object-contain mx-auto"
                                />
                            </div>

                            <span className="text-[16px] font-ppmori text-[#4B5563] mb-5">
                                {step.label}
                            </span>
                            <h2 className="text-3xl md:text-[36px] font-ppmori-semibold text-foreground mb-11">
                                {step.title}
                            </h2>
                            <p className="text-[16px] text-[#4B5563] font-ppmori leading-relaxed max-w-md mb-12">
                                {step.description}
                            </p>
                            <div>
                                <Link
                                    href={step.buttonLink}
                                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-ppmori-semibold hover:opacity-80 transition-colors shadow-sm"
                                >
                                    {step.buttonText}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </motion.section>
    );
}