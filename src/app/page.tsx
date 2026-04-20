import BigSavings from "@/components/home/BigSavings";
import HaveQuestions from "@/components/home/HaveQuestions";
import HeroSection from "@/components/home/HeroSection";
import MakeTransactionCount from "@/components/home/MakeTransactionCount";
import SmarterSpending from "@/components/home/SmarterSpending";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MakeTransactionCount />
      <SmarterSpending />
      <WhyChooseUs />
      <BigSavings />
      <HaveQuestions />
    </main>
  );
}
