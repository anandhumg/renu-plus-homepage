import Image from "next/image";

export default function SmarterSpending() {
    return (
        <section className="lg:py-24 py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 lg:px-10">
                <div className="grid lg:grid-cols-[40%_55%] grid-cols-1 gap-10 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="text-foreground font-ppmori-semibold lg:text-[40px] text-[30px] mb-6">
                            Shop smarter, <br />
                            <span className="text-head">
                                Save more every day
                            </span>
                        </div>
                        <div className="text-sub-foreground font-ppmori text-[16px] leading-[1.6]">
                            Renu Plus has been helping people save money since 2013. Through our trusted discount membership, you gain access to exclusive savings across a wide variety of retailers. Shop smarter and enjoy great deals on everyday essentials - both online and in-store, while making the most of your budget.
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 relative w-auto h-full">
                        <Image src="/home/img-2.png" alt="Smarter Spending" width={1000} height={1000} className="object-cover h-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}