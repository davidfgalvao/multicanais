"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { SiteLogo } from "@/components/SiteLogo";
import { normalizeContentCategoryId } from "@/lib/contentCategories";

import { ContentCategoryPills } from "./ContentCategoryPills";

const PATHS_WITH_SUBNAV = new Set(["/"]);

export function PortalSubNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!PATHS_WITH_SUBNAV.has(pathname)) return null;

  const activeId = normalizeContentCategoryId(searchParams.get("c"));

  return (
    <div className="border-b border-white/[0.06] bg-pitch-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2 md:gap-4 md:px-6">
        <Link
          href="/"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Início"
        >
          <SiteLogo variant="compact" />
        </Link>
        <div className="min-w-0 flex-1">
          <ContentCategoryPills activeId={activeId} />
        </div>
      </div>
    </div>
  );
}
