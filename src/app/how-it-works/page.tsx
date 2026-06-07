import ExclusiveDiscounts from "@/components/how-it-works/ExclusiveDiscounts";
import HIWhero from "@/components/how-it-works/HIWhero";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import MembershipPromo from "@/components/how-it-works/MembershipPromo";
import HaveQuestions from "@/components/home/HaveQuestions";
import HIWCards from "@/components/how-it-works/HIWCards";

export const metadata = {
    title: "How it works - Renu Plus",
    description: "Learn about Renu Plus and how it works.",
};

export default function HowItWorks() {
    return (
        <main className="min-h-screen bg-white">
            <HIWhero />
            <HowItWorksSection />
            <HIWCards />
            <ExclusiveDiscounts />
            <MembershipPromo />
            <HaveQuestions />
        </main>
    );
}
