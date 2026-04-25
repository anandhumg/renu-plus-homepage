import Image from "next/image";
import Link from "next/link";

export default function HowItWorksSection() {
    const starIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#bc9c22" stroke="#bc9c22" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star-icon lucide-star mt-1.5"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
    )
    const steps = [
        "Create account through <a href='/sign-up-login' style='color: #bc9c22'>Sign Up Now</a> link",
        "Upload your picture and the information required on the Create Profile Page.",
        "Provide your preferred payment method information.",
        "For an annual fee of $159, you will receive your Renu Plus membership.",
        "Your membership will be available as a virtual card through your profile.",
        "Go shopping and SAVE!"
    ]
    return (
        <section className="lg:py-24 py-10 bg-[#f9f6f4] md:mt-20 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-16 gap-6 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-head lg:text-[40px] text-[30px] mb-8">
                            How It Works?
                        </h2>
                        <div className="text-body space-y-6 md:text-[20px] text-[18px] leading-[1.6] mb-6 ">
                            {steps.map((step, index) => (
                                <div key={index} className="flex md:gap-5 gap-3">
                                    <div>
                                        {starIcon}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: step }} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 relative w-full h-[400px] md:h-[700px]">
                        <Image
                            src="/how-it-works/img-2.png"
                            alt="Our Mission"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}