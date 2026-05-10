import Image from "next/image";
import Leaf1 from "../../../public/common/leaf.svg"
import Img5 from "../../../public/home/img-5.webp"

export default function Steps() {
    return (
        <section className="md:py-40 py-20 bg-white relative overflow-hidden">
            {/* Decorative leaf top-left */}
            <div className="absolute top-0 left-0 w-40 h-40 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain" />
            </div>
            {/* Decorative leaf bottom-right */}
            <div className="absolute bottom-0 right-0 w-40 h-40 opacity-100 pointer-events-none select-none">
                <Image src={Leaf1} alt="Leaf" fill className="object-contain rotate-180" />
            </div>

            <div className="max-w-7xl mx-auto md:px-20 px-4">
                <div className="grid md:grid-cols-2 gap-10  items-center">

                    {/* Left: Text + Steps */}
                    <div>
                        <h2 className="text-[40px] font-ppmori-semibold text-foreground mb-3">Start Saving in Minutes</h2>
                        <p className="text-[18px] font-ppmori text-[#4B5563] mb-10 max-w-md">
                            Get access to exclusive discounts with a simple membership – no complex setup, no waiting.
                        </p>

                        <div className="flex flex-col divide-y divide-gray-200">
                            {/* Step 1 */}
                            <div className="flex items-start gap-4 py-6">
                                <div className="border border-dashed border-primary rounded-full p-1.5 shrink-0">
                                    <div className="bg-[#F9F6F4] rounded-full w-10 h-10 flex items-center justify-center">
                                        {/* Link/chain icon */}
                                        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 12C16.3833 12 17.5627 11.5123 18.538 10.537C19.5133 9.56167 20.0007 8.38267 20 7C19.9993 5.61733 19.5117 4.43833 18.537 3.463C17.5623 2.48767 16.3833 2 15 2C14.55 2 14.1127 2.05833 13.688 2.175C13.2633 2.29167 12.8673 2.45833 12.5 2.675C12.9833 3.275 13.3543 3.94167 13.613 4.675C13.8717 5.40833 14.0007 6.18333 14 7C13.9993 7.81667 13.8703 8.59167 13.613 9.325C13.3557 10.0583 12.9847 10.725 12.5 11.325C12.8667 11.5417 13.2627 11.7083 13.688 11.825C14.1133 11.9417 14.5507 12 15 12ZM11 10C11.3167 9.58333 11.5627 9.12067 11.738 8.612C11.9133 8.10333 12.0007 7.566 12 7C11.9993 6.434 11.912 5.89667 11.738 5.388C11.564 4.87933 11.318 4.41667 11 4C10.6833 4.41667 10.4377 4.87933 10.263 5.388C10.0883 5.89667 10.0007 6.434 10 7C9.99933 7.566 10.087 8.10367 10.263 8.613C10.439 9.12233 10.6847 9.58467 11 10ZM7 12C7.45 12 7.88767 11.9417 8.313 11.825C8.73833 11.7083 9.134 11.5417 9.5 11.325C9.01667 10.725 8.646 10.0583 8.388 9.325C8.13 8.59167 8.00067 7.81667 8 7C7.99933 6.18333 8.12867 5.40833 8.388 4.675C8.64733 3.94167 9.018 3.275 9.5 2.675C9.13333 2.45833 8.73767 2.29167 8.313 2.175C7.88833 2.05833 7.45067 2 7 2C5.61667 2 4.43767 2.48767 3.463 3.463C2.48833 4.43833 2.00067 5.61733 2 7C1.99933 8.38267 2.487 9.562 3.463 10.538C4.439 11.514 5.618 12.0013 7 12ZM7 14C5.05 14 3.396 13.321 2.038 11.963C0.680001 10.605 0.000667157 8.95067 4.90196e-07 7C-0.000666176 5.04933 0.678667 3.39533 2.038 2.038C3.39733 0.680667 5.05133 0.00133333 7 0C7.75 0 8.46267 0.108333 9.138 0.325C9.81333 0.541667 10.434 0.85 11 1.25C11.5667 0.85 12.1877 0.541667 12.863 0.325C13.5383 0.108333 14.2507 0 15 0C16.95 0 18.6043 0.679333 19.963 2.038C21.3217 3.39667 22.0007 5.05067 22 7C21.9993 8.94933 21.3203 10.6037 19.963 11.963C18.6057 13.3223 16.9513 14.0013 15 14C14.25 14 13.5377 13.8917 12.863 13.675C12.1883 13.4583 11.5673 13.15 11 12.75C10.4333 13.15 9.81267 13.4583 9.138 13.675C8.46333 13.8917 7.75067 14 7 14Z" fill="#7C5D48" />
                                        </svg>

                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[20px] font-ppmori-semibold text-foreground mb-1">Join & Activate</h3>
                                    <p className="text-[16px] text-[#4B5563] font-ppmori">Sign up and get instant access with a simple annual membership</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex items-start gap-4 py-6">
                                <div className="border border-dashed border-primary rounded-full p-1.5 shrink-0">
                                    <div className="bg-[#F9F6F4] rounded-full w-10 h-10 flex items-center justify-center">
                                        {/* ID card icon */}
                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1H16C16.7956 1 17.5587 1.31607 18.1213 1.87868C18.6839 2.44129 19 3.20435 19 4V14C19 14.7956 18.6839 15.5587 18.1213 16.1213C17.5587 16.6839 16.7956 17 16 17H4C3.20435 17 2.44129 16.6839 1.87868 16.1213C1.31607 15.5587 1 14.7956 1 14V4Z" stroke="#7C5D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M13 5H15M13 9H15M5 13H15M5 7C5 7.53043 5.21071 8.03914 5.58579 8.41421C5.96086 8.78929 6.46957 9 7 9C7.53043 9 8.03914 8.78929 8.41421 8.41421C8.78929 8.03914 9 7.53043 9 7C9 6.46957 8.78929 5.96086 8.41421 5.58579C8.03914 5.21071 7.53043 5 7 5C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7Z" stroke="#7C5D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[20px] font-ppmori-semibold text-foreground mb-1">Get Your Digital ID</h3>
                                    <p className="text-[16px] text-[#4B5563] font-ppmori">Instantly access your membership ID on your phone, ready to use anytime.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex items-start gap-4 py-6">
                                <div className="border border-dashed border-primary rounded-full p-1.5 shrink-0">
                                    <div className="bg-[#F9F6F4] rounded-full w-10 h-10 flex items-center justify-center">
                                        {/* Tag/discount icon */}
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.51143 1.66587C8.69902 1.45637 8.92868 1.28878 9.18542 1.17404C9.44216 1.0593 9.72022 1 10.0014 1C10.2826 1 10.5607 1.0593 10.8174 1.17404C11.0742 1.28878 11.3038 1.45637 11.4914 1.66587L12.1914 2.44787C12.3915 2.67137 12.6393 2.847 12.9164 2.96177C13.1935 3.07653 13.4929 3.12749 13.7924 3.11087L14.8424 3.05287C15.1233 3.03739 15.4042 3.08132 15.6669 3.18179C15.9297 3.28227 16.1682 3.43703 16.3671 3.63596C16.5659 3.8349 16.7205 4.07354 16.8209 4.3363C16.9212 4.59906 16.965 4.88003 16.9494 5.16087L16.8914 6.20987C16.875 6.5092 16.926 6.80841 17.0408 7.08536C17.1555 7.36231 17.3311 7.60992 17.5544 7.80987L18.3364 8.50987C18.5461 8.69746 18.7138 8.92718 18.8287 9.18402C18.9435 9.44086 19.0029 9.71903 19.0029 10.0004C19.0029 10.2817 18.9435 10.5599 18.8287 10.8167C18.7138 11.0736 18.5461 11.3033 18.3364 11.4909L17.5544 12.1909C17.3309 12.3909 17.1553 12.6387 17.0405 12.9158C16.9258 13.193 16.8748 13.4924 16.8914 13.7919L16.9494 14.8419C16.9649 15.1227 16.921 15.4037 16.8205 15.6664C16.72 15.9291 16.5653 16.1677 16.3663 16.3665C16.1674 16.5653 15.9288 16.72 15.666 16.8203C15.4032 16.9207 15.1223 16.9645 14.8414 16.9489L13.7924 16.8909C13.4931 16.8744 13.1939 16.9254 12.9169 17.0402C12.64 17.155 12.3924 17.3305 12.1924 17.5539L11.4924 18.3359C11.3048 18.5455 11.0751 18.7133 10.8183 18.8281C10.5614 18.9429 10.2833 19.0023 10.0019 19.0023C9.72059 19.0023 9.44241 18.9429 9.18558 18.8281C8.92874 18.7133 8.69902 18.5455 8.51143 18.3359L7.81143 17.5539C7.61137 17.3304 7.3636 17.1547 7.08646 17.04C6.80933 16.9252 6.50993 16.8743 6.21043 16.8909L5.16043 16.9489C4.87959 16.9644 4.59863 16.9204 4.33592 16.82C4.0732 16.7195 3.83464 16.5647 3.6358 16.3658C3.43695 16.1668 3.28231 15.9282 3.18196 15.6654C3.08161 15.4027 3.03781 15.1217 3.05343 14.8409L3.11143 13.7919C3.1279 13.4925 3.07686 13.1933 2.9621 12.9164C2.84734 12.6394 2.67179 12.3918 2.44843 12.1919L1.66643 11.4919C1.45676 11.3043 1.28903 11.0746 1.17419 10.8177C1.05936 10.5609 1 10.2827 1 10.0014C1 9.72003 1.05936 9.44186 1.17419 9.18502C1.28903 8.92818 1.45676 8.69846 1.66643 8.51087L2.44843 7.81087C2.67193 7.61081 2.84756 7.36304 2.96232 7.0859C3.07709 6.80877 3.12805 6.50937 3.11143 6.20987L3.05343 5.15987C3.03809 4.87911 3.08213 4.59827 3.18267 4.33567C3.28321 4.07308 3.43799 3.83464 3.63691 3.63591C3.83583 3.43717 4.07442 3.28262 4.33711 3.18233C4.5998 3.08204 4.88068 3.03827 5.16143 3.05387L6.21043 3.11187C6.50976 3.12834 6.80897 3.07731 7.08592 2.96254C7.36287 2.84778 7.61048 2.67223 7.81043 2.44887L8.51143 1.66587Z" stroke="#7C5D48" stroke-width="2" />
                                            <path d="M7.50146 7.50098H7.51147V7.51098H7.50146V7.50098ZM12.5015 12.501H12.5115V12.511H12.5015V12.501Z" stroke="#7C5D48" stroke-width="3" stroke-linejoin="round" />
                                            <path d="M13.0015 7.00098L7.00146 13.001" stroke="#7C5D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[20px] font-ppmori-semibold text-foreground mb-1">Show & Save</h3>
                                    <p className="text-[16px] text-[#4B5563] font-ppmori">Present your ID at partner stores and unlock exclusive pricing.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image placeholder */}
                    <div className="relative  w-[500px] aspect-3/4 rounded-3xl flex flex-col items-center justify-center  gap-3">
                        <Image src={Img5} alt="Hero Image" fill priority className="object-contain" />
                    </div>

                </div>
            </div>
        </section>
    );
}