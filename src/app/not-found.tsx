import Link from "next/link";

import { SiteLogo } from "@/components/SiteLogo";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center md:py-24">
      <Link
        href="/"
        className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <SiteLogo variant="hero" className="mx-auto" />
      </Link>
      <h1 className="mt-8 font-display text-2xl font-bold text-white md:text-3xl">
        Página não encontrada
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        O endereço pode estar errado ou a página foi movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-6 text-sm font-bold uppercase tracking-wide text-pitch-950"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
