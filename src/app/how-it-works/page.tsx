import ExclusiveDiscounts from "@/components/how-it-works/ExclusiveDiscounts";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";

export const metadata = {
    title: "How it works - Renu Plus",
    description: "Learn about Renu Plus and how it works.",
};

export default function HowItWorks() {
    return (
        <main>
            <ExclusiveDiscounts />
            <HowItWorksSection />
        </main>
    );
}
