import Link from "next/link";
import { getImportedChannels, groupChannelsByCategory } from "@/data/channels";

export const metadata = {
  title: "Canais | Lista oficial",
  description: "Canais importados do teu ficheiro M3U local",
};

export default function CanaisPage() {
  const channels = getImportedChannels();
  const grouped = groupChannelsByCategory(channels);

  if (channels.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-extrabold text-slate-100">Lista de canais</h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">
          1) Cola a tua lista M3U (ex. Projeto Parabólica / canais abertos) no
          ficheiro{" "}
          <code className="font-mono text-accent">data/canais-abertos.m3u</code>
          . Linhas em que falta{" "}
          <code className="font-mono">group-title</code> antes de{" "}
          <code className="font-mono">(Felps)</code> são corrigidas na
          importação.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          2) Na pasta do projeto, corre um destes:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-white/[0.08] bg-surface-card p-4 text-xs text-slate-300">
          npm run import:channels
        </pre>
        <p className="mt-2 text-sm text-slate-500">
          (usa <code className="font-mono">data/canais-abertos.m3u</code> se
          existir) ou{" "}
          <code className="font-mono">
            npm run import:channels -- ./outro.m3u
          </code>
          . No Mac, com a lista copiada:{" "}
          <code className="font-mono">npm run import:paste</code>
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Isto gera{" "}
          <code className="font-mono text-accent">
            src/data/channels.generated.json
          </code>
          . Faz commit desse JSON para a Vercel mostrar os mesmos canais.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/guia" className="font-semibold text-accent hover:underline">
            Guia M3U / referência
          </Link>
          <Link href="/" className="font-semibold text-accent hover:underline">
            ← Início
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100">Lista de canais</h1>
          <p className="mt-1 text-sm text-slate-500">
            {channels.length} entradas · importadas do M3U
          </p>
        </div>
        <Link
          href="/"
          className="text-sm font-semibold text-accent hover:underline"
        >
          ← Início
        </Link>
      </div>

      <p className="mb-8 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
        <strong className="text-amber-50">Dica:</strong> muitos fluxos{" "}
        <code className="font-mono">.m3u8</code> demoram{" "}
        <strong className="text-amber-50">vários segundos (às vezes mais de um
        minuto)</strong> a começar — é normal: o player descarrega o manifesto,
        escolhe qualidade e enche o buffer. No Chrome, «Abrir fonte» só com o
        link direto muitas vezes não toca; usa{" "}
        <strong className="text-amber-50">Reproduzir aqui</strong> (HLS.js, como
        no{" "}
        <a
          href="https://m3u8-player.net/pt-BR/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-amber-200 underline"
        >
          M3U8 Player
        </a>
        ) e espera que a imagem apareça. Se falhar de todo (ex. CORS), cola o
        URL no M3U8 Player. MP4/outros: «Abrir fonte» pode bastar.
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
                <div className="flex shrink-0 flex-wrap gap-2">
                  <a
                    href={`/assistir#${encodeURIComponent(ch.streamUrl)}`}
                    className="rounded-lg bg-accent px-3 py-2 text-sm font-bold text-teal-950 hover:opacity-95"
                  >
                    Reproduzir aqui
                  </a>
                  <a
                    href={ch.streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5"
                  >
                    Abrir fonte
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
