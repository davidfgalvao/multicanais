import type { M3UChannel } from "@/types";

const LOGOS_JSON = "https://iptv-org.github.io/api/logos.json";
const CHANNELS_JSON = "https://iptv-org.github.io/api/channels.json";

type LogoRow = { channel: string; url: string; width?: number };
type ChannelRow = {
  id: string;
  name: string;
  alt_names?: string[];
  country: string;
};

/** `Canal.br@SD` → `Canal.br` (chave em logos.json). */
export function iptvOrgChannelKeyFromTvgId(tvgId: string): string {
  const t = tvgId.trim();
  const at = t.indexOf("@");
  return at === -1 ? t : t.slice(0, at);
}

/** Normaliza nome do M3U para cruzar com iptv-org (sem acentos, resoluções, etc.). */
export function normalizeChannelNameForMatch(name: string): string {
  let s = name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
  s = s.replace(/[★☆✦✧♦●○]/g, " ");
  s = s.replace(/\[[^\]]*\]/g, " ");
  s = s.replace(/\([^)]*\)/g, " ");
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

export async function buildIptvOrgLogoMap(): Promise<Map<string, string>> {
  const res = await fetch(LOGOS_JSON, {
    headers: { "User-Agent": "multicanais-esporte/1.0 (logo enrich)" },
  });
  if (!res.ok) throw new Error(`logos.json: HTTP ${res.status}`);
  const rows = (await res.json()) as LogoRow[];
  const best = new Map<string, { url: string; w: number }>();
  for (const row of rows) {
    const w = row.width ?? 0;
    const prev = best.get(row.channel);
    if (!prev || w > prev.w) best.set(row.channel, { url: row.url, w });
  }
  const out = new Map<string, string>();
  for (const [k, v] of best) out.set(k, v.url);
  return out;
}

async function loadChannelsRows(): Promise<ChannelRow[]> {
  const res = await fetch(CHANNELS_JSON, {
    headers: { "User-Agent": "multicanais-esporte/1.0 (logo enrich)" },
  });
  if (!res.ok) throw new Error(`channels.json: HTTP ${res.status}`);
  return (await res.json()) as ChannelRow[];
}

function buildNameLookupMaps(rows: ChannelRow[]): {
  brNameToId: Map<string, string>;
  uniqueNameToId: Map<string, string>;
} {
  const brNameToId = new Map<string, string>();
  for (const c of rows) {
    if (c.country !== "BR") continue;
    const keys = [c.name, ...(c.alt_names || [])].map(
      normalizeChannelNameForMatch
    );
    for (const k of keys) {
      if (k.length < 2) continue;
      if (!brNameToId.has(k)) brNameToId.set(k, c.id);
    }
  }

  const nameCount = new Map<string, number>();
  for (const c of rows) {
    const k = normalizeChannelNameForMatch(c.name);
    if (k.length < 2) continue;
    nameCount.set(k, (nameCount.get(k) ?? 0) + 1);
  }
  const uniqueNameToId = new Map<string, string>();
  for (const c of rows) {
    const k = normalizeChannelNameForMatch(c.name);
    if ((nameCount.get(k) ?? 0) === 1) uniqueNameToId.set(k, c.id);
  }

  return { brNameToId, uniqueNameToId };
}

export type EnrichLogosOptions = {
  /** Não descarregar logos.json / channels.json */
  skip?: boolean;
};

/**
 * Preenche `logo` com URL do iptv-org quando falta: por `tvgId`, nome BR, ou
 * nome globalmente único na base iptv-org.
 */
export async function enrichChannelsWithIptvOrgLogos(
  channels: M3UChannel[],
  options?: EnrichLogosOptions
): Promise<M3UChannel[]> {
  if (options?.skip) return channels;

  const missing = channels.filter((c) => !c.logo?.trim());
  if (missing.length === 0) return channels;

  const [logoMap, rows] = await Promise.all([
    buildIptvOrgLogoMap(),
    loadChannelsRows(),
  ]);
  const { brNameToId, uniqueNameToId } = buildNameLookupMaps(rows);

  let filled = 0;
  const out = channels.map((ch) => {
    if (ch.logo?.trim()) return ch;

    let channelId: string | undefined;
    if (ch.tvgId?.trim()) {
      channelId = iptvOrgChannelKeyFromTvgId(ch.tvgId);
    }
    let url = channelId ? logoMap.get(channelId) : undefined;
    if (!url) {
      const nk = normalizeChannelNameForMatch(ch.name);
      channelId = brNameToId.get(nk) ?? uniqueNameToId.get(nk);
      url = channelId ? logoMap.get(channelId) : undefined;
    }
    if (!url) return ch;
    filled += 1;
    return { ...ch, logo: url };
  });

  console.log(
    `  → logos iptv-org: ${filled} preenchidos (faltavam ${missing.length})`
  );
  return out;
}
