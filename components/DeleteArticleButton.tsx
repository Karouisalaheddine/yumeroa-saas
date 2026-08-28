'use client';

import { deleteArticle } from '@/app/actions/articles';
import { useTransition } from 'react';

export default function DeleteArticleButton({ id, title }: { id: string; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      startTransition(async () => {
        await deleteArticle(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete article"
      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 ml-1"
    >
      {isPending ? (
        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-r-transparent border-red-500"></span>
      ) : (
        <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )}
    </button>
  );
}
