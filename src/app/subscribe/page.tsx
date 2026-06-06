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
export default function SubscribePage() {
  const { user, isAuthenticated, loading: authLoading, login, socialLogin, logout } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const router = useRouter();

  // Unified page steps:
  // Step 1: Email & OTP
  // Step 2: First Name & Last Name
  // Step 3: Payment
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  // Step 1 States
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [step1Loading, setStep1Loading] = useState(false);

  // Step 2 States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [step2Loading, setStep2Loading] = useState(false);

  // Step 3 States
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [intentLoading, setIntentLoading] = useState(false);

  // Adjust active step based on authentication & profile status
  useEffect(() => {
    if (!authLoading && !isEditingName) {
      if (isAuthenticated) {
        if (user?.firstName) {
          setActiveStep(3);
        } else {
          setActiveStep(2);
        }
      } else {
        setActiveStep(1);
      }
    }
  }, [isAuthenticated, user, authLoading, isEditingName]);

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

  // Fetch Payment Intent client secret once user is at Step 3
  useEffect(() => {
    if (activeStep === 3 && selectedPlan && isAuthenticated) {
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
  }, [activeStep, selectedPlan, isAuthenticated]);

  // Handle requesting OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');

    setStep1Loading(true);
    try {
      const res = await authService.requestOtp(email);
      if (res.success) {
        toast.success('Verification code sent to your email');
        setOtpSent(true);
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
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return toast.error('Please enter the verification code');

    setStep1Loading(true);
    try {
      await login(email, otp);
      toast.success('Verified successfully!');
      // After login, the useEffect auth listener checks name existence to advance
    } catch (error: any) {
      toast.error(error.message || 'Invalid code. Please try again.');
    } finally {
      setStep1Loading(false);
    }
  };

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
      // Force trigger auth context update
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        parsed.firstName = firstName;
        parsed.lastName = lastName;
        localStorage.setItem('user', JSON.stringify(parsed));
      }
      window.location.reload(); // Refresh session variables cleanly
    } catch (error: any) {
      toast.error(error.message || 'Failed to save name');
    } finally {
      setStep2Loading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6F4]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
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
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-2">
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
        <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">
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
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${isAuthenticated ? 'bg-[#4D7C0F] text-white' : 'bg-head text-white'
                  }`}>
                  {isAuthenticated ? <Check size={16} strokeWidth={3} /> : <span className="text-sm leading-none translate-y-[0.5px]">
                    1
                  </span>}
                </div>
                <h3 className="text-[16px] font-ppmori text-foreground">
                  {isAuthenticated ? 'Account created' : 'Create your account'}
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                  <motion.div
                    key="step1-active"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:pl-12 space-y-6"
                  >
                    {!otpSent ? (
                      <form onSubmit={handleRequestOtp} className="space-y-4">
                        <div className="space-y-8">
                          <label className="text-[12px] font-ppmori-semibold text-foreground md:ml-3.5">Email</label>
                          <div className="relative mt-2">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                            <input
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full pl-12 pr-4 py-4 bg-[#F3F4F6] border-none rounded-full focus:ring-2 focus:ring-[#D1D5DB]/20 outline-none transition-all text-foreground placeholder-gray-400 text-[15px] font-ppmori-semibold"
                              required
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={step1Loading}
                          className="w-full bg-primary text-white py-4 rounded-full font-ppmori-semibold text-[16px] hover:bg-[#A58000] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          {step1Loading ? <Loader2 size={18} className="animate-spin" /> : 'Continue'}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleVerifyOtp} className="space-y-4 md:text-start text-center">
                        <div className="space-y-8">
                          <label className="md:text-[16px] text-[14px] font-ppmori text-sub-foreground ml-3.5">Enter the 6-digit code that was sent to {email}</label>
                          <div className="relative mt-2">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                            <input
                              type="text"
                              placeholder="Enter 6-digit code"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              className="w-full md:pl-12 pl-4 pr-4 py-4 bg-[#F3F4F6] border-none rounded-full focus:ring-2 focus:ring-[#D1D5DB]/20 outline-none transition-all text-foreground placeholder-gray-400 text-[15px] font-ppmori-semibold text-center tracking-[0.25em] font-bold"
                              maxLength={6}
                              required
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={step1Loading}
                          className="w-full bg-primary text-white py-4 rounded-full font-ppmori-semibold text-[16px] hover:bg-[#A58000] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          {step1Loading ? <Loader2 size={18} className="animate-spin" /> : 'Verify Code'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="w-full text-xs text-gray-500 hover:text-primary font-semibold transition-colors uppercase tracking-wider text-center"
                        >
                          Use a different email
                        </button>
                      </form>
                    )}

                    {!otpSent && (
                      <>
                        <div className="relative flex py-2 items-center">
                          <div className="grow border-t border-gray-200"></div>
                          <span className="shrink mx-4 text-gray-400 text-xs font-semibold uppercase">Or</span>
                          <div className="grow border-t border-gray-200"></div>
                        </div>

                        <div className="md:flex justify-center gap-4 mx-auto hidden">
                          <div className="flex justify-center">
                            <GoogleLogin
                              onSuccess={handleGoogleSuccess}
                              onError={() => toast.error('Google login failed')}
                              type="standard"
                              shape="circle"
                              theme="outline"
                              size="large"
                              text="signin_with"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleAppleLogin}
                            className="flex items-center justify-center md:space-x-4 space-x-1 py-2 md:px-4 px-1 border border-gray-200 bg-white rounded-full hover:bg-gray-50 transition-colors cursor-pointer min-h-[40px]"
                          >
                            <svg className="md:w-5 w-4 md:h-5 h-4" viewBox="0 0 384 512">
                              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
                            </svg>
                            <span className="text-sub-foreground text-sm">Sign in with Apple</span>
                          </button>
                        </div>
                        <div className="flex gap-10 mx-auto md:hidden justify-center">
                          <div className="">
                            <GoogleLogin
                              onSuccess={handleGoogleSuccess}
                              onError={() => toast.error('Google login failed')}
                              type="icon"
                              shape="circle"
                              theme="filled_blue"
                              size="large"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleAppleLogin}
                            className="flex items-center justify-center  py-2 md:px-4 px-1 border border-gray-200 bg-white rounded-full hover:bg-gray-50 transition-colors cursor-pointer min-h-[40px] w-[40px]"
                          >
                            <svg className="md:w-5 w-6 md:h-5 h-6" viewBox="0 0 384 512">
                              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
                            </svg>

                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="step1-completed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="md:pl-12"
                  >
                    <div className="relative mt-2">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                      <div
                        className="w-full pl-12 pr-24 py-4 bg-[#F3F4F6] border-none rounded-full text-foreground text-[15px] font-ppmori-semibold truncate"
                      >
                        {user?.email}
                      </div>
                      <button
                        type="button"
                        onClick={logout}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-ppmori-semibold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* STEP 2: PERSONAL DETAILS */}
            <div className={`relative ${(activeStep < 2 && !isEditingName) ? 'opacity-40' : ''}`}>
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${isAuthenticated && user?.firstName ? 'bg-[#4D7C0F] text-white' : 'bg-head text-white'
                  }`}>
                  {isAuthenticated && user?.firstName ? <Check size={14} strokeWidth={3} /> : <div className="w-6 h-6 rounded-full bg-head text-white flex items-center justify-center">
                    <span className="text-sm leading-none translate-y-[0.5px]">
                      2
                    </span>
                  </div>}
                </div>
                <h3 className="text-[16px] font-ppmori text-foreground">
                  {isAuthenticated && user?.firstName ? 'Personal information saved' : 'Personal information'}
                </h3>
              </div>

              {activeStep === 2 || isEditingName ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:pl-12"
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
                            className="w-full pl-12 pr-4 py-4 bg-[#F3F4F6] border-none rounded-full focus:ring-2 focus:ring-[#D1D5DB]/20 outline-none transition-all text-foreground placeholder-gray-400 text-[15px] font-ppmori-semibold"
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
                            className="w-full pl-12 pr-4 py-4 bg-[#F3F4F6] border-none rounded-full focus:ring-2 focus:ring-[#D1D5DB]/20 outline-none transition-all text-foreground placeholder-gray-400 text-[15px] font-ppmori-semibold"
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
                        {step2Loading ? <Loader2 size={18} className="animate-spin" /> : (isEditingName ? 'Save & Continue' : 'Continue to Payment')}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : isAuthenticated && user?.firstName ? (
                <div className="md:pl-12">
                  <div className="relative mt-2">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 -mt-0.5 text-gray-400" size={18} />
                    <div
                      className="w-full pl-12 pr-16 py-4 bg-[#F3F4F6] border-none rounded-full text-foreground text-[15px] font-ppmori-semibold truncate"
                    >
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
                </div>
              ) : (
                <div className="pl-12 flex items-center gap-2.5 text-gray-400 text-[14px] font-ppmori-semibold bg-[#F3F4F6] p-4 rounded-full">
                  <Lock size={14} />
                  <span>Complete step 1 to continue</span>
                </div>
              )}
            </div>

            {/* STEP 3: PAYMENT */}
            <div className={`relative ${activeStep < 3 ? 'opacity-40' : ''}`}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-head text-white flex items-center justify-center">
                  <span className="text-sm leading-none translate-y-[0.5px]">
                    3
                  </span>
                </div>
                <h3 className="text-[16px] font-ppmori text-foreground">Payment</h3>
              </div>

              {activeStep === 3 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:pl-12"
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
                <div className="pl-12 flex items-center gap-2.5 text-gray-400 text-[14px] font-ppmori-semibold bg-[#F3F4F6] p-4 rounded-full">
                  <Lock size={14} />
                  <span>Complete steps 1 & 2 to continue</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary Card */}
        <div className="lg:col-span-5 sticky md:top-20 order-1 lg:order-2 ">
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