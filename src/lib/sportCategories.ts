import type { M3UChannel } from "@/types";

import { foldDiacritics } from "./filterChannelsForeignFlags";

export type SportCategoryId =
  | "todos"
  | "brasileirao"
  | "futebol-intl"
  | "libertadores"
  | "champions"
  | "nba"
  | "nfl"
  | "volei";

function foldBoth(group: string, name: string): string {
  return foldDiacritics(`${group} ${name}`)
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function isBrasileirao(g: string, n: string): boolean {
  const t = foldBoth(g, n);
  return (
    /\bbrasileir/.test(t) ||
    /\bserie\s*a\b.*\bbrasil/.test(t) ||
    /\bpaulista\b/.test(t) ||
    /\bmineiro\b/.test(t) ||
    /\bcarioca\b/.test(t) ||
    /\bgaucho\b/.test(t) ||
    /\bparanaense\b/.test(t) ||
    /\bcopa\s*do\s*brasil\b/.test(t) ||
    /\bpremiere\b/.test(t) ||
    /\bpremiere\s*\d+\b/.test(t) ||
    /\bcombate\b/.test(t) ||
    (/\bsportv\b/.test(t) && /\bbrasil\b/.test(t))
  );
}

function isLibertadores(g: string, n: string): boolean {
  const t = foldBoth(g, n);
  return /\blibertadores\b/.test(t) || /\bespn\b/.test(t);
}

function isChampions(g: string, n: string): boolean {
  const t = foldBoth(g, n);
  return (
    /\bchampions\b/.test(t) ||
    /\buefa\b/.test(t) ||
    /\bsbt\b/.test(t) ||
    /\btnt\b/.test(t) ||
    /\bhbo\s*max\b/.test(t) ||
    /\bmax\b/.test(t)
  );
}

const tests: Record<
  Exclude<SportCategoryId, "todos">,
  (g: string, n: string) => boolean
> = {
  brasileirao: isBrasileirao,
  "futebol-intl": (g, n) => {
    const t = foldBoth(g, n);
    if (isBrasileirao(g, n)) return false;
    if (isLibertadores(g, n)) return false;
    if (isChampions(g, n)) return false;
    return (
      /\blaliga\b/.test(t) ||
      /\bespanhol\b/.test(t) ||
      /\bitaliano\b/.test(t) ||
      /\bingles\b/.test(t) ||
      /\balemao\b/.test(t) ||
      /\bfrances\b/.test(t) ||
      /\bchampionship\b/.test(t) ||
      /\bundesliga\b/.test(t) ||
      /\bmls\b/.test(t) ||
      /\beuro\b/.test(t) ||
      /\beliminat[oó]rias\b/.test(t) ||
      (/\bespn\b/.test(t) && !/\bbrasil\b/.test(t))
    );
  },
  libertadores: isLibertadores,
  champions: isChampions,
  nba: (g, n) => /\bnba\b/.test(foldBoth(g, n)),
  nfl: (g, n) => /\bnfl\b/.test(foldBoth(g, n)),
  volei: (g, n) => {
    const t = foldBoth(g, n);
    return /\bvolei\b/.test(t) || /\bvolley\b/.test(t);
  },
};

export const SPORT_CATEGORY_ORDER: {
  id: SportCategoryId;
  label: string;
}[] = [
  { id: "todos", label: "Todos" },
  { id: "brasileirao", label: "Brasileirão" },
  { id: "futebol-intl", label: "Futebol internacional" },
  { id: "libertadores", label: "Libertadores" },
  { id: "champions", label: "Champions" },
  { id: "nba", label: "NBA" },
  { id: "nfl", label: "NFL" },
  { id: "volei", label: "Vôlei" },
];

export function normalizeSportCategoryId(
  raw: string | undefined
): SportCategoryId {
  if (!raw || raw === "todos") return "todos";
  const allowed = new Set(SPORT_CATEGORY_ORDER.map((x) => x.id));
  return allowed.has(raw as SportCategoryId)
    ? (raw as SportCategoryId)
    : "todos";
}

export function filterChannelsBySportCategory(
  channels: M3UChannel[],
  categoryId: SportCategoryId
): M3UChannel[] {
  if (categoryId === "todos") return channels;
  const fn = tests[categoryId];
  return channels.filter((ch) => fn(ch.group, ch.name));
}
