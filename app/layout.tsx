import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const defaultTitle = "Yumeroa — Viral Recipes & Culinary Stories";
const defaultDesc = "Discover trending recipes, artisan food stories, and culinary inspiration. Premium global food content on Yumeroa Kitchen.";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDesc,
  openGraph: {
    type: 'website',
    url: baseUrl,
    title: defaultTitle,
    description: defaultDesc,
    siteName: 'Yumeroa',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDesc,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXX';

  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        {/* Placeholder for Pinterest Domain Verification if needed */}
        {/* <meta name="p:domain_verify" content="your_pinterest_tag_here"/> */}
      </head>
      <body className="min-h-full font-sans">
        
        {/* Google AdSense Script - Lazy Loaded to protect Core Web Vitals */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
          crossOrigin="anonymous"
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
