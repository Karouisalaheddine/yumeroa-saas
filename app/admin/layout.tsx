'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';

const navItems = [
  { group: 'Command Center', items: [
    { label: 'Overview', href: '/admin', exact: true, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Articles & Catalog', href: '/admin/articles', exact: false, icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { label: 'Categories', href: '/admin/categories', icon: 'M4 6h16M4 12h16M4 18h7' },
    { label: 'Media Library', href: '/admin/media', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'Pages', href: '/admin/pages', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'AI Content Studio', href: '/admin/ai-studio', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Partners', href: '/admin/partners', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { label: 'Partner Requests', href: '/admin/partner-requests', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', badge: '12' },
    { label: 'Analytics', href: '/admin/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { label: 'Earnings', href: '/admin/earnings', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Ledger & Payouts', href: '/admin/ledger', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { label: 'CRM', href: '/admin/crm', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { label: 'Marketing', href: '/admin/marketing', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { label: 'Settings', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM12 15a3 3 0 100-6 3 3 0 000 6z' },
    { label: 'Integrations', href: '/admin/integrations', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
    { label: 'Audit Logs', href: '/admin/logs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { label: 'Help & Support', href: '/admin/support', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Exact match for '/admin', prefix match for others like '/admin/articles'
  const isActive = (item: any) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

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

                      {item.badge && (
                        <div className="bg-[#F26B1D]/10 text-[#F26B1D] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </div>
                      )}
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
               <span className="text-xs font-bold uppercase tracking-wider">Yumeroa Tip</span>
            </div>
            <p className="text-[13px] text-stone-600 mb-3 leading-relaxed">
              Publish recipes consistently to increase organic traffic and partner engagement.
            </p>
            <Link href="/" className="text-[13px] font-semibold text-[#F26B1D] hover:text-[#C4520F] flex items-center gap-1 transition-colors">
              View Best Practices <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Sidebar Footer Toggle (Mock) */}
        <div className="p-4 border-t border-stone-100">
           <button className="w-full flex items-center justify-center p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
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
                 placeholder="Search anything..." 
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
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F26B1D] text-[9px] font-bold text-white ring-2 ring-white">8</span>
            </button>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-stone-100 flex-shrink-0 relative">
                {/* Fallback image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-bold text-stone-800 leading-tight">Salah Eddine</p>
                <p className="text-[11px] font-medium text-stone-400">Super Admin</p>
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
