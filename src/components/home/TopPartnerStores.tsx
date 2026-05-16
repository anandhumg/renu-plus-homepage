import React from "react";
import StoreSwiper, { Store } from "./StoreSwiper";

export default async function TopPartnerStores() {
    let stores: Store[] = [];

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        debugger
        const res = await fetch(`${apiUrl}/stores`, {
            cache: 'no-store' // Fetch fresh data without caching
        });

        if (res.ok) {
            const data = await res.json();
            // Handle both standard REST structures (array or wrapped in data property)
            stores = Array.isArray(data) ? data : data?.data || [];
        } else {
            console.error("Failed to fetch stores, status:", res.status);
        }
    } catch (error) {
        console.error("Error fetching stores:", error);
    }

    if (!stores || stores.length === 0) {
        // Return null to not render the section if there's an error or no data
        return null;
    }

    return (
        <section className="bg-white pt-20 md:pt-24 overflow-hidden relative px-4">
            <div className="max-w-7xl mx-auto">
                <StoreSwiper stores={stores} />
            </div>
        </section>
    );
}
