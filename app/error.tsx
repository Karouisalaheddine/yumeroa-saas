'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="max-w-md mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 text-red-400 flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h2 className="text-2xl font-serif text-stone-900 tracking-tight mb-3">Something went wrong</h2>
        <p className="text-stone-400 text-sm leading-relaxed mb-8">
          {error.message || 'An unexpected error occurred while loading this page. Please try again.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-full transition-all shadow-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 text-stone-600 border border-stone-200 font-medium text-sm rounded-full hover:bg-stone-50 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
