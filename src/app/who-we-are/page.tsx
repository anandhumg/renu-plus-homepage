import WhoWeAreHero from "@/components/who-we-are/WhoWeAreHero";
import MissionSection from "@/components/who-we-are/MissionSection";
import InvestmentDetail from "@/components/who-we-are/InvestmentDetail";
import HaveQuestions from "@/components/home/HaveQuestions";

export const metadata = {
  title: "Who We Are - Renu Plus",
  description: "Learn about Renu Plus and how we help you save on essential purchases.",
};

export default function WhoWeArePage() {
  return (
    <main>
      <WhoWeAreHero />
      <MissionSection />
      <InvestmentDetail />
      <div className="mb-20">
        <HaveQuestions />
      </div>
    </main>
  );
}
