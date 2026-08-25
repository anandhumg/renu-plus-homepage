import HaveQuestions from "@/components/home/HaveQuestions";
import PartnerStoresHero from "@/components/partner-stores/HIWhero";
import StoresGrid, { Store } from "@/components/partner-stores/StoresGrid";

export const metadata = {
    title: "Partner Stores",
    description: "Discover trusted retailers and service providers offering exclusive benefits to Renu+ members.",
    alternates: {
        canonical: "/partner-stores",
    },
};

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export default async function PartnerStores() {
    let stores: Store[] = [];

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/stores`, {
            cache: 'no-store'
        });

        if (res.ok) {
            const data = await res.json();
            stores = Array.isArray(data) ? data : data?.data || [];
        } else {
            console.error("Failed to fetch stores, status:", res.status);
        }
    } catch (error) {
        console.error("Error fetching stores:", error);
    }

    return (
        <main className="min-h-screen bg-white">
            <PartnerStoresHero />
            <StoresGrid stores={stores} />
            <HaveQuestions />
        </main>
    );
}
