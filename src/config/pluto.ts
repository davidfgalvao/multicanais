/**
 * Canal ao vivo oficial e gratuito na Pluto TV.
 * Opcional na Vercel: NEXT_PUBLIC_PLUTO_LIVE_URL com outro URL do mesmo serviço.
 */
export const PLUTO_LIVE_URL =
  process.env.NEXT_PUBLIC_PLUTO_LIVE_URL?.trim() ||
  "https://pluto.tv/br/live-tv/5f357e91b18f0b00073583d2";
