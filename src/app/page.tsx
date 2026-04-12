import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-dvh bg-surface px-4 py-12 text-slate-100">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Projeto de teste
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Lista M3U no browser
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
          No deploy, a lista vem do projeto{" "}
          <a
            href="https://github.com/iptv-org/iptv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            iptv-org/iptv
          </a>{" "}
          (playlist <strong className="text-slate-300">Brasil</strong> mais
          categoria <strong className="text-slate-300">Sports</strong> do mesmo
          projeto, por defeito). Lista local:{" "}
          <code className="font-mono">npm run import:channels</code>.
        </p>
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/canais"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-bold text-teal-950 hover:opacity-95"
          >
            Ver lista de canais
          </Link>
          <Link
            href="/guia"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5"
          >
            Guia M3U / IPTV
          </Link>
        </div>
      </div>
    </div>
  );
}
