import Image from "next/image";

export default function SmarterSpending() {
    return (
        <section className="lg:py-24 py-10 bg-[#f9f6f4] rounded-[50px] mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[40%_55%] grid-cols-1 gap-10 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="text-head lg:text-[40px] text-[30px] mb-6">
                            Your Key to <br />
                            Smarter Spending
                        </div>
                        <div className="text-body">
                            Renu Plus has been helping people save money since 2013. with our trusted discount membership, we provide access to exclusive savings at a variety of retailers. Shop smarter and enjoy incredible deals on essential purchases—both online and in-store—while maximizing your budget.
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