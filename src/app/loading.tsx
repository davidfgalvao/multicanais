import { SiteLogo } from "@/components/SiteLogo";

export default function Loading() {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center gap-5 px-4 py-16">
      <SiteLogo variant="page" />
      <p className="text-sm font-medium text-slate-500">A carregar…</p>
    </div>
  );
}
