/**
 * Canais e slugs do [Nosso Player Online HD](https://nossoplayeronlinehd.ink/)
 * extraídos dos atributos `data-channel` da página do parceiro.
 * Ao parceiro alterar rotas, atualize esta lista.
 */
export const NOSSO_PLAYER_ORIGIN = "https://nossoplayeronlinehd.ink";

export type NossoPlayerChannelEntry = {
  name: string;
  slug: string;
};

export type NossoPlayerCategory = {
  title: string;
  channels: NossoPlayerChannelEntry[];
};

export function nossoPlayerTvUrl(slug: string): string {
  return `${NOSSO_PLAYER_ORIGIN}/tv/${encodeURIComponent(slug)}`;
}

/** Ordem e agrupamento iguais ao site do parceiro. */
export const NOSSO_PLAYER_CATEGORIES: NossoPlayerCategory[] = [
  {
    title: "CANAIS ESPORTES",
    channels: [
      { name: "Paramount", slug: "paramountplus" },
      { name: "Amazon Prime Video", slug: "primevideo" },
      { name: "Amazon Prime Video 2", slug: "primevideo2" },
      { name: "Amazon Prime Video 3", slug: "primevideo3" },
      { name: "Amazon Prime Video 4", slug: "primevideo4" },
      { name: "Sportv", slug: "sportv" },
      { name: "Sportv 2", slug: "sportv2" },
      { name: "Sportv 3", slug: "sportv3" },
      { name: "Espn", slug: "espn" },
      { name: "Espn 2", slug: "espn2" },
      { name: "Espn 3", slug: "espn3" },
      { name: "Espn 4", slug: "espn4" },
      { name: "Espn 5", slug: "espn5" },
      { name: "Espn 6", slug: "espn6" },
      { name: "Cazé TV 1", slug: "caze1" },
      { name: "Cazé TV 2", slug: "caze2" },
      { name: "Cazé TV 3", slug: "caze3" },
      { name: "Cazé TV 4", slug: "caze4" },
      { name: "Premiere Clubes", slug: "premiere" },
      { name: "Premiere 2", slug: "premiere2" },
      { name: "Premiere 3", slug: "premiere3" },
      { name: "Premiere 4", slug: "premiere4" },
      { name: "Premiere 5", slug: "premiere5" },
      { name: "Premiere 6", slug: "premiere6" },
      { name: "Premiere 7", slug: "premiere7" },
      { name: "Premiere 8", slug: "premiere8" },
      { name: "Nosso Futebol", slug: "nossofutebol" },
      { name: "Goat", slug: "goat1" },
      { name: "Goat 2", slug: "goat2" },
      { name: "Goat 3", slug: "goat3" },
      { name: "TNT", slug: "tnt" },
      { name: "Space", slug: "space" },
      { name: "Band Sports", slug: "bandsports" },
      { name: "Combate", slug: "combate" },
      { name: "UFC Fight Pass", slug: "ufcfightpass" },
    ],
  },
  {
    title: "CANAIS PORTUGAL PT-PT",
    channels: [
      { name: "SportTV Portugal 1", slug: "pt_sportv1" },
      { name: "SportTV Portugal 2", slug: "pt_sportv2" },
      { name: "SportTV Portugal 3", slug: "pt_sportv3" },
      { name: "SportTV Portugal 4", slug: "pt_sportv4" },
      { name: "SportTV Portugal 5", slug: "pt_sportv5" },
      { name: "Eleven Portugal 1", slug: "pt_eleven1" },
      { name: "Eleven Portugal 2", slug: "pt_eleven2" },
      { name: "Eleven Portugal 3", slug: "pt_eleven3" },
      { name: "Eleven Portugal 4", slug: "pt_eleven4" },
    ],
  },
  {
    title: "EVENTOS",
    channels: [
      { name: "Max - 1", slug: "max1" },
      { name: "Max - 2", slug: "max2" },
      { name: "Max - 3", slug: "max3" },
      { name: "Max - 4", slug: "max4" },
      { name: "Max - 5", slug: "max5" },
      { name: "Max - 6", slug: "max6" },
      { name: "Disney Plus 1", slug: "disneyplus1" },
      { name: "Disney Plus 2", slug: "disneyplus2" },
      { name: "Disney Plus 3", slug: "disneyplus3" },
      { name: "Disney Plus 4", slug: "disneyplus4" },
      { name: "Disney Plus 5", slug: "disneyplus5" },
      { name: "Disney Plus 6", slug: "disneyplus6" },
    ],
  },
  {
    title: "CANAIS ABERTOS",
    channels: [
      { name: "Globo RJ", slug: "globorj" },
      { name: "Globo SP", slug: "globosp" },
      { name: "Globo RS", slug: "globors" },
      { name: "Globo MG", slug: "globomg" },
      { name: "SBT", slug: "sbt" },
      { name: "Band", slug: "band" },
      { name: "Record", slug: "record" },
      { name: "Rede TV", slug: "redetv" },
      { name: "TV Cultura", slug: "cultura" },
    ],
  },
  {
    title: "CANAIS VARIEDADES",
    channels: [
      { name: "AXN", slug: "axn" },
      { name: "Cartoon Network", slug: "cartoonnetwork" },
      { name: "Comedy Central", slug: "comedycentral" },
      { name: "Discovery Channel", slug: "discovery_channel_hd" },
      { name: "Discovery Kids", slug: "discoverykids" },
      { name: "Discovery Turbo", slug: "discoveryturbo" },
      { name: "HBO", slug: "hbo" },
      { name: "HBO 2", slug: "hbo2" },
      { name: "HBO Family", slug: "hbofamily" },
      { name: "HBO Plus", slug: "hboplus" },
      { name: "HBO Xtreme", slug: "hboxtreme" },
      { name: "HGTV", slug: "hgtv" },
      { name: "History", slug: "history" },
      { name: "History 2", slug: "history2" },
      { name: "Megapix", slug: "megapix" },
      { name: "Multishow", slug: "multishow" },
      { name: "Nickelodeon", slug: "nickelodeon" },
      { name: "TLC", slug: "tlc" },
      { name: "TNT Novelas", slug: "tntnovelas" },
      { name: "TNT Series", slug: "tntseries" },
      { name: "VIVA", slug: "viva" },
      { name: "Telecine Premium", slug: "telecinepremium" },
      { name: "Telecine Action", slug: "telecineaction" },
      { name: "Telecine Pipoca", slug: "telecinepipoca" },
      { name: "Telecine Touch", slug: "telecinetouch" },
      { name: "Telecine Fun", slug: "telecinefun" },
      { name: "Telecine Cult", slug: "telecinecult" },
    ],
  },
];
