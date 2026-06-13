"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ShieldCheck, Loader2, Lock } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import * as authService from '@/services/auth.service';
import * as subscriptionService from '@/services/subscription.service';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, socialLogin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal is opened/closed
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setOtpValues(['', '', '', '', '', '']);
      setStep('email');
      setLoading(false);
    }
  }, [isOpen]);

  // Focus first input on OTP step
  useEffect(() => {
    if (step === 'otp' && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  const checkUserStatusAndRedirect = async (currentUser: any) => {
    try {
      // Fetch the subscription status
      const subscription = await subscriptionService.getCurrentSubscription();
      const hasSubscription = subscription && subscription.status === 'ACTIVE';
      const hasProfile = !!(currentUser?.firstName);

      if (!hasProfile || !hasSubscription) {
        toast.success('Login successful! Redirecting to complete your subscription...');
        router.push('/subscribe');
      } else {
        toast.success(`Welcome back, ${currentUser.firstName}!`);
      }
      onClose();
    } catch (err) {
      console.error('Error checking user status:', err);
      // Fallback: If profile incomplete, redirect to subscribe
      if (!currentUser?.firstName) {
        router.push('/subscribe');
      } else {
        toast.success('Successfully logged in!');
      }
      onClose();
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');

    setLoading(true);
    try {
      const res = await authService.requestOtp(email);
      if (res.success) {
        toast.success('Verification code sent to your email');
        setStep('otp');
      } else {
        toast.error(res.message || 'Failed to send verification code');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    if (!otpCode || otpCode.length < 6) return toast.error('Please enter the 6-digit code');

    setLoading(true);
    try {
      const loggedUser = await login(email, otpCode);
      await checkUserStatusAndRedirect(loggedUser);
    } catch (error: any) {
      toast.error(error.message || 'Invalid code. Please try again.');
      setOtpValues(['', '', '', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 50);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const digit = value.replace(/[^0-9]/g, '');
    const newOtpValues = [...otpValues];

    if (digit) {
      newOtpValues[index] = digit;
      setOtpValues(newOtpValues);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      newOtpValues[index] = '';
      setOtpValues(newOtpValues);
    }

    const fullOtp = newOtpValues.join('');
    if (fullOtp.length === 6) {
      handleVerifyOtp(fullOtp);
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otpValues[index]) {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = '';
        setOtpValues(newOtpValues);
      } else if (index > 0) {
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = '';
        setOtpValues(newOtpValues);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData) {
      const newOtpValues = [...otpValues];
      for (let i = 0; i < 6; i++) {
        newOtpValues[i] = pastedData[i] || '';
      }
      setOtpValues(newOtpValues);

      if (pastedData.length === 6) {
        handleVerifyOtp(pastedData);
      } else {
        inputRefs.current[pastedData.length]?.focus();
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    try {
      const loggedUser = await socialLogin('google', credentialResponse.credential);
      if (loggedUser) {
        await checkUserStatusAndRedirect(loggedUser);
      } else {
        toast.error('Google login failed: user not returned');
      }
    } catch (error: any) {
      toast.error('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = () => {
    toast.success('Apple login coming soon');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200  flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative w-full md:w-[684px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 p-16"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-1.5 border border-gray-100 rounded-full text-gray-400 hover:text-primary hover:border-primary transition-colors cursor-pointer"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Title / Header */}
            <div className="md:flex items-center">
              <div className="relative aspect-[1.06] md:w-20 w-15">
                <Image src="/logo.png" alt="Renu Plus Logo" fill priority className="object-contain object-left" />
              </div>
            </div>
            <div>
              <h1 className="text-[32px] font-ppmori-semibold text-[#030712] mt-5">
                {step === 'email' ? 'Welcome Back' : 'Verify Code'}

              </h1>
              <p className="text-sub-foreground font-ppmori text-[16px] mt-3 leading-relaxed">
                {step === 'email' ? <><span className="text-black">Don't have an account? </span><span className="text-primary">Create an account</span></> : `Enter the 6-digit code sent to ${email}`}
              </p>
            </div>

            {/* Steps Container */}
            <AnimatePresence mode="wait">
              {step === 'email' ? (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleRequestOtp} className="space-y-5 mt-11">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-ppmori text-foreground md:ml-3.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 h-[56px] bg-[#F3F4F6] border-none rounded-full focus:ring-2 focus:ring-[#D1D5DB]/20 outline-none transition-all text-gray-900 placeholder-gray-400 text-[16px] font-ppmori"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!(email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || loading}
                      className="w-full bg-primary text-white h-[56px] rounded-full font-ppmori-semibold text-[16px] hover:bg-[#A58000] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="relative flex py-5 items-center">
                    <div className="grow border-t border-gray-100"></div>
                    <span className="shrink mx-4 text-gray-400 text-xs font-semibold tracking-wider">Or</span>
                    <div className="grow border-t border-gray-100"></div>
                  </div>

                   {/* Social Logins */}
                  <div className="space-y-3 flex gap-4 items-center">
                    <div className="relative w-full h-full md:h-[48px] cursor-pointer transition-transform duration-300 ">
                      <button
                        type="button"
                        className="flex w-full h-full items-center justify-center space-x-3 duration-300 border border-gray-200 bg-white hover:bg-gray-100 rounded-full  transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                        <span className="text-gray-700 text-sm font-ppmori-semibold">Google</span>
                      </button>
                      <div className="absolute inset-0 opacity-0 cursor-pointer overflow-hidden [&_iframe]:!w-full [&_iframe]:!h-full">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={() => toast.error('Google login failed')}
                          theme="outline"
                          shape="circle"
                          width="100%"
                          size="large"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleAppleLogin}
                      className="w-full flex items-center justify-center space-x-3 h-[44px] border border-gray-200 bg-white rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
                      </svg>
                      <span className="text-gray-700 text-sm font-ppmori-semibold">Sign in with Apple</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(otpValues.join('')); }} className="space-y-5 text-center">
                    <div className="flex justify-between gap-2 max-w-xs mx-auto my-2">
                      {otpValues.map((val, idx) => (
                        <input
                          key={idx}
                          ref={(el) => {
                            inputRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={val}
                          onChange={(e) => handleOtpChange(e.target.value, idx)}
                          onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                          onPaste={handleOtpPaste}
                          className="w-11 h-11 text-center text-lg font-ppmori-semibold bg-[#F3F4F6] border-2 border-transparent rounded-xl focus:border-primary focus:bg-white focus:ring-0 outline-none transition-all text-gray-900"
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otpValues.join('').length < 6}
                      className="w-full bg-primary text-white py-3.5 rounded-full font-ppmori-semibold text-[16px] hover:bg-[#A58000] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify Code'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep('email');
                        setOtpValues(['', '', '', '', '', '']);
                      }}
                      className="w-full text-xs text-gray-500 hover:text-primary font-semibold transition-colors uppercase tracking-wider text-center cursor-pointer"
                    >
                      Use a different email
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer lock */}
            <div className="mt-8 text-[10px] text-gray-400 text-center flex items-center justify-center gap-1.5">
              <Lock size={10} /> Secure passwordless login. Your information is always encrypted.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
