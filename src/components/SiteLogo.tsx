import Image from "next/image";

/** Texto alternativo único para acessibilidade e SEO. */
export const SITE_LOGO_ALT =
  "StreamFutebol — canais de futebol e filmes, ao vivo e on demand";

const VARIANT_STYLES = {
  nav: "h-10 w-auto max-w-[min(100%,220px)] object-contain object-left md:h-12 md:max-w-[280px]",
  footer:
    "h-11 w-auto max-w-[240px] object-contain object-left sm:object-center md:h-[52px] md:max-w-[280px]",
  hero: "h-16 w-auto max-w-[min(92vw,380px)] object-contain object-left md:h-[5.5rem] md:max-w-[440px]",
  page: "h-12 w-auto max-w-[260px] object-contain object-left md:h-14 md:max-w-[300px]",
  compact: "h-8 w-auto max-w-[180px] object-contain object-left md:h-9 md:max-w-[200px]",
} as const;

export type SiteLogoVariant = keyof typeof VARIANT_STYLES;

type Props = {
  variant?: SiteLogoVariant;
  className?: string;
  priority?: boolean;
};

export function SiteLogo({
  variant = "nav",
  className = "",
  priority = false,
}: Props) {
  return (
    <Image
      src="/logo-streamfutbol.png"
      alt={SITE_LOGO_ALT}
      width={320}
      height={96}
      className={[VARIANT_STYLES[variant], className].filter(Boolean).join(" ")}
      priority={priority}
      sizes="(max-width: 768px) 240px, 320px"
    />
  );
}
