import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guia M3U / IPTV | Referência",
  description:
    "Resumo para listas M3U, fontes públicas e como usar este projeto — com referência ao guia m3u8-player.net",
};

const artigoRef =
  "https://m3u8-player.net/pt-BR/blog/iptv-free/";

const iptvOrgIndex =
  "https://iptv-org.github.io/iptv/index.m3u";

export default function GuiaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 pb-16 text-slate-100">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Referência de estudo
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
        M3U, IPTV e este projeto
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-400">
        Este texto é um <strong className="text-slate-300">resumo prático</strong>{" "}
        alinhado ao teu site de teste. O guia completo (conceitos, players,
        dicas de segurança e lista de verificação) está no artigo{" "}
        <a
          href={artigoRef}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline-offset-2 hover:underline"
        >
          Lista de reprodução IPTV M3U grátis — guia no m3u8-player.net
        </a>
        .
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-bold text-slate-100">M3U e M3U8</h2>
        <p className="text-sm leading-relaxed text-slate-400">
          Um ficheiro <code className="font-mono text-accent">.m3u</code> ou{" "}
          <code className="font-mono text-accent">.m3u8</code> é texto: lista
          de entradas (<code className="font-mono">#EXTINF</code>) e URLs de
          fluxo. O vídeo não está dentro do ficheiro — só os endereços. O M3U8
          usa normalmente UTF-8, o que ajuda nomes com acentos (como no artigo
          de referência).
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-bold text-slate-100">
          iptv-org no teu deploy (automático)
        </h2>
        <p className="text-sm leading-relaxed text-slate-400">
          O repositório{" "}
          <a
            href="https://github.com/iptv-org/iptv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            iptv-org/iptv
          </a>{" "}
          agrega listas públicas. Neste projeto, o comando{" "}
          <code className="font-mono">npm run build</code> corre antes{" "}
          <code className="font-mono">npm run fetch:iptv</code>: descarrega a
          playlist <strong className="text-slate-300">Brasil</strong> do
          iptv-org (
          <code className="font-mono text-xs">countries/br.m3u</code>) e, em
          seguida, as listas públicas do repositório{" "}
          <a
            href="https://github.com/iprtl/m3u"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            iprtl/m3u
          </a>{" "}
          (<code className="font-mono text-xs">Freetv.m3u</code>,{" "}
          <code className="font-mono text-xs">Pluto.m3u</code>, ficheiros em{" "}
          <code className="font-mono text-xs">Streams/</code>
          ), com deduplicação por URL (mantém a ordem iptv-org primeiro). Gera{" "}
          <code className="font-mono">channels.generated.json</code>.
        </p>
        <p className="text-sm text-slate-500">
          <code className="font-mono">SKIP_IPRTL_M3U=1</code> ou{" "}
          <code className="font-mono">IPRTL_M3U=0</code> ignora só o iprtl/m3u.{" "}
          <code className="font-mono">IPRTL_M3U_REF</code> escolhe o ramo (ex.{" "}
          <code className="font-mono">live</code>). Variável opcional{" "}
          <code className="font-mono">IPTV_PLAYLIST_URL</code> para outra URL
          (ex. lista mundial{" "}
          <code className="font-mono text-xs">{iptvOrgIndex}</code>
          — ficheiro grande, build mais lento). Ver outras listas em{" "}
          <a
            href="https://github.com/iptv-org/iptv/blob/master/PLAYLISTS.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            PLAYLISTS.md
          </a>
          . <code className="font-mono">SKIP_IPTV_FETCH=1</code> mantém o JSON
          já commitado sem rede no build.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-bold text-slate-100">
          Como encaixa <em>este</em> projeto
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-400">
          <li>
            <strong className="text-slate-300">Início</strong> (
            <Link href="/" className="text-accent hover:underline">
              /
            </Link>
            ) — apresentação do projeto e atalhos.
          </li>
          <li>
            <strong className="text-slate-300">Lista de canais</strong> (
            <Link href="/canais" className="text-accent hover:underline">
              /canais
            </Link>
            ) — preenchida no <code className="font-mono">build</code> a partir
            do iptv-org BR + listas iprtl/m3u (por defeito) ou com{" "}
            <code className="font-mono">npm run import:channels</code> para um{" "}
            <code className="font-mono">.m3u</code> teu.
          </li>
          <li>
            O site mostra grupos e ligações <strong className="text-slate-300">Abrir fonte</strong>; a
            reprodução no browser depende do tipo de URL (HLS costuma funcionar
            melhor que outros formatos).
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-bold text-slate-100">Players recomendados</h2>
        <p className="text-sm leading-relaxed text-slate-400">
          O artigo sugere, entre outros,{" "}
          <strong className="text-slate-300">VLC</strong> (desktop), apps IPTV
          em Android TV / Fire TV, e teste rápido com player online. Vê a
          secção “Melhores players IPTV” no{" "}
          <a
            href={artigoRef}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            guia completo
          </a>
          .
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
        <h2 className="text-base font-bold text-amber-100">
          Legalidade e segurança (resumo)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-100/90">
          Listas gratuitas podem apontar para fluxos em zona cinzenta; prefere
          serviços <strong>oficiais</strong> quando possível (ex.: Samsung TV
          Plus, XUMO, citados no artigo). Não abras ficheiros M3U de
          fontes que não confies; para privacidade, o artigo menciona VPN como
          opção — avalia riscos e fornecedores de confiança.
        </p>
      </section>

      <p className="mt-10 text-sm text-slate-500">
        <Link href="/canais" className="font-semibold text-accent hover:underline">
          Ir para lista de canais
        </Link>
        {" · "}
        <Link href="/" className="font-semibold text-accent hover:underline">
          Início
        </Link>
      </p>
    </div>
  );
}
