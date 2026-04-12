import type { Metadata } from "next";
import { AssistirClient } from "./AssistirClient";

export const metadata: Metadata = {
  title: "Reproduzir stream | HLS",
  description:
    "Player HLS no browser para URLs da lista. Se falhar por CORS, usa m3u8-player.net.",
};

export default function AssistirPage() {
  return <AssistirClient />;
}
