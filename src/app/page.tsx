import BigSavings from "@/components/home/BigSavings";
import HaveQuestions from "@/components/home/HaveQuestions";
import HeroSection from "@/components/home/HeroSection";
import PartnerLogos from "@/components/home/PartnerLogos";
import MakeTransactionCount from "@/components/home/MakeTransactionCount";
import SmarterSpending from "@/components/home/SmarterSpending";
import SmartStanding from "@/components/home/SmartStanding";
import Steps from "@/components/home/Steps";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <Steps />
      <SmartStanding />
      <PartnerLogos />
      <MakeTransactionCount />
      <SmarterSpending />
      <BigSavings />
      <HaveQuestions />
    </main>
  );
}
