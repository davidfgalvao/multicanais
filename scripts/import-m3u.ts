import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseM3U } from "../src/lib/parseM3U";

const arg = process.argv[2];
const envPath = process.env.PLAYLIST_M3U;

const defaultFile = resolve(process.cwd(), "data/canais-abertos.m3u");

let raw: string;
if (arg === "-" || arg === "--stdin") {
  raw = readFileSync(0, "utf8");
} else if (arg) {
  const abs = resolve(process.cwd(), arg);
  raw = readFileSync(abs, "utf8");
} else if (envPath) {
  raw = readFileSync(resolve(process.cwd(), envPath), "utf8");
} else if (existsSync(defaultFile)) {
  raw = readFileSync(defaultFile, "utf8");
} else {
  console.error(
    "Uso:\n" +
      "  npm run import:channels -- ./lista.m3u\n" +
      "  npm run import:channels -- -        # lê da entrada padrão (ex.: pbpaste | …)\n" +
      "  PLAYLIST_M3U=./lista.m3u npm run import:channels\n" +
      "Sem argumentos: usa data/canais-abertos.m3u se existir."
  );
  process.exit(1);
}

const channels = parseM3U(raw);

const withIds = channels.map((ch, i) => ({
  ...ch,
  id: `ch-${i + 1}`,
}));

const outPath = resolve(process.cwd(), "src/data/channels.generated.json");
writeFileSync(outPath, JSON.stringify(withIds, null, 2), "utf8");
console.log(`Importados ${withIds.length} canais → ${outPath}`);
