import Image from "next/image";

export default function BigSavings() {
    const price = process.env.NEXT_PUBLIC_PACKAGE_PRICE;
    return (
        <section className="bg-white md:py-20 py-10">
            <div className="max-w-7xl mx-auto px-4 lg:px-10">
                <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-16 gap-6 items-center">
                    <div className="order-1 lg:order-2">
                        <div className="text-foreground font-ppmori-semibold lg:text-[40px] text-[30px] mb-6">
                            Big Savings,<br />
                            <span className="text-head">
                                Small Investment
                            </span>
                        </div>
                        <div className="text-sub-foreground font-ppmori text-[16px] leading-[1.6]">
                            For just ${price} per year, your Renu Plus Membership can pay for itself with a single transaction. Whether you're upgrading your home, gardens, refreshing your wardrobe, or planning a getaway, our exclusive discounts help you achieve more while spending less.
                        </div>
                    </div>
                    <div className="order-2 lg:order-1 md:block hidden relative aspect-[1.11] md:w-119.75 w-full  h-auto">
                        <Image src="/home/img-4.png" alt="Smarter Spending" fill className="object-contain h-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}