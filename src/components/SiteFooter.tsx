import { siteAuthor } from "@/config/author";

export function SiteFooter() {
  return (
    <footer
      className="mt-auto border-t border-white/[0.08] px-4 py-6 md:px-8"
      aria-label="Créditos"
    >
      <div className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate-500 sm:text-left">
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
            className="font-semibold text-accent underline-offset-2 hover:underline"
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
            className="text-slate-500 underline-offset-2 hover:text-accent hover:underline"
          >
            Código-fonte no GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
