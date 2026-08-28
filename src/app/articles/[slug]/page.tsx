import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <div className="mb-6">
          <Link href="/" className="text-sm font-medium text-blue-600 hover:underline">
            &larr; Back to all stories
          </Link>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium uppercase">
            {article.status}
          </span>
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
          {article.title}
        </h1>

        <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-4">
          <p className="text-lg font-medium text-gray-600 mb-6">
            {article.excerpt}
          </p>
          <div className="border-t border-gray-100 pt-6">
            {article.content || 'Full culinary insights and detailed breakdown coming soon...'}
          </div>
        </div>
      </article>
    </main>
  );
}
