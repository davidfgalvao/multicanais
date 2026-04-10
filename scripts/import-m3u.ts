import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseM3U } from "../src/lib/parseM3U";

const arg = process.argv[2] ?? process.env.PLAYLIST_M3U;
if (!arg) {
  console.error(
    "Uso: npm run import:channels -- /caminho/para/lista.m3u\n" +
      "   ou: PLAYLIST_M3U=./lista.m3u npm run import:channels"
  );
  process.exit(1);
}

const abs = resolve(process.cwd(), arg);
const raw = readFileSync(abs, "utf8");
const channels = parseM3U(raw);

const withIds = channels.map((ch, i) => ({
  ...ch,
  id: `ch-${i + 1}`,
}));

const outPath = resolve(process.cwd(), "src/data/channels.generated.json");
writeFileSync(outPath, JSON.stringify(withIds, null, 2), "utf8");
console.log(`Importados ${withIds.length} canais → ${outPath}`);
