"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhoWeAreHero() {
  const { isLoaded } = useLoading();

  return (
    <section className="md:min-h-[85vh] md:bg-primary-bg bg-white relative overflow-hidden flex flex-col justify-center pt-24 pb-12">
      {/* Decorator element for elliptical gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-white rounded-full blur-[140px] z-0 pointer-events-none"></div>
      <div className="bg-white/80 blur-2xl w-1/2 h-50 absolute left-[50%] top-[-10%] z-0 pointer-events-none"></div>

      <div className="relative z-10 md:px-20 px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-10 lg:items-center w-full h-full">
          {/* Image side - animated */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-[300px] md:h-[600px] relative order-2 lg:order-1"
          >
            <Image src="/about-us/img-1.png" alt="Who We Are" fill className="object-contain" priority />
          </motion.div>

          {/* Text side - animated */}
          <div className="order-1 lg:order-2">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-foreground font-ppmori-semibold lg:text-[50px] md:text-[42px] text-[32px] leading-[1.2] mb-6"
            >
              Membership That <br />
              <span className="text-head">Pays for Itself</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-sub-foreground font-ppmori lg:text-[18px] text-[16px] leading-[1.6] max-w-xl"
            >
              Renu Plus is a membership designed to help you save on essential purchases. Members enjoy a wide range of discounts at various retailers, suppliers, and vendors, including restaurants, hotels, rental services, etc.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

