import Image from "next/image";

export default function SmarterSpending() {
    return (
        <section className="lg:py-24 py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-10">
                <div className="grid lg:grid-cols-[40%_55%] grid-cols-1 gap-10 items-center">
                    <div className="">
                        <div className="text-foreground font-ppmori-semibold lg:text-[40px] text-[28px] mb-6">
                            Shop smarter, <br />
                            <span className="text-head">
                                Save more every day
                            </span>
                        </div>
                        <div className="relative aspect-[1.04] w-full h-auto md:hidden mb-10">
                            <Image src="/home/img-6.webp" alt="Smarter Spending" fill className="object-cover h-full" />
                        </div>
                        <div className="text-sub-foreground font-ppmori lg:text-[16px] text-[16px] leading-[1.6]">
                            Renu Plus has been helping people save money since 2013. Through our trusted discount membership, you gain access to exclusive savings across a wide variety of retailers. Shop smarter and enjoy great deals on everyday essentials - both online and in-store, while making the most of your budget.
                        </div>
                    </div>
                    <div className="relative aspect-[1.04] w-[649px] h-auto md:block hidden">
                        <Image src="/home/img-6.webp" alt="Smarter Spending" fill className="object-cover h-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}