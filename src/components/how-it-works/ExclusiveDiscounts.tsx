"use client";

import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Leaf1 from "../../../public/common/leaf.svg";
import Img from "../../../public/how-it-works/img-2.webp"

export default function ExclusiveDiscounts() {
    const { isLoaded } = useLoading();

    return (
        <section className="md:min-h-[85vh] bg-white relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 left-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain" />
            </div>
            {/* Decorative leaf bottom-right */}
            <div className="absolute bottom-0 right-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain rotate-180" />
            </div>
            <div className="relative z-10 md:px-20 px-4 w-full">
                {/* Leaf decoration */}
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-10 lg:items-center w-full h-full">

                    {/* Text side - animated */}
                    <div className=" lg:pl-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-foreground font-ppmori-semibold lg:text-[50px] md:text-[42px] text-[2rem] leading-[1.2] mb-6"
                        >
                            Exclusive Discounts
                            <br />
                            <span className="text-head">at Various Retailers</span>
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-auto h-[500px] relative md:hidden mb-6"
                        >
                            <Image src={Img} alt="Exclusive Discounts" fill className="object-contain" priority />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-sub-foreground font-ppmori lg:text-[18px] md:text-[18px] text-[1rem] leading-[1.6] max-w-xl"
                        >
                            Your membership discounts are applicable at numerous partnered retailers,
                            where they provide substantial savings exclusively for Renu Plus members.
                            These discounts apply to regularly priced items, ensuring you receive the best deals
                            on your purchases, while items already discounted are excluded. With your virtual card,
                            you can conveniently shop both online and in-store, enjoying expert assistance along
                            the way.
                        </motion.p>
                    </div>
                    {/* Image side - animated */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full h-[300px] md:h-[600px] relative md:block hidden"
                    >
                        <Image src={Img} alt="Exclusive Discounts" fill className="object-contain" priority />
                    </motion.div>


                </div>
            </div>
        </section>
    );
}
