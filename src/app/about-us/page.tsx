import AboutCards from "@/components/who-we-are/AboutCards";
import InvestmentDetail from "@/components/who-we-are/InvestmentDetail";
import MissionSection from "@/components/who-we-are/MissionSection";
import WhoWeAreHero from "@/components/who-we-are/WhoWeAreHero";

export const metadata = {
  title: "Who We Are - Renu Plus",
  description: "Learn about Renu Plus and how we help you save on essential purchases.",
};

export default function WhoWeArePage() {
  return (
    <main>
      <WhoWeAreHero />
      <AboutCards />
      <MissionSection />
      <InvestmentDetail />
    </main>
  );
}
