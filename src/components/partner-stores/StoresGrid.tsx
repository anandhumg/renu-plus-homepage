"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface StoreDetailSection {
    title: string;
    points: string[];
    description?: string;
}

export interface Store {
    id: string;
    name: string;
    description: string;
    image: string;
    address: string;
    phone: string;
    email: string;
    tags: string[];
    location?: { lat: number; lng: number } | null;
    offerText: string;
    storeDetails?: StoreDetailSection[] | null;
    createdAt?: string;
    updatedAt?: string;
}

interface StoresGridProps {
    stores: Store[];
}

export default function StoresGrid({ stores }: StoresGridProps) {
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedStore) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedStore]);

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-5">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="md:text-start text-center text-[26px] md:text-[32px] font-ppmori-semibold text-foreground mb-3">
                        40+ stores to explore
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            onClick={() => setSelectedStore(store)}
                            className="group w-full bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative w-full aspect-16/8 bg-gray-100 overflow-hidden">
                                {store.image ? (
                                    <Image
                                        src={store.image}
                                        alt={store.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-ppmori text-sm">
                                        No image available
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-ppmori-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                    {store.name}
                                </h3>
                                <p className="text-[15px] font-ppmori text-gray-500 mb-4 line-clamp-2">
                                    {store.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto mb-2">
                                    {store.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-[#F8F9FA] border border-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-ppmori font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Banner */}
                            <div className="bg-[#FFF8F3] px-5 py-3 border-t border-[#F3E8DF] flex items-center justify-between">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" className="shrink-0">
                                        <path d="M12.4918 6.65865L13.2278 5.38665C13.3162 5.23361 13.3403 5.05171 13.2947 4.88093C13.249 4.71016 13.1374 4.5645 12.9844 4.47598L11.7111 3.73998V2.27331C11.7111 2.0965 11.6409 1.92693 11.5158 1.80191C11.3908 1.67689 11.2212 1.60665 11.0444 1.60665H9.57843L8.8431 0.333982C8.75474 0.180869 8.60918 0.0691215 8.43843 0.023315C8.35385 0.000649375 8.26562 -0.00512899 8.1788 0.00630988C8.09198 0.0177487 8.00826 0.0461808 7.93244 0.0899818L6.6591 0.825982L5.38577 0.089315C5.23265 0.000913451 5.05068 -0.0230429 4.8799 0.0227156C4.70912 0.0684742 4.56351 0.1802 4.4751 0.333315L3.7391 1.60665H2.2731C2.09629 1.60665 1.92672 1.67689 1.8017 1.80191C1.67667 1.92693 1.60644 2.0965 1.60644 2.27331V3.73931L0.333102 4.47532C0.257255 4.51915 0.190789 4.5775 0.137505 4.64703C0.0842211 4.71656 0.0451634 4.79592 0.0225648 4.88055C-3.38231e-05 4.96519 -0.00573023 5.05345 0.00580112 5.14029C0.0173325 5.22713 0.0458654 5.31084 0.0897691 5.38665L0.825769 6.65865L0.0897691 7.93065C0.00176165 8.08383 -0.0221162 8.26559 0.0233414 8.43631C0.068799 8.60703 0.179905 8.75285 0.332436 8.84198L1.60577 9.57798V11.044C1.60577 11.2208 1.67601 11.3904 1.80103 11.5154C1.92606 11.6404 2.09562 11.7106 2.27244 11.7106H3.7391L4.4751 12.984C4.53412 13.0849 4.61839 13.1687 4.71962 13.2271C4.82085 13.2856 4.93555 13.3166 5.05243 13.3173C5.16844 13.3173 5.28377 13.2866 5.38644 13.2273L6.65843 12.4913L7.93177 13.2273C8.08481 13.3158 8.26671 13.3398 8.43748 13.2942C8.60826 13.2486 8.75391 13.137 8.84243 12.984L9.57777 11.7106H11.0438C11.2206 11.7106 11.3901 11.6404 11.5152 11.5154C11.6402 11.3904 11.7104 11.2208 11.7104 11.044V9.57798L12.9838 8.84198C13.0596 8.79815 13.1261 8.7398 13.1794 8.67027C13.2326 8.60073 13.2717 8.52138 13.2943 8.43674C13.3169 8.35211 13.3226 8.26385 13.3111 8.17701C13.2995 8.09017 13.271 8.00645 13.2271 7.93065L12.4918 6.65865ZM4.99177 3.31865C5.25707 3.31874 5.51148 3.42421 5.69901 3.61187C5.88655 3.79954 5.99186 4.05401 5.99177 4.31931C5.99168 4.58462 5.8862 4.83902 5.69854 5.02656C5.51088 5.2141 5.25641 5.3194 4.9911 5.31931C4.7258 5.31923 4.47139 5.21375 4.28386 5.02609C4.09632 4.83843 3.99101 4.58395 3.9911 4.31865C3.99119 4.05334 4.09667 3.79894 4.28433 3.6114C4.47199 3.42387 4.72646 3.31856 4.99177 3.31865ZM5.19177 9.71865L4.1251 8.91931L8.1251 3.58598L9.19177 4.38531L5.19177 9.71865ZM8.3251 9.98531C8.19374 9.98527 8.06367 9.95935 7.94232 9.90904C7.82097 9.85873 7.71072 9.78501 7.61786 9.69209C7.525 9.59917 7.45135 9.48887 7.40112 9.36748C7.35089 9.2461 7.32506 9.11601 7.3251 8.98465C7.32515 8.85328 7.35106 8.72321 7.40137 8.60186C7.45169 8.48051 7.52541 8.37026 7.61833 8.2774C7.71125 8.18454 7.82155 8.1109 7.94293 8.06067C8.06431 8.01044 8.1944 7.9846 8.32577 7.98465C8.59107 7.98474 8.84548 8.09021 9.03301 8.27787C9.22055 8.46554 9.32586 8.72001 9.32577 8.98531C9.32568 9.25062 9.2202 9.50502 9.03254 9.69256C8.84488 9.8801 8.59041 9.9854 8.3251 9.98531Z" fill="#7C5D48" />
                                    </svg>
                                    <span className="text-[#3F2B1F] font-ppmori-semibold text-[13px] truncate">
                                        {store.offerText}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Detail Modal Popup */}
            <AnimatePresence>
                {selectedStore && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        {/* Blur Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStore(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 220 }}
                            className="relative flex flex-col w-full max-w-2xl bg-white md:rounded-3xl rounded-xl shadow-2xl overflow-hidden md:h-[90vh] h-[80vh] max-h-[700px] z-10"
                        >
                            {/* Blue Header Banner with image */}
                            <div className="relative w-full h-[200px] md:h-[250px] bg-[#008BEA] shrink-0 overflow-hidden">
                                {selectedStore.image ? (
                                    <Image
                                        src={selectedStore.image}
                                        alt={selectedStore.name}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, 650px"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/80 font-ppmori-semibold text-2xl">
                                        {selectedStore.name}
                                    </div>
                                )}

                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedStore(null)}
                                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 active:scale-95 transition-all z-50 cursor-pointer"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5 text-gray-800" strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Scrollable Modal Content */}
                            <div
                                data-lenis-prevent
                                className="overflow-y-auto p-4 md:p-8 flex-1 space-y-6 scrollbar-thin scrollbar-thumb-gray-200"
                            >
                                {/* Store Title and Location info */}
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-ppmori-semibold text-foreground mb-1">
                                        {selectedStore.name}
                                    </h2>
                                    <p className="text-[15px] font-ppmori text-gray-500">
                                        {selectedStore.description || "Available at participating locations across Canada."}
                                    </p>
                                </div>

                                {/* Member benefit Container */}
                                <div className="bg-white border border-[#E7DAD1]/70 rounded-2xl md:p-5 p-3 flex items-start gap-2 md:gap-4 shadow-xs">
                                    {/* Starburst/badge icon stamp */}
                                    <div className="flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                                            {/* Beautiful multi-point stamp badge shape */}
                                            <path d="M12 2L13.9 4.3L16.8 3.7L17.7 6.5L20.6 6.8L20.3 9.7L22.6 11.5L21.1 14.1L22.6 16.9L19.9 18L19 20.8L16.1 20.5L14.4 22.8L12 21.8L9.6 22.8L7.9 20.5L5 20.8L4.1 18L1.4 16.9L2.9 14.1L1.4 11.5L3.7 9.7L3.4 6.8L6.3 6.5L7.2 3.7L10.1 4.3L12 2Z" fill="#7C5D48" />
                                            {/* White Percentage symbol inside */}
                                            <path d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10Z" fill="white" />
                                            <path d="M15 16C15.5523 16 16 15.5523 16 15C16 14.4477 15.5523 14 15 14C14.4477 14 14 14.4477 14 15C14 15.5523 14.4477 16 15 16Z" fill="white" />
                                            <line x1="14.5" y1="8.5" x2="9.5" y2="15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-ppmori-semibold text-foreground text-[16px] mb-1">
                                            Member benefit
                                        </h4>
                                        <p className="text-[14px] md:text-[15px] font-ppmori text-gray-600 leading-relaxed">
                                            {selectedStore.offerText}
                                        </p>
                                    </div>
                                </div>

                                {/* Dynamic details sections */}
                                {selectedStore.storeDetails && selectedStore.storeDetails.length > 0 ? (
                                    selectedStore.storeDetails.map((section, idx) => (
                                        <div key={idx} className="border-t border-gray-100 pt-6">
                                            <h3 className="font-ppmori-semibold text-foreground text-[17px] md:text-[18px] mb-3">
                                                {section.title}
                                            </h3>
                                            {section.description && (
                                                <p className="text-[14px] font-ppmori text-gray-500 mb-3 leading-relaxed">
                                                    {section.description}
                                                </p>
                                            )}
                                            <ul className="list-disc pl-5 space-y-2.5 text-gray-600 font-ppmori text-[14px] md:text-[15px]">
                                                {section.points?.map((point, pIdx) => (
                                                    <li key={pIdx} className="leading-relaxed">
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    /* Fallback if storeDetails is empty */
                                    <div className="border-t border-gray-100 pt-6">
                                        <h3 className="font-ppmori-semibold text-foreground text-[17px] mb-3">
                                            What you can save on
                                        </h3>
                                        <ul className="list-disc pl-5 space-y-2 text-gray-600 font-ppmori text-[14px] md:text-[15px]">
                                            <li className="leading-relaxed">Exclusive member pricing across all categories</li>
                                            <li className="leading-relaxed">Special offers dynamically applied to Renu+ memberships</li>
                                        </ul>
                                    </div>
                                )}

                                {/* Location & Contact Footer details */}
                                {(selectedStore.address || selectedStore.phone || selectedStore.email) && (
                                    <div className="border-t border-gray-100 pt-6 text-[13px] md:text-[14px] font-ppmori text-gray-400 space-y-1.5">
                                        {selectedStore.address && (
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-500">Address:</span> {selectedStore.address}
                                            </p>
                                        )}
                                        {selectedStore.phone && (
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-500">Phone:</span> {selectedStore.phone}
                                            </p>
                                        )}
                                        {selectedStore.email && (
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-500">Email:</span> {selectedStore.email}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
