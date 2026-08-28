import ArticleCard from '@/components/ArticleCard';
import AdUnit from '@/components/AdUnit';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { REAL_20_RECIPES } from '@/lib/recipesData';
import Link from 'next/link';

export const revalidate = 0;

async function getPublishedArticles(category?: string) {
  let dbArticles: any[] = [];
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    });
    if (articles && articles.length > 0) {
      dbArticles = articles;
    }
  } catch (err: any) {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && data.length > 0) {
      dbArticles = data.map((art: any) => ({
        id: art.id,
        title: art.title,
        slug: art.slug,
        excerpt: art.excerpt,
        content: art.content,
        coverImage: art.cover_image,
        status: (art.status || 'published').toUpperCase(),
        createdAt: new Date(art.created_at || Date.now()),
      }));
    }
  }

  // Merge DB articles with our curated 20 real recipes (prevent duplicates by slug)
  const existingSlugs = new Set(dbArticles.map((a: any) => a.slug));
  const combined = [...dbArticles];

  for (const rec of REAL_20_RECIPES) {
    if (!existingSlugs.has(rec.slug)) {
      combined.push(rec);
    }
  }

  if (!category || category === 'All Recipes') {
    return { data: combined, error: null };
  }

  const lowerCat = category.toLowerCase();
  const filtered = combined.filter((a: any) => {
    if (a.category && a.category.toLowerCase() === lowerCat) return true;
    return (
      a.title.toLowerCase().includes(lowerCat) ||
      (a.excerpt || '').toLowerCase().includes(lowerCat)
    );
  });

  return { data: filtered, error: null };
}

