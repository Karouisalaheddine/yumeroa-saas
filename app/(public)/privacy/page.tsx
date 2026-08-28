import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Yumeroa',
  description: 'Privacy Policy for Yumeroa platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
      <div className="prose prose-stone prose-lg max-w-none">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">Privacy Policy</h1>
        <p className="text-stone-500 text-sm mb-12">Last updated: August 27, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect about you to Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Partners.
        </p>

        <h2>3. Third-Party Advertising and Cookies (Google AdSense)</h2>
        <p>
          We use third-party advertising companies, including Google AdSense, to serve ads when you visit our Website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
        </p>
        <p>
          Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
        </p>

        <h2>4. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <strong>privacy@yumeroa.com</strong>.
        </p>
      </div>
    </main>
  );
}
