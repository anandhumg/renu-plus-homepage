"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/subscribe") return null;

  const socialMedias = [
    {
      name: "Instagram",
      icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.8 0H14.2C17.4 0 20 2.6 20 5.8V14.2C20 15.7383 19.3889 17.2135 18.3012 18.3012C17.2135 19.3889 15.7383 20 14.2 20H5.8C2.6 20 0 17.4 0 14.2V5.8C0 4.26174 0.61107 2.78649 1.69878 1.69878C2.78649 0.61107 4.26174 0 5.8 0ZM5.6 2C4.64522 2 3.72955 2.37928 3.05442 3.05442C2.37928 3.72955 2 4.64522 2 5.6V14.4C2 16.39 3.61 18 5.6 18H14.4C15.3548 18 16.2705 17.6207 16.9456 16.9456C17.6207 16.2705 18 15.3548 18 14.4V5.6C18 3.61 16.39 2 14.4 2H5.6ZM15.25 3.5C15.5815 3.5 15.8995 3.6317 16.1339 3.86612C16.3683 4.10054 16.5 4.41848 16.5 4.75C16.5 5.08152 16.3683 5.39946 16.1339 5.63388C15.8995 5.8683 15.5815 6 15.25 6C14.9185 6 14.6005 5.8683 14.3661 5.63388C14.1317 5.39946 14 5.08152 14 4.75C14 4.41848 14.1317 4.10054 14.3661 3.86612C14.6005 3.6317 14.9185 3.5 15.25 3.5ZM10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5ZM10 7C9.20435 7 8.44129 7.31607 7.87868 7.87868C7.31607 8.44129 7 9.20435 7 10C7 10.7956 7.31607 11.5587 7.87868 12.1213C8.44129 12.6839 9.20435 13 10 13C10.7956 13 11.5587 12.6839 12.1213 12.1213C12.6839 11.5587 13 10.7956 13 10C13 9.20435 12.6839 8.44129 12.1213 7.87868C11.5587 7.31607 10.7956 7 10 7Z" fill="white" />
      </svg>,
      url: ""
    },
    {
      name: "Facebook",
      icon: <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47 7 3.5 9 3.5H10.5V0.14C10.174 0.0970001 8.943 0 7.643 0C4.928 0 3 1.657 3 4.7V7.5H0V11.5H3V20H7V11.5Z" fill="white" />
      </svg>
      , url: ""
    },
    {
      name: "Youtube",
      icon: <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10L13.19 7L8 4V10ZM19.56 2.17C19.69 2.64 19.78 3.27 19.84 4.07C19.91 4.87 19.94 5.56 19.94 6.16L20 7C20 9.19 19.84 10.8 19.56 11.83C19.31 12.73 18.73 13.31 17.83 13.56C17.36 13.69 16.5 13.78 15.18 13.84C13.88 13.91 12.69 13.94 11.59 13.94L10 14C5.81 14 3.2 13.84 2.17 13.56C1.27 13.31 0.69 12.73 0.44 11.83C0.31 11.36 0.22 10.73 0.16 9.93C0.0900001 9.13 0.0599999 8.44 0.0599999 7.84L0 7C0 4.81 0.16 3.2 0.44 2.17C0.69 1.27 1.27 0.69 2.17 0.44C2.64 0.31 3.5 0.22 4.82 0.16C6.12 0.0899998 7.31 0.0599999 8.41 0.0599999L10 0C14.19 0 16.8 0.16 17.83 0.44C18.73 0.69 19.31 1.27 19.56 2.17Z" fill="white" />
      </svg>
      , url: ""
    },
    {
      name: "Linkdin",
      icon: <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2.001C3.99974 2.53143 3.78877 3.04004 3.41351 3.41492C3.03825 3.78981 2.52943 4.00027 1.999 4C1.46857 3.99974 0.959965 3.78877 0.585079 3.41351C0.210194 3.03825 -0.000264966 2.52943 2.50361e-07 1.999C0.000265467 1.46857 0.211233 0.959965 0.586494 0.585079C0.961754 0.210194 1.47057 -0.000264966 2.001 2.50361e-07C2.53143 0.000265467 3.04004 0.211233 3.41492 0.586494C3.78981 0.961754 4.00027 1.47057 4 2.001ZM4.06 5.481H0.0600002V18.001H4.06V5.481ZM10.38 5.481H6.4V18.001H10.34V11.431C10.34 7.771 15.11 7.431 15.11 11.431V18.001H19.06V10.071C19.06 3.901 12 4.131 10.34 7.161L10.38 5.481Z" fill="white" />
      </svg>,
      url: ""
    }

  ]
  return (
    <footer className="bg-[#F9F5F3] border-t border-gray-100 pt-10 ">
      <div className="">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12  md:px-20 px-4 mb-4">

          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Image src="/logo.png" alt="Logo" width={100} height={100} className="mb-8" />

            <div className="mt-10 flex items-center space-x-4 text-gray-700 font-ppmori">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="#BC9C23" />
              </svg>

              <a href="mailto:hello@renuplus.shop" className="hover:text-primary transition-colors font-medium border-b border-transparent hover:border-primary">
                hello@renuplus.shop
              </a>
            </div>
            <div>
              <div className="text-[14px] mb-4 font-ppmori-semibold text-foreground  inline-block mt-5">Contact us</div>
              <div className="flex gap-2">
                {socialMedias.map((socialMedia) => (
                  <Link
                    key={socialMedia.name}
                    href={socialMedia.url}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-colors"
                    aria-label={socialMedia.name}
                  >
                    {socialMedia.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <h3 className="text-[16px] mb-4 font-ppmori-semibold text-foreground  inline-block">Renu Plus</h3>
            <ul className="space-y-3 font-ppmori text-sm ml-1">
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Who We Are</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Sign Up/Login</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Discount Offers</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Become a Partner</Link></li>
            </ul>
          </div>

          <div className="lg:pl-8">
            <h3 className="text-[16px] mb-4 font-ppmori-semibold text-foreground inline-block">Useful Links</h3>
            <ul className="space-y-3 font-ppmori text-sm ml-1">
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">My Account</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 bg-[#F1EAE8] py-5 flex flex-col md:flex-row  items-center gap-6 md:px-20 px-4">
          <p className="text-black text-[14px] font-ppmori-semibold">
            © 2026 Renu Plus. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
