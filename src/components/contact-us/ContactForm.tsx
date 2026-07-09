"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader2, Mail, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
    const [fields, setFields] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const tempErrors: { [key: string]: string } = {};
        if (!fields.name.trim()) tempErrors.name = "Name is required";
        if (!fields.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
            tempErrors.email = "Please enter a valid email address";
        }
        if (!fields.message.trim()) tempErrors.message = "Message is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));

        // Clear error as the user types
        if (errors[name]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            toast.error("Please correct the errors in the form");
            return;
        }

        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("name", fields.name.trim());
            formData.append("email", fields.email.trim());
            formData.append("message", fields.message.trim());

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

            // Post to the public application endpoint
            await axios.post(`${apiUrl}/partners/apply`, formData);

            toast.success("Thank you! Your message has been sent successfully.");
            setFields({ name: "", email: "", message: "" });
            setErrors({});
        } catch (error: any) {
            console.error("Contact Us error:", error);
            const errorMsg = error.response?.data?.message || "Failed to send your message. Please try again later.";
            toast.error(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="relative w-full md:min-h-screen min-h-[90vh] flex items-center justify-center bg-white py-24 px-4 md:px-8">
            {/* Elliptical background ambient gradient */}

            <div className="max-w-xl w-full relative z-10">
                <div className="text-center mb-8 mt-2">
                    <h1 className="text-foreground font-ppmori-semibold text-[2.5rem] md:text-[60px] leading-tight">
                        Contact us
                    </h1>
                    <p className="text-sub-foreground font-ppmori text-[18px] mt-2 leading-relaxed">
                        Do you have any questions, suggestions or other requests? We look forward to hearing from you!
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label className="text-gray-700 font-ppmori-semibold text-[14px] mb-2 block">
                            Your name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={fields.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className={`w-full pl-11 pr-4 h-[52px] bg-white border ${errors.name ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-md outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1 ml-3 font-ppmori">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="text-gray-700 font-ppmori-semibold text-[14px] mb-2 block">
                            Your email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={fields.email}
                                onChange={handleChange}
                                placeholder="Your email address"
                                className={`w-full pl-11 pr-4 h-[52px] bg-white border ${errors.email ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-md outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 ml-3 font-ppmori">{errors.email}</p>
                        )}
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="text-gray-700 font-ppmori-semibold text-[14px] mb-2 block">
                            Your message <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute top-3 left-4 text-gray-400 pointer-events-none">
                                <MessageSquare size={18} />
                            </span>
                            <textarea
                                name="message"
                                value={fields.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                className={`w-full pl-11 pr-4 py-3 h-[130px] bg-white border ${errors.message ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-md outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2 resize-none`}
                            />
                        </div>
                        {errors.message && (
                            <p className="text-red-500 text-xs mt-1 ml-3 font-ppmori">{errors.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-primary hover:bg-primary/95 text-white font-ppmori-semibold h-[52px] rounded-full text-[16px] flex items-center justify-center cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
