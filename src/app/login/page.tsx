// src/app/login/page.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import * as authService from '@/services/auth.service';
import { GoogleLogin } from '@react-oauth/google';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'email' | 'otp'>('email');
    const [loading, setLoading] = useState(false);
    const { login, socialLogin } = useAuth();
    const router = useRouter();

    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return toast.error('Please enter your email');

        setLoading(true);
        try {
            const res = await authService.requestOtp(email);
            if (res.success) {
                toast.success('OTP sent to your email');
                setStep('otp');
            } else {
                toast.error(res.message || 'Failed to send OTP');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) return toast.error('Please enter the OTP');

        setLoading(true);
        try {
            await login(email, otp);
            toast.success('Successfully logged in');
            router.push('/profile');
        } catch (error: any) {
            toast.error(error.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            setLoading(true);
            await socialLogin('google', credentialResponse.credential);
            toast.success('Logged in with Google');
            router.push('/profile');
        } catch (error: any) {
            toast.error('Google login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary/5 via-white to-primary/10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-ppmori font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to access your exclusive discounts</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'email' ? (
                        <motion.form
                            key="email-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleRequestOtp}
                            className="space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 disabled:opacity-70"
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        <span>Continue</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-3">
                                <div className="flex justify-center">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={() => toast.error('Google login failed')}
                                        theme="outline"
                                        shape="pill"
                                        width="100%"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center space-x-3 py-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-all font-semibold text-gray-700"
                                    onClick={() => toast.success('Apple login coming soon')}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 384 512">
                                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
                                    </svg>
                                    <span>Continue with Apple</span>
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp-step"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleVerifyOtp}
                            className="space-y-6"
                        >
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck className="text-primary" size={32} />
                                </div>
                                <p className="text-gray-600">We've sent a 6-digit code to <br /><span className="font-bold text-gray-900">{email}</span></p>
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm text-center text-2xl tracking-[0.5em] font-bold"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
                            >
                                {loading ? 'Verifying...' : 'Verify & Sign In'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="w-full text-sm text-gray-500 hover:text-primary font-semibold transition-colors uppercase tracking-wider"
                            >
                                Use a different email
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
