import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Renu Plus Refund Policy',
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title="REFUND POLICY">

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">Overview</h2>
      <p className="mb-8 text-[#374151]">Membership fees are generally non-refundable.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">Eligible Refund Situations</h2>
      <p className="mb-4 text-[#374151]">Refunds may be issued if:</p>
      <ul className="list-disc pl-6 mb-8 text-[#374151] space-y-2">
        <li>Required by law</li>
        <li>Duplicate or incorrect charge</li>
        <li>Technical issues prevented access</li>
        <li>Service was materially different from described</li>
      </ul>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">Requests</h2>
      <p className="mb-4 text-[#374151]">To request a refund, contact us at:</p>
      <p className="mb-6 font-ppmori-semibold text-[#030712]">
        <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_MAIL}`} className="hover:text-primary transition-colors">{process.env.NEXT_PUBLIC_CONTACT_MAIL}</a>
      </p>
      <p className="mb-8 text-[#374151]">All requests are reviewed on a case-by-case basis.</p>

    </LegalPageLayout>
  );
}
