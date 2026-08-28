import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import ArticlesTable from '@/components/admin/ArticlesTable';

export const revalidate = 0;

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return { data: articles, error: null };
  } catch (prismaError: any) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return { data: null, error: error.message };

    const mapped = (data || []).map((art: any) => ({
      id: art.id,
      title: art.title,
      slug: art.slug,
      excerpt: art.excerpt,
      content: art.content,
      // Bug #7 fix: include coverImage so thumbnails render correctly
      coverImage: art.cover_image || null,
      status: (art.status || 'published').toUpperCase(),
      createdAt: new Date(art.created_at || Date.now()),
      updatedAt: new Date(art.updated_at || Date.now()),
    }));

    return { data: mapped, error: null };
  }
}

export default async function AdminDashboard() {
  const { data: articles, error } = await getArticles();

  const totalArticles = articles?.length || 0;
  const publishedCount = articles?.filter((a) => a.status === 'PUBLISHED').length || 0;
  const draftCount = articles?.filter((a) => a.status === 'DRAFT').length || 0;

  return (
    <div className="space-y-8 animate-fade-in mx-auto w-full max-w-[1400px]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">Articles & Catalog</h1>
             <div className="bg-orange-50 text-[#F26B1D] w-6 h-6 rounded-full flex items-center justify-center border border-orange-100 shadow-sm mt-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
             </div>
          </div>
          <p className="text-[15px] font-medium text-stone-500 mt-2">
            Manage your global content library and product catalog.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F26B1D] hover:bg-[#e05628] text-white font-semibold text-sm rounded-lg shadow-sm shadow-[#F26B1D]/20 transition-all border border-[#F26B1D]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Article
          <svg className="w-4 h-4 ml-1 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </Link>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Total Articles</div>
             <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F26B1D]">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
               </svg>
             </div>
          </div>
          <div className="text-4xl font-sans font-bold tracking-tight text-stone-900 mb-1">{totalArticles}</div>
          <div className="text-[13px] font-medium text-stone-400">All time</div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Published</div>
             <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
          </div>
          <div className="text-4xl font-sans font-bold tracking-tight text-stone-900 mb-1">{publishedCount}</div>
          <div className="text-[13px] font-medium text-stone-400">
             {totalArticles ? Math.round((publishedCount / totalArticles) * 100) : 0}% of total
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Drafts</div>
             <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             </div>
          </div>
          <div className="text-4xl font-sans font-bold tracking-tight text-stone-900 mb-1">{draftCount}</div>
          <div className="text-[13px] font-medium text-stone-400">
            {totalArticles ? Math.round((draftCount / totalArticles) * 100) : 0}% of total
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm opacity-70">
          <div className="flex justify-between items-start mb-4">
             <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Archived</div>
             <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
               </svg>
             </div>
          </div>
          <div className="text-4xl font-sans font-bold tracking-tight text-stone-900 mb-1">0</div>
          <div className="text-[13px] font-medium text-stone-400">0% of total</div>
        </div>

      </div>

      {/* Articles Table — client component with live search + status filter */}
      <ArticlesTable articles={(articles || []) as any} />
    </div>
  );
}
