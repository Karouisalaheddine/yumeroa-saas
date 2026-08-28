import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminPartnersPage() {
  const partners = await prisma.partnerProfile.findMany({
    include: {
      user: true,
      conversions: true,
      _count: {
        select: { trackingLinks: true }
      }
    }
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Partner Management</h1>
          <p className="text-sm text-stone-500 mt-1">
            View active partners, their tracking link volume, and adjust tiers.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-all shadow-sm">
          Invite Partner
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50/50 border-b border-stone-200 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Partner</th>
                <th className="px-6 py-4">Tier (Rev Share)</th>
                <th className="px-6 py-4 text-center">Active Links</th>
                <th className="px-6 py-4 text-right">Lifetime Earnings</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-stone-900">{partner.user.email}</div>
                    <div className="text-[13px] font-mono text-stone-400 mt-1">ID: {partner.id.slice(0, 8)}...</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      partner.tier === 'ELITE' ? 'bg-amber-50 text-amber-700 border border-amber-200/60' :
                      partner.tier === 'PRO' ? 'bg-sky-50 text-sky-700 border border-sky-200/60' :
                      'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}>
                      {partner.tier === 'ELITE' ? '80/20 ELITE' : partner.tier === 'PRO' ? '70/30 PRO' : '60/40 BASE'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-stone-500 text-[13px]">
                    {partner._count.trackingLinks}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-stone-900">
                    ${partner.totalEarned.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[13px] font-semibold text-stone-500 hover:text-stone-900 transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {partners.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                       <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 mb-4 border border-stone-100">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                          </svg>
                       </div>
                       <p className="text-stone-900 font-medium mb-1">No partners found</p>
                       <p className="text-sm text-stone-500 max-w-sm">Invite your first creators to begin generating volume and sales.</p>
                       <button className="mt-5 px-5 py-2 bg-white border border-stone-200 text-stone-700 rounded-lg text-[13px] font-semibold hover:bg-stone-50 transition-all shadow-sm">
                         Invite a Partner
                       </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
