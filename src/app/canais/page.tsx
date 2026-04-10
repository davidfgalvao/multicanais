import Link from "next/link";
import { getImportedChannels, groupChannelsByCategory } from "@/data/channels";

export const metadata = {
  title: "Canais | Multicanais Esporte",
  description: "Lista importada a partir do seu ficheiro M3U",
};

export default function CanaisPage() {
  const channels = getImportedChannels();
  const grouped = groupChannelsByCategory(channels);

  if (channels.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-extrabold text-slate-100">Canais</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          Ainda não há canais importados. Quando tiver a sua lista no formato
          M3U (mesma estrutura que usa em players IPTV), grave o ficheiro
          (por exemplo <code className="font-mono text-accent">playlist.m3u</code>
          na raiz do projeto) e execute:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-white/[0.08] bg-surface-card p-4 text-xs text-slate-300">
          npm run import:channels -- ./playlist.m3u
        </pre>
        <p className="mt-4 text-sm text-slate-500">
          Isto gera{" "}
          <code className="font-mono text-accent">
            src/data/channels.generated.json
          </code>
          . Depois rode <code className="font-mono text-accent">npm run dev</code>{" "}
          ou faça deploy de novo. Use apenas URLs que tenha direito de
          distribuir ou reproduzir.
        </p>
        <p className="mt-6 text-sm text-slate-500">
          <Link href="/" className="font-semibold text-accent hover:underline">
            ← Voltar aos jogos
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Canais</h1>
          <p className="mt-1 text-sm text-slate-500">
            {channels.length} entradas · importadas do M3U
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-semibold text-accent hover:underline"
        >
          ← Jogos
        </Link>
      </div>

      <p className="mb-8 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
        No navegador, fluxos <code className="font-mono">.m3u8</code> podem
        ser reproduzidos com players HLS; URLs <code className="font-mono">.ts</code>{" "}
        ou painéis IPTV costumam exigir aplicação nativa ou o teu próprio
        backend — o botão abre o URL num novo separador.
      </p>

      {[...grouped.entries()].map(([group, list]) => (
        <section key={group} className="mb-10">
          <h2 className="mb-3 border-b border-white/[0.08] pb-2 text-lg font-bold text-accent">
            {group}
          </h2>
          <ul className="space-y-2">
            {list.map((ch) => (
              <li
                key={ch.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.08] bg-surface-card px-3 py-2"
              >
                {ch.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ch.logo}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 shrink-0 rounded-md bg-black/20 object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/5 text-xs text-slate-500">
                    —
                  </span>
                )}
                <span className="min-w-0 flex-1 font-semibold text-slate-100">
                  {ch.name}
                </span>
                <a
                  href={ch.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-accent px-3 py-2 text-sm font-bold text-teal-950 hover:opacity-95"
                >
                  Abrir fonte
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
