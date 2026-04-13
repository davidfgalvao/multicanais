import { redirect } from "next/navigation";

export const metadata = {
  title: "Parceiro | Redirecionamento",
  description: "Página de teste para redirecionar ao site parceiro.",
};

export default function ParceiroPage() {
  redirect("https://redecanaistv.be/");
}