// Premium placeholder images for empty state demo
const DEMO_IMAGES = [
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop',
];

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const currentCategory = resolvedParams.category || 'All Recipes';
  const currentPage = parseInt(resolvedParams.page || '1', 10);
  
  const { data: allArticles, error } = await getPublishedArticles(currentCategory);
  
  const hasArticles = allArticles && allArticles.length > 0;
  
  const itemsPerPage = 20;
  const totalPages = Math.ceil((allArticles?.length || 0) / itemsPerPage);
  const articles = allArticles?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];


  return (
    <main className="min-h-screen bg-white">
      {/* — HERO SECTION — */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-0 min-h-[520px] lg:min-h-[600px]">
            
            {/* Left: Text */}
            <div className="flex flex-col justify-center py-14 lg:py-20 pr-0 lg:pr-16">
              <div className="inline-flex items-center gap-2.5 mb-6">
                <span className="w-8 h-px bg-[#c2703e]"></span>
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#c2703e]">
                  Seasonal Recipes
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl xl:text-[4.25rem] font-serif text-stone-900 leading-[1.08] tracking-tight mb-6 max-w-xl">
                Food Stories Worth<br />
                <span className="text-[#c2703e]">Savoring.</span>
              </h1>
              
              <p className="text-stone-500 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
                Thoughtfully crafted recipes and culinary stories from around the world — minimal, approachable, and utterly delicious.
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#recipes"
                  className="px-7 py-3 bg-stone-900 text-white font-semibold text-sm rounded-full hover:bg-stone-800 transition-all shadow-sm hover:shadow-md"
                >
                  Explore Recipes
                </a>
                <Link
                  href="/login"
                  className="px-7 py-3 text-stone-600 font-semibold text-sm rounded-full border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all"
                >
                  Partner Login
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-4 mt-12 pt-10 border-t border-stone-100">
                <div className="flex -space-x-2">
                  {[10, 11, 12].map((id, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-stone-200 border-2 border-white overflow-hidden shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.pravatar.cc/32?img=${id}`}
                        alt="Partner"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-stone-500">
                  <strong className="text-stone-800 font-semibold">240+</strong> active distribution partners worldwide
                </p>
              </div>
            </div>

            {/* Right: Feature Image */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=960&auto=format&fit=crop"
                  alt="Featured recipe - rustic grilled dish"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                />
                {/* Gradient overlay on left edge */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
                {/* Bottom gradient for smooth blend */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — CATEGORIES STRIP — */}
      <section className="border-y border-stone-100 bg-white sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-none">
            {['All Recipes', 'Breakfast', 'Dinners', 'Desserts', 'Vegan', 'Quick & Easy', 'Seasonal'].map((cat) => {
              const isActive = cat === currentCategory;
              return (
                <Link
                  key={cat}
                  href={`/?category=${cat}`}
                  scroll={false}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 ${
                    isActive
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300 hover:text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* — ARTICLES GRID — */}
      <section id="recipes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">Latest from the Kitchen</h2>
            <p className="text-stone-400 text-sm mt-1.5">Hand-picked recipes and culinary inspiration</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
            Sort by: Latest
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-red-700 mb-8 flex items-start gap-3.5">
            <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-sm">Could not load recipes</h4>
              <p className="text-sm opacity-80 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Grid / Masonry Layout */}
        {hasArticles ? (
          <div>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {articles.map((article, idx) => (
                <div key={article.id} className="break-inside-avoid">
                  <ArticleCard article={article} />
                  {/* Inject an inline AdSense unit every 8th article to maximize impressions while fully respecting AdSense density guidelines */}
                  {(idx + 1) % 8 === 0 && (
                    <div className="mb-6 p-4 bg-stone-50 border border-stone-100 rounded-2xl flex flex-col items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c2703e] mb-3 block">Advertisement</span>
                      <AdUnit slot="auto" format="rectangle" className="w-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-4">
                {currentPage > 1 ? (
                  <Link
                    href={`/?${new URLSearchParams({
                      ...(currentCategory !== 'All Recipes' ? { category: currentCategory } : {}),
                      page: (currentPage - 1).toString()
                    }).toString()}#recipes`}
                    className="px-6 py-2.5 text-sm font-semibold text-stone-700 bg-white border border-stone-200 rounded-full hover:bg-stone-50 hover:border-stone-300 transition-all text-center flex-1 sm:flex-none"
                  >
                    &larr; Previous
                  </Link>
                ) : (
                  <span className="px-6 py-2.5 text-sm font-semibold text-stone-300 bg-white border border-stone-100 rounded-full text-center flex-1 sm:flex-none cursor-not-allowed">
                    &larr; Previous
                  </span>
                )}
                
                <span className="text-sm font-medium text-stone-500 hidden sm:inline-block">
                  Page {currentPage} of {totalPages}
                </span>

                {currentPage < totalPages ? (
                  <Link
                    href={`/?${new URLSearchParams({
                      ...(currentCategory !== 'All Recipes' ? { category: currentCategory } : {}),
                      page: (currentPage + 1).toString()
                    }).toString()}#recipes`}
                    className="px-6 py-2.5 text-sm font-semibold text-stone-700 bg-white border border-stone-200 rounded-full hover:bg-stone-50 hover:border-stone-300 transition-all text-center flex-1 sm:flex-none"
                  >
                    Next &rarr;
                  </Link>
                ) : (
                  <span className="px-6 py-2.5 text-sm font-semibold text-stone-300 bg-white border border-stone-100 rounded-full text-center flex-1 sm:flex-none cursor-not-allowed">
                    Next &rarr;
                  </span>
                )}
              </div>
            )}
            {/* Bottom Homepage Ad */}
            <div className="mt-12 w-full pt-8 border-t border-stone-100 flex flex-col items-center">
               <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4 block">Sponsored</span>
               <div className="w-full max-w-[728px]">
                  <AdUnit slot="auto" format="auto" />
               </div>
            </div>
          </div>
        ) : !error ? (
          /* Empty State — Show Demo Cards */
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 opacity-30 pointer-events-none select-none">
              {DEMO_IMAGES.map((img, i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
                  <div className="aspect-[4/3] bg-stone-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="h-2.5 skeleton rounded w-20 mb-4"></div>
                    <div className="h-5 skeleton rounded w-4/5 mb-2"></div>
                    <div className="h-5 skeleton rounded w-3/5 mb-6"></div>
                    <div className="h-3 skeleton rounded w-full mb-2"></div>
                    <div className="h-3 skeleton rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-stone-900 mb-2">No recipes published yet</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-8">
                Login to the admin dashboard to publish your first culinary article and it will appear here.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white font-semibold text-sm rounded-full hover:bg-stone-800 transition-all shadow-sm hover:shadow-md"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          </div>
        ) : null}
      </section>

      {/* — NEWSLETTER SECTION — */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-serif mb-4">Get weekly recipes in your inbox</h2>
            <p className="text-stone-400 text-sm sm:text-base mb-8">Join over 10,000 food lovers. No spam, just beautifully curated recipes every Friday.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#c2703e] focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#c2703e] hover:bg-[#a85d32] text-white font-semibold text-sm rounded-full transition-all shrink-0 shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
