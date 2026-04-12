import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import { Suspense } from "react";
import { PortalSubNav } from "@/components/portal/PortalSubNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SITE_LOGO_ALT } from "@/components/SiteLogo";
import { siteAuthor } from "@/config/author";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const barlow = Barlow_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

const defaultTitle = "StreamFutebol — futebol, filmes e canais";
const defaultDescription =
  "StreamFutebol: canais de futebol e filmes. Lista M3U, reprodução no browser e guia IPTV.";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: defaultTitle,
  description: defaultDescription,
  authors: [
    { name: siteAuthor.displayName, url: siteAuthor.githubProfileUrl },
  ],
  icons: {
    icon: [{ url: "/logo-streamfutbol.png", type: "image/png" }],
    apple: [{ url: "/logo-streamfutbol.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "StreamFutebol",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: defaultTitle,
    description: defaultDescription,
    siteName: "StreamFutebol",
    images: [
      {
        url: "/logo-streamfutbol.png",
        width: 320,
        height: 96,
        alt: SITE_LOGO_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo-streamfutbol.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#22c55e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${barlow.variable} flex min-h-dvh flex-col font-sans antialiased`}
      >
        <SiteNav />
        <Suspense
          fallback={
            <div
              className="h-[52px] border-b border-white/[0.06] bg-pitch-950/80"
              aria-hidden
            />
          }
        >
          <PortalSubNav />
        </Suspense>
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
