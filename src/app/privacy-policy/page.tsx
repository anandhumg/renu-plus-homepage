import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Renu Plus Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="PRIVACY POLICY">

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">1. Overview</h2>
      <p className="mb-8 text-[#374151]">We respect your privacy and comply with PIPEDA and Canadian privacy laws.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">2. Information We Collect</h2>
      <p className="mb-4 text-[#374151]">We collect:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Name, email, phone number</li>
        <li>Account details</li>
        <li>Membership usage data</li>
        <li>Device and technical data</li>
      </ul>
      <p className="mb-8 text-[#374151]">Payment information is handled by third-party providers.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">3. Use of Information</h2>
      <p className="mb-4 text-[#374151]">We use data to:</p>
      <ul className="list-disc pl-6 mb-8 text-[#374151] space-y-2">
        <li>Provide services</li>
        <li>Process payments</li>
        <li>Communicate with users</li>
        <li>Improve the platform</li>
        <li>Prevent fraud</li>
      </ul>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">4. Marketing</h2>
      <p className="mb-4 text-[#374151]">Marketing emails are sent only with your consent.</p>
      <p className="mb-8 text-[#374151]">You can unsubscribe anytime.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">5. Sharing</h2>
      <p className="mb-4 text-[#374151]">We share limited data with:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Service providers (payments, hosting, analytics)</li>
        <li>Partners (membership validation only)</li>
      </ul>
      <p className="mb-8 text-[#374151]">We do not share personal identifiers without consent.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">6. International Transfers</h2>
      <p className="mb-8 text-[#374151]">Data may be processed outside Canada and subject to foreign laws.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">7. Security</h2>
      <p className="mb-4 text-[#374151]">We use safeguards including:</p>
      <ul className="list-disc pl-6 mb-8 text-[#374151] space-y-2">
        <li>Secure servers</li>
        <li>Encryption</li>
        <li>Access controls</li>
      </ul>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">8. Retention</h2>
      <p className="mb-8 text-[#374151]">We retain data only as long as necessary for business and legal purposes.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">9. Your Rights</h2>
      <p className="mb-4 text-[#374151]">You may:</p>
      <ul className="list-disc pl-6 mb-8 text-[#374151] space-y-2">
        <li>Access your data</li>
        <li>Correct inaccuracies</li>
        <li>Withdraw consent</li>
        <li>Request deletion (where applicable)</li>
      </ul>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">10. Data Breaches</h2>
      <p className="mb-8 text-[#374151]">We will notify users where required if a breach poses risk.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">11. Age Requirement</h2>
      <p className="mb-8 text-[#374151]">Services are intended for individuals 18+.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">12. Contact</h2>
      <p className="mb-8 text-[#374151]">
        Renu Plus<br />
        Renu Plus LTD<br />
        {process.env.NEXT_PUBLIC_CONTACT_MAIL}<br />
        132 Kian Place, Nanaimo, BC, V9T 0J7
      </p>

    </LegalPageLayout>
  );
}
