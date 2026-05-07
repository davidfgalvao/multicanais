export type ContentCategoryId =
  | "todos"
  | "esporte"
  | "filmes"
  | "infantil"
  | "noticias"
  | "variedades";

export const CONTENT_CATEGORY_ORDER: {
  id: ContentCategoryId;
  label: string;
}[] = [
  { id: "todos", label: "Todos" },
  { id: "esporte", label: "Esporte" },
  { id: "filmes", label: "Filmes" },
  { id: "infantil", label: "Infantil" },
  { id: "noticias", label: "Notícias" },
  { id: "variedades", label: "Variedades" },
];

export function normalizeContentCategoryId(
  raw: string | null | undefined
): ContentCategoryId {
  if (!raw || raw === "todos") return "todos";
  const allowed = new Set(CONTENT_CATEGORY_ORDER.map((x) => x.id));
  return allowed.has(raw as ContentCategoryId)
    ? (raw as ContentCategoryId)
    : "todos";
}
