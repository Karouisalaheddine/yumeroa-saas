'use client';

import { useState } from 'react';

export default function LedgerImportsPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Financial Ledger</h1>
        <p className="text-sm text-stone-500 mt-1">
          Import conversion CSVs from affiliate networks to process partner revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6 md:p-8">
            <h3 className="font-semibold text-stone-900 mb-6 text-sm">Manual CSV Import</h3>
            
            <div className="border border-dashed border-stone-300 bg-stone-50/50 rounded-xl p-10 md:p-14 text-center flex flex-col items-center justify-center transition-colors hover:bg-stone-50">
              <div className="w-12 h-12 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-400 mb-5 shadow-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h4 className="font-semibold text-stone-900 mb-1">Click to upload Network CSV</h4>
              <p className="text-[13px] text-stone-500 max-w-sm mb-6">
                Supports standard outputs from Skimlinks, Impact, or CJ containing <code>sid</code> (Partner Short Code) and <code>revenue</code> columns.
              </p>
              
              <label className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-lg shadow-sm cursor-pointer transition-all">
                Browse Files
                <input type="file" className="hidden" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>
            </div>
            
            {file && (
              <div className="mt-5 p-4 border border-emerald-200 bg-emerald-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   <span className="text-[13px] text-emerald-800 font-semibold">{file.name}</span>
                </div>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold rounded-lg shadow-sm transition-colors">
                  Process Ledger
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6">
             <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Pending Liabilities</h3>
             <div className="text-3xl font-sans font-semibold tracking-tight text-stone-900">$0.00</div>
             <p className="text-[13px] text-stone-500 mt-2">Total owed to Partners</p>
             
             <button className="w-full mt-6 py-2.5 border border-stone-200 bg-white rounded-lg text-[13px] font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-900 transition-all shadow-sm">
               Review Payouts
             </button>
          </div>
          
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-5">
             <div className="flex items-start gap-3">
               <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <div>
                  <h4 className="font-semibold text-[13px] text-amber-900 mb-1">Automated Payouts Paused</h4>
                  <p className="text-[13px] text-amber-700/90 leading-relaxed">
                    Stripe Connect automation is currently paused during MVP. Please process manual wire transfers based on ledger liabilities.
                  </p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
