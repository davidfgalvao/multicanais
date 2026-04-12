import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { M3UChannel } from "../src/types";
import { keepChannelBrazilFlagsOnly } from "../src/lib/filterChannelsForeignFlags";
import { parseM3U } from "../src/lib/parseM3U";

/**
 * 1) iptv-org (predefinido: BR). IPTV_PLAYLIST_URL substitui.
 * 2) Listas do repositório iprtl/m3u (ramo live). SKIP_IPRTL_M3U=1 desativa.
 * @see https://github.com/iptv-org/iptv
 * @see https://github.com/iprtl/m3u
 */
const DEFAULT_PRIMARY =
  "https://iptv-org.github.io/iptv/countries/br.m3u";

const IPRTL_REF = process.env.IPRTL_M3U_REF?.trim() || "live";
const IPRTL_RAW = `https://raw.githubusercontent.com/iprtl/m3u/${IPRTL_REF}`;

/** Ficheiros .m3u / .m3u8 com streams no projeto iprtl/m3u (sem pastas só scripts). */
const IPRTL_PLAYLIST_PATHS = [
  "Freetv.m3u",
  "Pluto.m3u",
  "Streams/CNNPT.m3u",
  "Streams/NXPLAY.m3u",
  "Streams/TVI.m3u",
  "Streams/TVIINT.m3u",
  "Streams/goltv.m3u8",
  "Streams/sicnoticias.m3u8",
  "Streams/sk1.m3u8",
  "Streams/sk1SL.m3u8",
  "Streams/sk2.m3u8",
  "Streams/sk2SL.m3u8",
  "Streams/sk3.m3u8",
  "Streams/sk3SL.m3u8",
  "Streams/superdigitalDE.m3u8",
  "Streams/ziggo4.m3u8",
] as const;

function normalizeStreamUrl(url: string): string {
  return url.trim().toLowerCase();
}

function sourceLabelFromPath(path: string): string {
  const base = path.split("/").pop() ?? path;
  return base.replace(/\.m3u8?$/i, "");
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

async function fetchText(url: string, label: string): Promise<string> {
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

  const primaryText = await fetchText(primaryUrl, "iptv-org (primária)");
  const primaryChannels = parseM3U(primaryText);
  console.log(`  → ${primaryChannels.length} canais (primária)`);

  const parts: M3UChannel[][] = [primaryChannels];

  const skipIprtl =
    process.env.SKIP_IPRTL_M3U === "1" ||
    process.env.IPRTL_M3U === "0";

  if (!skipIprtl) {
    for (const path of IPRTL_PLAYLIST_PATHS) {
      const url = `${IPRTL_RAW}/${path}`;
      const text = await fetchText(url, `iprtl/${path}`);
      const parsed = parseM3U(text, {
        sourceLabel: sourceLabelFromPath(path),
      });
      console.log(`  → ${parsed.length} canais (${path})`);
      parts.push(parsed);
    }
  }

  let merged = mergeChannels(parts);
  const skipFlagFilter = process.env.KEEP_FOREIGN_FLAG_CHANNELS === "1";
  if (!skipFlagFilter) {
    const before = merged.length;
    merged = merged.filter(keepChannelBrazilFlagsOnly);
    console.log(
      `  → removidos ${before - merged.length} canais (bandeira ≠ 🇧🇷 ou palavra-chave de outro país no grupo/nome)`
    );
  }

  const withIds = merged.map((ch, i) => ({
    ...ch,
    id: `ch-${i + 1}`,
  }));

  const outPath = resolve(process.cwd(), "src/data/channels.generated.json");
  writeFileSync(outPath, JSON.stringify(withIds, null, 2), "utf8");
  console.log(
    `Total ${withIds.length} canais → ${outPath}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
