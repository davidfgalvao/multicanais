export default function Page() {
  return (
    <div className="w-full px-0 py-4 pb-10 md:py-6">
      <div className="mx-auto mb-4 w-full max-w-[95vw] px-4 md:px-6">
        <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
          Página inicial(canais ao vivo)
        </h1>
      </div>

      <div className="mx-auto w-full max-w-[95vw] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <iframe
          src="https://nossoplayeronlinehd.ink/"
          title="Site parceiro"
          className="h-[82vh] w-full"
          loading="lazy"
          referrerPolicy="no-referrer"
          allow="autoplay; fullscreen"
        />
      </div>

      <div className="mx-auto w-full max-w-[95vw] px-1">
        <a
          href="https://nossoplayeronlinehd.ink/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-white/15 px-4 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
        >
          Abrir parceiro em nova aba
        </a>
      </div>
    </div>
  );
}
