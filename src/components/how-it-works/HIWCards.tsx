"use client"
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const whyJoinData = [
    {
        title: "Save Money",
        description: "Enjoy deep discounts at premier retailers for substantial everyday savings.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#bc9c22]">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
        ),
        bg: "bg-[#FDFBF7]",
        border: "border-[#bc9c22]/10",
    },
    {
        title: "Get Active",
        description: "Live a healthy and balanced lifestyle with access to wellness and health deals.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3b82f6]">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
        ),
        bg: "bg-blue-50/30",
        border: "border-blue-100",
    },
    {
        title: "Free Support",
        description: "Get dedicated support and assistant services whenever you shop.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#10b981]">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        ),
        bg: "bg-emerald-50/30",
        border: "border-emerald-100",
    },
    {
        title: "Exclusive Deals",
        description: "Unlock pricing and offers that are reserved solely for Renu Plus members.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ec4899]">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
        ),
        bg: "bg-pink-50/30",
        border: "border-pink-100",
    },
];
const HIWCards = () => {
    return (
        <div className="relative py-40 bg-linear-to-b from-white to-[#FDFBF7]">
            {/* Decorator element for elliptical gradient */}

            <div className="text-center max-w-2xl mx-auto mb-16 z-20">
                <h3 className="text-foreground font-ppmori-semibold lg:text-[40px] text-[30px] mt-2">
                    What can you access
                </h3>
                <p className="text-[#4B5563] font-ppmori lg:text-[16px] font-extralight text-[16px] mt-4 max-w-md mx-auto">
                    After you purchased Renu+ membership, start exploring exclusive offers, partner services, and member-only benefits available through Renu+.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyJoinData.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                        className={`flex flex-col p-8 rounded-[24px] border ${item.border} ${item.bg} hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-300`}
                    >
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm mb-6 shrink-0">
                            {item.icon}
                        </div>
                        <h4 className="text-foreground font-ppmori-semibold lg:text-[20px] text-[18px] mb-3">
                            {item.title}
                        </h4>
                        <p className="text-[#4B5563] font-ppmori text-[15px] leading-[1.6]">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HIWCards;