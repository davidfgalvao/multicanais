/**
 * Mapa opcional no `.env` (Vercel → Environment Variables):
 * NEXT_PUBLIC_STREAMS_JSON
 * Formato: {"1":"https://...","8":"https://..."}
 * Sobrescreve o mesmo `id` em `userStreams.ts`.
 */
export function loadStreamUrlsFromEnv(): Record<string, string> {
  const raw = process.env.NEXT_PUBLIC_STREAMS_JSON;
  if (!raw || typeof raw !== "string") return {};

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string" && isAllowedStreamUrl(value)) {
        out[key] = value.trim();
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function isAllowedStreamUrl(s: string): boolean {
  try {
    const u = new URL(s.trim());
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}
