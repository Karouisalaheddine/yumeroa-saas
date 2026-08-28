'use client';

import { useState, useEffect } from 'react';

export default function SaveRecipeButton({ recipeId }: { recipeId: string }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (savedRecipes.includes(recipeId)) {
      setIsSaved(true);
    }
  }, [recipeId]);

  const toggleSave = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    if (isSaved) {
      const newSaved = savedRecipes.filter((id: string) => id !== recipeId);
      localStorage.setItem('savedRecipes', JSON.stringify(newSaved));
      setIsSaved(false);
    } else {
      savedRecipes.push(recipeId);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      setIsSaved(true);
    }
  };

  return (
    <button
      onClick={toggleSave}
      aria-label="Save recipe"
      className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold border rounded-full transition-all shadow-sm ${
        isSaved 
          ? 'bg-[#f5ece4] border-[#c2703e] text-[#c2703e]' 
          : 'text-stone-500 border-stone-200 hover:bg-stone-50 hover:border-stone-300 hover:text-stone-900'
      }`}
    >
      {isSaved ? (
        <svg className="w-4 h-4 text-[#c2703e]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )}
      {isSaved ? 'Saved to MyRecipes' : 'Save'}
    </button>
  );
}
