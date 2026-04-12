import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lista M3U — canais",
  description: "Importação M3U, lista de canais e guia de referência",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} font-sans antialiased`}
      >
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
