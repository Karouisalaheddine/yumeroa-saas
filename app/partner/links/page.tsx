import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PartnerLinksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Find partner profile and links
  let links: any[] = [];
  if (user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: { 
        partnerProfile: { 
          include: { 
            trackingLinks: {
              include: { article: true }
            } 
          } 
        } 
      }
    });

    if (dbUser?.partnerProfile?.trackingLinks) {
      links = dbUser.partnerProfile.trackingLinks;
    }
  }

  return (
    <div className="p-5 md:p-8 space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 tracking-tight">Tracking Links</h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage your generated affiliate URLs and view quick click stats.
          </p>
        </div>
        <Link 
          href="/partner/library" 
          className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-all shadow-sm inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Link
        </Link>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-stone-200 bg-stone-50/50 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Short Link</th>
                <th className="px-6 py-4 text-center">Generated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-stone-900">{link.article.title}</div>
                    <div className="text-xs text-stone-400 mt-1">/articles/{link.article.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-100 rounded-md">
                      <span className="font-mono text-[13px] text-stone-700">yumeroa.com/go/{link.partnerId}/{link.article.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-stone-500 text-[13px]">
                    {new Date(link.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-4 py-2 rounded-lg shadow-sm hover:bg-stone-50 transition-all">
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
              {links.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 mb-4 border border-stone-100">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                      </div>
                      <p className="text-stone-900 font-medium mb-1">No active tracking links</p>
                      <p className="text-sm text-stone-500">Browse the content library to generate your first link!</p>
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
