"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Smartphone, ShieldCheck, Zap } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

const AppPromotionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup
    // const dismissed = localStorage.getItem("app_promo_dismissed");
    // if (dismissed) {
    //   setIsDismissed(true);
    //   return;
    // }

    const handleScroll = () => {
      if (!isDismissed && window.scrollY > 100) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  useEffect(() => {
    const handleTrigger = () => {
      setIsVisible(true);
      setIsDismissed(false);
    };

    window.addEventListener("trigger-app-promo", handleTrigger);
    return () => window.removeEventListener("trigger-app-promo", handleTrigger);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("app_promo_dismissed", "true");
  };

  if (isDismissed && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-100 flex md:items-center items-end justify-center md:p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl overflow-hidden bg-[#e7dad1] rounded-3xl shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 text-black/70 hover:text-black transition-colors bg-white/10 hover:bg-white/20 rounded-full"
            >
              <X size={24} />
            </button>

            {/* Content Section */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between text-black border-b md:border-b-0 md:border-r border-black/10">
              <div>
                {/* Logo and Rating */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Smartphone className="text-black" size={24} />
                  </div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-xs text-black/60 font-medium">Over 1.5M five-star ratings</p>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-ppmori font-bold mb-6 leading-tight text-black">
                  Save more and <br />
                  <span className="text-primary">book faster</span> with the app
                </h2>

                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap size={14} className="text-primary" />
                    </div>
                    <span className="text-black/80 font-medium">Unlock app-only exclusive discounts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <ShieldCheck size={14} className="text-primary" />
                    </div>
                    <span className="text-black/80 font-medium">Earn extra loyalty points on every purchase</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Smartphone size={14} className="text-primary" />
                    </div>
                    <span className="text-black/80 font-medium">Real-time alerts for price drops</span>
                  </li>
                </ul>
              </div>

              {/* Desktop QR Code Section */}
              <div className="hidden md:flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="bg-white p-2 rounded-xl">
                  <QRCodeSVG value="https://renuplus.example.com/app" size={100} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Scan to download</h4>
                  <p className="text-sm text-black/60">Available on iOS & Android</p>
                </div>
              </div>

              {/* Mobile Action Button */}
              <div className="md:hidden">
                <button
                  onClick={handleClose}
                  className="w-full py-4 bg-primary text-black font-bold rounded-xl shadow-lg hover:bg-primary/80 transition-all active:scale-95"
                >
                  Go to app
                </button>
              </div>
            </div>

            {/* Visual Section (Phone Mockup) */}
            <div className="flex-1 relative bg-white overflow-hidden md:flex hidden items-center justify-center min-h-[300px] md:min-h-full">
              {/* The Phone Mockup */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative z-10 w-full max-w-[280px] pt-8 md:pt-16"
              >
                <div className="relative">
                  <Image
                    src="/app-mockup.png"
                    alt="Renu Plus App Mockup"
                    width={500}
                    height={1000}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AppPromotionPopup;
