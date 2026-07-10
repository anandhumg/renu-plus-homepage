"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface FormFields {
    company_name: string;
    owner_name: string;
    business_email: string;
    general_contact: string;
    website: string;
    business_location: string;
    business_category: string;
    street_address: string;
    state: string;
    city: string;
    zip_code: string;
    discount_percentage_offer: string;
    message: string;
}

interface FormErrors {
    [key: string]: string;
}

export default function BusinessForm() {
    const [fields, setFields] = useState<FormFields>({
        company_name: "",
        owner_name: "",
        business_email: "",
        general_contact: "",
        website: "",
        business_location: "",
        business_category: "",
        street_address: "",
        state: "",
        city: "",
        zip_code: "",
        discount_percentage_offer: "",
        message: "",
    });

    const [logo, setLogo] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateField = (name: keyof FormFields, value: string): string => {
        if (["owner_name", "business_email", "general_contact", "business_location", "street_address", "city", "zip_code"].includes(name) && !value.trim()) {
            // Nice user friendly label formatting
            const label = name.replace(/_/g, " ");
            return `${label.charAt(0).toUpperCase() + label.slice(1)} is required`;
        }

        if (name === "business_email" && value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return "Please enter a valid email address";
            }
        }

        if (name === "website" && value.trim()) {
            try {
                // Prepend protocol if missing
                let urlStr = value;
                if (!/^https?:\/\//i.test(value)) {
                    urlStr = "http://" + value;
                }
                new URL(urlStr);
            } catch {
                return "Please enter a valid URL (e.g. www.example.com)";
            }
        }

        return "";
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));

        // Clear error on change if valid
        const error = validateField(name as keyof FormFields, value);
        setErrors((prev) => {
            const copy = { ...prev };
            if (error) {
                copy[name] = error;
            } else {
                delete copy[name];
            }
            return copy;
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Check file size (3MB limit)
            if (file.size > 3 * 1024 * 1024) {
                toast.error("Logo image size must be under 3 MB");
                return;
            }

            // Check file type
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file (PNG, JPG, WEBP)");
                return;
            }

            setLogo(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            if (file.size > 3 * 1024 * 1024) {
                toast.error("Logo image size must be under 3 MB");
                return;
            }

            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file (PNG, JPG, WEBP)");
                return;
            }

            setLogo(file);
        }
    };

    const removeLogo = () => {
        setLogo(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all required fields
        const newErrors: FormErrors = {};
        Object.keys(fields).forEach((key) => {
            const err = validateField(key as keyof FormFields, fields[key as keyof FormFields]);
            if (err) {
                newErrors[key] = err;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields correctly");

            // Scroll to the first error
            const firstErrorKey = Object.keys(newErrors)[0];
            const element = document.getElementsByName(firstErrorKey)[0];
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                element.focus();
            }
            return;
        }

        setSubmitting(true);

        try {
            const formData = new FormData();

            // Append text fields dynamically
            Object.entries(fields).forEach(([key, val]) => {
                if (val.trim()) {
                    formData.append(key, val);
                }
            });

            // Append logo if exists
            if (logo) {
                formData.append("logo", logo);
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

            await axios.post(`${apiUrl}/partners/apply`, formData);

            toast.success("Your partner application has been submitted successfully!");

            // Reset Form
            setFields({
                company_name: "",
                owner_name: "",
                business_email: "",
                general_contact: "",
                website: "",
                business_location: "",
                business_category: "",
                street_address: "",
                state: "",
                city: "",
                zip_code: "",
                discount_percentage_offer: "",
                message: "",
            });
            setLogo(null);
            setErrors({});

        } catch (error: any) {
            console.error("Partner application error:", error);
            const errorMsg = error.response?.data?.message || "Failed to submit partner application. Please try again.";
            toast.error(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="bg-white py-20 px-4 md:px-8 border-t border-gray-100">
            <div className="max-w-4xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-30">
                    <h2 className="text-foreground font-ppmori-semibold text-[2rem] md:text-[40px] mb-4">
                        Tell us about your business
                    </h2>
                    <p className="text-sub-foreground font-ppmori text-[15px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
                        Complete the form below and our team will review your application and get in touch to discuss partnership opportunities with Renu+.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                        {/* Company Name - Full Width */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Company name
                            </label>
                            <input
                                type="text"
                                name="company_name"
                                value={fields.company_name}
                                onChange={handleInputChange}
                                placeholder="Company name"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.company_name ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.company_name && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.company_name}</p>
                            )}
                        </div>

                        {/* Owner Name * */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Owner name <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="text"
                                name="owner_name"
                                value={fields.owner_name}
                                onChange={handleInputChange}
                                placeholder="Owner name"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.owner_name ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.owner_name && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.owner_name}</p>
                            )}
                        </div>

                        {/* Business Email * */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Business email <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="email"
                                name="business_email"
                                value={fields.business_email}
                                onChange={handleInputChange}
                                placeholder="Business email"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.business_email ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.business_email && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.business_email}</p>
                            )}
                        </div>

                        {/* General Contact * */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                General contact <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="text"
                                name="general_contact"
                                value={fields.general_contact}
                                onChange={handleInputChange}
                                placeholder="General contact number"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.general_contact ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.general_contact && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.general_contact}</p>
                            )}
                        </div>

                        {/* Website */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Website
                            </label>
                            <input
                                type="text"
                                name="website"
                                value={fields.website}
                                onChange={handleInputChange}
                                placeholder="Website URL"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.website ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.website && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.website}</p>
                            )}
                        </div>

                        {/* Business Location * */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Business location <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="text"
                                name="business_location"
                                value={fields.business_location}
                                onChange={handleInputChange}
                                placeholder="Business location"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.business_location ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.business_location && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.business_location}</p>
                            )}
                        </div>

                        {/* Business Category */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Business category
                            </label>
                            <input
                                type="text"
                                name="business_category"
                                value={fields.business_category}
                                onChange={handleInputChange}
                                placeholder="Home Improvement, Furniture, Electronics..."
                                className={`w-full px-4 h-[52px] bg-white border ${errors.business_category ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.business_category && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.business_category}</p>
                            )}
                        </div>

                        {/* Street Address * */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Street address <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="text"
                                name="street_address"
                                value={fields.street_address}
                                onChange={handleInputChange}
                                placeholder="Street address"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.street_address ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.street_address && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.street_address}</p>
                            )}
                        </div>

                        {/* State */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={fields.state}
                                onChange={handleInputChange}
                                placeholder="State / Province"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.state ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.state}</p>
                            )}
                        </div>

                        {/* City * */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                City <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={fields.city}
                                onChange={handleInputChange}
                                placeholder="City"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.city ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.city}</p>
                            )}
                        </div>

                        {/* ZIP Code * */}
                        <div className="col-span-1">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                ZIP code <span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <input
                                type="text"
                                name="zip_code"
                                value={fields.zip_code}
                                onChange={handleInputChange}
                                placeholder="ZIP / Postal code"
                                className={`w-full px-4 h-[52px] bg-white border ${errors.zip_code ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.zip_code && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.zip_code}</p>
                            )}
                        </div>

                        {/* Discount Percentage Offer - Full Width */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Discount percentage offer
                            </label>
                            <input
                                type="text"
                                name="discount_percentage_offer"
                                value={fields.discount_percentage_offer}
                                onChange={handleInputChange}
                                placeholder="e.g. 10% off tools, $50 off orders over $500..."
                                className={`w-full px-4 h-[52px] bg-white border ${errors.discount_percentage_offer ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2`}
                            />
                            {errors.discount_percentage_offer && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.discount_percentage_offer}</p>
                            )}
                        </div>

                        {/* Message - Full Width */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={fields.message}
                                onChange={handleInputChange}
                                placeholder="Your message here..."
                                className={`w-full px-4 py-3 h-[120px] bg-white border ${errors.message ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"
                                    } rounded-lg outline-none transition-all text-gray-900 placeholder-gray-300 text-[16px] font-ppmori focus:ring-2 resize-none`}
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1 font-ppmori">{errors.message}</p>
                            )}
                        </div>

                        {/* Company Logo Upload - Full Width */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="text-gray-800 font-ppmori-semibold text-[14px] mb-2 block">
                                Upload company logo
                            </label>

                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full border-2 border-dashed border-[#D1D5DB] hover:border-primary/60 transition-colors bg-[#F9F6F4] rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer text-center"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />

                                {logo ? (
                                    <div className="flex flex-col items-center space-y-2" onClick={(e) => e.stopPropagation()}>
                                        <div className="bg-[#FAF8F5] p-3 rounded-full relative">
                                            <img
                                                src={URL.createObjectURL(logo)}
                                                alt="Logo preview"
                                                className="w-16 h-16 object-contain"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeLogo}
                                                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-sm transition-colors"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <p className="text-gray-700 font-ppmori-semibold text-[14px]">
                                            {logo.name}
                                        </p>
                                        <p className="text-gray-400 text-xs font-ppmori">
                                            {(logo.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="bg-primary/5 p-4 rounded-full text-head">
                                            <UploadCloud size={28} />
                                        </div>
                                        <p className="text-gray-700 font-ppmori-semibold text-[15px]">
                                            Click to Upload or drag and drop
                                        </p>
                                        <p className="text-gray-400 text-[12px] font-ppmori">
                                            (Max file size: 3 MB)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-primary hover:bg-primary/95 text-white font-ppmori-semibold text-[18px] rounded-full px-25 py-3.5 leading-none h-[50px] inline-flex items-center justify-center cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 size={20} className="animate-spin mr-2" />
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
