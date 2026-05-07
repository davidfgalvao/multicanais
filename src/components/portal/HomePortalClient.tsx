"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SiteLogo } from "@/components/SiteLogo";
import {
  NOSSO_PLAYER_CHANNELS,
  nossoPlayerTvUrl,
} from "@/data/nossoPlayerChannels";
import {
  CONTENT_CATEGORY_ORDER,
  normalizeContentCategoryId,
} from "@/lib/contentCategories";

function channelGroupsForTodos() {
  return CONTENT_CATEGORY_ORDER.filter((x) => x.id !== "todos").map(
    (cat) => ({
      id: cat.id,
      label: cat.label,
      channels: NOSSO_PLAYER_CHANNELS.filter((ch) => ch.category === cat.id),
    })
  );
}

export function HomePortalClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = normalizeContentCategoryId(searchParams.get("c"));
  const chParam = searchParams.get("ch");

  const filtered = useMemo(() => {
    if (categoryId === "todos") return NOSSO_PLAYER_CHANNELS;
    return NOSSO_PLAYER_CHANNELS.filter((ch) => ch.category === categoryId);
  }, [categoryId]);

  const selected = useMemo(() => {
    if (filtered.length === 0) return null;
    const byParam = chParam
      ? filtered.find((ch) => ch.slug === chParam)
      : undefined;
    return byParam ?? filtered[0];
  }, [filtered, chParam]);

  const setChannel = useCallback(
    (slug: string) => {
      const q = new URLSearchParams();
      if (categoryId !== "todos") q.set("c", categoryId);
      q.set("ch", slug);
      const qs = q.toString();
      router.push(qs ? `/?${qs}` : "/", { scroll: false });
    },
    [router, categoryId]
  );

  const iframeSrc = selected ? nossoPlayerTvUrl(selected.slug) : null;

  return (
    <div className="relative pb-16 pt-6 md:pt-8">
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
            Canais ao vivo
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Escolhe o canal e assiste aqui
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            O vídeo abre nesta página (embed do Nosso Player). O conteúdo e
            anúncios são do site parceiro.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {iframeSrc ? (
            <iframe
              key={selected!.slug}
              src={iframeSrc}
              title={selected ? `${selected.name} — player` : "Player"}
              className="aspect-video min-h-[40vh] w-full md:min-h-[50vh]"
              loading="lazy"
              referrerPolicy="no-referrer"
              allow="autoplay; fullscreen"
            />
          ) : (
            <div className="flex aspect-video min-h-[40vh] items-center justify-center bg-pitch-950/80 px-4 text-center text-slate-400">
              Nenhum canal nesta categoria.
            </div>
          )}
        </div>

        {selected ? (
          <p className="mt-3 text-center text-sm text-slate-500">
            Agora a reproduzir:{" "}
            <span className="font-semibold text-slate-300">{selected.name}</span>
          </p>
        ) : null}

        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-white">
            Canais
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Usa as categorias na barra acima para filtrar.
          </p>

          {categoryId === "todos" ? (
            <div className="mt-6 flex flex-col gap-10">
              {channelGroupsForTodos().map((group) => (
                <section key={group.id} aria-labelledby={`grp-${group.id}`}>
                  <h3
                    id={`grp-${group.id}`}
                    className="font-display text-sm font-bold uppercase tracking-[0.12em] text-accent-bright"
                  >
                    {group.label}
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {group.channels.map((ch) => (
                      <li key={ch.slug}>
                        <ChannelPickButton
                          name={ch.name}
                          active={selected?.slug === ch.slug}
                          onSelect={() => setChannel(ch.slug)}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((ch) => (
                <li key={ch.slug}>
                  <ChannelPickButton
                    name={ch.name}
                    active={selected?.slug === ch.slug}
                    onSelect={() => setChannel(ch.slug)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-white/10 pt-10">
          <Link
            href="/canais"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/40 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Lista M3U local
          </Link>
          <Link
            href="/guia"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/40 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Guia IPTV
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChannelPickButton({
  name,
  active,
  onSelect,
}: {
  name: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors duration-200 min-h-[48px]",
        active
          ? "border-accent bg-accent/15 text-white ring-1 ring-accent/40"
          : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-accent/30 hover:bg-white/[0.07]",
      ].join(" ")}
    >
      {name}
    </button>
  );
}
