'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const navItems = [
  { group: 'Partner Portal', items: [
    { label: 'Overview', href: '/partner', exact: true, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Article Library', href: '/partner/library', exact: false, icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
    { label: 'My Links', href: '/partner/links', icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' },
    { label: 'Analytics', href: '/partner/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'Payouts', href: '/partner/payouts', icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z' },
  ]},
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item: any) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);
    
  const handleLogout = async () => {
    const { logout } = await import('@/app/login/actions');
    await logout();
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 flex overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-stone-900/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-stone-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:w-[260px] flex flex-col ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Brand */}
        <div className="h-20 flex items-center px-5 shrink-0 border-b border-stone-100">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Yumeroa"
              width={130}
              height={48}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto pt-6 px-4 pb-4 scrollbar-hide">
          {navItems.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-8">
              <h3 className="px-3 mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#F26B1D] flex items-center gap-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.5-6.3-4.8-6.3 4.8 2.3-7.5-6-4.6h7.6z"/>
                </svg>
                {group.group}
              </h3>
              
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                        active 
                          ? 'bg-[#F26B1D]/10 text-[#F26B1D] shadow-sm' 
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                         <svg className={`w-5 h-5 transition-colors ${active ? 'text-[#F26B1D]' : 'text-stone-400 group-hover:text-stone-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.label}
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}

          {/* Yumeroa Tip */}
          <div className="mt-8 mb-4 bg-orange-50/50 border border-orange-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2 text-[#F26B1D]">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
               </svg>
               <span className="text-xs font-bold uppercase tracking-wider">Boost Earnings</span>
            </div>
            <p className="text-[13px] text-stone-600 mb-3 leading-relaxed">
              Share engaging recipes directly on Pinterest or Instagram Stories to maximize your affiliate clicks.
            </p>
            <Link href="/" className="text-[13px] font-semibold text-[#F26B1D] hover:text-[#C4520F] flex items-center gap-1 transition-colors">
              Access Marketing Tips <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-stone-100">
           <button onClick={handleLogout} className="w-full flex items-center justify-center p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-xl transition-colors">
              <span className="text-sm font-semibold mr-2">Sign Out</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
           </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-stone-200 shrink-0 flex items-center justify-between px-6 lg:px-10 z-10">
          
          <div className="flex items-center gap-4 flex-1">
             <button 
               onClick={() => setMobileOpen(true)}
               className="lg:hidden p-2 -ml-2 text-stone-500 hover:bg-stone-100 rounded-lg"
             >
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
               </svg>
             </button>

             {/* Search Bar */}
             <div className="hidden md:flex relative max-w-md w-full">
               <svg className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               <input 
                 type="text" 
                 placeholder="Search articles..." 
                 className="w-full pl-10 pr-12 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F26B1D]/20 focus:border-[#F26B1D] transition-all placeholder:text-stone-400"
               />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center border border-stone-200 bg-white rounded-[4px] px-1.5 py-0.5 shadow-sm text-stone-400 font-sans text-[10px] font-bold">
                 &#8984;K
               </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notification */}
            <button className="relative text-stone-400 hover:text-stone-700 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F26B1D] text-[9px] font-bold text-white ring-2 ring-white">3</span>
            </button>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-stone-100 flex-shrink-0 relative">
                {/* Fallback image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/150?img=33" alt="Partner" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-bold text-stone-800 leading-tight">Partner Portal</p>
                <p className="text-[11px] font-medium text-stone-400">Content Creator</p>
              </div>
              <svg className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-stone-50">
          {children}

          {/* Footer inside content area to match image */}
          <footer className="px-6 lg:px-10 py-8 text-[13px] text-stone-400 font-medium flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 border-t border-stone-200">
            <p>© 2026 Yumeroa. All rights reserved.</p>
            <p className="text-stone-500">Made with <span className="text-[#F26B1D]">❤️</span> for food creators worldwide.</p>
          </footer>
        </div>

      </div>
    </div>
  );
}
