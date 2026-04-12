"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  type SportCategoryId,
  SPORT_CATEGORY_ORDER,
} from "@/lib/sportCategories";

type Props = {
  activeId: SportCategoryId;
};

export function SportCategoryPills({ activeId }: Props) {
  const pathname = usePathname();

  return (
    <div
      className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 pt-1 [-webkit-overflow-scrolling:touch]"
      role="navigation"
      aria-label="Categorias desportivas"
    >
      {SPORT_CATEGORY_ORDER.map(({ id, label }) => {
        const href = id === "todos" ? "/canais" : `/canais?c=${id}`;
        const active = activeId === id;
        return (
          <Link
            key={id}
            href={href}
            scroll={pathname !== "/canais"}
            className={[
              "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 min-h-[44px] inline-flex items-center justify-center",
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
