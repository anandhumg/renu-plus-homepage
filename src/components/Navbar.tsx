"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, ChevronDown, Menu, X, QrCode } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isLoaded } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetApp = () => {
    if (pathname === "/") {
      const element = document.getElementById("app-promotion");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.dispatchEvent(new CustomEvent("trigger-app-promo"));
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who We Are", href: "/" },
    { name: "How It Works", href: "/" },
    { name: "Discount Offers", href: "/" },
  ];

  const sidebarVariants: Variants = {
    closed: { x: "100%" },
    open: {
      x: 0,
      transition: { type: "tween", duration: 0.3, ease: "easeInOut", staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className={`w-full fixed top-0 z-100 transition-colors duration-300 ${isScrolled ? "bg-white/70 backdrop-blur-3xl shadow-sm" : "bg-transparent"
          }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between md:h-[85] h-16 items-center">
            {/* Logo */}
            <Link
              href="/"
              className={`flex relative items-center p-2 transition-all duration-300 aspect-[1.06] md:h-auto ${!isScrolled ? "md:px-8 md:py-2 md:mt-18 md:w-25 mt-10 w-20" : "md:w-17.5 w-12"
                }`}
            >
              <Image src="/logo.png" alt="Logo" fill priority className="object-contain" />
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3 lg:space-x-4">

              {/* Desktop Only Actions */}
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  href="/#partner"
                  className="text-[#18181B] hover:text-primary text-sm font-ppmori-semibold transition-colors"
                >
                  Become a partner
                </Link>
                <button
                  onClick={handleGetApp}
                  className="flex items-center justify-center space-x-2 border border-[#111827] px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-colors text-[#18181B] text-sm font-ppmori-semibold cursor-pointer"
                >
                  <QrCode size={16} />
                  <span>Get the app</span>
                </button>
              </div>

              {/* Profile / Join Now (Both Mobile & Desktop) */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {user?.profilePicture ? (
                        <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={18} className="text-primary" />
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-ppmori-semibold text-gray-700">{user?.firstName}</span>
                    <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <Link
                        href="/"
                        className="flex items-center space-x-2 px-4 py-3 text-sm font-ppmori text-gray-600 hover:bg-gray-50 transition-colors"
                      // onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          // setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-3 text-sm font-ppmori text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/"
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-all text-sm font-ppmori-semibold"
                >
                  Join now
                </Link>
              )}

              {/* Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="border border-gray-300 p-2 rounded-full text-foreground hover:border-primary hover:text-primary transition-colors focus:outline-none cursor-pointer bg-white/50 backdrop-blur-sm"
                aria-label="Open menu"
              >
                <Menu size={20} strokeWidth={2.5} />
              </button>

            </div>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 z-110 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-full sm:w-100 bg-white shadow-2xl z-120 flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 border border-gray-200 rounded-full text-gray-500 hover:text-primary hover:border-primary transition-colors cursor-pointer"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="px-10 pb-10 flex flex-col space-y-8 grow overflow-y-auto mt-4">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className="text-3xl font-ppmori-semibold text-gray-900 hover:text-primary transition-colors block"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Only Actions in Sidebar */}
              <div className="lg:hidden flex flex-col space-y-8 pt-8 border-t border-gray-100">
                <motion.div variants={linkVariants}>
                  <Link
                    href="/#partner"
                    className="text-3xl font-ppmori-semibold text-gray-900 hover:text-primary transition-colors block"
                  // onClick={() => setIsOpen(false)}
                  >
                    Become a partner
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <button
                    onClick={handleGetApp}
                    className="text-left text-3xl font-ppmori-semibold text-gray-900 hover:text-primary transition-colors cursor-pointer w-full"
                  >
                    Get the app
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
