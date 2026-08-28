import Link from 'next/link';

export default function GenericAdminPage({ params }: { params: { slug: string[] } }) {
  const sectionName = params.slug.join(' / ').replace(/-/g, ' ');

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in p-8">
      <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-[#F26B1D] mb-6 shadow-sm">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.827A5.406 5.406 0 0018 7.5c0-2.981-2.418-5.4-5.4-5.4-2.981 0-5.4 2.419-5.4 5.4 0 1.258.428 2.417 1.155 3.333L2.25 16.5v4.5h4.5l5.67-5.83z" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2 capitalize tracking-tight">
        {sectionName}
      </h1>
      
      <p className="text-[15px] text-stone-500 max-w-md text-center mb-8 leading-relaxed">
        This module is currently under construction and will be available in the upcoming platform release.
      </p>
      
      <Link 
        href="/admin" 
        className="px-6 py-2.5 bg-white border border-stone-200 text-stone-700 font-semibold text-sm rounded-lg shadow-sm hover:bg-stone-50 transition-all"
      >
        Return to Command Center
      </Link>
    </div>
  );
}
