"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { SiteLogo } from "@/components/SiteLogo";
import { normalizeSportCategoryId } from "@/lib/sportCategories";

import { SportCategoryPills } from "./SportCategoryPills";

const PATHS_WITH_SUBNAV = new Set(["/em-construcao"]);

export function PortalSubNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!PATHS_WITH_SUBNAV.has(pathname)) return null;

  const activeId = normalizeSportCategoryId(searchParams.get("c") ?? undefined);

  return (
    <div className="border-b border-white/[0.06] bg-pitch-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2 md:gap-4 md:px-6">
        <Link
          href="/em-construcao"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Início StreamFutebol"
        >
          <SiteLogo variant="compact" />
        </Link>
        <div className="min-w-0 flex-1">
          <SportCategoryPills activeId={activeId} />
        </div>
      </div>
    </div>
  );
}
