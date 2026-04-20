import type { Metadata } from "next";
import { Lato, Kaisei_Decol } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const kaiseiDecol = Kaisei_Decol({
  variable: "--font-kaisei",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Discount Membership - Renu Plus",
  description: "Save big with Renu Plus! Access top retail discounts and maximize your budget. Sign up today and start saving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${kaiseiDecol.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white flex flex-col font-lato text-base text-[#333] m-0 p-0 break-word">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
