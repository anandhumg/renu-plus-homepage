"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Leaf1 from "../../../public/common/leaf.svg";

export default function HowItWorksSection() {
    const starIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#bc9c22" stroke="#bc9c22" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star mt-1.5"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
    );

    const steps = [
        "Create account through <a href='/sign-up-login' style='color: #bc9c22; font-weight: 600;'>Sign Up Now</a> link",
        "Upload your picture and the information required on the Create Profile Page.",
        "Provide your preferred payment method information.",
        "For an annual fee of $159, you will receive your Renu Plus membership.",
        "Your membership will be available as a virtual card through your profile.",
        "Go shopping and SAVE!"
    ];

    return (
        <section className="lg:py-24 py-12 bg-white relative overflow-hidden">
            {/* Decorative leaf top-left */}
            <div className="absolute top-0 left-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain" />
            </div>
            {/* Decorative leaf bottom-right */}
            <div className="absolute bottom-0 right-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain rotate-180" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-20 gap-10 items-center">
                    
                    {/* Steps list side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-2 lg:order-1"
                    >
                        <h2 className="text-head font-ppmori-semibold lg:text-[40px] text-[28px] mb-10">
                            How it works
                        </h2>
                        <div className="text-sub-foreground font-ppmori lg:text-[18px] text-[16px] leading-[1.6] max-w-xl space-y-6">
                            {steps.map((step, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                    className="flex md:gap-5 gap-3"
                                >
                                    <div className="shrink-0">
                                        {starIcon}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: step }} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image side */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-1 lg:order-2 relative w-full h-[400px] md:h-[500px]"
                    >
                        <Image
                            src="/how-it-works/img-2.png"
                            alt="How it works illustration"
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}