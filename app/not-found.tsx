import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="max-w-md mx-auto">
        <p className="text-[7rem] font-serif text-stone-100 font-medium mb-2 leading-none select-none">404</p>
        <h1 className="text-2xl font-serif text-stone-900 mb-3">Page not found</h1>
        <p className="text-stone-400 text-sm leading-relaxed mb-8">
          The recipe or page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-full transition-all shadow-sm hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Recipes
        </Link>
      </div>
    </div>
  );
}
