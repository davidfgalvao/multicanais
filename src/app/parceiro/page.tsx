export const metadata = {
  title: "Parceiro | Embed",
  description: "Página de teste para abrir o parceiro dentro do seu frontend.",
};

export default function ParceiroPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-16 md:px-6">
      <div className="mb-4">
        <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
          Parceiro (modo teste no teu frontend)
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          O conteúdo abaixo é carregado por iframe sem sair do teu domínio.
          Se o parceiro bloquear embed no futuro, usa o botão de abertura direta.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <iframe
          src="https://redecanaistv.be/"
          title="Site parceiro"
          className="h-[78vh] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allow="autoplay; fullscreen"
        />
      </div>

      <a
        href="https://redecanaistv.be/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-white/15 px-4 text-sm font-semibold text-slate-200 transition-colors hover:border-accent/40 hover:bg-white/[0.05]"
      >
        Abrir parceiro em nova aba
      </a>
    </div>
  );
}
