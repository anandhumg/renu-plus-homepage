"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const { isLoaded } = useLoading();
  return (
    <section className="min-h-screen bg-primary-bg relative overflow-hidden md:pb-0 py-10 flex flex-col">
      {/* Decorator element for elliptical gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-white rounded-full blur-[140px] z-0 pointer-events-none "></div>
      <div className="bg-white/80 blur-2xl w-1/2 h-50 absolute left-[50%] top-[-10%]"></div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[60%_40%] lg:space-x-10 pt-20 w-full flex-1">
        <div className="lg:px-20 md:px-20 px-4 md:mt-30 order-2 md:order-1 ">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:text-[60px] md:text-[48px] text-[32px] font-ppmori-semibold text-foreground leading-[1.2] mb-6"
          >
            Discover the Power of Stretching Your Dollar With Renu Plus
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-body md:text-[18px] text-[18px] font-ppmori text-sub-foreground mb-6"
          >
            Enjoy Unbeatable Savings on Home Reno Projects, Dining, Travel, Home & Personal Essentials and more
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex gap-4">
              <button onClick={() => window.location.href = "/"} className="bg-primary md:text-[18px] text-[16px] font-ppmori-semibold text-white md:px-6 px-5 md:py-3 py-2  md:h-[48px] h-[44px]  rounded-full  hover:bg-primary/80 transition-colors cursor-pointer">
                Start Saving Today
              </button>
              <button onClick={() => window.location.href = "/"} className="border border-black md:text-[18px] text-[16px] font-ppmori-semibold text-black md:px-6 px-5 md:py-3 py-2  md:h-[48px] h-[44px]  rounded-full  hover:bg-primary/80 transition-colors cursor-pointer">
                See partner stores
              </button>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="md:w-160 w-full aspect-[1.125] h-[80vh] mx-auto relative order-1 md:order-2 self-end mt-auto"
        >
          <Image src="/home/img-2.webp" alt="Hero Image" fill priority className="object-contain object-bottom" />
        </motion.div>
      </div>
    </section>
  );
}
