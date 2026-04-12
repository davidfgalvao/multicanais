import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { M3UChannel } from "../src/types";
import { parseM3U } from "../src/lib/parseM3U";

/**
 * 1) Playlist primária (predefinido: iptv-org BR). IPTV_PLAYLIST_URL substitui.
 * 2) Categoria Sports do iptv-org (mundial). SPORTS_PLAYLIST_URL ou SKIP_SPORTS_PLAYLIST.
 * @see https://github.com/iptv-org/iptv/blob/master/PLAYLISTS.md
 */
const DEFAULT_PRIMARY =
  "https://iptv-org.github.io/iptv/countries/br.m3u";

const DEFAULT_SPORTS =
  "https://iptv-org.github.io/iptv/categories/sports.m3u";

function normalizeStreamUrl(url: string): string {
  return url.trim().toLowerCase();
}

function mergeChannels(lists: M3UChannel[][]): M3UChannel[] {
  const seen = new Set<string>();
  const out: M3UChannel[] = [];
  for (const list of lists) {
    for (const ch of list) {
      const key = normalizeStreamUrl(ch.streamUrl);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(ch);
    }
  }
  return out;
}

async function fetchPlaylist(url: string, label: string): Promise<string> {
  console.log(`A obter (${label}):`, url);
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "multicanais-esporte/1.0 (playlist fetch)" },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ao obter ${label}: ${url}`);
  }
  return res.text();
}

async function main() {
  if (process.env.SKIP_IPTV_FETCH === "1") {
    console.log(
      "SKIP_IPTV_FETCH=1 — não altera src/data/channels.generated.json"
    );
    return;
  }

  const primaryUrl =
    process.env.IPTV_PLAYLIST_URL?.trim() || DEFAULT_PRIMARY;

  const sportsRaw = process.env.SPORTS_PLAYLIST_URL;
  const skipSports =
    process.env.SKIP_SPORTS_PLAYLIST === "1" || sportsRaw === "0";
  const sportsUrl = skipSports
    ? null
    : (sportsRaw?.trim() || DEFAULT_SPORTS);

  const primaryText = await fetchPlaylist(primaryUrl, "primária");
  const primaryChannels = parseM3U(primaryText);
  console.log(`  → ${primaryChannels.length} canais (primária)`);

  const parts: M3UChannel[][] = [primaryChannels];

  if (sportsUrl) {
    const sportsText = await fetchPlaylist(sportsUrl, "desporto");
    const sportsChannels = parseM3U(sportsText);
    console.log(`  → ${sportsChannels.length} canais (desporto)`);
    parts.push(sportsChannels);
  }

  const merged = mergeChannels(parts);
  const withIds = merged.map((ch, i) => ({
    ...ch,
    id: `ch-${i + 1}`,
  }));

  const outPath = resolve(process.cwd(), "src/data/channels.generated.json");
  writeFileSync(outPath, JSON.stringify(withIds, null, 2), "utf8");
  console.log(
    `Total ${withIds.length} canais (após dedupe por URL) → ${outPath}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
