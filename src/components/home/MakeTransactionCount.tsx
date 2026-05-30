import Image from "next/image";
import SaveUptoImage from "../../../public/home/img-3.webp"
import Leaf1 from "../../../public/common/leaf.svg"

export default function MakeTransactionCount() {
    const chips = [
        "Home improvement",
        "Building supplies",
        "Appliances & electronics",
        "Tools & outdoor equipment",
        "Furniture & home decor"
    ]
    return (
        <section className="relative bg-background md:py-20 py-15">
            {/* Decorative leaf top-left */}
            <div className="absolute top-0 left-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain" />
            </div>
            {/* Decorative leaf bottom-right */}
            <div className="absolute bottom-0 right-0 md:w-40 w-30 md:h-40 h-30 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain rotate-180" />
            </div>
            <div className="max-w-7xl mx-auto md:mt-10 mt-5 text-center">
                <h1 className="md:text-[40px] text-[28px] font-ppmori-semibold text-foreground">
                    Save on what matters <br /> the most
                </h1>
            </div>
            <div className="mx-auto max-w-5xl flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-10 md:mt-20 mt-15">
                <div className="flex gap-4 flex-wrap justify-center">
                    {chips.map((chip, index) => (
                        <div key={index} className="bg-white border min-w-[277px] md:w-fit w-[94%] border-[#ACACAC] rounded-full pl-1 pr-4 py-1 flex items-center gap-2">
                            <div className="p-1 w-[50px] h-[50px] rounded-full bg-head flex justify-center items-center">
                                <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31.0859 3.89152L24.684 0.0409632H24.6711L24.6322 0.0136542H24.5544C24.5544 -2.08554e-07 24.5415 0 24.5285 0H20.1483C19.9421 0 19.7443 0.0863152 19.5985 0.239958C19.4526 0.3936 19.3707 0.601984 19.3707 0.819267C19.3707 1.76083 19.0157 2.66382 18.3838 3.32961C17.752 3.99539 16.8949 4.36942 16.0013 4.36942C15.1077 4.36942 14.2507 3.99539 13.6188 3.32961C12.9869 2.66382 12.6319 1.76083 12.6319 0.819267C12.6319 0.601984 12.55 0.3936 12.4041 0.239958C12.2583 0.0863152 12.0605 0 11.8543 0H7.47408C7.46112 0 7.44817 -2.08554e-07 7.44817 0.0136542H7.37041L7.33153 0.0409632H7.31857L0.91668 3.89152C0.513081 4.13594 0.213241 4.53346 0.0783705 5.00291C-0.0564998 5.47237 -0.01623 5.97836 0.190959 6.41759L2.57547 11.4424C2.72663 11.7585 2.95812 12.0242 3.24413 12.2098C3.53015 12.3954 3.85946 12.4938 4.19538 12.4938H6.92979V23.6905C6.92979 24.1975 7.12094 24.6837 7.46119 25.0422C7.80144 25.4007 8.26291 25.6021 8.74409 25.6021H23.2585C23.7397 25.6021 24.2012 25.4007 24.5414 25.0422C24.8817 24.6837 25.0728 24.1975 25.0728 23.6905V12.4938H27.8072C28.1431 12.4938 28.4725 12.3954 28.7585 12.2098C29.0445 12.0242 29.276 11.7585 29.4271 11.4424L31.8116 6.41759C32.0188 5.97836 32.0591 5.47237 31.9242 5.00291C31.7894 4.53346 31.4895 4.13594 31.0859 3.89152ZM4.19538 10.8553C4.1486 10.8564 4.10257 10.8427 4.06328 10.8159C4.02399 10.7891 3.99326 10.7505 3.97507 10.7051L1.59056 5.68025C1.57433 5.65068 1.56379 5.61803 1.55957 5.58416C1.55534 5.55029 1.5575 5.51587 1.56593 5.48289C1.57436 5.4499 1.58889 5.419 1.60868 5.39194C1.62848 5.36489 1.65315 5.34222 1.68128 5.32523L6.92979 2.1574V10.8553H4.19538ZM23.5177 23.6905C23.5177 23.7629 23.4904 23.8324 23.4418 23.8836C23.3932 23.9348 23.3272 23.9636 23.2585 23.9636H8.74409C8.67535 23.9636 8.60943 23.9348 8.56082 23.8836C8.51222 23.8324 8.48491 23.7629 8.48491 23.6905V1.57026H11.1416C11.3304 2.78476 11.9228 3.889 12.813 4.68578C13.7032 5.48256 14.8333 5.92001 16.0013 5.92001C17.1693 5.92001 18.2994 5.48256 19.1896 4.68578C20.0798 3.889 20.6722 2.78476 20.861 1.57026H23.5177V23.6905ZM30.412 5.68025L28.0275 10.7051C28.0093 10.7505 27.9786 10.7891 27.9393 10.8159C27.9 10.8427 27.854 10.8564 27.8072 10.8553H25.0728V2.1574L30.3213 5.32523C30.3495 5.34222 30.3741 5.36489 30.3939 5.39194C30.4137 5.419 30.4282 5.4499 30.4367 5.48289C30.4451 5.51587 30.4473 5.55029 30.443 5.58416C30.4388 5.61803 30.4283 5.65068 30.412 5.68025Z" fill="white" />
                                </svg>
                            </div>
                            <div className="md:text-[18px] text-[18px] font-ppmori text-foreground">
                                {chip}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-[204px] h-full md:w-58.75 md:h-auto aspect-[0.79] flex justify-center items-center md:mt-10 mt-10 md:mb-10 mb-0 relative">
                    <Image src={SaveUptoImage} alt="" fill className="object-contain" />
                </div>
            </div>
        </section>
    );
}