"use client";

import type { BroadcastMatch } from "@/types";

type Props = {
  match: BroadcastMatch;
  onPress: () => void;
};

export function MatchCard({ match, onPress }: Props) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="mx-4 mb-4 block w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-white/[0.08] bg-gradient-to-br from-surface-card to-surface-elevated p-4 text-left transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex-1 text-[13px] font-semibold text-slate-400">
          {match.league}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {match.streamUrl ? (
            <span className="rounded-md border border-accent bg-accent-muted px-2 py-0.5 text-[11px] font-extrabold text-accent">
              Link
            </span>
          ) : null}
          <span className="text-[15px] font-bold tabular-nums text-accent">
            {match.startTime}
          </span>
        </div>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="min-w-0 flex-1 truncate text-[17px] font-bold text-slate-100">
          {match.homeTeam}
        </span>
        <span className="shrink-0 text-xs font-extrabold tracking-wide text-slate-500">
          VS
        </span>
        <span className="min-w-0 flex-1 truncate text-right text-[17px] font-bold text-slate-100">
          {match.awayTeam}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-500">Transmissão</span>
        <span className="font-semibold text-slate-100">{match.broadcaster}</span>
      </div>
      <div className="mt-4 inline-block rounded-lg bg-accent-muted px-4 py-1.5">
        <span className="text-[13px] font-bold text-accent">Ver detalhes</span>
      </div>
    </button>
  );
}
