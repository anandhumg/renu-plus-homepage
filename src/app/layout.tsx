import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppPromotionPopup from "@/components/AppPromotionPopup";
import { AuthProvider } from "@/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Discount Membership - Renu Plus",
  description: "Save big with Renu Plus! Access top retail discounts and maximize your budget. Sign up today and start saving.",
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

import { LoadingProvider } from "@/contexts/LoadingContext";
import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="bg-background flex flex-col font-ppmori m-0 p-0 break-word">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <LoadingProvider>
              <SmoothScrolling>
                <Navbar />
                {children}
                <AppPromotionPopup />
                <Footer />
                <Toaster position="top-center" />
              </SmoothScrolling>
            </LoadingProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
