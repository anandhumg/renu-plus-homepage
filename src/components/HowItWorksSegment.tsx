import React from "react";

export default function HowItWorksSegment() {
  const steps = [
    {
      number: "01",
      title: "Join the Club",
      description: "Sign up for a Renu Plus membership for just $159 per year.",
      imageLabel: "Signup Screen Placeholder"
    },
    {
      number: "02",
      title: "Access Exclusive Deals",
      description: "Log in to view our wide network of retail partners and offers.",
      imageLabel: "Offer Listing Placeholder"
    },
    {
      number: "03",
      title: "Start Saving",
      description: "Use your virtual membership card online or in-store at checkout.",
      imageLabel: "Checkout/Card Placeholder"
    }
  ];

  return (
    <section className="py-24 bg-primary-bg/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-head mb-6">How It Works</h2>
          <p className="text-body max-w-2xl mx-auto">
            Saving with Renu Plus is simple. Follow these three steps to start maximizing your daily budget today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              {/* Image Placeholder */}
              <div className="w-full aspect-video bg-white rounded-2xl border-2 border-dashed border-gray-200 mb-8 flex items-center justify-center p-4 shadow-sm group-hover:border-primary/50 transition-colors overflow-hidden">
                <span className="text-gray-400 font-medium italic text-sm">{step.imageLabel}</span>
              </div>
              
              {/* Step Info */}
              <div className="relative">
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-8xl font-black text-primary/5 select-none z-0">
                  {step.number}
                </span>
                <h3 className="text-head text-2xl mb-4 relative z-10 font-bold">{step.title}</h3>
                <p className="text-body relative z-10">
                  {step.description}
                </p>
              </div>

              {/* Connecting line (Desktop only) */}
              {idx < 2 && (
                <div className="hidden md:block absolute top-[25%] -right-8 w-16 border-t-2 border-dashed border-primary/20 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
