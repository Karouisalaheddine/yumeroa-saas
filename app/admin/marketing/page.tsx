import { prisma } from '@/lib/prisma';
import ClicksChart from '@/components/analytics/ClicksChart';

export const dynamic = 'force-dynamic';

export default async function AdminMarketingPage() {
  // Fetch global metrics
  const totalPartners = await prisma.partnerProfile.count();
  const totalLinks = await prisma.trackingLink.count();
  
  // Fetch all clicks for the last 14 days
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const clicks = await prisma.click.findMany({
    where: {
      timestamp: {
        gte: fourteenDaysAgo
      }
    },
    orderBy: { timestamp: 'asc' },
    include: {
      link: {
        include: {
          article: true,
          partner: {
            include: { user: true }
          }
        }
      }
    }
  });

  const totalClicksLast14Days = clicks.length;

  // Aggregate click data for chart
  const clickMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    clickMap[d.toISOString().slice(0, 10)] = 0;
  }
  
  clicks.forEach((c) => {
    const dateStr = c.timestamp.toISOString().slice(0, 10);
    if (clickMap[dateStr] !== undefined) {
      clickMap[dateStr]++;
    }
  });

  const clickStats = Object.keys(clickMap).map(date => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    clicks: clickMap[date]
  }));

  // Identify top articles (by click count in the last 14 days)
  const articleClicks: Record<string, { title: string; clicks: number }> = {};
  clicks.forEach(c => {
    const title = c.link.article.title;
    if (!articleClicks[title]) articleClicks[title] = { title, clicks: 0 };
    articleClicks[title].clicks++;
  });
  
  const topArticles = Object.values(articleClicks)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  return (
    <div className="p-5 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Marketing & Performance</h1>
          <p className="text-sm text-stone-500 mt-1">
            Global overview of affiliate network traffic and top converting assets.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-all shadow-sm">
          Export Report
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm card-hover">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Total Partners</h3>
          <p className="text-2xl font-sans font-semibold tracking-tight text-stone-900">{totalPartners}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm card-hover">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Active Tracking Links</h3>
          <p className="text-2xl font-sans font-semibold tracking-tight text-stone-900">{totalLinks}</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm card-hover">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Network Clicks (14d)</h3>
          <p className="text-2xl font-sans font-semibold tracking-tight text-stone-900">{totalClicksLast14Days}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-xl shadow-sm p-8">
          <h3 className="font-semibold text-stone-900 mb-6">Global Traffic (14 Days)</h3>
          <div className="h-[350px]">
            <ClicksChart data={clickStats.filter(d => d.clicks > 0).length > 0 ? clickStats : []} />
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6 flex flex-col">
          <h3 className="font-semibold text-stone-900 mb-4 pb-3 border-b border-stone-100 text-sm">
            Top Articles (14d)
          </h3>
          <div className="flex-1 flex flex-col">
             {topArticles.length === 0 ? (
                <div className="m-auto text-center">
                  <p className="text-sm text-stone-400 italic">No traffic recorded yet.</p>
                </div>
             ) : (
                <ul className="space-y-4">
                  {topArticles.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-800 line-clamp-1 pr-4">{item.title}</span>
                      <span className="text-xs font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded shrink-0">{item.clicks} Clicks</span>
                    </li>
                  ))}
                </ul>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
