import Link from "next/link";
import React from "react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Strong Retail Partnerships",
      description: "Unmatched savings through exclusive retailer relationships.",
      icon: "🤝"
    },
    {
      title: "Wide Discount Network",
      description: "Deals on building supplies, outdoor living, home accessories, clothing and much more!",
      icon: "🛍️"
    },
    {
      title: "Convenient Access",
      description: "Use your virtual card online and in-store.",
      icon: "📱"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Membership Product Section */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-square w-full max-w-md mx-auto bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden shadow-xl">
              <span className="text-gray-400 font-medium italic text-center px-6">Renu Plus Membership <br/>Product Image Placeholder</span>
              <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-head mb-6">Renu Plus Membership</h2>
            <p className="text-body mb-8">
              Join thousands of members saving every day. Access exclusive retail discounts that help you stretch your budget further than ever before.
            </p>
            <Link 
              href="#" 
              className="inline-flex items-center justify-center bg-primary text-white px-10 py-5 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all border-4 border-transparent hover:border-primary/20"
            >
              Sign up now
            </Link>
          </div>
        </div>

        {/* Features Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-head mb-8">Make Every Transaction Count</h2>
            <ul className="space-y-6">
              {[
                "Boost daily budgets",
                "Unlock exclusive deals",
                "Spend More, Save More"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-body">
                  <span className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-5 text-sm font-bold group-hover:bg-primary group-hover:text-white transition-colors">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="bg-primary-bg/50 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-primary/10">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
               <h3 className="text-head text-3xl mb-6 relative z-10">Your Key to Smarter Spending</h3>
               <p className="text-body relative z-10">
                 Renu Plus has been helping people save money since 2013. With our trusted discount membership, we provide access to exclusive savings at a variety of retailers. Shop smarter and enjoy incredible deals on essential purchases—both online and in-store—while maximizing your budget.
               </p>
            </div>
            {/* Aspect box placeholder near description */}
            <div className="mt-8 aspect-[16/9] bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 font-medium italic">
              Contextual Image/Graphic Placeholder
            </div>
          </div>
        </div>

        {/* Why Choose Us Icons */}
        <div className="mb-32 text-center">
          <h2 className="text-head mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2 group bg-gradient-to-b from-white to-gray-50">
                <div className="w-20 h-20 bg-primary-bg rounded-2xl flex items-center justify-center text-4xl mb-8 mx-auto group-hover:rotate-6 transition-transform shadow-inner">
                  {item.icon}
                </div>
                <h4 className="text-head text-2xl mb-4 font-semibold">{item.title}</h4>
                <p className="text-body leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="bg-black text-white rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="lg:w-2/3 text-center lg:text-left">
              <h2 className="text-head text-white leading-tight mb-6">Big Savings, Small Investment</h2>
              <p className="text-body text-gray-300 max-w-2xl">
                For just <strong className="text-primary text-3xl font-kaisei px-1">$159</strong> per year, your Renu Plus Membership can pay for itself with a single transaction. 
              </p>
            </div>
            <div className="lg:w-1/3 flex justify-center lg:justify-end">
               <button className="bg-primary hover:bg-white hover:text-black text-white px-10 py-5 rounded-full text-lg font-black transition-all shadow-[0_0_20px_rgba(188,156,34,0.3)] hover:shadow-primary/40 uppercase tracking-widest">
                 Learn More
               </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
