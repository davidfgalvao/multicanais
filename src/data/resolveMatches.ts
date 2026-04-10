import {
  isAllowedStreamUrl,
  loadStreamUrlsFromEnv,
} from "../config/envStreams";
import { USER_STREAM_URLS } from "../config/userStreams";
import type { BroadcastMatch } from "../types";
import { MOCK_MATCHES } from "./matches";

/**
 * Junta a grade de exemplo com URLs que você define em `userStreams.ts`
 * e/ou em `NEXT_PUBLIC_STREAMS_JSON`. Ordem: env → arquivo → campo no mock.
 */
export function getMatchesWithStreams(): BroadcastMatch[] {
  const fromEnv = loadStreamUrlsFromEnv();

  return MOCK_MATCHES.map((m) => {
    const fromFile = USER_STREAM_URLS[m.id];
    const fromFileOk =
      typeof fromFile === "string" && isAllowedStreamUrl(fromFile)
        ? fromFile.trim()
        : undefined;
    const fromEnvUrl = fromEnv[m.id];
    const baseUrl =
      m.streamUrl &&
      typeof m.streamUrl === "string" &&
      isAllowedStreamUrl(m.streamUrl)
        ? m.streamUrl.trim()
        : undefined;

    const streamUrl = fromEnvUrl ?? fromFileOk ?? baseUrl;

    return { ...m, streamUrl };
  });
}
