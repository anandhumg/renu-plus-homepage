import BigSavings from "@/components/home/BigSavings";
import HaveQuestions from "@/components/home/HaveQuestions";
import HeroSection from "@/components/home/HeroSection";
import PartnerLogos from "@/components/home/PartnerLogos";
import MakeTransactionCount from "@/components/home/MakeTransactionCount";
import SmarterSpending from "@/components/home/SmarterSpending";
import SmartStanding from "@/components/home/SmartStanding";
import Steps from "@/components/home/Steps";
import AppPromotionSection from "@/components/home/AppPromotionSection";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <PartnerLogos />
      <Steps />
      <SmartStanding />
      <MakeTransactionCount />
      <SmarterSpending />
      {/* <BigSavings /> */}
      <HaveQuestions />
      <AppPromotionSection id="app-promotion" />
    </main>
  );
}
