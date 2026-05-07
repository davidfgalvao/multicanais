import type { ContentCategoryId } from "@/lib/contentCategories";

/**
 * Canais do [Nosso Player](https://nossoplayeronlinehd.ink/) — slugs de
 * `data-channel`. Campo `category` filtra o portal da página inicial.
 */
export const NOSSO_PLAYER_ORIGIN = "https://nossoplayeronlinehd.ink";

export type NossoPlayerChannel = {
  name: string;
  slug: string;
  /** Categoria do filtro do site (exclui "todos"). */
  category: Exclude<ContentCategoryId, "todos">;
};

export function nossoPlayerTvUrl(slug: string): string {
  return `${NOSSO_PLAYER_ORIGIN}/tv/${encodeURIComponent(slug)}`;
}

export const NOSSO_PLAYER_CHANNELS: NossoPlayerChannel[] = [
  // —— Esporte ——
  { name: "Paramount", slug: "paramountplus", category: "esporte" },
  { name: "Amazon Prime Video", slug: "primevideo", category: "esporte" },
  { name: "Amazon Prime Video 2", slug: "primevideo2", category: "esporte" },
  { name: "Amazon Prime Video 3", slug: "primevideo3", category: "esporte" },
  { name: "Amazon Prime Video 4", slug: "primevideo4", category: "esporte" },
  { name: "Sportv", slug: "sportv", category: "esporte" },
  { name: "Sportv 2", slug: "sportv2", category: "esporte" },
  { name: "Sportv 3", slug: "sportv3", category: "esporte" },
  { name: "Espn", slug: "espn", category: "esporte" },
  { name: "Espn 2", slug: "espn2", category: "esporte" },
  { name: "Espn 3", slug: "espn3", category: "esporte" },
  { name: "Espn 4", slug: "espn4", category: "esporte" },
  { name: "Espn 5", slug: "espn5", category: "esporte" },
  { name: "Espn 6", slug: "espn6", category: "esporte" },
  { name: "Cazé TV 1", slug: "caze1", category: "esporte" },
  { name: "Cazé TV 2", slug: "caze2", category: "esporte" },
  { name: "Cazé TV 3", slug: "caze3", category: "esporte" },
  { name: "Cazé TV 4", slug: "caze4", category: "esporte" },
  { name: "Premiere Clubes", slug: "premiere", category: "esporte" },
  { name: "Premiere 2", slug: "premiere2", category: "esporte" },
  { name: "Premiere 3", slug: "premiere3", category: "esporte" },
  { name: "Premiere 4", slug: "premiere4", category: "esporte" },
  { name: "Premiere 5", slug: "premiere5", category: "esporte" },
  { name: "Premiere 6", slug: "premiere6", category: "esporte" },
  { name: "Premiere 7", slug: "premiere7", category: "esporte" },
  { name: "Premiere 8", slug: "premiere8", category: "esporte" },
  { name: "Nosso Futebol", slug: "nossofutebol", category: "esporte" },
  { name: "Goat", slug: "goat1", category: "esporte" },
  { name: "Goat 2", slug: "goat2", category: "esporte" },
  { name: "Goat 3", slug: "goat3", category: "esporte" },
  { name: "TNT", slug: "tnt", category: "esporte" },
  { name: "Space", slug: "space", category: "esporte" },
  { name: "Band Sports", slug: "bandsports", category: "esporte" },
  { name: "Combate", slug: "combate", category: "esporte" },
  { name: "UFC Fight Pass", slug: "ufcfightpass", category: "esporte" },
  { name: "SportTV Portugal 1", slug: "pt_sportv1", category: "esporte" },
  { name: "SportTV Portugal 2", slug: "pt_sportv2", category: "esporte" },
  { name: "SportTV Portugal 3", slug: "pt_sportv3", category: "esporte" },
  { name: "SportTV Portugal 4", slug: "pt_sportv4", category: "esporte" },
  { name: "SportTV Portugal 5", slug: "pt_sportv5", category: "esporte" },
  { name: "Eleven Portugal 1", slug: "pt_eleven1", category: "esporte" },
  { name: "Eleven Portugal 2", slug: "pt_eleven2", category: "esporte" },
  { name: "Eleven Portugal 3", slug: "pt_eleven3", category: "esporte" },
  { name: "Eleven Portugal 4", slug: "pt_eleven4", category: "esporte" },
  // —— Filmes (streaming + Telecine) ——
  { name: "Max - 1", slug: "max1", category: "filmes" },
  { name: "Max - 2", slug: "max2", category: "filmes" },
  { name: "Max - 3", slug: "max3", category: "filmes" },
  { name: "Max - 4", slug: "max4", category: "filmes" },
  { name: "Max - 5", slug: "max5", category: "filmes" },
  { name: "Max - 6", slug: "max6", category: "filmes" },
  { name: "Disney Plus 1", slug: "disneyplus1", category: "filmes" },
  { name: "Disney Plus 2", slug: "disneyplus2", category: "filmes" },
  { name: "Disney Plus 3", slug: "disneyplus3", category: "filmes" },
  { name: "Disney Plus 4", slug: "disneyplus4", category: "filmes" },
  { name: "Disney Plus 5", slug: "disneyplus5", category: "filmes" },
  { name: "Disney Plus 6", slug: "disneyplus6", category: "filmes" },
  { name: "Telecine Premium", slug: "telecinepremium", category: "filmes" },
  { name: "Telecine Action", slug: "telecineaction", category: "filmes" },
  { name: "Telecine Pipoca", slug: "telecinepipoca", category: "filmes" },
  { name: "Telecine Touch", slug: "telecinetouch", category: "filmes" },
  { name: "Telecine Fun", slug: "telecinefun", category: "filmes" },
  { name: "Telecine Cult", slug: "telecinecult", category: "filmes" },
  // —— Infantil ——
  { name: "Cartoon Network", slug: "cartoonnetwork", category: "infantil" },
  { name: "Discovery Kids", slug: "discoverykids", category: "infantil" },
  { name: "Nickelodeon", slug: "nickelodeon", category: "infantil" },
  // —— Notícias / abertos ——
  { name: "Globo RJ", slug: "globorj", category: "noticias" },
  { name: "Globo SP", slug: "globosp", category: "noticias" },
  { name: "Globo RS", slug: "globors", category: "noticias" },
  { name: "Globo MG", slug: "globomg", category: "noticias" },
  { name: "SBT", slug: "sbt", category: "noticias" },
  { name: "Band", slug: "band", category: "noticias" },
  { name: "Record", slug: "record", category: "noticias" },
  { name: "Rede TV", slug: "redetv", category: "noticias" },
  { name: "TV Cultura", slug: "cultura", category: "noticias" },
  // —— Variedades ——
  { name: "AXN", slug: "axn", category: "variedades" },
  { name: "Comedy Central", slug: "comedycentral", category: "variedades" },
  {
    name: "Discovery Channel",
    slug: "discovery_channel_hd",
    category: "variedades",
  },
  { name: "Discovery Turbo", slug: "discoveryturbo", category: "variedades" },
  { name: "HBO", slug: "hbo", category: "variedades" },
  { name: "HBO 2", slug: "hbo2", category: "variedades" },
  { name: "HBO Family", slug: "hbofamily", category: "variedades" },
  { name: "HBO Plus", slug: "hboplus", category: "variedades" },
  { name: "HBO Xtreme", slug: "hboxtreme", category: "variedades" },
  { name: "HGTV", slug: "hgtv", category: "variedades" },
  { name: "History", slug: "history", category: "variedades" },
  { name: "History 2", slug: "history2", category: "variedades" },
  { name: "Megapix", slug: "megapix", category: "variedades" },
  { name: "Multishow", slug: "multishow", category: "variedades" },
  { name: "TLC", slug: "tlc", category: "variedades" },
  { name: "TNT Novelas", slug: "tntnovelas", category: "variedades" },
  { name: "TNT Series", slug: "tntseries", category: "variedades" },
  { name: "VIVA", slug: "viva", category: "variedades" },
];
