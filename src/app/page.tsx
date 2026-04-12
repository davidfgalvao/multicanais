import Link from "next/link";

import { DayCalendarStrip } from "@/components/portal/DayCalendarStrip";
import { MatchStyleChannelCard } from "@/components/portal/MatchStyleChannelCard";
import { SiteLogo } from "@/components/SiteLogo";
import { getImportedChannels } from "@/data/channels";

export default function Page() {
  const channels = getImportedChannels();
  const preview = channels.slice(0, 18);
  const count = channels.length;

  return (
    <div className="relative pb-20 pt-8 md:pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-accent/5 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <div className="max-w-2xl">
          <Link
            href="/"
            className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <SiteLogo variant="hero" />
          </Link>
          <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Futebol e desporto
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Canais ao vivo na tua lista M3U
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Interface tipo portal de jogos: categorias, agenda visual e acesso
            rápido à reprodução. A lista vem do{" "}
            <a
              href="https://github.com/iptv-org/iptv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-bright underline-offset-2 hover:underline"
            >
              iptv-org
            </a>{" "}
            (Brasil) e de outras fontes públicas no build, ou do teu ficheiro com{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-slate-200">
              npm run import:channels
            </code>
            .
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-surface-card/40 p-4 backdrop-blur-sm md:p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-lg font-bold text-white">
              Agenda
            </h2>
            <p className="text-sm font-medium text-slate-500">
              {count > 0 ? (
                <>
                  <span className="tabular-nums text-accent-bright">{count}</span>{" "}
                  canais na lista
                </>
              ) : (
                "Sem canais importados — corre o import ou o fetch no build"
              )}
            </p>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            A faixa de dias é só navegação visual; horários de jogos não vêm no
            M3U.
          </p>
          <div className="mt-4">
            <DayCalendarStrip />
          </div>
        </div>

        {preview.length > 0 ? (
          <>
            <h2 className="mt-12 font-display text-xl font-bold text-white">
              Destaques na lista
            </h2>
            <ul className="mt-4 flex flex-col gap-4">
              {preview.map((ch) => (
                <li key={ch.id}>
                  <MatchStyleChannelCard channel={ch} />
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/canais"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent px-6 text-sm font-bold uppercase tracking-wide text-pitch-950 shadow-glow-sm transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Ver todos os canais
              </Link>
              <Link
                href="/guia"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/40 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Guia M3U / IPTV
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-12 rounded-2xl border border-white/10 bg-surface-card/50 p-8 text-center">
            <Link
              href="/"
              className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <SiteLogo variant="page" className="mx-auto" />
            </Link>
            <p className="mt-6 text-slate-400">
              Ainda não há canais. Coloca um{" "}
              <code className="font-mono text-accent-bright">.m3u</code> em{" "}
              <code className="font-mono text-xs text-slate-300">
                data/canais-abertos.m3u
              </code>{" "}
              e corre{" "}
              <code className="font-mono text-xs">npm run import:channels</code>
              , ou faz deploy com o fetch iptv-org no build.
            </p>
            <Link
              href="/guia"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center font-semibold text-accent-bright underline-offset-2 hover:underline"
            >
              Ver o guia
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
