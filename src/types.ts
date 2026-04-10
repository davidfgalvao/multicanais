export type SportCategoryId =
  | "todos"
  | "brasileirao"
  | "futebol_intl"
  | "libertadores"
  | "champions"
  | "nba"
  | "nfl"
  | "volei";

export interface SportCategory {
  id: SportCategoryId;
  label: string;
}

export interface BroadcastMatch {
  id: string;
  categoryIds: SportCategoryId[];
  league: string;
  startTime: string;
  homeTeam: string;
  awayTeam: string;
  broadcaster: string;
  /** URL oficial da transmissão (opcional). Configure no seu backend ou env. */
  streamUrl?: string;
}

/** Entrada típica após importar um .m3u (lista própria). */
export interface M3UChannel {
  id: string;
  name: string;
  group: string;
  logo?: string;
  streamUrl: string;
}
