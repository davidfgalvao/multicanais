import type { NossoPlayerChannelEntry } from "@/data/nossoPlayerChannels";
import { nossoPlayerTvUrl } from "@/data/nossoPlayerChannels";

type Props = {
  channel: NossoPlayerChannelEntry;
  categoryLabel: string;
};

export function NossoPlayerChannelCard({ channel, categoryLabel }: Props) {
  const href = nossoPlayerTvUrl(channel.slug);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-surface-card/95 to-pitch-900/90 p-4 shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:border-accent/25 hover:shadow-glow-md motion-safe:hover:-translate-y-0.5">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex min-w-0 flex-1">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-slate-500">
              {categoryLabel}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white sm:text-xl">
              {channel.name}
            </h3>
            <p className="mt-1 truncate font-mono text-xs text-slate-500">
              /tv/{channel.slug}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-pitch-950 shadow-glow-sm transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Assistir no parceiro
          </a>
        </div>
      </div>
    </article>
  );
}
