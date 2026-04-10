import type { M3UChannel } from "@/types";
import generated from "./channels.generated.json";

function isM3UChannelList(data: unknown): data is M3UChannel[] {
  if (!Array.isArray(data)) return false;
  return data.every(
    (x) =>
      x &&
      typeof x === "object" &&
      typeof (x as M3UChannel).id === "string" &&
      typeof (x as M3UChannel).name === "string" &&
      typeof (x as M3UChannel).group === "string" &&
      typeof (x as M3UChannel).streamUrl === "string"
  );
}

/** Canais gerados por `npm run import:channels -- ./sua-lista.m3u` */
export function getImportedChannels(): M3UChannel[] {
  if (isM3UChannelList(generated)) return generated;
  return [];
}

export function groupChannelsByCategory(
  channels: M3UChannel[]
): Map<string, M3UChannel[]> {
  const map = new Map<string, M3UChannel[]>();
  for (const ch of channels) {
    const g = ch.group || "Sem grupo";
    const list = map.get(g) ?? [];
    list.push(ch);
    map.set(g, list);
  }
  const keys = [...map.keys()].sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })
  );
  const ordered = new Map<string, M3UChannel[]>();
  for (const k of keys) {
    const list = map.get(k) ?? [];
    list.sort((a, b) =>
      a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
    );
    ordered.set(k, list);
  }
  return ordered;
}
