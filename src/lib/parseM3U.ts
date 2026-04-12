import type { M3UChannel } from "@/types";

/**
 * Corrige variantes comuns em listas IPTV (ex.: logo termina com `"` e segue
 * logo `(Felps)",` sem `group-title=`).
 */
export function repairM3UDialect(content: string): string {
  let s = content;
  s = s.replace(
    /(\.(?:jpe?g|png|gif|webp)(?:\?[^"\s]*)?)"\(Felps\)",/gi,
    '$1" group-title="(Felps)",'
  );
  return s;
}

function parseQuotedAttributes(segment: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([\w-]+)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(segment)) !== null) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

function parseExtInfLine(line: string): {
  attrs: Record<string, string>;
  title?: string;
} {
  const commaIdx = line.lastIndexOf(",");
  let meta = line;
  let title: string | undefined;
  if (commaIdx !== -1) {
    meta = line.slice(0, commaIdx);
    title = line.slice(commaIdx + 1).trim();
  }
  const rest = meta.replace(/^#EXTINF:[^\s]*\s*/, "").trim();
  return { attrs: parseQuotedAttributes(rest), title };
}

function isStreamLine(line: string): boolean {
  return /^https?:\/\//i.test(line) && !line.startsWith("#");
}

/** Converte texto .m3u / .m3u8 em canais. Use apenas listas que tenhas direito de usar. */
export function parseM3U(content: string): M3UChannel[] {
  const lines = repairM3UDialect(content)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const out: M3UChannel[] = [];
  let i = 0;
  if (lines[0] === "#EXTM3U") i = 1;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("#EXTINF")) {
      const { attrs, title } = parseExtInfLine(line);
      const name = title || attrs["tvg-name"]?.trim() || "Canal";
      const group = attrs["group-title"]?.trim() || "Sem grupo";
      const logo = attrs["tvg-logo"]?.trim() || undefined;
      i += 1;
      if (i < lines.length && isStreamLine(lines[i])) {
        const streamUrl = lines[i].trim();
        out.push({
          id: `ch-${out.length + 1}`,
          name,
          group,
          logo: logo || undefined,
          streamUrl,
        });
        i += 1;
        continue;
      }
    }
    i += 1;
  }

  return out;
}
