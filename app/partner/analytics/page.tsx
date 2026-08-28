import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import ClicksChart from '@/components/analytics/ClicksChart';

export const dynamic = 'force-dynamic';

export default async function PartnerAnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let clickStats: { date: string; clicks: number }[] = [];
  let recentClicks: any[] = [];
  let totalClicks = 0;

  if (user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        partnerProfile: {
          include: {
            trackingLinks: {
              include: {
                article: true,
                clicks: {
                  orderBy: { timestamp: 'desc' },
                }
              }
            }
          }
        }
      }
    });

    if (dbUser?.partnerProfile) {
      const partner = dbUser.partnerProfile;
      
      const allClicks: any[] = [];
      
      partner.trackingLinks.forEach((link: any) => {
        link.clicks.forEach((c: any) => {
          allClicks.push({
            id: c.id,
            timestamp: c.timestamp,
            userAgent: c.userAgent,
            ipHash: c.ipHash,
            article: link.article.title,
            shortCode: link.shortCode
          });
        });
      });
      
      totalClicks = allClicks.length;

      // Sort globally by timestamp
      allClicks.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      recentClicks = allClicks.slice(0, 50);

      // Aggregate recent 14 days click data for chart
      const clickMap: Record<string, number> = {};
      
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        clickMap[d.toISOString().slice(0, 10)] = 0;
      }
      
      allClicks.forEach((c) => {
        const dateStr = c.timestamp.toISOString().slice(0, 10);
        if (clickMap[dateStr] !== undefined) {
          clickMap[dateStr]++;
        }
      });

      clickStats = Object.keys(clickMap).map(date => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        clicks: clickMap[date]
      }));
    }
  }

  return (
    <div className="p-5 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Analytics Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">Detailed breakdown of traffic and link performance over the last 14 days.</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-8">
         <h3 className="font-semibold text-stone-900 mb-6">Traffic (14 Days)</h3>
         <div className="h-[350px]">
           <ClicksChart data={clickStats.filter(d => d.clicks > 0).length > 0 ? clickStats : []} />
         </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-semibold text-stone-900">Recent Clicks Log</h3>
          <span className="text-xs font-semibold px-2 py-1 bg-stone-100 text-stone-500 rounded">{totalClicks} Total</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-stone-50/50 border-b border-stone-200 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Source Article</th>
                <th className="px-6 py-4">Short Code</th>
                <th className="px-6 py-4 text-right">Identifier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {recentClicks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-stone-400">
                    No clicks recorded yet. Ensure you've shared your generated links.
                  </td>
                </tr>
              ) : (
                recentClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-stone-50/50">
                    <td className="px-6 py-4 text-[13px] text-stone-500">
                      {new Date(click.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900">
                      {click.article.length > 40 ? click.article.substring(0, 40) + '...' : click.article}
                    </td>
                    <td className="px-6 py-4 font-mono text-stone-500 text-[13px]">
                      {click.shortCode}
                    </td>
                    <td className="px-6 py-4 text-right text-stone-400 text-xs truncate max-w-[200px]">
                      {click.ipHash?.slice(0,12) || 'Hidden'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
