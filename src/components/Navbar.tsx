"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who We Are", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "Discount Offers", href: "#" },
    { name: "Partner", href: "#" },
  ];

  return (
    <nav className="w-full bg-white backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between lg:h-24 h-18 items-center">
          <div className="flex items-center bg-white lg:px-8 lg:py-2 rounded-2xl lg:mt-20 lg:shadow-lg">
            <Link href="/" className="lg:w-[100px] lg:h-[150px] w-[50px] h-[60px] relative">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-primary transition-all text-sm uppercase tracking-widest font-semibold border-b-2 border-transparent hover:border-primary py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-800 hover:text-primary text-sm font-bold transition-colors"
            >
              LOG IN
            </Link>
            <Link
              href="#"
              className="bg-primary text-white px-7 py-3 rounded-full hover:bg-primary/90 transition-all shadow-[0_4px_15px_rgba(188,156,34,0.3)] text-sm font-bold uppercase tracking-wider"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-primary focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-b absolute flex justify-between flex-col top-18 left-0 right-0 border-gray-100 transition-all duration-300 ease-in-out ${isOpen ? 'h-[calc(100vh-72px)] opacity-100 py-6' : 'h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-gray-800 hover:text-primary text-lg font-medium border-l-4 border-transparent hover:border-primary pl-4 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 flex flex-col space-y-4">
          <Link
            href="#"
            className="text-center py-3 text-gray-800 font-bold hover:text-primary rounded-full border border-primary"
            onClick={() => setIsOpen(false)}
          >
            LOG IN
          </Link>
          <Link
            href="#"
            className="bg-primary text-white text-center py-4 rounded-full font-bold"
            onClick={() => setIsOpen(false)}
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </nav>
  );
}
