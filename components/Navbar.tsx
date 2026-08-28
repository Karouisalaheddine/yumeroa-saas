'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Recipes',    href: '/?category=All Recipes' },
    { label: 'Breakfast',  href: '/?category=Breakfast' },
    { label: 'Desserts',   href: '/?category=Desserts' },
    { label: 'Vegan',      href: '/?category=Vegan' },
    { label: 'Quick & Easy', href: '/?category=Quick & Easy' },
    { label: 'Dinners',    href: '/?category=Dinners' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/97 backdrop-blur-md shadow-[0_2px_16px_rgba(0,0,0,0.06)] border-b border-stone-100'
          : 'bg-white border-b border-stone-100'
      }`}
    >
      {/* Top promo bar */}
      <div className="bg-gradient-to-r from-[#E84A1A] to-[#F26B1D] text-white text-[11px] tracking-[0.1em] font-semibold uppercase py-2 text-center">
        <span className="opacity-90">Yumeroa Partner Network</span>
        <span className="mx-3 opacity-40">·</span>
        <Link
          href="/login"
          className="underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Apply to become a Distribution Partner →
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:h-[68px] gap-8">
          {/* Brand Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-0">
            <Image
              src="/logo.png"
              alt="Yumeroa — Food · Content · Growth"
              width={180}
              height={66}
              priority
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-[13px] font-medium text-stone-500 hover:text-[#F26B1D] rounded-md transition-colors relative group"
              >
                {item.label}
                <span className="absolute inset-x-3 -bottom-px h-[2px] bg-[#F26B1D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              aria-label="Search"
              className="p-2 text-stone-400 hover:text-[#F26B1D] hover:bg-orange-50 rounded-lg transition-colors"
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            <Link
              href="/profile"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-stone-600 border border-stone-200 rounded-lg hover:bg-orange-50 hover:border-[#F26B1D] hover:text-[#F26B1D] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              My Profile
            </Link>

            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-stone-500 hover:text-[#F26B1D] hover:bg-orange-50 rounded-lg transition-colors"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(2.25rem+4.25rem+1px)] bg-white z-[60] animate-slide-down border-t border-stone-100">
          <nav className="flex flex-col p-6 gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-base font-medium text-stone-700 hover:text-[#F26B1D] hover:bg-orange-50 rounded-xl transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-3 border-stone-100" />
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-base font-semibold text-stone-900 bg-orange-50 rounded-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#F26B1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              My Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
