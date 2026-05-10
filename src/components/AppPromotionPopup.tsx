"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppPromotionSection from "./home/AppPromotionSection";

const AppPromotionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleTrigger = () => {
      setIsVisible(true);
    };

    window.addEventListener("trigger-app-promo", handleTrigger);
    return () => window.removeEventListener("trigger-app-promo", handleTrigger);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl pointer-events-auto"
          >
            <AppPromotionSection isPopup={true} onClose={handleClose} />
          </motion.div>
          {/* Backdrop Click to Close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={handleClose}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default AppPromotionPopup;
