"use client"
import { motion } from "framer-motion";
import Icon1 from "../../../public/how-it-works/icon-1.svg"
import Icon2 from "../../../public/how-it-works/icon-2.svg"
import Icon3 from "../../../public/how-it-works/icon-3.svg"
import Icon4 from "../../../public/how-it-works/icon-4.svg"
import Image from "next/image";


const whyJoinData = [
    {
        title: "Live Better",
        description: "Access services and experiences that elevate everyday life.",
        icon: (
            Icon1
        ),
    },
    {
        title: "Spend smarter",
        description: "Unlock exclusive savings through trusted partners.",
        icon: (
            Icon2
        )
    },
    {
        title: "Feel supported",
        description: "Enjoy access to carefully selected providers and businesses.",
        icon: (
            Icon3
        )
    },
    {
        title: "Get More Value",
        description: "Make every membership year worthwhile through benefits you'll actually use.",
        icon: (
            Icon4
        )
    },
];
const HIWCards = () => {
    return (
        <div className="relative py-40 bg-linear-to-b from-white to-[#FDFBF7]">
            {/* Decorator element for elliptical gradient */}
            <div className="text-center max-w-2xl mx-auto mb-16 place-items-center z-20">
                <h3 className="text-foreground font-ppmori-semibold lg:text-[40px] text-[30px] mt-2">
                    What can you access
                </h3>
                <p className="text-[#4B5563] font-ppmori lg:text-[16px] font-extralight text-[16px] mt-4 max-w-md mx-auto">
                    After you purchased Renu+ membership, start exploring exclusive offers, partner services, and member-only benefits available through Renu+.
                </p>
            </div>

            <div className="flex justify-center items-center mx-auto max-w-7xl  space-x-[125px]">
                {whyJoinData.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                        className={`place-items-center text-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-300 max-w-[208px]`}
                    >
                        <div className="relative aspect-square w-[114px] h-auto">
                            <Image src={item.icon} alt={item.title} className="object-contain" />
                        </div>
                        <h4 className="font-ppmori-semibold text-[#7C5D48] lg:text-[22px] text-[18px] my-4">
                            {item.title}
                        </h4>
                        <p className="text-[#4B5563] font-ppmori text-[16px] leading-[1.6]">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HIWCards;