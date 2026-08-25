"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DynamicCTAButton from "../DynamicCTAButton";

export default function HeroSection() {
  const { isLoaded } = useLoading();
  return (
    <section className="md:min-h-screen md:bg-primary-bg bg-white relative overflow-hidden md:pb-0 py-10 flex flex-col">
      {/* Decorator element for elliptical gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-white rounded-full blur-[140px] z-0 pointer-events-none "></div>
      <div className="bg-white/80 blur-2xl w-1/2 h-50 absolute left-[50%] top-[-10%]"></div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[60%_40%] lg:space-x-10 items-center w-full flex-1">
        <div className="lg:px-20 md:px-20 px-4 lg:mt-0 md:mt-20 mt-30 lg:mb-0 md:mb-10 lg:text-start md:text-center  text-start">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:text-[60px] md:text-[48px] text-[35px] font-ppmori-semibold text-foreground leading-[1.2] mb-6"
          >
            Discover the Power of Stretching Your Dollar With Renu Plus
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-body lg:block hidden text-[18px] font-ppmori text-sub-foreground md:mb-6 mb-8"
          >
            Enjoy Unbeatable Savings on Reno Projects, Dining, Travel,<br />Home & Personal Essentials and more
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-body lg:hidden text-[18px] font-ppmori text-sub-foreground md:mb-6 mb-8"
          >
            Enjoy Unbeatable Savings on Reno Projects, Dining, Travel, Home & Personal Essentials and more
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex md:flex-row flex-col lg:justify-start justify-center gap-4">
              <DynamicCTAButton
                className="bg-primary md:text-[18px] text-[17px] leading-none font-ppmori-semibold text-white flex justify-center items-center md:h-12 h-12 md:w-51.5 w-49.25  rounded-full hover:bg-primary/80 transition-colors cursor-pointer"
                defaultText="Start Saving Today"
              />
              <a href="/partner-stores"
                className="border border-black md:text-[18px] text-[17px] leading-none font-ppmori-semibold text-black flex justify-center items-center
                md:h-12 h-12 md:w-51.5 w-49.25  rounded-full
                 hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer">
                <span className="-space-y-0.5">
                  See partner stores
                </span>
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="lg:w-160 w-full aspect-[1.125] lg:h-[80vh] md:h-150 mx-auto relative md:block hidden self-end mt-auto "
        >
          <Image src="/home/img-2.webp" alt="Hero Image" fill priority className="object-contain object-bottom" />
        </motion.div>
      </div>
    </section>
  );
}
