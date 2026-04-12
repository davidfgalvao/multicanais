"use client";

import Link from "next/link";
import { useEffect } from "react";

import { SiteLogo } from "@/components/SiteLogo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <Link
        href="/"
        className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <SiteLogo variant="hero" className="mx-auto" />
      </Link>
      <h2 className="mt-8 font-display text-xl font-bold text-white md:text-2xl">
        Algo correu mal
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Podes tentar de novo ou voltar ao início.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-accent px-6 text-sm font-bold uppercase tracking-wide text-pitch-950"
        >
          Tentar outra vez
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-semibold text-slate-200 hover:bg-white/[0.05]"
        >
          Início
        </Link>
      </div>
    </div>
  );
}
