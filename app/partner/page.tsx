import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import ClicksChart from '@/components/analytics/ClicksChart';

export const metadata = {
  title: 'Partner Dashboard | Yumeroa',
};

export const dynamic = 'force-dynamic';

export default async function PartnerDashboardOverview() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let partner: any = null;
  let clickStats: { date: string; clicks: number }[] = [];
  let totalClicks = 0;
  let activeLinks = 0;
  let totalEarned = 0;

  if (user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        partnerProfile: {
          include: {
            _count: {
              select: { trackingLinks: true }
            },
            trackingLinks: {
              include: {
                _count: { select: { clicks: true } },
                clicks: {
                  where: {
                    timestamp: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // last 7 days
                  },
                  orderBy: { timestamp: 'asc' }
                }
              }
            }
          }
        }
      }
    });

    if (dbUser?.partnerProfile) {
      partner = dbUser.partnerProfile;
      activeLinks = partner._count.trackingLinks;
      totalEarned = partner.totalEarned;
      
      // Calculate total lifetime clicks
      totalClicks = partner.trackingLinks.reduce((acc: number, link: any) => acc + link._count.clicks, 0);

      // Aggregate recent 7 days click data for chart
      const clickMap: Record<string, number> = {};
      
      // Setup last 7 days keys
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        clickMap[d.toISOString().slice(0, 10)] = 0;
      }
      
      // Fill the map
      partner.trackingLinks.forEach((link: any) => {
        link.clicks.forEach((c: any) => {
          const dateStr = c.timestamp.toISOString().slice(0, 10);
          if (clickMap[dateStr] !== undefined) {
            clickMap[dateStr]++;
          }
        });
      });

      clickStats = Object.keys(clickMap).map(date => ({
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        clicks: clickMap[date]
      }));
    }
  }

  // Calculate generic conversion if needed (mocked for now since conversion isn't fully tracked per click yet)
  const avgConversion = totalClicks > 0 ? ((totalEarned / 50) / totalClicks * 100).toFixed(2) : '0.00';

  return (
    <div className="p-5 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-stone-500 mt-1">
            Welcome back. Here is your recent performance and link metrics.
          </p>
        </div>
        <Link 
          href="/partner/library"
          className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-all shadow-sm inline-flex items-center gap-2"
        >
           Generate Link
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Unpaid Earnings', value: `$${totalEarned.toFixed(2)}`, trend: '+0.0%', positive: true },
          { label: 'Total Clicks', value: totalClicks.toString(), trend: '+0%', positive: true },
          { label: 'Avg. Conversion', value: `${avgConversion}%`, trend: '0.00%', positive: true },
          { label: 'Active Links', value: activeLinks.toString(), trend: '0', positive: true },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm card-hover">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              {kpi.label}
            </h3>
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-sans font-semibold tracking-tight text-stone-900">
                {kpi.value}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-stone-500 bg-stone-100`}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-xl shadow-sm min-h-[400px] p-8 flex flex-col items-center">
           <div className="w-full flex justify-between items-center mb-6">
             <h3 className="font-semibold text-stone-900">Click Volume (Last 7 Days)</h3>
           </div>
           {/* Recharts Component inserted here */}
           <div className="w-full relative flex-1">
             <ClicksChart data={clickStats.filter(d => d.clicks > 0).length > 0 ? clickStats : []} />
           </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-stone-900 mb-4 pb-3 border-b border-stone-100 text-sm">
            Top Articles
          </h3>
          <div className="flex flex-col justify-center items-center py-12 text-center h-[280px]">
             <p className="text-sm text-stone-400 italic">No conversions recorded this month.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
