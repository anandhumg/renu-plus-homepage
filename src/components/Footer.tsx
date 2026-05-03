import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-2">

          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Image src="/logo.png" alt="Logo" width={100} height={100} className="mb-8" />

            <div className="mt-10 flex items-center space-x-4 text-gray-700 font-ppmori">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail-icon lucide-mail text-primary"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
              <a href="mailto:hello@renuplus.shop" className="hover:text-primary transition-colors font-medium border-b border-transparent hover:border-primary">
                hello@renuplus.shop
              </a>
            </div>
          </div>

          <div className="lg:pl-8">
            <h3 className="text-[16px] mb-4 font-ppmori-semibold text-foreground  inline-block">Renu Plus</h3>
            <ul className="space-y-2 font-ppmori text-sm ml-1">
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Who We Are</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Sign Up/Login</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Discount Offers</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Become a Partner</Link></li>
            </ul>
          </div>

          <div className="lg:pl-8">
            <h3 className="text-[16px] mb-4 font-ppmori-semibold text-foreground inline-block">Useful Links</h3>
            <ul className="space-y-2 font-ppmori text-sm ml-1">
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">My Account</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm font-ppmori">
            © 2026, Renu Plus. All Rights Reserved. Designed for premium savings.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
              Privacy
            </Link>
            <a href="#" className="text-sm text-primary hover:text-black transition-colors font-bold uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-full">
              Scroll To Top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
