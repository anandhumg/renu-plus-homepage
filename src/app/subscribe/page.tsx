"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import * as subscriptionService from '@/services/subscription.service';
import * as authService from '@/services/auth.service';
import * as profileService from '@/services/profile.service';
import { SubscriptionPlan } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, CreditCard, Loader2, Mail, User, Lock, ArrowLeft, Pencil } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// ─────────────────────────────────────────────
// CheckoutForm
// ─────────────────────────────────────────────
const CheckoutForm = ({
  plan,
  paymentIntentId,
  onSuccess,
}: {
  plan: SubscriptionPlan;
  paymentIntentId: string;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'Please check your payment details.');
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/profile`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment failed. Please try again.');
        return;
      }

      await subscriptionService.confirmStripePayment(paymentIntentId);
      toast.success('Payment successful! Welcome to Renu Plus.');
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <PaymentElement
            options={{
              layout: 'tabs',
              wallets: {
                applePay: 'auto',
                googlePay: 'auto',
              },
            }}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary text-white py-4 rounded-full font-ppmori-semibold text-[16px] hover:bg-[#A58000] transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 disabled:opacity-70 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing…</span>
          </>
        ) : (
          <>
            <ShieldCheck size={20} />
            <span>Pay Now</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1.5">
        <Lock size={10} /> Secured by Stripe. Information is encrypted and never stored on our servers.
      </p>
    </form>
  );
};

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
const subStepVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
  }),
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
    position: "absolute" as const,
    width: "100%",
  }),
};

const subStepTransition = {
  duration: 0.25,
  ease: [0.25, 1, 0.5, 1] as [number, number, number, number], // easeOutQuart
};

export default function SubscribePage() {
  const { user, isAuthenticated, loading: authLoading, login, socialLogin, logout, updateUser } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const router = useRouter();

  // Unified page steps:
  // Step 1: Create Account (Email ➔ OTP ➔ Name)
  // Step 2: Payment
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [accountSubStep, setAccountSubStep] = useState<'email' | 'otp' | 'name'>('email');

  // Slide direction tracking
  const [prevStepNumber, setPrevStepNumber] = useState(1);
  const currentStepNumber = activeStep === 2 ? 4 : (accountSubStep === 'name' ? 3 : (accountSubStep === 'otp' ? 2 : 1));
  const direction = currentStepNumber >= prevStepNumber ? 1 : -1;

  useEffect(() => {
    setPrevStepNumber(currentStepNumber);
  }, [currentStepNumber]);

  // Step 1 States
  const [email, setEmail] = useState('');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [step1Loading, setStep1Loading] = useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Step 2 States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [step2Loading, setStep2Loading] = useState(false);

  // Subscription check states
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [subCheckLoading, setSubCheckLoading] = useState(false);

  useEffect(() => {
    const checkSub = async () => {
      if (isAuthenticated) {
        setSubCheckLoading(true);
        try {
          const sub = await subscriptionService.getCurrentSubscription();
          setIsSubscribed(sub !== null && sub.status === 'ACTIVE');
        } catch (e) {
          console.error('Failed to check subscription status', e);
          setIsSubscribed(false);
        } finally {
          setSubCheckLoading(false);
        }
      } else {
        setIsSubscribed(false);
      }
    };
    checkSub();
  }, [isAuthenticated]);

  // Step 3 States
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [intentLoading, setIntentLoading] = useState(false);

  // Adjust active step based on authentication & profile status
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        if (user?.firstName && !isEditingName) {
          setActiveStep(2);
        } else {
          setActiveStep(1);
          setAccountSubStep('name');
        }
      } else {
        setActiveStep(1);
        if (otpSent) {
          setAccountSubStep('otp');
        } else {
          setAccountSubStep('email');
        }
      }
    }
  }, [isAuthenticated, user, authLoading, isEditingName, otpSent]);

  // Load subscription plans & pick the default $49 yearly plan
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await subscriptionService.getSubscriptionPlans();
        setPlans(data);
        // Find $49/year plan or select the first plan
        const yearPlan = data.find(p => p.duration === 'year' || p.amount === 49) || data[0];
        if (yearPlan) {
          setSelectedPlan(yearPlan);
        }
      } catch {
        toast.error('Failed to load pricing details');
      }
    };
    fetchPlans();
  }, []);

  // Fetch Payment Intent client secret once user is at Step 2 and has no active subscription
  useEffect(() => {
    if (activeStep === 2 && selectedPlan && isAuthenticated && isSubscribed === false) {
      const fetchIntent = async () => {
        setIntentLoading(true);
        try {
          const { clientSecret: cs, paymentIntentId: piId } =
            await subscriptionService.createStripePaymentIntent(selectedPlan.id);
          setClientSecret(cs);
          setPaymentIntentId(piId);
        } catch {
          toast.error('Could not initiate payment. Please try again.');
        } finally {
          setIntentLoading(false);
        }
      };
      fetchIntent();
    }
  }, [activeStep, selectedPlan, isAuthenticated, isSubscribed]);

  // Handle requesting OTP
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email) return toast.error('Please enter your email');

    setStep1Loading(true);
    try {
      const res = await authService.requestOtp(email);
      if (res.success) {
        toast.success('Verification code sent to your email');
        setOtpSent(true);
        setAccountSubStep('otp');
      } else {
        toast.error(res.message || 'Failed to send verification code');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setStep1Loading(false);
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async (otpCode: string) => {
    if (!otpCode || otpCode.length < 6) return toast.error('Please enter the 6-digit code');

    setStep1Loading(true);
    try {
      await login(email, otpCode);
      toast.success('Verified successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Invalid code. Please try again.');
      setOtpValues(['', '', '', '', '', '']);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 50);
    } finally {
      setStep1Loading(false);
    }
  };

  // Handle OTP focus and text entry
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

  // Auto focus first OTP input when reaching the OTP sub-step
  useEffect(() => {
    if (accountSubStep === 'otp' && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [accountSubStep]);

  // Social Logins
  const handleGoogleSuccess = async (credentialResponse: any) => {
    setStep1Loading(true);
    try {
      await socialLogin('google', credentialResponse.credential);
      toast.success('Logged in with Google');
    } catch (error: any) {
      toast.error('Google login failed');
    } finally {
      setStep1Loading(false);
    }
  };

  const handleAppleLogin = () => {
    toast.success('Apple login coming soon');
  };

  // Handle Step 2 Profile Name updates
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      return toast.error('Please enter at least your first name');
    }

    setStep2Loading(true);
    try {
      await profileService.updateProfile({
        firstName,
        lastName
      });

      if (user) {
        const updatedUser = { ...user, firstName, lastName };
        updateUser(updatedUser);
      }

      setIsEditingName(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save name');
    } finally {
      setStep2Loading(false);
    }
  };

  if (authLoading || subCheckLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6F4]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col md:px-12 px-6 py-8 items-center justify-center">
        <div className="max-w-[480px] w-full text-center space-y-6 bg-white p-8 border border-gray-100 rounded-3xl shadow-xl shadow-gray-150/40">
          <div className="mx-auto w-16 h-16 bg-[#4D7C0F]/10 rounded-full flex items-center justify-center text-[#4D7C0F]">
            <ShieldCheck size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-ppmori-semibold text-gray-950">Active Subscription</h2>
            <p className="text-gray-500 font-ppmori text-sm leading-relaxed">
              You are already subscribed to Renu Plus! You have full access to exclusive discounts and benefits.
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/profile')}
              className="flex-1 bg-primary text-white py-3.5 rounded-full font-ppmori-semibold text-sm hover:bg-[#A58000] transition-colors cursor-pointer"
            >
              Go to Profile
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 border border-gray-200 text-gray-700 py-3.5 rounded-full font-ppmori-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col md:px-12 px-6 py-8">
      {/* Top Header Logo */}
      <div className="mb-8 flex items-center md:hidden">
        <Link href="/" className="relative aspect-[1.06] md:w-20 w-15">
          <Image src="/logo.png" alt="Renu Plus Logo" fill priority className="object-contain object-left" />
        </Link>
      </div>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 place-items-center items-start mt-2">
        <div className='md:hidden block'>
          <span className="bg-background text-head text-[14px] font-ppmori-semibold px-3 py-1.5 rounded-full inline-block tracking-wider">
            Renu plus membership
          </span>
          <h1 className="md:text-[32px] text-[24px] font-ppmori-semibold text-[#030712] mt-5">
            Start saving in minutes
          </h1>
          <p className="text-sub-foreground font-ppmori text-[16px] mt-3 leading-relaxed">
            Enjoy unbeatable savings on home reno projects
            dining, travel, home & personal essentials and more.
          </p>
        </div>
        {/* LEFT COLUMN: Checkout Form Steps */}
        <div className="space-y-12 order-2 lg:order-1 max-w-[480px] w-full">
          <div className="mb-8 md:flex items-center hidden">
            <Link href="/" className="relative aspect-[1.06] md:w-20 w-15">
              <Image src="/logo.png" alt="Renu Plus Logo" fill priority className="object-contain object-left" />
            </Link>
          </div>
          <div className='md:block hidden'>
            <span className="bg-background text-head text-[14px] font-ppmori-semibold px-3 py-1.5 rounded-full inline-block tracking-wider">
              Renu plus membership
            </span>
            <h1 className="text-[32px] font-ppmori-semibold text-[#030712] mt-5">
              Start saving in minutes
            </h1>
            <p className="text-sub-foreground font-ppmori text-[16px] mt-3 leading-relaxed">
              Enjoy unbeatable savings on home reno projects
              <br />
              dining, travel, home & personal essentials and more.
            </p>
          </div>

          <div className="space-y-8 border-t border-[#D1D5DB] py-8">
            {/* STEP 1: CREATE ACCOUNT */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm transition-colors duration-300 ${activeStep === 2 ? 'bg-[#4D7C0F] text-white' : 'bg-head text-white'
                  }`}>
                  <AnimatePresence mode="wait" initial={false}>
                    {activeStep === 2 ? (
                      <motion.div
                        key="check1"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -45 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="num1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm leading-none translate-y-[0.5px]"
                      >
                        1
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <h3 className="text-[16px] font-ppmori text-foreground overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={activeStep === 2 ? 'created' : (isAuthenticated ? 'complete' : 'create')}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="block"
                    >
                      {activeStep === 2
                        ? 'Account created'
                        : (isAuthenticated ? 'Complete your account' : 'Create your account')}
                    </motion.span>
                  </AnimatePresence>
                </h3>
              </div>

              <motion.div
                layout="size"
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="relative overflow-hidden w-full"
              >
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  {/* 1. Email input step */}
                  {!isAuthenticated && accountSubStep === 'email' && (
                    <motion.div
                      key="step1-email"
                      custom={direction}
                      variants={subStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={subStepTransition}
                      className="space-y-6"
                    >
                      <form onSubmit={handleRequestOtp} className="space-y-4">
                        <div className="space-y-8">
                          <label className="text-[13px] font-ppmori text-foreground md:ml-3.5">Email</label>
                          <div className="relative mt-2">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                            <input
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full pl-12 pr-4 h-[56px] bg-[#F3F4F6] border-none rounded-full focus:ring-2 focus:ring-[#D1D5DB]/20 outline-none transition-all text-foreground placeholder-gray-400 text-[16px] font-ppmori"
                              required
                            />
                          </div>
                        </div>

                        {/* Button disabled until email entered and valid */}
                        <button
                          type="submit"
                          disabled={!(email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || step1Loading}
                          className="w-full bg-primary text-white h-[56px] leading-0 rounded-full font-ppmori-semibold text-[16px] hover:bg-[#A58000] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                        >
                          {step1Loading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}
                        </button>
                      </form>

                      <div className="relative flex py-2 items-center">
                        <div className="grow border-t border-gray-200"></div>
                        <span className="shrink mx-4 text-gray-400 text-xs font-semibold uppercase">Or</span>
                        <div className="grow border-t border-gray-200"></div>
                      </div>

                      <div className="md:flex justify-center gap-4 mx-auto hidden w-full">
                        <div className="relative flex-1 max-w-[200px] h-[40px]">
                          <button
                            type="button"
                            className="w-full h-full flex items-center justify-center space-x-2 border border-gray-200 bg-white rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                            </svg>
                            <span className="text-gray-700 text-sm font-ppmori-semibold">Google</span>
                          </button>
                          <div className="absolute inset-0 opacity-0 cursor-pointer overflow-hidden [&_iframe]:w-full! [&_iframe]:h-full!">
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
                          className="flex-1 max-w-[200px] flex items-center justify-center space-x-2 py-2 border border-gray-200 bg-white rounded-full hover:bg-gray-50 transition-colors cursor-pointer min-h-[40px]"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
                          </svg>
                          <span className="text-sub-foreground text-sm font-ppmori-semibold">Apple</span>
                        </button>
                      </div>
                      <div className="flex gap-4 mx-auto md:hidden justify-center w-full max-w-[280px]">
                        <div className="relative flex-1 h-[40px]">
                          <button
                            type="button"
                            className="w-full h-full flex items-center justify-center space-x-2 border border-gray-200 bg-white rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
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
                          className="flex-1 flex items-center justify-center space-x-2 border border-gray-200 bg-white rounded-full hover:bg-gray-50 transition-colors cursor-pointer min-h-[40px]"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 384 512">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
                          </svg>
                          <span className="text-sub-foreground text-sm font-ppmori-semibold">Apple</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* 2. 6-box OTP verification step */}
                  {!isAuthenticated && accountSubStep === 'otp' && (
                    <motion.div
                      key="step1-otp"
                      custom={direction}
                      variants={subStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={subStepTransition}
                      className="space-y-6"
                    >
                      <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(otpValues.join('')); }} className="space-y-4 md:text-start text-center">
                        <div className="space-y-4">
                          <label className="md:text-[16px] text-[14px] font-ppmori text-sub-foreground ml-3.5">
                            Enter the 6-digit code sent to <span className="font-semibold text-foreground">{email}</span>
                          </label>
                          <div className="flex justify-between gap-2 max-w-sm mx-auto md:mx-0 my-4">
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
                                className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-ppmori-semibold bg-[#F3F4F6] border-2 border-transparent rounded-xl focus:border-primary focus:bg-white focus:ring-0 outline-none transition-all text-foreground"
                              />
                            ))}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={step1Loading || otpValues.join('').length < 6}
                          className="w-full bg-primary text-white py-3.5 rounded-full font-ppmori-semibold text-[16px] hover:bg-[#A58000] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {step1Loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify Code'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpValues(['', '', '', '', '', '']);
                          }}
                          className="w-full text-xs text-gray-500 hover:text-primary font-semibold transition-colors uppercase tracking-wider text-center cursor-pointer"
                        >
                          Use a different email
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* 3. Name entry step */}
                  {isAuthenticated && activeStep === 1 && (
                    <motion.div
                      key="step1-name"
                      custom={direction}
                      variants={subStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={subStepTransition}
                      className=""
                    >
                      <form onSubmit={handleUpdateName} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-8">
                            <label className="text-[12px] font-ppmori-semibold text-foreground ml-3.5">First Name</label>
                            <div className="relative mt-2">
                              <User className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                              <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full pl-12 pr-4 h-[56px] bg-[#F3F4F6] border-none rounded-full focus:ring-2 focus:ring-[#D1D5DB]/20 outline-none transition-all text-foreground placeholder-gray-400 text-[15px] font-ppmori-semibold"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-8">
                            <label className="text-[12px] font-ppmori-semibold text-foreground ml-3.5">Last Name</label>
                            <div className="relative mt-2">
                              <User className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                              <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full pl-12 pr-4 h-[56px] bg-[#F3F4F6] border-none rounded-full focus:ring-2 focus:ring-[#D1D5DB]/20 outline-none transition-all text-foreground placeholder-gray-400 text-[15px] font-ppmori-semibold"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          {isEditingName && (
                            <button
                              type="button"
                              onClick={() => setIsEditingName(false)}
                              className="w-1/3 bg-[#F3F4F6] text-[#374151] hover:bg-gray-200 py-4 rounded-full font-ppmori-semibold text-[16px] transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="submit"
                            disabled={step2Loading}
                            className={`${isEditingName ? 'grow' : 'w-full'} bg-primary text-white py-4 rounded-full font-ppmori-semibold text-[16px] hover:bg-[#A58000] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer`}
                          >
                            {step2Loading ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              isEditingName ? 'Save & Continue' : 'Complete your account'
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* 4. Step 1 Complete Summary step */}
                  {isAuthenticated && activeStep === 2 && (
                    <motion.div
                      key="step1-completed"
                      custom={direction}
                      variants={subStepVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={subStepTransition}
                      className="space-y-3"
                    >
                      <div className="relative mt-2">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                        <div className="w-full pl-12 pr-24 py-4 bg-[#F3F4F6] border-none rounded-full text-foreground text-[15px] font-ppmori-semibold truncate">
                          {user?.email}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpValues(['', '', '', '', '', '']);
                            setOtpSent(false);
                            logout();
                          }}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-ppmori-semibold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>

                      {user?.firstName && (
                        <div className="relative mt-2">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                          <div className="w-full pl-12 pr-16 py-4 bg-[#F3F4F6] border-none rounded-full text-foreground text-[15px] font-ppmori-semibold truncate">
                            {user?.firstName} {user?.lastName || ''}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFirstName(user?.firstName || '');
                              setLastName(user?.lastName || '');
                              setIsEditingName(true);
                            }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
                            title="Edit name"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* STEP 2: PAYMENT */}
            <div className={`relative transition-all duration-500 ease-in-out ${activeStep < 2 ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-head text-white flex items-center justify-center">
                  <span className="text-sm leading-none translate-y-[0.5px]">
                    2
                  </span>
                </div>
                <h3 className="text-[16px] font-ppmori text-foreground">Payment</h3>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {activeStep === 2 ? (
                  <motion.div
                    key="step2-active"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    className=""
                  >
                    {intentLoading || !clientSecret || !paymentIntentId || !selectedPlan ? (
                      <div className="flex flex-col items-center justify-center py-10 space-y-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary" />
                        <p className="text-sm text-gray-400 font-semibold">Preparing secure checkout...</p>
                      </div>
                    ) : (
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: {
                            theme: 'stripe',
                            variables: {
                              borderRadius: '24px',
                              fontFamily: 'PP Mori, PPMori, sans-serif',
                            },
                          },
                        }}
                      >
                        <CheckoutForm
                          plan={selectedPlan}
                          paymentIntentId={paymentIntentId}
                          onSuccess={() => router.push('/')}
                        />
                      </Elements>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2-locked"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                    className="pl-12 flex items-center gap-2.5 text-gray-400 text-[14px] font-ppmori-semibold bg-[#F3F4F6] p-4 rounded-full"
                  >
                    <Lock size={14} />
                    <span>Complete step 1 to continue</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary Card */}
        <div className="sticky md:top-20 order-1 lg:order-2 max-w-[508px]">
          <div className="bg-white rounded-xl md:rounded-3xl md:p-8 p-4 border border-[#E2E8F0] shadow-xl shadow-gray-200/40">
            <h3 className="text-[16px] font-ppmori-semibold text-gray-400 tracking-widest mb-6">
              Order Summary
            </h3>

            {/* Collage Banner Card */}
            <div className="bg-linear-to-t from-[#ffe6c595] to-white md:rounded-3xl rounded-xl p-4 border border-[#F0E2D1] flex items-center gap-5 mb-8 shadow-sm">
              <div className="hidden md:block h-[175px] w-[156px] relative rounded-2xl overflow-hidden shrink-0 shadow-inner">
                <Image
                  src="/home/img-5.webp"
                  alt="Membership benefits"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="relative w-[38px] h-[30px]">
                  <Image
                    src="/logo.png"
                    alt="Membership benefits"
                    fill
                    className="object-contain"
                  />
                </div>
                <ul className="text-[14px] text-gray-700 font-ppmori space-y-1.5">
                  <li className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    <span>Exclusive member pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 ">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    <span>Access to trusted retailers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 ">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    <span>Simple in-store redemption</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 ">
                      <Check size={10} strokeWidth={4} />
                    </div>
                    <span>Premium benefits & support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h4 className="text-xl font-ppmori-semibold text-foreground">
                Renu plus membership
              </h4>
              <p className="text-[16px] text-[#374151] font-ppmori leading-relaxed mt-2">
                Get access to exclusive discounts with a simple membership – no complex setup, no waiting.
              </p>
            </div>

            <hr className="border-[#D1D5DB] mb-6" />

            {/* Table Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[16px] font-ppmori-semibold">
                <span className="text-foreground">Renu+ Membership</span>
                <span className="text-foreground">${selectedPlan?.amount || 49} <span className='font-ppmori'>/</span><span className='text-[12px] font-ppmori'>year</span></span>
              </div>

              <hr className="border-[#D1D5DB] my-4" />

              <div className="flex justify-between items-center text-[16px] font-ppmori-semibold text-foreground">
                <span>Total</span>
                <span>${selectedPlan?.amount || 49}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}