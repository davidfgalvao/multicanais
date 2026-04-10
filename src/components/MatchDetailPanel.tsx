"use client";

import { useEffect } from "react";
import type { BroadcastMatch } from "@/types";

type Props = {
  match: BroadcastMatch;
  onClose: () => void;
};

export function MatchDetailPanel({ match, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar"
      />
      <div className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-white/[0.08] bg-surface p-6 shadow-2xl sm:rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          className="mb-4 text-base font-semibold text-accent hover:underline"
        >
          ‹ Voltar
        </button>
        <p className="text-[15px] font-semibold text-slate-400">{match.league}</p>
        <p
          id="detail-title"
          className="mb-6 text-[28px] font-extrabold tabular-nums text-accent"
        >
          {match.startTime}
        </p>
        <div className="mb-6 space-y-2">
          <p className="text-[26px] font-extrabold text-slate-100">
            {match.homeTeam}
          </p>
          <p className="text-sm font-bold tracking-widest text-slate-500">VS</p>
          <p className="text-[26px] font-extrabold text-slate-100">
            {match.awayTeam}
          </p>
        </div>
        <div className="mb-6 rounded-xl border border-white/[0.08] bg-surface-card p-4">
          <p className="mb-1 text-xs text-slate-500">Canal / plataforma</p>
          <p className="text-lg font-bold text-slate-100">{match.broadcaster}</p>
        </div>
        {match.streamUrl ? (
          <a
            href={match.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-accent py-4 text-center text-[17px] font-extrabold text-teal-950 transition-opacity hover:opacity-95"
          >
            Abrir transmissão
          </a>
        ) : (
          <p className="text-sm leading-relaxed text-slate-500">
            Nenhum link para este jogo. Adicione o id em{" "}
            <code className="rounded bg-surface-card px-1 font-mono text-accent">
              src/config/userStreams.ts
            </code>
            , use{" "}
            <code className="rounded bg-surface-card px-1 font-mono text-accent">
              NEXT_PUBLIC_STREAMS_JSON
            </code>{" "}
            na Vercel ou campo{" "}
            <code className="rounded bg-surface-card px-1 font-mono text-accent">
              streamUrl
            </code>{" "}
            em{" "}
            <code className="rounded bg-surface-card px-1 font-mono text-accent">
              src/data/matches.ts
            </code>{" "}
            (apenas URLs que você tem direito de usar).
          </p>
        )}
      </div>
    </div>
  );
}
