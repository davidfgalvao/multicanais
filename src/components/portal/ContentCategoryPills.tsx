"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  type ContentCategoryId,
  CONTENT_CATEGORY_ORDER,
} from "@/lib/contentCategories";

type Props = {
  activeId: ContentCategoryId;
};

export function ContentCategoryPills({ activeId }: Props) {
  const pathname = usePathname();

  return (
    <div
      className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 pt-1 [-webkit-overflow-scrolling:touch]"
      role="navigation"
      aria-label="Categorias de canais"
    >
      {CONTENT_CATEGORY_ORDER.map(({ id, label }) => {
        const href = id === "todos" ? "/" : `/?c=${id}`;
        const active = activeId === id;
        return (
          <Link
            key={id}
            href={href}
            scroll={pathname !== "/"}
            className={[
              "inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200",
              active
                ? "bg-accent text-pitch-950 shadow-glow-sm"
                : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-accent/40 hover:bg-white/[0.07] hover:text-white",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
