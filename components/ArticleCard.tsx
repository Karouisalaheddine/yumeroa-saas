'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: string | null;
    status: string;
    createdAt: Date | string;
  };
}

// Fallback images for articles without covers
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
];

const TAGS = ['Dinner Winner', 'Quick and Easy', 'Kid-Pleaser', 'Family Favorite', 'Summer Salad', 'Cool Treat'];
const QUOTES = [
  '"This was a hit at our house! Easy to make and so tasty!"',
  '"Great recipe with wonderful results. A family favorite now."',
  '"A splash of soy sauce on top made it perfect. Definite staple."',
  '"Where to begin? Probably one of the best meals I\'ve had in my life."',
  '"This was so good! I would suggest you double the batch."',
  '"My family really enjoyed this recipe. Will make again!"',
];

export default function ArticleCard({ article }: ArticleCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (savedRecipes.includes(article.id)) {
      setIsSaved(true);
    }
  }, [article.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (isSaved) {
      const newSaved = savedRecipes.filter((id: string) => id !== article.id);
      localStorage.setItem('savedRecipes', JSON.stringify(newSaved));
      setIsSaved(false);
    } else {
      savedRecipes.push(article.id);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      setIsSaved(true);
    }
  };

  // Deterministic fallback content based on article id length and character codes
  const charSum = article.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fallbackImg = FALLBACK_IMAGES[charSum % FALLBACK_IMAGES.length];
  const tag = TAGS[charSum % TAGS.length];
  const quote = QUOTES[charSum % QUOTES.length];
  const imgSrc = article.coverImage || fallbackImg;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const articleUrl = `${baseUrl}/articles/${article.slug}`;

  return (
    <article className="group flex flex-col mb-8 break-inside-avoid shadow-[0_2px_12px_rgba(0,0,0,0.04)] rounded-2xl p-4 border border-stone-100 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all bg-white">
      
      {/* Save Button (Top Right) */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[11px] uppercase tracking-wider font-bold text-[#c2703e] bg-[#f5ece4] px-2 py-1 rounded-sm">
          {tag}
        </span>
        <button 
          onClick={toggleSave}
          className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center hover:bg-stone-100 transition-colors border border-stone-200 group/btn"
          aria-label={isSaved ? "Remove from saved" : "Save recipe"}
        >
          {isSaved ? (
            <svg className="w-4 h-4 text-[#c2703e]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-stone-400 group-hover/btn:text-stone-700 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          )}
        </button>
      </div>

      <div className="relative rounded-xl overflow-hidden mb-4 bg-stone-100 shadow-sm">
        <Link href={`/articles/${article.slug}`} className="block aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <a
            href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(articleUrl)}&media=${encodeURIComponent(imgSrc)}&description=${encodeURIComponent(article.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="bg-[#E60023] text-white p-2 rounded-full shadow-lg hover:bg-[#ad081b] transition-colors flex items-center justify-center"
            title="Pin it"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.633 0 12.017 0z"/></svg>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="px-1 flex flex-col flex-1">
        <Link href={`/articles/${article.slug}`}>
          <h3 className="text-[18px] font-bold text-stone-900 leading-tight group-hover:text-[#c2703e] transition-colors mb-2">
            {article.title}
          </h3>
        </Link>
        
        {/* User Review Quote Snippet */}
        <div className="mt-2 mb-4 bg-stone-50 border-l-2 border-stone-300 p-3 rounded-r-md">
          <p className="text-[13px] text-stone-600 italic leading-snug">
            {quote}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
             <div className="flex text-amber-400">
               {[1,2,3,4,5].map(i => <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
             </div>
             <span className="text-[11px] font-bold text-stone-400">Yumeroa Member</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#c2703e] flex items-center justify-center text-white text-[10px] font-bold">
              Y
            </div>
            <span className="text-[12px] font-semibold text-stone-500">Yumeroa Kitchen</span>
          </div>
          <Link href={`/articles/${article.slug}`} className="text-[12px] font-bold text-[#c2703e] hover:underline">
            View Recipe
          </Link>
        </div>
      </div>
    </article>
  );
}
