"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import RenuCardImage from "../../../public/home/img-2.webp"
import Coin1 from "../../../public/home/coin-1.svg"
import Coin2 from "../../../public/home/coin-2.svg"
import Logo2 from "../../../public/logo-2.svg"
import StepOne from "../../../public/home/sec-step-1.svg"
import StepTwo from "../../../public/home/sec-step-2.svg"
import StepThree from "../../../public/home/sec-step-3.svg"

export default function SmartStanding() {
    const price = process.env.NEXT_PUBLIC_PACKAGE_PRICE || "49";

    const coins = [
        { src: Coin1, size: 80, top: "10%", right: "25%", duration: 15, delay: 0 },
        { src: Coin2, size: 70, top: "25%", left: "25%", duration: 20, delay: 2 },
        { src: Coin1, size: 60, bottom: "20%", right: "20%", duration: 18, delay: 1 },
        { src: Coin2, size: 90, top: "60%", left: "15%", duration: 22, delay: 3 },
    ];

    return (
        <section className="relative md:pt-40 pt-20 w-full bg-background overflow-hidden">
            {/* Ambient Spinning Coins */}
            {coins.map((coin, index) => (
                <motion.div
                    key={index}
                    style={{
                        position: "absolute",
                        top: coin.top,
                        left: coin.left,
                        right: coin.right,
                        bottom: coin.bottom,
                        width: coin.size,
                        height: coin.size,
                        zIndex: 10,
                    }}
                    animate={{
                        rotate: 360,
                        y: [0, -15, 0],
                    }}
                    transition={{
                        rotate: {
                            duration: coin.duration,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: coin.delay,
                        }
                    }}
                    className="pointer-events-none opacity-80"
                >
                    <Image src={coin.src} alt="Coin" fill className="object-contain" />
                </motion.div>
            ))}

            <div className="md:px-20 px-4 w-full relative z-20">
                <div className="text-center mb-12">
                    <p className="md:text-[50px] text-[30px] font-ppmori-semibold text-foreground md:leading-13 leading-10">Your gateway to </p>
                    <p className="md:text-[50px] text-[30px] font-ppmori-semibold text-head">Smarter Spending.</p>
                    <div className="flex items-center justify-center my-[63px]">
                        <div className="relative w-[227px] aspect-[1.2]">
                            <Image src={Logo2} alt={""} className="object-contain" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="text-[61px] text-foreground font-ppmori-semibold">${price}</span>
                        <span className="text-[37px] text-foreground font-ppmori">/year</span>
                    </div>
                </div>
                <div className="flex gap-4 justify-center items-center my-20">
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.96205 12.5277L3.72704 15.085C3.6026 15.1464 3.4871 15.1713 3.38054 15.1597C3.27477 15.1472 3.17171 15.1107 3.07138 15.05C2.97027 14.9878 2.89404 14.8999 2.84271 14.7863C2.79138 14.6728 2.78671 14.5487 2.82871 14.4142L3.95571 9.61917L0.228211 6.3875C0.123211 6.30194 0.0539889 6.19967 0.0205444 6.08067C-0.0129 5.96167 -0.00551107 5.84772 0.0427112 5.73883C0.0909334 5.62994 0.1551 5.5405 0.235211 5.4705C0.3161 5.40283 0.424989 5.35695 0.561878 5.33283L5.48055 4.9035L7.39855 0.362834C7.45143 0.2345 7.52766 0.141944 7.62721 0.0851666C7.72677 0.0283888 7.83838 0 7.96205 0C8.08571 0 8.19771 0.0283888 8.29805 0.0851666C8.39838 0.141944 8.47421 0.2345 8.52555 0.362834L10.4435 4.9035L15.361 5.33283C15.4987 5.35617 15.608 5.40244 15.6889 5.47167C15.7698 5.54011 15.8343 5.62917 15.8825 5.73883C15.93 5.84772 15.937 5.96167 15.9035 6.08067C15.8701 6.19967 15.8009 6.30194 15.6959 6.3875L11.9684 9.61917L13.0954 14.4142C13.1389 14.5472 13.1347 14.6708 13.0825 14.7852C13.0304 14.8995 12.9538 14.9874 12.8527 15.0488C12.7532 15.1111 12.6501 15.148 12.5435 15.1597C12.4378 15.1713 12.3227 15.1464 12.1982 15.085L7.96205 12.5277Z" fill="#B68F00" />
                        </svg>
                    </div>
                    <div className="text-[24px] font-ppmori-semibold text-foreground mt-1">
                        RENU PLUS BENEFITS
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.96205 12.5277L3.72704 15.085C3.6026 15.1464 3.4871 15.1713 3.38054 15.1597C3.27477 15.1472 3.17171 15.1107 3.07138 15.05C2.97027 14.9878 2.89404 14.8999 2.84271 14.7863C2.79138 14.6728 2.78671 14.5487 2.82871 14.4142L3.95571 9.61917L0.228211 6.3875C0.123211 6.30194 0.0539889 6.19967 0.0205444 6.08067C-0.0129 5.96167 -0.00551107 5.84772 0.0427112 5.73883C0.0909334 5.62994 0.1551 5.5405 0.235211 5.4705C0.3161 5.40283 0.424989 5.35695 0.561878 5.33283L5.48055 4.9035L7.39855 0.362834C7.45143 0.2345 7.52766 0.141944 7.62721 0.0851666C7.72677 0.0283888 7.83838 0 7.96205 0C8.08571 0 8.19771 0.0283888 8.29805 0.0851666C8.39838 0.141944 8.47421 0.2345 8.52555 0.362834L10.4435 4.9035L15.361 5.33283C15.4987 5.35617 15.608 5.40244 15.6889 5.47167C15.7698 5.54011 15.8343 5.62917 15.8825 5.73883C15.93 5.84772 15.937 5.96167 15.9035 6.08067C15.8701 6.19967 15.8009 6.30194 15.6959 6.3875L11.9684 9.61917L13.0954 14.4142C13.1389 14.5472 13.1347 14.6708 13.0825 14.7852C13.0304 14.8995 12.9538 14.9874 12.8527 15.0488C12.7532 15.1111 12.6501 15.148 12.5435 15.1597C12.4378 15.1713 12.3227 15.1464 12.1982 15.085L7.96205 12.5277Z" fill="#B68F00" />
                        </svg>
                    </div>
                </div>
                <div className="grid grid-cols-3 w-full mt-10 max-w-360 px-10 mx-auto">
                    <div className="flex gap-3 items-start">
                        <div className="relative aspect-square w-[48px] mt-0.5">
                            <Image src={StepOne} alt="Step One" fill className="object-contain" />
                        </div>
                        <div>
                            <p className="text-[22px] font-ppmori-semibold text-head">Exclusive member pricing</p>
                            <p className="text-[16px] font-ppmori text-[#4B5563]">Special discounts not available to regular customers</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="relative aspect-square w-[48px] mt-0.5">
                            <Image src={StepTwo} alt="Step Two" fill className="object-contain" />
                        </div>
                        <div>
                            <p className="text-[22px] font-ppmori-semibold text-head">Access to trusted retailers</p>
                            <p className="text-[16px] font-ppmori text-[#4B5563]">Save across furniture, appliances, and home improvement</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="relative aspect-square w-[48px]">
                            <Image src={StepThree} alt="Step Three" fill className="object-contain" />
                        </div>
                        <div>
                            <p className="text-[22px] font-ppmori-semibold text-head">Simple in-store redemption</p>
                            <p className="text-[16px] font-ppmori text-[#4B5563]">No codes, no coupons, just show your ID</p>
                        </div>
                    </div>
                </div>
                <div className="my-10 flex justify-center">
                    <button className="bg-primary text-[18px] font-ppmori-semibold text-white px-8 py-3 h-12  rounded-full  hover:bg-primary/80 transition-colors cursor-pointer">
                        Get Membership
                    </button>
                </div>
            </div>
            <div className=" relative flex justify-center md:h-[115vh] w-full mt-20">
                <div className="relative aspect-[1.06] md:w-auto w-full h-full z-10">
                    <Image src={RenuCardImage} alt="Smart Standing" fill className="object-contain" />
                </div>
                <div className="h-full  rounded-t-full scale-130  bg-white w-full absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] z-0"></div>
            </div>
        </section>
    );
}