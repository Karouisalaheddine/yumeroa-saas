import { createArticle } from '@/app/actions/articles';
import Link from 'next/link';

export default function NewArticlePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-5 border-b border-stone-200">
        <div>
          <Link href="/admin" className="text-xs font-semibold text-[#c2703e] hover:underline flex items-center gap-1 mb-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Create New Article</h1>
          <p className="text-stone-500 text-sm mt-1">Publish culinary stories or add new catalog items.</p>
        </div>
      </div>

      {/* Form Card */}
      <form action={createArticle} className="bg-white border border-stone-200 rounded-xl p-6 md:p-8 space-y-5 shadow-sm">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Article Title <span className="text-[#c2703e]">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g. Traditional Artisan Olive Oils of North Africa"
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 focus:bg-white text-sm transition-all"
          />
        </div>

        {/* Custom Slug (Optional) */}
        <div>
          <label htmlFor="slug" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            URL Slug <span className="text-stone-400 font-normal normal-case">(optional — auto-generated if empty)</span>
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            placeholder="artisan-olive-oils"
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 focus:bg-white text-sm font-mono transition-all"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Brief Excerpt / Summary
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            placeholder="A short introductory hook for card previews..."
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 focus:bg-white text-sm transition-all resize-none"
          ></textarea>
        </div>

        {/* Cover Image URL */}
        <div>
          <label htmlFor="coverImage" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            name="coverImage"
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 focus:bg-white text-sm transition-all"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Article Body Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            placeholder="Write full article text here..."
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 focus:bg-white text-sm transition-all leading-relaxed resize-y"
          ></textarea>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Publish Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue="PUBLISHED"
            className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400 focus:bg-white text-sm transition-all"
          >
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
          <Link
            href="/admin"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-stone-500 hover:text-stone-700 hover:bg-stone-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
          >
            Save & Publish
          </button>
        </div>
      </form>
    </div>
  );
}
