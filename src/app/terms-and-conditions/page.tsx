import React from 'react';
import LegalPageLayout from '@/components/LegalPageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Renu Plus Terms and Conditions',
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms and Conditions" effectiveDate="April 28 2026">

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">1. Key Information Summary</h2>
      <ul className="list-disc pl-6 mb-8 text-[#374151] space-y-2">
        <li><strong className="font-ppmori-semibold">Provider:</strong> Renu Plus, a [corporation/sole proprietorship] organized under the laws of [Province], Canada (“Renu Plus”, “we”, “us”, “our”)</li>
        <li><strong className="font-ppmori-semibold">Location:</strong> British Columbia, Canada</li>
        <li><strong className="font-ppmori-semibold">Service:</strong> Annual membership providing access to third-party promotional offers and discounts</li>
        <li><strong className="font-ppmori-semibold">Price:</strong> $48.99 CAD per year plus applicable taxes</li>
        <li><strong className="font-ppmori-semibold">Billing:</strong> Charged annually with automatic renewal</li>
        <li><strong className="font-ppmori-semibold">Renewal Date:</strong> Based on your original purchase date</li>
        <li><strong className="font-ppmori-semibold">Cancellation:</strong> Anytime via app or website; effective at the end of the billing period</li>
        <li><strong className="font-ppmori-semibold">Refunds:</strong> Limited; see Section 6</li>
        <li><strong className="font-ppmori-semibold">Important:</strong> Offers, partners, and discounts may change or be removed at any time</li>
      </ul>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">2. Acceptance of Terms</h2>
      <p className="mb-4 text-[#374151]">These Terms and Conditions (“Terms”) govern your access to and use of the Renu Plus platform, including our website, mobile application, and related services (collectively, the “Services”).</p>
      <p className="mb-4 text-[#374151]">By purchasing a membership or using the Services, you agree to these Terms.</p>
      <p className="mb-8 text-[#374151]">These Terms are intended to comply with applicable consumer protection laws, including the <strong className="font-ppmori-semibold">Business Practices and Consumer Protection Act (British Columbia)</strong> and other applicable Canadian laws.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">3. Eligibility</h2>
      <p className="mb-8 text-[#374151]">You must be at least 18 years old and capable of entering into a legally binding contract to use the Services.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">4. Account Registration</h2>
      <p className="mb-4 text-[#374151]">You agree to:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Provide accurate and complete information</li>
        <li>Keep your information up to date</li>
        <li>Maintain the confidentiality of your login credentials</li>
        <li>Accept responsibility for all activity under your account</li>
      </ul>
      <p className="mb-8 text-[#374151]">You are responsible for unauthorized use of your account unless caused by our negligence or a security breach of our systems.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">5. Membership and Billing</h2>

      <h3 className="text-xl font-ppmori-semibold text-primary mt-8 mb-4">5.1 Membership</h3>
      <p className="mb-4 text-[#374151]">Renu Plus provides an annual membership granting access to promotional offers through a digital and/or physical membership card.</p>
      <p className="mb-6 text-[#374151]">Renu Plus operates as a <strong className="font-ppmori-semibold">digital access platform connecting members with third-party promotional offers.</strong> We do not sell the underlying goods or services.</p>

      <h3 className="text-xl font-ppmori-semibold text-primary mt-8 mb-4">5.2 Fees</h3>
      <p className="mb-6 text-[#374151]">Membership is billed at <strong className="font-ppmori-semibold">$48.99 CAD annually</strong>, plus applicable taxes.</p>

      <h3 className="text-xl font-ppmori-semibold text-primary mt-8 mb-4">5.3 Automatic Renewal</h3>
      <p className="mb-4 text-[#374151] uppercase">YOUR MEMBERSHIP WILL AUTOMATICALLY RENEW EACH YEAR UNLESS CANCELLED.</p>
      <p className="mb-4 text-[#374151]">By subscribing, you authorize us to:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Charge your payment method annually</li>
        <li>Continue billing until cancellation</li>
      </ul>
      <p className="mb-6 text-[#374151]">We will provide a renewal reminder at least <strong className="font-ppmori-semibold">30 days before renewal</strong>, where required by law.</p>

      <h3 className="text-xl font-ppmori-semibold text-primary mt-8 mb-4">5.4 Cancellation</h3>
      <p className="mb-4 text-[#374151]">You may cancel your membership at any time through your account.</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Cancellation takes effect at the end of the current billing period</li>
        <li>You will not be charged for future renewals</li>
      </ul>
      <p className="mb-4 text-[#374151]">To avoid renewal charges, cancellation must be completed at least <strong className="font-ppmori-semibold">24 hours prior to the renewal date.</strong></p>
      <p className="mb-6 text-[#374151]">If a charge occurs due to timing or processing issues, you may contact us for review.</p>

      <h3 className="text-xl font-ppmori-semibold text-primary mt-8 mb-4">5.5 Fee Changes</h3>
      <p className="mb-4 text-[#374151]">We may change membership fees with advance notice. Changes apply only to future billing cycles.</p>
      <p className="mb-6 text-[#374151]">Continued use after changes take effect constitutes acceptance.</p>

      <h3 className="text-xl font-ppmori-semibold text-primary mt-8 mb-4">5.6 Refund Policy</h3>
      <p className="mb-4 text-[#374151]">Membership fees are generally non-refundable. However, refunds may be provided:</p>
      <ul className="list-disc pl-6 mb-8 text-[#374151] space-y-2">
        <li>Where required by applicable law</li>
        <li>In cases of duplicate or erroneous billing</li>
        <li>Where you are unable to reasonably access the Services due to technical issues</li>
        <li>Where the Services are materially different from what was described</li>
        <li>At our discretion in appropriate circumstances</li>
      </ul>
      <p className="mb-8 text-[#374151]">Nothing in this section limits your rights under applicable consumer protection laws.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">6. Nature of Services</h2>
      <p className="mb-4 text-[#374151]">Renu Plus provides access to third-party offers and promotions.</p>
      <p className="mb-4 text-[#374151]">We:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Do not sell partner products or services</li>
        <li>Do not control partner pricing, availability, or fulfillment</li>
      </ul>
      <p className="mb-8 text-[#374151]">We make reasonable efforts to maintain accurate and current offers but do not guarantee that all offers will always be available.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">7. Partner & Offer Disclaimer</h2>
      <p className="mb-4 text-[#374151]">All products and services are provided by independent third-party partners.</p>
      <p className="mb-4 text-[#374151]">You acknowledge that:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Partners are responsible for their own products and services</li>
        <li>Offers may be subject to additional partner terms</li>
        <li>Availability and eligibility are determined by partners</li>
      </ul>
      <p className="mb-4 text-[#374151]">Renu Plus does not control partner conduct but expects partners to honor advertised offers in good faith.</p>
      <p className="mb-8 text-[#374151]">Disputes regarding partner products or services must be resolved directly with the partner.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">8. Use of Services and Membership</h2>
      <p className="mb-4 text-[#374151]">Membership is personal, non-transferable, and for individual use only.</p>
      <p className="mb-4 text-[#374151]">You agree not to:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Share your account</li>
        <li>Use the Services for unlawful or fraudulent purposes</li>
        <li>Interfere with platform operations</li>
        <li>Attempt unauthorized access</li>
        <li>Copy or exploit platform content</li>
      </ul>
      <p className="mb-8 text-[#374151]">We may suspend or terminate accounts for violations.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">9. Platform and Technology Disclaimer</h2>
      <p className="mb-4 text-[#374151]">The Services are provided on an “as is” and “as available” basis.</p>
      <p className="mb-4 text-[#374151]">We do not guarantee:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Continuous or error-free operation</li>
        <li>Compatibility with all devices</li>
        <li>Absence of technical issues or harmful components</li>
      </ul>
      <p className="mb-8 text-[#374151]">You are responsible for maintaining appropriate device security.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">10. Payments</h2>
      <p className="mb-4 text-[#374151]">Payments are processed through third-party providers.</p>
      <p className="mb-4 text-[#374151]">We:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Do not store full payment details</li>
        <li>Are not responsible for third-party payment errors</li>
      </ul>
      <p className="mb-8 text-[#374151]">Your use of payment services is subject to their terms.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">11. Limitation of Liability</h2>
      <p className="mb-4 text-[#374151]">To the fullest extent permitted by applicable law, Renu Plus is not liable for:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Indirect, incidental, or consequential damages</li>
        <li>Loss of profits, revenue, or opportunities</li>
        <li>Data loss or corruption</li>
        <li>Partner-related issues, including refusal of offers</li>
        <li>Service interruptions or technical failures</li>
      </ul>
      <p className="mb-8 text-[#374151]">Our total liability is limited to the amount paid by you in the <strong className="font-ppmori-semibold">12 months preceding the claim.</strong></p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">12. No Warranties</h2>
      <p className="mb-8 text-[#374151]">Except as required by law, we provide no warranties, express or implied, regarding the Services.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">13. Changes to Services</h2>
      <p className="mb-4 text-[#374151]">We may modify or discontinue any part of the Services at any time.</p>
      <p className="mb-8 text-[#374151]">If a material reduction occurs, we will provide reasonable notice and you may cancel your membership.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">14. Termination</h2>
      <p className="mb-4 text-[#374151]">We may suspend or terminate your account at our sole discretion if:</p>
      <ul className="list-disc pl-6 mb-8 text-[#374151] space-y-2">
        <li>You breach these Terms</li>
        <li>You misuse the platform</li>
        <li>You engage in fraudulent or abusive behavior</li>
        <li>Your actions harm Renu Plus, its partners, or users</li>
        <li>Required by law or regulation</li>
      </ul>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">15. Intellectual Property</h2>
      <p className="mb-4 text-[#374151]">All content, branding, and platform materials are owned or licensed by Renu Plus.</p>
      <p className="mb-8 text-[#374151]">You may not copy, distribute, or exploit any part of the Services without permission.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">16. Privacy</h2>
      <p className="mb-8 text-[#374151]">Your use of the Services is subject to our Privacy Policy and applicable Canadian privacy laws, including <strong className="font-ppmori-semibold">PIPEDA.</strong></p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">17. Indemnification</h2>
      <p className="mb-4 text-[#374151]">You agree to indemnify and hold harmless Renu Plus from any claims, damages, or losses arising from:</p>
      <ul className="list-disc pl-6 mb-4 text-[#374151] space-y-2">
        <li>Your use of the Services</li>
        <li>Your breach of these Terms</li>
        <li>Your interactions with partners</li>
      </ul>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">18. Governing Law</h2>
      <p className="mb-8 text-[#374151]">These Terms are governed by the laws of <strong className="font-ppmori-semibold">British Columbia, Canada.</strong></p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">19. Dispute Resolution</h2>
      <p className="mb-4 text-[#374151]">Any disputes arising from these Terms will be resolved in the courts of British Columbia, unless otherwise required by applicable law.</p>
      <p className="mb-8 text-[#374151]">Nothing prevents either party from bringing a claim in small claims court where permitted.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">20. Statutory Rights</h2>
      <p className="mb-8 text-[#374151]">Nothing in these Terms limits your rights under applicable consumer protection laws.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">21. Force Majeure</h2>
      <p className="mb-8 text-[#374151]">We are not liable for delays or failures caused by events beyond our reasonable control.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">22. Entire Agreement</h2>
      <p className="mb-8 text-[#374151]">These Terms constitute the entire agreement between you and Renu Plus.</p>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">23. Definitions</h2>
      <ul className="list-disc pl-6 mb-8 text-[#374151] space-y-2">
        <li><strong className="font-ppmori-semibold">“Services”:</strong> The Renu Plus platform, including website, app, and membership features</li>
        <li><strong className="font-ppmori-semibold">“Partner”:</strong> A third-party business offering discounts</li>
        <li><strong className="font-ppmori-semibold">“Offer”:</strong> A discount, promotion, or benefit provided by a Partner</li>
        <li><strong className="font-ppmori-semibold">“Platform”:</strong> The website and/or mobile application</li>
      </ul>

      <h2 className="text-2xl font-ppmori-semibold text-[#030712] mt-10 mb-6">24. Contact Information</h2>
      <p className="mb-8 text-[#374151]">
        Renu Plus<br />
        Renu Plus LTD<br />
        {process.env.NEXT_PUBLIC_CONTACT_MAIL}<br />
        132 Kian Place, Nanaimo, BC, V9T 0J7
      </p>

    </LegalPageLayout>
  );
}
