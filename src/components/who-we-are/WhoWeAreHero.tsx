"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";
import Image from "next/image";
import IMG1 from "../../../public/about-us/img-1.png"
export default function WhoWeAreHero() {
  const { isLoaded } = useLoading();
  return (
    <section className="md:min-h-screen bg-white relative overflow-hidden md:pb-0 py-10 flex flex-col">
      {/* Decorator element for elliptical gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-white rounded-full blur-[140px] z-0 pointer-events-none "></div>
      <div className="bg-white/80 blur-2xl w-1/2 h-50 absolute left-[50%] top-[-10%]"></div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[50%_50%] lg:space-x-5 pt-20 w-full flex-1">
        <div className="lg:px-20 md:px-20 px-4 md:mt-30 md:mb-0 mb-10 mt-10 ">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:text-[60px] md:text-[48px] text-[35px] max-w-xl font-ppmori-semibold text-foreground leading-[1.2] mb-6"
          >
            Making<br /> everyday living
            more rewarding
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-body md:text-[18px] text-[18px] font-ppmori text-sub-foreground max-w-md md:mb-6 mb-8"
          >
           Renu+ helps individuals and families unlock meaningful savings, trusted services, and lifestyle benefits through one smart membership ecosystem.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="flex md:flex-row flex-col gap-4">
              <button onClick={() => window.location.href = "/"} className="bg-primary md:text-[18px] text-[17px] font-ppmori-semibold text-white flex justify-center items-center
                md:h-[48px] h-[48px] md:w-fit px-6 rounded-full  hover:bg-primary/80 transition-colors cursor-pointer">
                Join Renu+ now
              </button>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="md:w-auto h-[85vh] w-full aspect-[1.125]  mx-auto relative md:block hidden self-end mt-auto "
        >
          <Image src={IMG1} alt="Hero Image" fill priority className="object-contain object-bottom" />
        </motion.div>
      </div>
    </section>
  );
}
