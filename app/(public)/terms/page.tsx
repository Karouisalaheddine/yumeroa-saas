import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Yumeroa',
  description: 'Terms of Service for Yumeroa platform.',
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">
      <div className="prose prose-stone prose-lg max-w-none">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">Terms of Service</h1>
        <p className="text-stone-500 text-sm mb-12">Last updated: August 27, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2>2. Use of Content</h2>
        <p>
          All content, recipes, and videos on Yumeroa are for informational purposes only. You may view and save recipes for personal use. Distribution, modification, or republication of our content without explicit permission or without utilizing our official Affiliate Partner Links is strictly prohibited.
        </p>

        <h2>3. Affiliate Partner Program</h2>
        <p>
          Members who enroll in our Partner Program agree to distribute links in accordance with advertising standards. Partners shall not use misleading claims or spam tactics to generate clicks. We reserve the right to terminate any partner account that violates these terms.
        </p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>
          The materials on Yumeroa's web site are provided "as is". Yumeroa makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>5. Modifications</h2>
        <p>
          Yumeroa may revise these terms of service for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
        </p>
      </div>
    </main>
  );
}
