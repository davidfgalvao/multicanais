import type { Metadata } from "next";
import { Suspense } from "react";

import { HomePortalClient } from "@/components/portal/HomePortalClient";

export const metadata: Metadata = {
  title: "Início — Canais ao vivo",
  description:
    "Escolhe um canal por categoria (esporte, filmes, infantil, notícias, variedades) e assiste no embed do Nosso Player.",
};

function HomeFallback() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 text-center text-slate-400">
      A carregar…
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomePortalClient />
    </Suspense>
  );
}
