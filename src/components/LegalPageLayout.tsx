import React from 'react';
import Image from 'next/image';

interface LegalPageLayoutProps {
  title: string;
  effectiveDate?: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, effectiveDate, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F9F6F4] py-32 px-4  lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm py-8 px-4 md:px-16 md:py-16">

        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-ppmori-semibold text-[#030712] text-center mb-4  tracking-wide">
            {title}
          </h1>

          {effectiveDate && (
            <p className="text-[#374151] font-ppmori mb-4">
              <span className="font-ppmori-semibold">Effective Date:</span> {effectiveDate}
            </p>
          )}

          <div className="w-full h-px bg-primary mt-4"></div>
        </div>

        <div className="prose prose-lg max-w-none text-[#374151] prose-headings:font-ppmori-semibold prose-headings:text-[#030712] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-h3:text-xl prose-h3:text-[#B68F00] prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-4 prose-ul:mb-6 prose-li:mb-2 font-ppmori marker:text-[#030712]">
          {children}
        </div>

      </div>
    </div>
  );
}
