import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop',
];

async function getRelated(currentSlug: string, limit = 4) {
  try {
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED', slug: { not: currentSlug } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: { id: true, title: true, slug: true, coverImage: true, excerpt: true },
    });
    return articles;
  } catch {
    const { data } = await supabase
      .from('articles')
      .select('id, title, slug, cover_image, excerpt')
      .neq('slug', currentSlug)
      .eq('status', 'PUBLISHED')
      .order('created_at', { ascending: false })
      .limit(limit);

    return (data || []).map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      coverImage: a.cover_image,
      excerpt: a.excerpt,
    }));
  }
}

export default async function RelatedRecipes({ currentSlug }: { currentSlug: string }) {
  const articles = await getRelated(currentSlug);
  if (!articles.length) return null;

  return (
    <section className="mt-16 pt-10 border-t border-stone-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-serif text-stone-900">You Might Also Love</h2>
        <Link href="/" className="text-sm font-bold text-[#F26B1D] hover:underline">
          All Recipes →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article, idx) => {
          const charSum = article.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
          const img = article.coverImage || FALLBACK_IMAGES[charSum % FALLBACK_IMAGES.length];

          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden border border-stone-100 bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-stone-900 leading-tight line-clamp-2 group-hover:text-[#F26B1D] transition-colors">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-xs text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                )}
                <span className="mt-2 text-xs font-bold text-[#F26B1D]">View Recipe →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
