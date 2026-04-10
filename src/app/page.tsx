import { PLUTO_LIVE_URL } from "@/config/pluto";

export default function Page() {
  return (
    <div className="min-h-dvh bg-surface px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Oficial e gratuito
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          Pluto TV — ao vivo
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          Transmissão via{" "}
          <a
            href="https://pluto.tv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline-offset-2 hover:underline"
          >
            Pluto TV
          </a>
          . Se o leitor embutido não carregar (bloqueio do site no iframe), usa
          o botão para abrir no separador.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={PLUTO_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-bold text-teal-950 transition-opacity hover:opacity-95"
          >
            Abrir no Pluto TV
          </a>
          <a
            href={PLUTO_LIVE_URL}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Abrir nesta janela
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 shadow-2xl">
          <div className="aspect-video w-full">
            <iframe
              title="Pluto TV ao vivo"
              src={PLUTO_LIVE_URL}
              className="h-full w-full"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Conteúdo e termos de uso são da Pluto TV. Este site apenas facilita o
          acesso ao URL público do serviço.
        </p>
      </div>
    </div>
  );
}
