"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import * as subscriptionService from '@/services/subscription.service';
import { SubscriptionPlan } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, CreditCard, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// ─────────────────────────────────────────────
// CheckoutForm — uses PaymentElement so Apple Pay
// and Google Pay appear automatically when available
// ─────────────────────────────────────────────
const CheckoutForm = ({
  plan,
  paymentIntentId,
  onCancel,
  onSuccess,
}: {
  plan: SubscriptionPlan;
  paymentIntentId: string;
  onCancel: () => void;
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
      // Step 1: Validate the PaymentElement fields before anything else
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || 'Please check your payment details.');
        return;
      }

      // Step 2: Confirm the payment.
      // PaymentElement handles card, Apple Pay, Google Pay, Link, etc. automatically.
      // `redirect: 'if_required'` prevents page redirect for card payments;
      // wallet payments (Apple Pay / Google Pay) never redirect.
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Required for payment methods that need a redirect (e.g. 3D Secure, iDEAL).
          // Wallet payments ignore this.
          return_url: `${window.location.origin}/profile`,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        // Show error directly to your customer (e.g., payment details incomplete)
        setError(confirmError.message || 'Payment failed. Please try again.');
        return;
      }

      // Step 3: Payment succeeded — notify your backend to fulfil the subscription
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
      {/* Plan summary */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 font-medium">Selected Plan</span>
          <span className="font-bold text-gray-900">{plan.name}</span>
        </div>
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-primary">
            ${plan.amount}{' '}
            <span className="text-sm text-gray-400 font-normal">/ {plan.duration}</span>
          </span>
        </div>
      </div>

      {/* Payment — PaymentElement auto-shows Apple Pay / Google Pay / card */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
          Payment
        </label>
        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          {/*
           * PaymentElement renders wallet buttons (Apple Pay, Google Pay) at the top
           * when the browser/device supports them, followed by the card form.
           * No extra config needed — Stripe detects the environment automatically.
           *
           * Apple Pay requires your domain to be registered in:
           * Stripe Dashboard → Settings → Payment methods → Apple Pay
           */}
          <PaymentElement
            options={{
              layout: 'tabs', // 'tabs' separates card/wallet visually; try 'accordion' too
              wallets: {
                applePay: 'auto',   // show when available
                googlePay: 'auto',  // show when available
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

      {/* Actions */}
      <div className="flex flex-col space-y-3">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 disabled:opacity-70"
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
        <button
          type="button"
          onClick={onCancel}
          className="w-full text-gray-400 py-2 text-sm font-bold uppercase tracking-widest hover:text-gray-600 transition-colors"
        >
          Change Plan
        </button>
      </div>

      <p className="text-[10px] text-gray-400 text-center">
        Secured by Stripe. Your payment information is encrypted and never stored on our servers.
      </p>
    </form>
  );
};

// ─────────────────────────────────────────────
// SubscribePage
// ─────────────────────────────────────────────
export default function SubscribePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [loading, setLoading] = useState(true);

  // clientSecret is needed by <Elements> before PaymentElement can render.
  // We fetch it as soon as the user picks a plan.
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [intentLoading, setIntentLoading] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/subscribe');
    }
  }, [isAuthenticated, authLoading, router]);

  // Load plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await subscriptionService.getSubscriptionPlans();
        setPlans(data);
      } catch {
        toast.error('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Fetch a PaymentIntent whenever the user selects a plan.
  // The clientSecret is required by <Elements> so that PaymentElement
  // can determine which payment methods (incl. wallets) to show.
  useEffect(() => {
    if (!selectedPlan) {
      setClientSecret(null);
      setPaymentIntentId(null);
      return;
    }

    const fetchIntent = async () => {
      setIntentLoading(true);
      try {
        const { clientSecret: cs, paymentIntentId: piId } =
          await subscriptionService.createStripePaymentIntent(selectedPlan.id);
        setClientSecret(cs);
        setPaymentIntentId(piId);
      } catch {
        toast.error('Could not initiate payment. Please try again.');
        setSelectedPlan(null);
      } finally {
        setIntentLoading(false);
      }
    };

    fetchIntent();
  }, [selectedPlan]);

  // ── Loading states ──────────────────────────
  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-ppmori font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Unlock exclusive retail discounts and start saving on every purchase
          with a Renu Plus membership.
        </p>
      </div>

      {/* Plan selection ↔ Checkout */}
      <AnimatePresence mode="wait">
        {!selectedPlan ? (
          // ── Plan cards ──────────────────────
          <motion.div
            key="plan-selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-50 flex flex-col justify-between hover:border-primary/30 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Sparkles size={24} />
                    </div>
                    {plan.duration === 'year' && (
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                        Best Value
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-ppmori font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.amount}
                    </span>
                    <span className="text-gray-400 font-medium ml-1">
                      / {plan.duration}
                    </span>
                  </div>

                  <div className="space-y-4 mb-10">
                    {plan.perks.map((perk, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="mt-1 w-5 h-5 bg-green-50 rounded-full flex items-center justify-center text-green-500 shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {perk.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full bg-white border-2 border-primary text-primary py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all group-hover:shadow-lg group-hover:shadow-primary/20"
                >
                  Select Plan
                </button>
              </div>
            ))}
          </motion.div>
        ) : (
          // ── Checkout step ───────────────────
          <motion.div
            key="payment-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md mx-auto bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-50"
          >
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-2xl font-ppmori font-bold text-gray-900">
                Secure Checkout
              </h2>
            </div>

            {/* Show a spinner while we fetch the PaymentIntent */}
            {intentLoading || !clientSecret || !paymentIntentId ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
              </div>
            ) : (
              /*
               * <Elements> MUST receive `clientSecret` so that PaymentElement
               * knows which payment methods to render (including wallets).
               * Without it, Apple Pay / Google Pay buttons will never appear.
               */
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      borderRadius: '12px',
                      fontFamily: 'inherit',
                    },
                  },
                }}
              >
                <CheckoutForm
                  plan={selectedPlan}
                  paymentIntentId={paymentIntentId}
                  onCancel={() => setSelectedPlan(null)}
                  onSuccess={() => router.push('/profile')}
                />
              </Elements>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust badges */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-gray-100 pt-16">
        <div className="space-y-2">
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <ShieldCheck size={20} />
          </div>
          <h4 className="font-bold text-gray-900">Encrypted Payments</h4>
          <p className="text-xs text-gray-500">
            All transactions are processed through Stripe with enterprise-grade security.
          </p>
        </div>
        <div className="space-y-2">
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Check size={20} />
          </div>
          <h4 className="font-bold text-gray-900">Instant Activation</h4>
          <p className="text-xs text-gray-500">
            Access your digital membership card and discounts immediately after payment.
          </p>
        </div>
        <div className="space-y-2">
          <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <CreditCard size={20} />
          </div>
          <h4 className="font-bold text-gray-900">Multiple Methods</h4>
          <p className="text-xs text-gray-500">
            Pay with Apple Pay, Google Pay, Visa, Mastercard, AMEX, and more.
          </p>
        </div>
      </div>
    </div>
  );
}