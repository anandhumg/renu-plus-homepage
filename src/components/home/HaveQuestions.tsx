import Link from "next/link";

export default function HaveQuestions() {
    return (
        <section className="bg-background py-20">
            <div className="text-foreground font-ppmori-semibold lg:text-[40px] text-[30px] text-center">
                Got questions?
            </div>
            <div className="mt-2 max-w-md text-sub-foreground font-ppmori lg:text-[16px] text-[16px] text-center mx-auto">
                Contact us today to learn more about our membership benefits and how you can start saving immediately.
            </div>
            <div className="flex justify-center mt-10">
                <Link href="/" className="bg-primary text-[18px] text-white px-6 py-3 rounded-full font-ppmori hover:bg-primary/80 transition-colors">
                    Talk to Us
                </Link>
            </div>
        </section>
    );
}