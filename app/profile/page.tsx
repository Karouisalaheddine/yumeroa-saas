import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch some published articles to display as "reading suggestions"
  let articles: { id: string; title: string; slug: string; excerpt: string | null; createdAt: Date }[] = [];
  try {
    articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: { id: true, title: true, slug: true, excerpt: true, createdAt: true },
    });
  } catch {
    // DB might be unreachable, show empty state
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Reader';
  const email = user?.email || '';
  const avatarUrl = user?.user_metadata?.avatar_url || null;
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Yumeroa
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-10">
          {/* Cover Banner */}
          <div className="h-28 bg-gradient-to-r from-stone-800 via-stone-700 to-[#c2703e]" />

          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex items-end justify-between -mt-10 mb-5">
              <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md bg-stone-900 flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-serif text-2xl font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {user && (
                <form action="/api/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-stone-600 border border-stone-200 rounded-lg hover:bg-stone-50 hover:border-stone-300 transition-all"
                  >
                    Sign Out
                  </button>
                </form>
              )}
            </div>

            <h1 className="text-2xl font-serif font-semibold text-stone-900 mb-1">{displayName}</h1>
            {email && <p className="text-sm text-stone-500 mb-4">{email}</p>}

            <div className="flex flex-wrap gap-4 text-sm text-stone-500">
              {joinedDate && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Member since {joinedDate}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                Culinary Explorer
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Articles Read', value: articles.length.toString(), icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
            { label: 'Saved Recipes', value: '0', icon: 'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z' },
            { label: 'Comments', value: '0', icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#c2703e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <span className="text-2xl font-serif font-bold text-stone-900">{stat.value}</span>
              <span className="text-xs text-stone-500 mt-1 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Recent Articles Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-semibold text-stone-900">Discover Articles</h2>
            <Link href="/" className="text-sm font-medium text-[#c2703e] hover:underline">
              View all →
            </Link>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group bg-white rounded-xl border border-stone-200 shadow-sm p-5 hover:shadow-md hover:border-stone-300 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center mb-4 group-hover:bg-[#c2703e]/10 transition-colors">
                    <svg className="w-4 h-4 text-[#c2703e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-medium text-stone-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#c2703e] transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-xs text-stone-500 line-clamp-2">{article.excerpt}</p>
                  )}
                  <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-400 font-medium uppercase tracking-wide">
                    {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-stone-200 border-dashed">
              <svg className="w-10 h-10 text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <p className="text-stone-500 text-sm">No articles available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
