export const runtime = 'edge';

import AppPromotionSection from "@/components/home/AppPromotionSection";
import HaveQuestions from "@/components/home/HaveQuestions";
import HeroSection from "@/components/home/HeroSection";
import MakeTransactionCount from "@/components/home/MakeTransactionCount";
import PartnerLogos from "@/components/home/PartnerLogos";
import SmarterSpending from "@/components/home/SmarterSpending";
import SmartStanding from "@/components/home/SmartStanding";
import Steps from "@/components/home/Steps";
import TopPartnerStores from "@/components/home/TopPartnerStores";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Renu Plus",
    "url": "https://renuplusco.com",
    "description": "Save big with Renu Plus! Access top retail discounts and maximize your budget.",
    "logo": "https://renuplusco.com/logo.png"
  };

  return (
    <main className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <PartnerLogos />
      <Steps />
      <SmartStanding />
      <MakeTransactionCount />
      <TopPartnerStores />
      <SmarterSpending />
      <HaveQuestions />
      <AppPromotionSection id="app-promotion" />
    </main>
  );
}
