"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Leaf1 from "../../../public/common/leaf.svg";

export default function InvestmentDetail() {
  return (
    <section className="lg:py-30 py-12 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
        <Image src={Leaf1} alt="Leaf" fill className="object-contain" />
      </div>
      {/* Decorative leaf bottom-right */}
      <div className="absolute bottom-0 right-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
        <Image src={Leaf1} alt="Leaf" fill className="object-contain rotate-180" />
      </div>

      <div className="mx-auto px-4 md:px-20  relative z-10">
        <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-20 gap-10 items-center max-w-7xl mx-auto">
          {/* Text content side - animated */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-foreground font-ppmori-semibold lg:text-[40px] text-[28px]  leading-[52px] mb-11">
              Beat high costs with<br /> exclusive savings
            </h2>
            <div className="text-[#4B5563] font-ppmori lg:text-[16px] text-[16px] leading-[24px] mb-12">
              In today's climate of rising prices and inflation, our<br/>
              membership provides a much-needed financial<br/>reprieve, helping you make ends meet while<br/>enjoying the benefits of significant savings.
            </div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link href="/sign-up-login" className="bg-primary lg:text-[18px] text-[16px] font-ppmori-semibold leading-none text-white px-8 py-4 rounded-full hover:bg-primary/80 transition-colors shadow-md inline-block">
                Check out discount offers
              </Link>
            </motion.div>
          </motion.div>
          {/* Image side - animated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[400px] md:h-[600px]"
          >
            <Image
              src="/about-us/img-3.webp"
              alt="Smart Investment"
              fill
              className="object-contain"
            />
          </motion.div>



        </div>
      </div>
    </section>
  );
}

