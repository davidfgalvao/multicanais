"use client";

import { useMemo, useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { MatchCard } from "@/components/MatchCard";
import { MatchDetailPanel } from "@/components/MatchDetailPanel";
import { CATEGORIES } from "@/data/categories";
import { getMatchesWithStreams } from "@/data/resolveMatches";
import type { BroadcastMatch, SportCategoryId } from "@/types";

function filterByCategory(
  matches: BroadcastMatch[],
  cat: SportCategoryId
): BroadcastMatch[] {
  if (cat === "todos") return matches;
  return matches.filter((m) => m.categoryIds.includes(cat));
}

export function HomeView() {
  const [category, setCategory] = useState<SportCategoryId>("todos");
  const [selected, setSelected] = useState<BroadcastMatch | null>(null);

  const matches = useMemo(() => getMatchesWithStreams(), []);
  const list = useMemo(
    () => filterByCategory(matches, category),
    [matches, category]
  );

  return (
    <div className="min-h-dvh bg-surface pb-12">
      <header className="px-4 pb-4 pt-6 md:mx-auto md:max-w-3xl md:px-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
          Multicanais
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Esporte ao vivo — por categoria
        </p>
      </header>

      <CategoryChips
        categories={CATEGORIES}
        selected={category}
        onSelect={setCategory}
      />

      <p className="px-4 py-2 text-[13px] text-slate-500 md:mx-auto md:max-w-3xl">
        {list.length} {list.length === 1 ? "jogo" : "jogos"} disponíveis
      </p>

      <main className="mx-auto flex max-w-3xl flex-col">
        {list.length === 0 ? (
          <p className="px-6 pt-10 text-center text-[15px] leading-relaxed text-slate-500">
            Nenhum jogo nesta categoria. Ajuste{" "}
            <code className="font-mono text-accent">src/data/matches.ts</code>,
            URLs em{" "}
            <code className="font-mono text-accent">
              src/config/userStreams.ts
            </code>{" "}
            ou{" "}
            <code className="font-mono text-accent">
              NEXT_PUBLIC_STREAMS_JSON
            </code>{" "}
            na Vercel.
          </p>
        ) : (
          list.map((item) => (
            <MatchCard
              key={item.id}
              match={item}
              onPress={() => setSelected(item)}
            />
          ))
        )}
      </main>

      {selected ? (
        <MatchDetailPanel match={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
