import Image from "next/image";
import SaveUptoImage from "../../../public/home/img-3.webp"
export default function MakeTransactionCount() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-5xl flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-10 mt-20">
                <div className="text-center w-full">
                    <h2 className="text-foreground font-ppmori-semibold md:text-[40px] text-[30px] mb-20">Make every transaction <span className="text-head">count</span></h2>
                    <div className="flex lg:flex-row flex-col justify-between items-center gap-10">
                        <div className="text-center flex flex-col items-center">
                            <div className="w-[160px] h-[160px] p-4 border border-primary border-dashed  rounded-full">
                                <div className="w-full h-full bg-[#f9f6f4] rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-id-card-icon lucide-id-card text-primary"><path d="M16 10h2" /><path d="M16 14h2" /><path d="M6.17 15a3 3 0 0 1 5.66 0" /><circle cx="9" cy="11" r="2" /><rect x="2" y="5" width="20" height="14" rx="2" /></svg>
                                </div>
                            </div>
                            <div className="font-ppmori-semibold text-foreground text-xl mt-4">
                                Instant Savings
                            </div>
                            <div className="font-ppmori text-sub-foreground text-sm mt-2">
                                Boost daily budgets
                            </div>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="w-[160px] h-[160px] p-4 border border-primary border-dashed  rounded-full">
                                <div className="w-full h-full bg-[#f9f6f4] rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-badge-percent-icon lucide-badge-percent text-primary"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m15 9-6 6" /><path d="M9 9h.01" /><path d="M15 15h.01" /></svg>
                                </div>
                            </div>
                            <div className="font-ppmori-semibold text-foreground text-xl mt-4">
                                Smart Discounts
                            </div>
                            <div className="font-ppmori text-sub-foreground text-sm mt-2">
                                Unlock exclusive dealss
                            </div>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="w-[160px] h-[160px] p-4 border border-primary border-dashed  rounded-full">
                                <div className="w-full h-full bg-[#f9f6f4] rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trophy-icon lucide-trophy text-primary"><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" /><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" /><path d="M18 9h1.5a1 1 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" /><path d="M6 9H4.5a1 1 0 0 1 0-5H6" /></svg>
                                </div>
                            </div>
                            <div className="font-ppmori-semibold text-foreground text-xl mt-4">
                                Renu Your Spending
                            </div>
                            <div className="font-ppmori text-sub-foreground text-sm mt-2">
                                Spend More, Save More
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full md:w-[235px] md:h-auto aspect-[0.79] flex justify-center items-center my-10 relative">
                    <Image src={SaveUptoImage} alt="" fill className="object-contain" />
                </div>
            </div>
        </section>
    );
}