import type { M3UChannel } from "@/types";

import { foldDiacritics } from "./filterChannelsForeignFlags";

/**
 * Remove entradas de rádio: grupo «Radios», ou «radio(s)» no grupo/nome (palavra inteira).
 */
export function keepNonRadioChannel(
  ch: Pick<M3UChannel, "group" | "name">
): boolean {
  const gRaw = (ch.group || "").trim();
  const g = foldDiacritics(gRaw).replace(/\s+/g, " ").trim();
  if (g === "radios" || g === "radio") return false;

  const groupHasRadio =
    /\bradios\b/.test(g) ||
    /\bradio\b/.test(g) ||
    /\brádios\b/.test(g) ||
    /\brádio\b/.test(g);
  if (groupHasRadio) return false;

  const n = foldDiacritics(ch.name || "").replace(/\s+/g, " ");
  if (/\bradios\b/.test(n) || /\bradio\b/.test(n)) return false;
  if (/\brádios\b/.test(n) || /\brádio\b/.test(n)) return false;

  return true;
}
