import Link from "next/link";

import type { M3UChannel } from "@/types";

type Props = {
  channel: M3UChannel;
  /** Rótulo da faixa temporal (lista M3U não traz horário de jogos). */
  timeLabel?: string;
};

export function MatchStyleChannelCard({
  channel: ch,
  timeLabel = "Direto",
}: Props) {
  const assistirHref = `/assistir#${encodeURIComponent(ch.streamUrl)}`;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-surface-card/95 to-pitch-900/90 p-4 shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:border-accent/25 hover:shadow-glow-md motion-safe:hover:-translate-y-0.5">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-start gap-3 sm:shrink-0">
          <div className="flex min-w-[3.25rem] flex-col items-center rounded-xl bg-pitch-900/80 px-2 py-2 text-center ring-1 ring-white/10">
            <span className="font-display text-lg font-bold tabular-nums leading-none text-accent-bright">
              {timeLabel}
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
              lista
            </span>
          </div>
          {ch.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ch.logo}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-xl bg-black/30 object-contain ring-1 ring-white/10"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10"
              aria-hidden
            >
              <svg
                className="h-6 w-6 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500">
            {ch.group}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white sm:text-xl">
            {ch.name}
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Transmissão{" "}
            <span className="font-medium text-slate-300">{ch.group}</span>
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <Link
            href={assistirHref}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-pitch-950 shadow-glow-sm transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Assistir agora
          </Link>
          <a
            href={ch.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-xs font-semibold text-slate-500 underline-offset-2 hover:text-accent-bright hover:underline"
          >
            Abrir fonte
          </a>
        </div>
      </div>
    </article>
  );
}
