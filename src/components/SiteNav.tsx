import Link from "next/link";

import { SiteLogo } from "@/components/SiteLogo";

const navLink =
  "inline-flex min-h-[44px] items-center text-sm font-semibold text-slate-400 transition-colors duration-200 hover:text-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-pitch-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="group relative flex min-h-[44px] min-w-0 shrink items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <SiteLogo variant="nav" priority />
        </Link>

        <nav
          className="flex flex-wrap items-center gap-1 sm:gap-4"
          aria-label="Principal"
        >
          <Link href="/" className={navLink}>
            Início
          </Link>
          <Link href="/guia" className={navLink}>
            Guia
          </Link>
        </nav>
      </div>
    </header>
  );
}
