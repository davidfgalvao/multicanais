"use client";

import type { SportCategory, SportCategoryId } from "@/types";

type Props = {
  categories: SportCategory[];
  selected: SportCategoryId;
  onSelect: (id: SportCategoryId) => void;
};

export function CategoryChips({ categories, selected, onSelect }: Props) {
  return (
    <div className="border-b border-white/[0.08] pb-2.5">
      <div className="flex gap-2 overflow-x-auto px-4 pb-1">
        {categories.map((item) => {
          const active = item.id === selected;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={[
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-opacity",
                active
                  ? "border border-accent bg-accent-muted text-accent"
                  : "bg-chip text-slate-400 hover:opacity-90",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
