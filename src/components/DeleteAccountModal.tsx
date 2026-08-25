"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import toast from "react-hot-toast";
import * as profileService from "@/services/profile.service";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmSuccess: () => void;
    userEmail: string | undefined;
}

export default function DeleteAccountModal({ isOpen, onClose, onConfirmSuccess, userEmail }: DeleteAccountModalProps) {
    const [confirmEmail, setConfirmEmail] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        if (!userEmail) return;
        
        if (confirmEmail.toLowerCase().trim() !== userEmail.toLowerCase().trim()) {
            toast.error("Email does not match your account email.");
            return;
        }

        try {
            setIsDeleting(true);
            await profileService.requestAccountDeletion(confirmEmail);
            toast.success("Account deletion has been scheduled.");
            onConfirmSuccess();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to schedule account deletion.");
        } finally {
            setIsDeleting(false);
        }
    };

    // Reset input when modal closes
    React.useEffect(() => {
        if (!isOpen) {
            setConfirmEmail("");
            setIsDeleting(false);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isDeleting ? onClose : undefined}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                        className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 z-10 flex flex-col items-center text-center overflow-hidden"
                    >
                        {/* Close button */}
                        {!isDeleting && (
                            <button
                                onClick={onClose}
                                className="absolute right-5 top-5 p-1.5 border border-gray-100 rounded-full text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        )}

                        {/* Warning Icon */}
                        <div className="bg-red-50 text-red-600 p-4 rounded-full mb-5 mt-2">
                            <AlertTriangle size={32} />
                        </div>

                        {/* Title */}
                        <h2 className="text-gray-950 font-ppmori-semibold text-[22px] leading-tight mb-2">
                            Delete Account
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 font-ppmori text-[15px] leading-relaxed mb-6 text-left">
                            Your account and all associated data will be scheduled for permanent deletion in <strong>14 days</strong>. You will lose access to all your membership benefits.
                            <br /><br />
                            Please type your email address <strong>{userEmail}</strong> to confirm.
                        </p>

                        <div className="w-full mb-6 text-left space-y-1">
                            <input
                                type="email"
                                value={confirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                placeholder={userEmail}
                                disabled={isDeleting}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all text-sm font-ppmori"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 w-full flex-col-reverse sm:flex-row">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isDeleting}
                                className="flex-1 h-[48px] border border-gray-200 hover:bg-gray-50 text-gray-700 font-ppmori-semibold rounded-full text-[15px] transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={isDeleting || confirmEmail.toLowerCase().trim() !== userEmail?.toLowerCase().trim()}
                                className="flex-1 h-[48px] bg-red-600 hover:bg-red-700 text-white font-ppmori-semibold rounded-full text-[15px] shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Scheduling...
                                    </>
                                ) : (
                                    "Delete Account"
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
