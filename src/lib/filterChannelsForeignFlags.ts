/** Início / fim do bloco de indicadores regionais (pares formam emoji de bandeira). */
const RI_START = 0x1f1e6;
const RI_END = 0x1f1ff;

function regionalPairToIso(cp1: number, cp2: number): string | null {
  if (cp1 < RI_START || cp1 > RI_END || cp2 < RI_START || cp2 > RI_END) {
    return null;
  }
  const a = String.fromCodePoint(0x41 + (cp1 - RI_START));
  const b = String.fromCodePoint(0x41 + (cp2 - RI_START));
  return a + b;
}

function* codePoints(s: string): Generator<number> {
  for (let i = 0; i < s.length; ) {
    const cp = s.codePointAt(i)!;
    yield cp;
    i += cp > 0xffff ? 2 : 1;
  }
}

/** Códigos ISO 3166-1 alpha-2 encontrados como emoji de bandeira no texto. */
export function isoCountryCodesFromFlagEmojis(text: string): string[] {
  const cps = [...codePoints(text)];
  const out: string[] = [];
  for (let i = 0; i < cps.length - 1; i++) {
    const iso = regionalPairToIso(cps[i], cps[i + 1]);
    if (iso) {
      out.push(iso);
      i++;
    }
  }
  return out;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Minúsculas sem acentos, para comparar frases. */
export function foldDiacritics(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

/**
 * Frases que indicam país ou região fora do Brasil (nome PT/EN comum em listas).
 * Correspondência com limites “palavra” Unicode (evita "china" em "chinaware").
 */
const FOREIGN_COUNTRY_PHRASES: string[] = [
  "portugal",
  "portuguesa",
  "portuguese",
  "reino unido",
  "united kingdom",
  "inglaterra",
  "england",
  "escocia",
  "scotland",
  "gales",
  "wales",
  "irlanda",
  "ireland",
  "irlanda do norte",
  "northern ireland",
  "estados unidos",
  "united states",
  "canada",
  "canadá",
  "mexico",
  "méxico",
  "argentina",
  "argentino",
  "chile",
  "colombia",
  "colômbia",
  "venezuela",
  "uruguai",
  "uruguay",
  "paraguai",
  "paraguay",
  "bolivia",
  "bolívia",
  "ecuador",
  "equador",
  "cuba",
  "jamaica",
  "haiti",
  "peru",
  "perú",
  "panama",
  "panamá",
  "costa rica",
  "honduras",
  "nicaragua",
  "guatemala",
  "el salvador",
  "republica dominicana",
  "república dominicana",
  "dominican",
  "porto rico",
  "puerto rico",
  "espanha",
  "espana",
  "spain",
  "frança",
  "france",
  "alemanha",
  "germany",
  "deutschland",
  "italia",
  "itália",
  "italy",
  "suica",
  "suiça",
  "switzerland",
  "holanda",
  "netherlands",
  "nederland",
  "belgica",
  "bélgica",
  "belgium",
  "austria",
  "áustria",
  "polonia",
  "polônia",
  "poland",
  "polska",
  "tchequia",
  "chequia",
  "czechia",
  "czech",
  "eslovakia",
  "eslovaquia",
  "hungria",
  "hungary",
  "romenia",
  "romênia",
  "romania",
  "bulgaria",
  "bulgária",
  "croacia",
  "croácia",
  "croatia",
  "servia",
  "sérvia",
  "serbia",
  "eslovenia",
  "eslovênia",
  "slovenia",
  "grecia",
  "grécia",
  "greece",
  "turquia",
  "turkey",
  "ucrania",
  "ucrânia",
  "ukraine",
  "russia",
  "rússia",
  "estonia",
  "estônia",
  "letonia",
  "letônia",
  "latvia",
  "lituania",
  "lituânia",
  "lithuania",
  "finlandia",
  "finlândia",
  "finland",
  "noruega",
  "norway",
  "suecia",
  "suécia",
  "sweden",
  "dinamarca",
  "denmark",
  "islandia",
  "islândia",
  "iceland",
  "israel",
  "palestina",
  "palestine",
  "jordania",
  "jordânia",
  "jordan",
  "libano",
  "líbano",
  "lebanon",
  "siria",
  "síria",
  "syria",
  "ira",
  "irã",
  "iran",
  "iraque",
  "iraq",
  "arabia saudita",
  "saudi",
  "emirados",
  "emirates",
  "qatar",
  "catar",
  "kuwait",
  "kuweit",
  "oman",
  "barein",
  "bahrain",
  "iemen",
  "yemen",
  "egito",
  "egypt",
  "marrocos",
  "morocco",
  "argelia",
  "argélia",
  "algeria",
  "tunisia",
  "tunísia",
  "libia",
  "líbia",
  "libya",
  "africa do sul",
  "áfrica do sul",
  "south africa",
  "nigeria",
  "nigéria",
  "quenia",
  "quênia",
  "kenya",
  "tanzania",
  "uganda",
  "etiopia",
  "etiópia",
  "ethiopia",
  "angola",
  "mocambique",
  "moçambique",
  "mozambique",
  "camaroes",
  "camarões",
  "cameroon",
  "senegal",
  "ghana",
  "costa do marfim",
  "mali",
  "niger",
  "india",
  "índia",
  "indian",
  "china",
  "chinese",
  "japao",
  "japão",
  "japan",
  "coreia",
  "korea",
  "australia",
  "austrália",
  "australian",
  "paquistao",
  "paquistão",
  "pakistan",
  "bangladesh",
  "indonesia",
  "indonésia",
  "filipinas",
  "philippines",
  "malasia",
  "malásia",
  "malaysia",
  "singapura",
  "singapore",
  "tailandia",
  "tailândia",
  "thailand",
  "vietna",
  "vietnã",
  "vietnam",
  "taiwan",
  "hong kong",
  "mongolia",
  "mongólia",
  "nepal",
  "sri lanka",
  "myanmar",
  "camboja",
  "cambodia",
  "nova zelandia",
  "nova zelândia",
  "new zealand",
  "europa",
  "europe",
  "european",
  "asia",
  "asian",
  "africa",
  "áfrica",
  "african",
  "medio oriente",
  "middle east",
  "oriente medio",
  "francais",
  "français",
  "deutsch",
  "espanol",
  "español",
  "italiano",
  "usa",
  "uk",
  "u.s.a",
  "u.s.",
];

function compileForeignPhrasePatterns(): RegExp[] {
  return FOREIGN_COUNTRY_PHRASES.map((phrase) => {
    const inner = foldDiacritics(phrase)
      .split(/\s+/)
      .map((w) => escapeRe(w))
      .join(String.raw`\s+`);
    return new RegExp(
      `(?<![\\p{L}\\p{N}])${inner}(?![\\p{L}\\p{N}])`,
      "iu"
    );
  });
}

const FOREIGN_PHRASE_REGEXES = compileForeignPhrasePatterns();

export function textSuggestsForeignCountry(text: string): boolean {
  if (!text.trim()) return false;
  return FOREIGN_PHRASE_REGEXES.some((re) => re.test(text));
}

/**
 * Mantém o canal se:
 * - não houver bandeiras de país no grupo/nome, ou só 🇧🇷;
 * - e o grupo/nome não contiver palavras-chave de outros países/regiões.
 */
export function keepChannelBrazilFlagsOnly(
  ch: Pick<{ group: string; name: string }, "group" | "name">
): boolean {
  const codes = [
    ...isoCountryCodesFromFlagEmojis(ch.group || ""),
    ...isoCountryCodesFromFlagEmojis(ch.name || ""),
  ];
  if (codes.length > 0 && !codes.every((c) => c === "BR")) {
    return false;
  }
  if (textSuggestsForeignCountry(ch.group || "")) return false;
  if (textSuggestsForeignCountry(ch.name || "")) return false;
  return true;
}
