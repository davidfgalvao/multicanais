import Link from "next/link";

import { MatchStyleChannelCard } from "@/components/portal/MatchStyleChannelCard";
import { SiteLogo } from "@/components/SiteLogo";
import { getImportedChannels, groupChannelsByCategory } from "@/data/channels";
import {
  filterChannelsBySportCategory,
  normalizeSportCategoryId,
  SPORT_CATEGORY_ORDER,
} from "@/lib/sportCategories";

export const metadata = {
  title: "Canais | Lista",
  description: "Canais importados do M3U com filtros por categoria",
};

type SearchParams = Promise<{ c?: string }>;

export default async function CanaisPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { c } = await searchParams;
  const categoryId = normalizeSportCategoryId(c);
  const categoryLabel =
    SPORT_CATEGORY_ORDER.find((x) => x.id === categoryId)?.label ?? "Todos";

  const channels = getImportedChannels();
  const grouped = groupChannelsByCategory(channels);

  if (channels.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <Link
          href="/"
          className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <SiteLogo variant="page" />
        </Link>
        <h1 className="mt-6 font-display text-2xl font-bold text-white">
          Lista de canais
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          1) Cola a tua lista M3U no ficheiro{" "}
          <code className="font-mono text-accent-bright">
            data/canais-abertos.m3u
          </code>
          .
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          2) Corre{" "}
          <code className="rounded bg-white/10 px-1 font-mono text-xs">
            npm run import:channels
          </code>{" "}
          ou faz deploy com fetch iptv-org.
        </p>
        <p className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link
            href="/guia"
            className="font-semibold text-accent-bright hover:underline"
          >
            Guia M3U
          </Link>
          <Link href="/" className="font-semibold text-accent-bright hover:underline">
            Início
          </Link>
        </p>
      </div>
    );
  }

  const filtered = filterChannelsBySportCategory(channels, categoryId);
  filtered.sort(
    (a, b) =>
      a.group.localeCompare(b.group, "pt-BR", { sensitivity: "base" }) ||
      a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-20 md:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Link
            href="/"
            className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <SiteLogo variant="page" />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
              Lista de canais
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              <span className="font-medium text-slate-400">
                {categoryLabel}
              </span>
              {" · "}
              <span className="tabular-nums text-accent-bright">
                {filtered.length}
              </span>
              {categoryId === "todos"
                ? ` de ${channels.length} entradas`
                : ` canais (filtrado)`}
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="text-sm font-semibold text-accent-bright hover:underline sm:self-start"
        >
          ← Início
        </Link>
      </div>

      <p className="mb-8 rounded-2xl border border-amber-500/25 bg-amber-500/[0.08] px-4 py-3 text-sm text-amber-100/95">
        <strong className="font-semibold text-amber-50">Dica:</strong> fluxos{" "}
        <code className="font-mono text-amber-200/90">.m3u8</code> podem demorar
        a arrancar — usa{" "}
        <strong className="text-amber-50">Assistir agora</strong> e espera. Se
        falhar por CORS, experimenta o{" "}
        <a
          href="https://m3u8-player.net/pt-BR/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-amber-200 underline"
        >
          M3U8 Player
        </a>
        .
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-surface-card/40 p-8 text-center">
          <p className="text-slate-400">
            Nenhum canal nesta categoria. Escolhe{" "}
            <Link href="/canais" className="font-semibold text-accent-bright hover:underline">
              Todos
            </Link>{" "}
            ou outra categoria na barra acima.
          </p>
        </div>
      ) : categoryId === "todos" ? (
        [...grouped.entries()].map(([group, list]) => (
          <section key={group} className="mb-12">
            <h2 className="mb-4 border-b border-white/[0.08] pb-2 font-display text-lg font-bold uppercase tracking-wide text-accent-bright">
              {group}
            </h2>
            <ul className="flex flex-col gap-4">
              {list.map((ch) => (
                <li key={ch.id}>
                  <MatchStyleChannelCard channel={ch} />
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <ul className="flex flex-col gap-4">
          {filtered.map((ch) => (
            <li key={ch.id}>
              <MatchStyleChannelCard channel={ch} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
