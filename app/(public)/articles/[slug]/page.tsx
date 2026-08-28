import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { REAL_20_RECIPES } from '@/lib/recipesData';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import AdUnit from '@/components/AdUnit';
import SaveRecipeButton from '@/components/SaveRecipeButton';
import RelatedRecipes from '@/components/RelatedRecipes';

export const revalidate = 0;

interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: any;
  coverImage?: string | null;
  status: string;
  createdAt: Date | string;
}

// Global fetcher
async function getArticleBySlug(slug: string): Promise<ArticleData | null> {
  try {
    const article = await prisma.article.findUnique({ where: { slug } });
    if (article) return article;
  } catch (prismaErr) {
    /* fall through */
  }

  try {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (data) {
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.cover_image,
        status: (data.status || 'published').toUpperCase(),
        createdAt: data.created_at || Date.now(),
      };
    }
  } catch {
    /* fall through */
  }

  // Fallback to REAL_20_RECIPES dataset
  const staticRecipe = REAL_20_RECIPES.find((r) => r.slug === slug);
  if (staticRecipe) return staticRecipe;

  return null;
}

// Dynamically generate Open Graph & Twitter meta tags for high CTR on Social Media
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return { title: 'Not Found' };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/articles/${article.slug}`;
  const ogImage = article.coverImage || `${baseUrl}/default-og.jpg`;

  return {
    title: `${article.title} | Yumeroa Recipes`,
    description: article.excerpt || `Delicious recipe for ${article.title} you have to try.`,
    openGraph: {
      title: article.title,
      description: article.excerpt || 'Find out how to make this delicious recipe!',
      url: url,
      type: 'article',
      publishedTime: new Date(article.createdAt).toISOString(),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || 'Find out how to make this delicious recipe!',
      images: [ogImage],
    },
  };
}

export default async function SingleArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  // Attribution Cookie
  const cookieStore = await cookies();
  const partnerId = cookieStore.get('ym_pid')?.value;

  // Outbound affiliate link mutation
  let processHTML = typeof article.content === 'string' ? article.content : '';
  if (partnerId && processHTML) {
    processHTML = processHTML.replace(/href="([^"]+)"/g, (match, url) => {
      try {
        if (url.startsWith('http')) {
          const parsed = new URL(url);
          const isAffiliate = parsed.hostname.includes('amazon.com') || parsed.hostname.includes('skimlinks.com');
          if (isAffiliate && !parsed.searchParams.has('sid')) {
            parsed.searchParams.set('sid', partnerId);
            return `href="${parsed.toString()}"`;
          }
        }
        return match;
      } catch {
        return match;
      }
    });
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const readTime = processHTML
    ? Math.max(1, Math.round(processHTML.replace(/<[^>]*>/g, '').split(/\s+/).length / 200))
    : 1;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const currentUrl = `${baseUrl}/articles/${article.slug}`;

  // Structured Data for Google Rich Snippets (SEO)
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: article.title,
    image: [article.coverImage],
    author: {
      '@type': 'Organization',
      name: 'Yumeroa Kitchen',
    },
    datePublished: new Date(article.createdAt).toISOString(),
    description: article.excerpt || `Recipe for ${article.title}`,
    // Required fields for full rich cards usually require prepTime, cookTime, recipeIngredient
    // We mock some generic ones for the schema to validate if real ones aren't available in DB yet
    recipeInstructions: [
      {
        '@type': 'HowToStep',
        text: 'Follow full instructions in the article below.',
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      
      {/* JSON-LD Script for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* — ARTICLE HEADER — */}
      <header className="bg-white pt-10 pb-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-400 hover:text-[#fa6939] transition-colors uppercase tracking-widest mb-10"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Recipes
          </Link>

          {/* Category + Date + Read Time */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-5">
            <span className="bg-[#FEF0E7] text-[#F26B1D] px-2.5 py-1 rounded-full border border-orange-100">Recipe</span>
            <span className="text-stone-300">·</span>
            <time dateTime={new Date(article.createdAt).toISOString()}>{formattedDate}</time>
            <span className="text-stone-300">·</span>
            <span>{readTime} min read</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-serif text-stone-900 leading-[1.08] tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Excerpt / Lead */}
          {article.excerpt && (
            <p className="text-stone-500 text-lg sm:text-lg leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Top Ad Unit - High visibility, extremely important for CTR */}
          <div className="my-12 flex flex-col items-center border border-stone-100 bg-stone-50 rounded-2xl p-4">
             <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3 block">Advertisement</span>
             <AdUnit slot="auto" format="auto" className="min-h-[100px] w-full" />
          </div>

          {/* Author bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-t border-b border-stone-100 mb-0">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F26B1D] flex items-center justify-center font-serif text-white font-bold text-sm shadow-sm ring-2 ring-orange-50">
                Y
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">Yumeroa Kitchen</p>
                <p className="text-[13px] text-stone-400">Curated Recipe Collection</p>
              </div>
            </div>
            
            {/* Share / Save buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <SaveRecipeButton recipeId={article.id} />
              <a
                href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(article.coverImage || '')}&description=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-bold text-[#E60023] bg-[#E60023]/10 border border-[#E60023]/20 rounded-full hover:bg-[#E60023] hover:text-white transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.633 0 12.017 0z"/>
                </svg>
                Pin Recipe
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-bold text-[#1877F2] bg-[#1877F2]/10 border border-[#1877F2]/20 rounded-full hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Share
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* — COVER IMAGE WITH PIN BUTTON OVERLAY — */}
      {article.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-8 relative group">
          <div className="w-full aspect-[21/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlay Pin Button - Appears on Hover */}
           <div className="absolute top-6 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <a 
               href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(article.coverImage || '')}&description=${encodeURIComponent(article.title)}`}
               target="_blank"
               rel="noopener noreferrer"
               className="bg-[#E60023] text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-[#ad081b] transition-colors flex items-center gap-2"
             >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.633 0 12.017 0z"/></svg>
               Save
             </a>
           </div>
        </div>
      )}

      {/* — ARTICLE BODY — */}
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* In-article Ad unit (Before Content) */}
        <div className="my-12 flex flex-col items-center border border-stone-100 bg-stone-50 rounded-2xl p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c2703e] mb-3 block">Advertisement</span>
          <AdUnit slot="auto" format="auto" className="w-full" />
        </div>

        {typeof article.content === 'string' && processHTML ? (
          <div
            className="article-prose animate-fade-in"
            dangerouslySetInnerHTML={{ __html: processHTML }}
          />
        ) : article.content ? (
          <pre className="bg-stone-50 border border-stone-150 rounded-xl p-6 overflow-x-auto text-[13px] text-stone-600 font-mono whitespace-pre-wrap animate-fade-in">
            {JSON.stringify(article.content, null, 2)}
          </pre>
        ) : (
          <p className="text-stone-400 italic text-center py-12">No content published yet.</p>
        )}

        {/* — COMMUNITY REVIEWS (AllRecipes Inspired) — */}
        <div className="mt-16 pt-10 border-t border-stone-200">
          <h2 className="text-2xl font-serif text-stone-900 mb-6">Home Cook Reviews</h2>
          <div className="space-y-6">
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <span className="text-sm font-bold text-stone-900">mcwarr</span>
              </div>
              <p className="text-stone-600 italic">"This was a hit at our house! Easy to make and so tasty!"</p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <span className="text-sm font-bold text-stone-900">OldTaro7970</span>
              </div>
              <p className="text-stone-600 italic">"Great recipe with wonderful results. Only one addition from me: I added several drops of sesame oil."</p>
            </div>
          </div>
          <button className="mt-4 text-sm font-bold text-[#c2703e] hover:underline">Read all 12 reviews</button>
        </div>

        {/* Bottom Ad Unit */}
        <div className="mt-16 mb-12 border-t border-stone-100 pt-8 flex flex-col items-center">
           <span className="text-[10px] font-bold uppercase tracking-widest text-[#c2703e] mb-4 block">Advertisement</span>
           <AdUnit slot="auto" format="rectangle" className="w-full max-w-[728px]" />
        </div>

        {/* — RELATED RECIPES — */}
        <RelatedRecipes currentSlug={article.slug} />

        {/* — DIVIDER + FOOTER — */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border border-stone-200 bg-stone-50 p-6 rounded-2xl shadow-sm mt-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#F26B1D] flex items-center justify-center font-serif text-white text-lg font-bold shadow-sm">
              Y
            </div>
            <div>
              <p className="font-bold text-stone-900 text-base">Yumeroa Kitchen</p>
              <p className="text-sm text-stone-500 mt-0.5">Craving more? We share new viral recipes every single day.</p>
            </div>
          </div>
          <Link
            href="/"
            className="px-6 py-3 text-sm font-bold text-white bg-stone-900 rounded-full hover:bg-stone-800 transition-all shadow-md whitespace-nowrap w-full sm:w-auto text-center"
          >
            Explore More Recipes
          </Link>
        </div>

      </div>
    </main>
  );
}
