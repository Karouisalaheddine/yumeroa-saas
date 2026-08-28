'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface AdUnitProps {
  slot: string; // The AdSense ad slot ID (e.g., '1234567890')
  format?: 'auto' | 'fluid' | 'rectangle'; // Ad format string
  responsive?: boolean;
  className?: string;
}

export default function AdUnit({ slot, format = 'auto', responsive = true, className = '' }: AdUnitProps) {
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement>(null);

  // We use the client-ID here. Usually placed in .env, but using a placeholder for now.
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXX';

  useEffect(() => {
    // Attempt to push ad to adsbygoogle array when component mounts or route changes
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense Error:', err);
    }
  }, [pathname]);

  // If no AdSense publisher ID is present in environment, render a placeholder layout during development
  const isDev = process.env.NODE_ENV === 'development' || adClient === 'ca-pub-XXXXXXXXXXXXXXX';

  if (isDev) {
    return (
      <div className={`flex items-center justify-center bg-stone-100 border border-stone-200 border-dashed rounded-lg p-4 text-xs font-mono text-stone-400 text-center w-full min-h-[100px] ${className}`}>
        AdSense Unit Placeholder <br/> Slot: {slot}
      </div>
    );
  }

  return (
    <div key={pathname} className={`w-full overflow-hidden flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
