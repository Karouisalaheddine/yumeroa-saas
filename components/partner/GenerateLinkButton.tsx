'use client';

import { useState } from 'react';
import { generateAffiliateLink } from '@/app/partner/actions';

interface GenerateLinkButtonProps {
  articleId: string;
  articleSlug: string;
  partnerId: string;
}

export default function GenerateLinkButton({ articleId, articleSlug, partnerId }: GenerateLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await generateAffiliateLink(articleId, articleSlug, partnerId);
      
      if (res.error) {
        alert(res.error);
        return;
      }
      
      const baseUrl = window.location.origin;
      const affiliateLink = `${baseUrl}${res.urlPath}`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(affiliateLink);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy link', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm ${
        copied 
          ? 'bg-emerald-500 hover:bg-emerald-600 text-white border border-emerald-600'
          : 'bg-stone-900 text-white hover:bg-stone-800 border border-stone-900'
      }`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Link Copied!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
          {loading ? 'Generating...' : 'Get Tracking Link'}
        </>
      )}
    </button>
  );
}
