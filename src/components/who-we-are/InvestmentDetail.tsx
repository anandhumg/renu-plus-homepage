import Image from "next/image";

export default function InvestmentDetail() {
  return (
    <section className="mt-40 mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">
          <div className="relative w-full h-[500px]">
             <Image 
                src="/who-we-are/investment.jpg" 
                alt="Smart Investment" 
                fill 
                className="object-cover rounded-[30px] lg:rounded-tr-[150px] shadow-2xl" 
             />
          </div>
          <div>
            <h2 className="text-head lg:text-[40px] text-[30px] mb-8">
              Your Smartest Investment Yet
            </h2>
            <div className="text-body space-y-8">
              <p>
                For an annual fee of <span className="text-primary font-bold text-3xl font-kaisei">$159</span>, you can easily recoup your investment with just one transaction, thanks to the extensive savings available.
              </p>
              <p>
                Whether you're starting a home renovation project, pursuing fitness goals, or refreshing your wardrobe, Renu Plus offers valuable support in achieving your aspirations with unbeatable savings on every dollar.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <span className="font-medium text-black">Recoup fees in 1-2 transactions</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <span className="font-medium text-black">Access to 100+ Retail Partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
