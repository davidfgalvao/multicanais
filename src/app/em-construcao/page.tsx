import { permanentRedirect } from "next/navigation";

/** Rota antiga: o portal de canais passou a ser a página inicial. */
export default function EmConstrucaoRedirectPage() {
  permanentRedirect("/");
}
