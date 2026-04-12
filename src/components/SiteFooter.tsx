import Link from "next/link";

import { SiteLogo } from "@/components/SiteLogo";
import { siteAuthor } from "@/config/author";

export function SiteFooter() {
  return (
    <footer
      className="mt-auto border-t border-white/[0.08] px-4 py-8 md:px-8"
      aria-label="Créditos"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <Link
          href="/"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <SiteLogo variant="footer" />
        </Link>
        <div className="max-w-xl text-center text-xs leading-relaxed text-slate-500 sm:text-right">
          <p className="text-slate-400">
            <span className="font-medium text-slate-300">
              {siteAuthor.projectNote}
            </span>
            {" — "}
            desenvolvido por{" "}
            <a
              href={siteAuthor.githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-bright underline-offset-2 hover:underline"
            >
              {siteAuthor.displayName}
            </a>
            .
          </p>
          <p className="mt-2">
            <a
              href={siteAuthor.projectRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 underline-offset-2 hover:text-accent-bright hover:underline"
            >
              Código-fonte no GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
