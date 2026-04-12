import Link from "next/link";

const link =
  "text-sm font-semibold text-slate-400 transition-colors hover:text-accent";

export function SiteNav() {
  return (
    <nav
      className="flex items-center gap-6 border-b border-white/[0.08] px-4 py-3 md:px-8"
      aria-label="Principal"
    >
      <Link href="/" className={link}>
        Início
      </Link>
      <Link href="/canais" className={link}>
        Lista de canais
      </Link>
      <Link href="/guia" className={link}>
        Guia (M3U)
      </Link>
    </nav>
  );
}
