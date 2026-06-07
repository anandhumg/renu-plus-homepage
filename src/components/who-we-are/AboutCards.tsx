"use client"
import { motion } from "framer-motion";
import Icon1 from "../../../public/how-it-works/icon-1.svg"
import Icon2 from "../../../public/how-it-works/icon-2.svg"
import Icon3 from "../../../public/how-it-works/icon-4.svg"
import Icon4 from "../../../public/how-it-works/icon-4.svg"
import Image from "next/image";


const whyJoinData = [
    {
        title: "Wellness",
        description: "Health, fitness, and lifestyle-focused member experiences.",
        icon: (
            Icon1
        ),
    },
    {
        title: "Home & living",
        description: "Trusted services for renovation, rentals, and everyday needs.",
        icon: (
            Icon2
        )
    },
    {
        title: "Rewards & Savings",
        description: "Meaningful savings across curated partner brands.",
        icon: (
            Icon3
        )
    }
];
const AboutCards = () => {
    return (
        <div className="relative md:py-40 py-20 bg-linear-to-b from-white to-primary-bg">
            {/* Decorator element for elliptical gradient */}
            <div className="text-center max-w-2xl md:mx-auto mb-16 md:mb-25 mx-10 place-items-center z-20">
                <h3 className="text-foreground font-ppmori-semibold lg:text-[40px] text-[2rem] mt-2">
                    Designed around <br/>smarter living
                </h3>
                <p className="text-[#4B5563] font-ppmori lg:text-[16px] font-light text-[16px] mt-4 max-w-[371px] mx-auto">
                    Renu+ connects members with trusted services, exclusive savings, and lifestyle benefits that simplify everyday living.
                </p>
            </div>

            <div className="flex md:flex-row flex-col md:space-x-[187px] space-y-8 justify-center items-center mx-auto max-w-7xl">
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

export default AboutCards;