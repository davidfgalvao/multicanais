/** Entrada após importar um ficheiro .m3u (lista oficial local). */
export interface M3UChannel {
  id: string;
  name: string;
  group: string;
  logo?: string;
  streamUrl: string;
}
