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

type PremiereConfig = {
  id: string;
  label: string;
  envKey: string;
};

const PREMIERE_CHANNEL_CONFIG: PremiereConfig[] = [
  { id: "clubes", label: "Premiere Clubes", envKey: "PREMIERE_CLUBES_URL" },
  { id: "2", label: "Premiere 2", envKey: "PREMIERE_2_URL" },
  { id: "3", label: "Premiere 3", envKey: "PREMIERE_3_URL" },
  { id: "4", label: "Premiere 4", envKey: "PREMIERE_4_URL" },
  { id: "5", label: "Premiere 5", envKey: "PREMIERE_5_URL" },
  { id: "6", label: "Premiere 6", envKey: "PREMIERE_6_URL" },
  { id: "7", label: "Premiere 7", envKey: "PREMIERE_7_URL" },
  { id: "8", label: "Premiere 8", envKey: "PREMIERE_8_URL" },
];

function getManualPremiereChannels(): M3UChannel[] {
  const env = process.env;
  const logo =
    env.PREMIERE_LOGO_URL?.trim() || "https://i.imgur.com/xmmiHls.png";

  const channels: M3UChannel[] = [];
  for (const item of PREMIERE_CHANNEL_CONFIG) {
    const streamUrl = env[item.envKey]?.trim();
    if (!streamUrl) continue;
    channels.push({
      id: `manual-premiere-${item.id}`,
      name: item.label,
      group: "Esportes",
      logo,
      streamUrl,
      tvgId: item.label.toUpperCase(),
    });
  }

  return channels;
}

function mergeChannels(base: M3UChannel[], extra: M3UChannel[]): M3UChannel[] {
  if (extra.length === 0) return base;

  const seenByUrl = new Set(base.map((ch) => ch.streamUrl.trim().toLowerCase()));
  const merged = [...base];
  for (const ch of extra) {
    const urlKey = ch.streamUrl.trim().toLowerCase();
    if (seenByUrl.has(urlKey)) continue;
    merged.push(ch);
    seenByUrl.add(urlKey);
  }

  return merged;
}

export function getImportedChannels(): M3UChannel[] {
  const base = isM3UChannelList(generated) ? generated : [];
  const manualPremiere = getManualPremiereChannels();
  return mergeChannels(base, manualPremiere);
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
