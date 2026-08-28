import Link from 'next/link';

export default function ArticleNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 font-black text-xl">
        Y
      </div>
      <h2 className="text-3xl font-extrabold text-white tracking-tight">Article Not Found</h2>
      <p className="text-slate-400 text-sm mt-2 leading-relaxed">
        We couldn't find an article matching this URL slug. It may be in draft mode or deleted.
      </p>

      <div className="flex gap-3 mt-6">
        <Link
          href="/"
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all"
        >
          View All Articles
        </Link>
        <Link
          href="/admin/articles/new"
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-sm rounded-xl transition-all"
        >
          Create Article
        </Link>
      </div>
    </div>
  );
}
