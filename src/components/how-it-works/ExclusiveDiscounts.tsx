import Image from "next/image";

export default function ExclusiveDiscounts() {
    return (
        <section className="md:h-screen bg-white md:px-20 px-4 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-6 lg:items-center w-full h-full">
                <div className="w-full h-[300px] md:h-[600px] relative">
                    <Image src="/how-it-works/img-1.png" alt="Who We Are" fill className="object-contain" />
                </div>
                <div className="">
                    <h1 className="text-head lg:text-[45px] text-[32px] mb-6">
                        Exclusive Discounts at Various Retailers
                    </h1>
                    <p className="text-body mb-6 text-[18px] leading-[1.6] max-w-xl">
                        Your membership discounts are applicable at numerous partnered retailers,
                        where they provide substantial savings exclusively for Renu Plus members.
                        These discounts apply to regularly priced items, ensuring you receive the best deals
                        on your purchases, while items already discounted are excluded. With your virtual card,
                        you can conveniently shop both online and in-store, enjoying expert assistance along
                        the way.
                    </p>
                </div>
            </div>
        </section>
    );
}