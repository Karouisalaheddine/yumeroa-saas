import Link from 'next/link';

export default function PartnerPayoutsPage() {
  return (
    <div className="p-5 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Payouts</h1>
        <p className="text-sm text-stone-500 mt-1">View your earnings history and payout schedule.</p>
      </div>

      {/* Balance card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Available Balance', value: '$0.00', note: 'Ready for withdrawal' },
          { label: 'Pending Earnings', value: '$0.00', note: 'Expected within 30 days' },
          { label: 'Lifetime Earned', value: '$0.00', note: 'Total since joining' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm card-hover">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1">{kpi.label}</p>
            <p className="text-2xl font-semibold text-stone-900 tracking-tight">{kpi.value}</p>
            <p className="text-[12px] text-stone-400 mt-1">{kpi.note}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-5 flex items-start gap-3.5">
        <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 className="font-semibold text-[13px] text-amber-900 mb-1">Stripe Connect — Integration Pending</h4>
          <p className="text-[13px] text-amber-700/90 leading-relaxed">
            Automated payouts via Stripe are in development. Your earnings are being tracked and will be transferred manually until this feature launches.
          </p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <h3 className="font-semibold text-stone-900 text-sm">Transaction History</h3>
        </div>
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <p className="text-stone-400 text-sm">No transactions yet.</p>
          <Link href="/partner/library" className="mt-4 text-sm text-[#c2703e] hover:underline font-semibold">
            Start promoting content →
          </Link>
        </div>
      </div>
    </div>
  );
}
