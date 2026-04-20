import Image from "next/image";

export default function BigSavings() {
    return (
        <section>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="text-head lg:text-[40px] text-[30px] mb-6">
                            Big Savings, <br /> Small Investment
                        </div>
                        <div className="text-body">
                            For just $159 per year, your Renu Plus Membership can pay for itself with a single transaction. Whether you're upgrading your home, gardens, refreshing your wardrobe, or planning a getaway, our exclusive discounts help you achieve more while spending less.
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 relative w-auto h-full">
                        <Image src="/home/img-4.png" alt="Smarter Spending" width={1000} height={1000} className="object-cover h-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}