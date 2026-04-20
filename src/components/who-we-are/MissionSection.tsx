import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="lg:py-24 py-10 bg-[#f9f6f4] rounded-[50px] mt-20 mx-4 lg:mx-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-head lg:text-[40px] text-[30px] mb-8">
              Beat Inflation With Exclusive Savings
            </h2>
            <div className="text-body space-y-6">
              <p>
                In today's climate of rising prices and inflation, our membership provides a much-needed financial reprieve, helping you make ends meet while enjoying the benefits of significant savings.
              </p>
              <p>
                Whether you're starting a home renovation project, pursuing fitness goals, or refreshing your wardrobe, Renu Plus offers valuable support in achieving your aspirations.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative w-full h-[400px]">
            <Image 
              src="/who-we-are/mission.jpg" 
              alt="Our Mission" 
              fill 
              className="object-cover rounded-[30px] shadow-xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
