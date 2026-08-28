'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import DeleteArticleButton from '@/components/DeleteArticleButton';

const FALLBACK_THUMB = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150';

interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: Date | string;
  coverImage?: string | null;
}

export default function ArticlesTable({ articles }: { articles: Article[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filtered = useMemo(() => {
    return (articles || []).filter((a) => {
      const matchesSearch =
        search.trim() === '' ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.slug.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'All Status' ||
        (statusFilter === 'Published' && a.status === 'PUBLISHED') ||
        (statusFilter === 'Draft' && a.status === 'DRAFT');

      return matchesSearch && matchesStatus;
    });
  }, [articles, search, statusFilter]);

  return (
    <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
      {/* Table Filters Bar */}
      <div className="p-4 border-b border-stone-200 flex flex-col xl:flex-row items-center justify-between gap-4">
        {/* Search — Bug #9 fix: now actually filters the table */}
        <div className="relative w-full xl:max-w-md">
          <svg className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-[13px] focus:outline-none focus:ring-1 focus:ring-stone-400 transition-shadow"
          />
        </div>

        <div className="w-full xl:w-auto flex flex-wrap items-center justify-end gap-3">
          {/* Status Filter — Bug #9 fix: now actually filters */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-stone-200 bg-white rounded-lg px-3 py-2 text-[13px] text-stone-700 font-medium focus:outline-none focus:ring-1 focus:ring-stone-400 min-w-[120px]"
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[900px]">
          <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-500 text-[11px] font-bold uppercase tracking-[0.05em]">
            <tr>
              <th className="px-6 py-4 font-bold">Article</th>
              <th className="px-6 py-4 font-bold text-center">Status</th>
              <th className="px-6 py-4 font-bold text-center">Category</th>
              <th className="px-6 py-4 font-bold">Date</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-stone-400 text-sm">
                  No articles match your search.
                </td>
              </tr>
            ) : (
              filtered.map((article) => {
                const createdAt = new Date(article.createdAt);
                const dateStr = createdAt.toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                });
                // Bug #8 fix: Show real time from DB instead of hardcoded "10:45 AM"
                const timeStr = createdAt.toLocaleTimeString('en-US', {
                  hour: '2-digit', minute: '2-digit',
                });
                // Bug #7 fix: Use actual article coverImage or a relevant fallback
                const thumb = article.coverImage || FALLBACK_THUMB;

                return (
                  <tr key={article.id} className="hover:bg-stone-50/50 transition-colors group align-middle">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-[84px] h-[56px] rounded-lg bg-stone-200 border border-stone-200 overflow-hidden shrink-0">
                          {/* Bug #7 fix: use real article thumbnail */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={thumb} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <div className="font-bold text-[14px] text-stone-900 mb-0.5">{article.title}</div>
                          <Link
                            href={`/articles/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] font-mono text-[#F26B1D] hover:underline cursor-pointer flex items-center mb-1.5"
                          >
                            /articles/{article.slug}
                            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                          <div className="flex items-center gap-1.5 text-[12px] text-stone-500 font-medium">
                            <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            System Admin
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium tracking-wide ${
                        article.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-1.5 ${
                          article.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} />
                        {article.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded text-[12px] font-medium bg-orange-50 text-[#F26B1D] border border-orange-100">
                        General
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-800 text-[13px] font-medium leading-tight">
                      {dateStr}
                      {/* Bug #8 fix: real time from createdAt */}
                      <div className="text-stone-400 font-normal">{timeStr}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-[13px] font-semibold">
                        <Link
                          href={`/articles/${article.slug}`}
                          target="_blank"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-600 bg-white hover:bg-stone-50 border border-stone-200 shadow-sm transition-colors"
                        >
                          <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Preview
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#F26B1D] bg-white border border-orange-200 hover:bg-orange-50 shadow-sm transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                          </svg>
                          Edit
                        </Link>
                        <DeleteArticleButton id={article.id} title={article.title} />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
