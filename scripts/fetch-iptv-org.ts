import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { M3UChannel } from "../src/types";
import { parseM3U } from "../src/lib/parseM3U";

/**
 * 1) iptv-org — playlist BR (predefinida; sobrescreve com IPTV_PLAYLIST_URL).
 * 2) Lista esporte — repositório leandrosilvabr/iptv.lista-esporte (iptvlista.m3u).
 * @see https://github.com/iptv-org/iptv
 * @see https://github.com/leandrosilvabr/iptv.lista-esporte
 */
const DEFAULT_PRIMARY =
  "https://iptv-org.github.io/iptv/countries/br.m3u";

const DEFAULT_EXTRA =
  "https://raw.githubusercontent.com/leandrosilvabr/iptv.lista-esporte/main/iptvlista.m3u";

function normalizeStreamUrl(url: string): string {
  return url.trim().toLowerCase();
}

/** Junta listas: mantém a ordem (primária primeiro), evita URLs repetidas. */
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

async function fetchText(
  url: string,
  label: string
): Promise<string> {
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

  const extraUrlRaw = process.env.EXTRA_PLAYLIST_URL;
  const extraUrl =
    extraUrlRaw === "" || extraUrlRaw === "0"
      ? null
      : (extraUrlRaw?.trim() || DEFAULT_EXTRA);

  const primaryText = await fetchText(primaryUrl, "primária");
  const primaryChannels = parseM3U(primaryText);
  console.log(`  → ${primaryChannels.length} canais (primária)`);

  const parts: M3UChannel[][] = [primaryChannels];

  if (extraUrl) {
    const extraText = await fetchText(extraUrl, "extra (esporte)");
    const extraChannels = parseM3U(extraText);
    console.log(`  → ${extraChannels.length} canais (extra)`);
    parts.push(extraChannels);
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
