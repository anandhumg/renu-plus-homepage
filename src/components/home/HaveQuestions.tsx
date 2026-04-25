import Link from "next/link";

export default function HaveQuestions() {
    return (
        <section className="bg-[#e7dad1] py-32 md:mt-20 mt-10">
            <div className="text-head lg:text-[40px] text-[30px] text-center">
                Have Questions?
            </div>
            <div className="mt-2 font-lato lg:text-[20px] text-[16px] text-center max-w-2xl mx-auto">
                Contact us today to learn more about our membership benefits and how you can start saving immediately.
            </div>
            <div className="flex justify-center mt-10">
                <Link href="/" className="bg-primary text-[18px] text-white px-6 py-3 rounded-full font-lato hover:bg-primary/80 transition-colors">
                    Talk to Us
                </Link>
            </div>
        </section>
    );
}