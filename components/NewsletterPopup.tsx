'use client';

import { useState, useEffect, useRef } from 'react';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('newsletter_dismissed')) return;

    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, 7000); // Show after 7s

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('newsletter_dismissed', '1');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      dismiss();
    }, 2500);
  };

  if (!visible || dismissed) return null;

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4 sm:p-0"
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
    >
      {/* Backdrop */}
      <button
        onClick={dismiss}
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        aria-label="Close popup"
      />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-pop-in">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-[#F26B1D] to-[#E84A1A] px-8 pt-10 pb-8 text-white text-center">
          {/* Food emoji accent */}
          <div className="text-4xl mb-3">🍽️</div>
          <h2 className="text-2xl font-serif font-bold mb-2 leading-tight">
            Get Weekly Recipes<br />in Your Inbox
          </h2>
          <p className="text-white/80 text-sm">
            Join 10,000+ food lovers. No spam — just beautifully curated recipes every Friday.
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Form */}
        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-4 animate-fade-in">
              <div className="text-3xl mb-3">🎉</div>
              <h3 className="font-bold text-stone-900 text-lg mb-1">You're on the list!</h3>
              <p className="text-stone-400 text-sm">First recipe drops this Friday.</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#F26B1D] focus:border-transparent placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#F26B1D] to-[#E84A1A] text-white font-bold text-sm rounded-xl hover:opacity-90 transition-opacity shadow-md"
                >
                  Get Free Recipes →
                </button>
              </form>
              <button
                onClick={dismiss}
                className="w-full mt-3 text-xs text-stone-400 hover:text-stone-600 transition-colors"
              >
                No thanks, I don't want free recipes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
