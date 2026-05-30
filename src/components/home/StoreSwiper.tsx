"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface Store {
    id: string;
    name: string;
    description: string;
    tags: string[];
    image: string;
    offerText: string;
    extraOffers?: string; // e.g. "+1 more"
}

interface StoreSwiperProps {
    stores: Store[];
}

export default function StoreSwiper({ stores }: StoreSwiperProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 370; // rough width of card + gap
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="relative w-full">
            {/* Header / Arrows Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 px-2 lg:px-0 max-w-7xl mx-auto">
                <div>
                    <h2 className="text-[32px] md:text-[40px] font-ppmori-semibold text-foreground mb-2">
                        Top <span className="text-head">partner stores</span>
                    </h2>
                    <p className="text-[16px] md:text-[18px] font-ppmori text-sub-foreground">
                        Browse exclusive deals from our trusted retail network
                    </p>
                </div>

                {/* Navigation Arrows (Desktop mostly, but accessible everywhere) */}
                <div className="hidden md:flex gap-3 mt-4 md:mt-0">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
                        aria-label="Scroll left"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
                        aria-label="Scroll right"
                    >
                        <ArrowRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Scroll Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 px-4 sm:px-6 lg:px-8 pb-8 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {stores.map((store) => (
                    <div
                        key={store.id}
                        className="snap-start shrink-0 w-[85vw] md:w-1/3 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col transition-transform hover:shadow-md"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-16/8 bg-gray-100">
                            {store.image ? (
                                <Image
                                    src={store.image}
                                    alt={store.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 85vw, 350px"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 font-ppmori text-sm">
                                    No image
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-ppmori-semibold text-foreground mb-1">{store.name}</h3>
                            <p className="text-[15px] font-ppmori text-gray-500 mb-4">{store.description}</p>

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
                                <span className="text-[#3F2B1F] font-ppmori-semibold text-[13px] truncate">{store.offerText}</span>
                            </div>

                            {store.extraOffers && (
                                <span className="text-[#3F2B1F] font-ppmori text-[12px] whitespace-nowrap shrink-0 opacity-80 ml-2">
                                    {store.extraOffers}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Spacer for outer visual separation if needed */}
            <div className="w-8 shrink-0"></div>
        </div>
    );
}
