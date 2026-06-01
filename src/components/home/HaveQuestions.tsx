import Image from "next/image";
import Leaf1 from "../../../public/common/leaf.svg"

export default function HaveQuestions() {
    return (
        <section className="relative bg-background py-20 px-4">
            {/* Decorative leaf top-left */}
            <div className="absolute top-0 left-0 md:w-40 w-25 h-25 md:h-40 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain" />
            </div>
            <div className="text-foreground font-ppmori-semibold lg:text-[40px] text-[28px] text-center">
                Got questions?
            </div>
            <div className="mt-2 max-w-md text-sub-foreground font-ppmori lg:text-[16px] text-[16px] text-center mx-auto">
                Contact us today to learn more about our membership benefits and how you can start saving immediately.
            </div>
            <div className="flex justify-center mt-10">
                <button className="bg-primary md:text-[18px] text-[17px] font-ppmori-semibold text-white px-6 py-3 h-12 w-[188px] md:w-[144px]  rounded-full  hover:bg-primary/80 transition-colors cursor-pointer">
                    Talk to us
                </button>
            </div>
        </section>
    );
}