"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";

interface LogoutConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-200 flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                        className="relative max-w-sm w-full mx-4 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 z-10 flex flex-col items-center text-center"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute right-5 top-5 p-1.5 border border-gray-100 rounded-full text-gray-400 hover:text-primary hover:border-primary transition-colors cursor-pointer"
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>

                        {/* Sign Out Icon */}
                        <div className="bg-red-50 text-red-600 p-4 rounded-full mb-5 mt-2">
                            <LogOut size={32} />
                        </div>

                        {/* Title */}
                        <h2 className="text-gray-950 font-ppmori-semibold text-[22px] leading-tight mb-2">
                            Sign out of Renu+?
                        </h2>

                        {/* Description */}
                        <p className="text-gray-500 font-ppmori text-[15px] leading-relaxed mb-6">
                            You will need to sign in again to access your exclusive member benefits, partner savings, and account profile.
                        </p>

                        {/* Actions */}
                        <div className="flex gap-4 w-full">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 h-[48px] border border-gray-200 hover:bg-gray-50 text-gray-700 font-ppmori-semibold rounded-full text-[15px] transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onConfirm}
                                className="flex-1 h-[48px] bg-red-600 hover:bg-red-700 text-white font-ppmori-semibold rounded-full text-[15px] shadow-sm transition-colors cursor-pointer"
                            >
                                Sign out
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
