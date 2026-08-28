import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-stone-100 text-stone-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Yumeroa — Food · Content · Growth"
                width={180}
                height={66}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              A curated collection of culinary stories, seasonal recipes, and mindful food experiences from around the globe.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { label: 'Pinterest', href: '#', icon: 'M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' },
                { label: 'Instagram', href: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'TikTok', href: '#', icon: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.18 8.18 0 004.78 1.53V6.88a4.84 4.84 0 01-1.01-.19z' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-stone-150 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:border-stone-300 hover:bg-stone-50 transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div className="md:col-span-2">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-5">Discover</h4>
            <ul className="space-y-2.5 text-sm">
              {['All Recipes', 'Breakfast', 'Lunch & Dinner', 'Desserts', 'Vegan', 'Quick Meals'].map((item) => (
                <li key={item}>
                  <Link href="/#recipes" className="text-stone-400 hover:text-stone-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About Us', href: '#' },
                { label: 'Food Stories', href: '#' },
                { label: 'Editorial Standards', href: '#' },
                { label: 'Press Kit', href: '#' },
                { label: 'Contact', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-stone-400 hover:text-stone-900 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-5">Partners</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Partner Program', href: '/login' },
                { label: 'Partner Login', href: '/login' },
                { label: 'Content Library', href: '/login' },
                { label: 'Commission Rates', href: '#' },
                { label: 'Partner Docs', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-stone-400 hover:text-stone-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>&copy; {year} Yumeroa. All rights reserved.</p>
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-stone-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-700 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-stone-700 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
