import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import GenerateLinkButton from '@/components/partner/GenerateLinkButton';

export const dynamic = 'force-dynamic';

export default async function PartnerLibraryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let partnerProfileId = 'unknown';
  if (user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { partnerProfile: true }
    });
    if (dbUser?.partnerProfile) {
      partnerProfileId = dbUser.partnerProfile.id;
    }
  }

  // Fetch all published articles that partners can promote
  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-5 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Content Library</h1>
          <p className="text-sm text-stone-500 mt-1">
            Browse high-converting gastronomy content. Generate AI packs to instantly promote on your channels.
          </p>
        </div>
        
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
             <input 
               type="text" 
               placeholder="Search recipes (e.g., Pasta)..." 
               className="w-full sm:w-72 pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c2703e] focus:border-transparent placeholder:text-stone-400 transition-all shadow-sm"
             />
             <svg className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
          <button className="w-full sm:w-auto px-5 py-2.5 bg-stone-50 text-stone-700 border border-stone-200 rounded-lg text-sm font-semibold hover:bg-stone-100 transition-all shadow-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col card-hover">
            {/* Image Container */}
            <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
              {article.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {/* Badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase text-[#c2703e] shadow-sm">
                New
              </div>
            </div>
            
            {/* Content Container */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-serif text-lg font-medium text-stone-900 leading-tight mb-2 line-clamp-2 group-hover:text-[#c2703e] transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-stone-500 line-clamp-2 mb-6 flex-1">
                {article.excerpt || 'Generate traffic with this premium Yumeroa recipe. Click to view AI content assets.'}
              </p>
              
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Avg. EPC</span>
                   <span className="text-sm font-semibold text-emerald-600">$0.85</span>
                </div>
                
                {/* Generate Action */}
                <GenerateLinkButton articleId={article.id} articleSlug={article.slug} partnerId={partnerProfileId} />
              </div>
            </div>
          </div>
        ))}

        {articles.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-stone-50 border border-stone-200 border-dashed rounded-2xl">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-stone-400 mb-5 shadow-sm border border-stone-200">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            <h3 className="text-lg font-serif font-medium text-stone-900 mb-2">No articles found</h3>
            <p className="text-sm text-stone-500 max-w-sm">
              The platform administrators haven&apos;t published any content yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
