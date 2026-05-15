"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

interface AppPromotionSectionProps {
  id?: string;
  isPopup?: boolean;
  onClose?: () => void;
}

const AppPromotionSection: React.FC<AppPromotionSectionProps> = ({ id, isPopup = false, onClose }) => {
  return (
    <section
      id={id}
      className={`relative w-full mx-auto px-4 sm:px-6 lg:px-8 ${isPopup ? "py-0" : "py-16 md:py-24 bg-white"}`}
    >
      <div className={`relative overflow-hidden max-w-7xl  mx-auto bg-linear-to-b to-[#FFDFB5]/50  from-white md:rounded-[2.5rem] rounded-lg flex flex-col md:flex-row items-center justify-between shadow-sm border border-[#F3E8DF] ${isPopup ? "md:min-h-[60vh]" : "md:h-[80vh] overflow-hidden"}`}>

        {/* Left Content */}
        <div className="flex-1 p-8 md:p-16 z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="mb-8">
              <Image src="/logo.png" alt="Renu Plus Logo" width={60} height={60} className="object-contain" />
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-[40px] font-ppmori-semibold text-[#18181B] mb-6 leading-[1.1]">
              Smarter savings start here.
            </h2>

            {/* Description */}
            <p className="text-[#52525B] text-[16px] max-w-md mb-10 font-ppmori leading-relaxed">
              Download the Renu+ app on iOS or Android. Join thousands of Canadians getting more from their everyday spending.
            </p>

            {/* CTA Button */}
            <button className="bg-primary text-white px-8 py-3 rounded-full font-ppmori-semibold text-lg hover:bg-[#A38000] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
              Download Renu plus
            </button>
          </motion.div>
        </div>

        {/* Right Content (Phone Mockup) */}
        <div className="flex-1 relative w-full h-full md:flex hidden items-center justify-center md:justify-end md:pr-16 lg:pr-24 min-h-[400px] md:min-h-0 overflow-hidden">
          {/* Background shapes or subtle circles if needed */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,#F8F1EA_0%,transparent_70%)] opacity-50" />

          <motion.div
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 90, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative z-10 w-[280px] md:w-[320px] aspect-1/2 mt-auto"
          >
            {/* iPhone Frame Mockup using Divs or Image */}
            <div className="relative w-full h-full bg-[#18181B] rounded-[3rem] border-8 border-[#27272A] shadow-2xl overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20" />

              {/* Screen Content */}
              <div className="absolute inset-0 bg-white flex flex-col items-center pt-20 p-8 text-center">
                <p className="text-[#18181B] font-ppmori-semibold mb-6 text-lg">
                  Scan the QR code to <br /> download the app
                </p>
                <div className="p-4 bg-white rounded-2xl border-2 border-[#F3E8DF] shadow-inner">
                  <QRCodeSVG
                    value="https://renuplus.ca/download"
                    size={160}
                    fgColor="#18181B"
                    includeMargin={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Close button for popup mode */}
        {isPopup && onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default AppPromotionSection;
