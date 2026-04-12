import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseM3U } from "../src/lib/parseM3U";

/**
 * Playlist predefinida: iptv-org — apenas canais BR (ficheiro pequeno, bom para Vercel).
 * Lista completa: IPTV_PLAYLIST_URL=https://iptv-org.github.io/iptv/index.m3u
 * @see https://github.com/iptv-org/iptv
 */
const DEFAULT_PLAYLIST =
  "https://iptv-org.github.io/iptv/countries/br.m3u";

async function main() {
  if (process.env.SKIP_IPTV_FETCH === "1") {
    console.log(
      "SKIP_IPTV_FETCH=1 — não altera src/data/channels.generated.json"
    );
    return;
  }

  const url = process.env.IPTV_PLAYLIST_URL?.trim() || DEFAULT_PLAYLIST;
  console.log("A obter playlist iptv-org:", url);

  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "multicanais-esporte/1.0 (iptv-org fetch)" },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ao obter ${url}`);
  }

  const text = await res.text();
  const channels = parseM3U(text);

  const withIds = channels.map((ch, i) => ({
    ...ch,
    id: `ch-${i + 1}`,
  }));

  const outPath = resolve(process.cwd(), "src/data/channels.generated.json");
  writeFileSync(outPath, JSON.stringify(withIds, null, 2), "utf8");
  console.log(`Gerados ${withIds.length} canais → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
