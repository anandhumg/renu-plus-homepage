import BecomeAPartnerHero from "@/components/become-a-partner/BecomeAPartnerHero";
import WhyPartner from "@/components/become-a-partner/WhyPartner";
import BusinessForm from "@/components/become-a-partner/BusinessForm";
import HaveQuestions from "@/components/home/HaveQuestions";

export const metadata = {
    title: "Become a Partner",
    description: "Partner with Renu+ and connect with a growing community of members looking for quality products, services, and exclusive experiences.",
    alternates: {
        canonical: "/become-a-partner",
    },
};

export default function BecomeAPartnerPage() {
    return (
        <main className="min-h-screen bg-white">
            <BecomeAPartnerHero />
            <WhyPartner />
            <BusinessForm />
            <HaveQuestions />
        </main>
    );
}
