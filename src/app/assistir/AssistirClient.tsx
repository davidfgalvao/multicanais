"use client";

import Hls from "hls.js";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const M3U8_PLAYER_PT = "https://m3u8-player.net/pt-BR/";

function isProbablyM3u8(url: string): boolean {
  return /\.m3u8(\?|$)/i.test(url) || /\/playlist\.m3u8/i.test(url);
}

export function AssistirClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [parseErr, setParseErr] = useState<string | null>(null);
  const [playErr, setPlayErr] = useState<string | null>(null);
  /** Até haver dados suficientes para tocar (HLS costuma demorar). */
  const [waitingToPlay, setWaitingToPlay] = useState(false);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "referrer";
    meta.content = "no-referrer";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "").trim();
    if (!raw) {
      setParseErr("Nenhum endereço na página. Volta à lista e usa «Reproduzir aqui».");
      return;
    }
    try {
      setSrc(decodeURIComponent(raw));
    } catch {
      setParseErr("Endereço inválido no fragmento da URL.");
    }
  }, []);

  useEffect(() => {
    if (!src || !videoRef.current) return;

    const video = videoRef.current;
    setPlayErr(null);
    setWaitingToPlay(true);
    video.removeAttribute("src");
    video.load();

    const clearWaiting = () => setWaitingToPlay(false);
    video.addEventListener("playing", clearWaiting, { once: true });
    video.addEventListener("canplay", clearWaiting, { once: true });

    if (isProbablyM3u8(src)) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          // Diretos “lentos” arrancam com mais estabilidade sem modo baixa latência agressivo
          lowLatencyMode: false,
          maxBufferLength: 30,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            setWaitingToPlay(false);
            setPlayErr(
              data.type === "networkError"
                ? "Erro de rede ou CORS: o servidor pode bloquear reprodução fora do site deles. Usa o M3U8 Player abaixo."
                : "Erro ao reproduzir este stream (formato ou ligação)."
            );
          }
        });
        return () => {
          video.removeEventListener("playing", clearWaiting);
          video.removeEventListener("canplay", clearWaiting);
          hls.destroy();
        };
      }

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        return () => {
          video.removeEventListener("playing", clearWaiting);
          video.removeEventListener("canplay", clearWaiting);
        };
      }

      setWaitingToPlay(false);
      setPlayErr(
        "Este browser não suporta HLS. Abre o M3U8 Player e cola o URL."
      );
      return () => {
        video.removeEventListener("playing", clearWaiting);
        video.removeEventListener("canplay", clearWaiting);
      };
    }

    video.src = src;
    return () => {
      video.removeEventListener("playing", clearWaiting);
      video.removeEventListener("canplay", clearWaiting);
    };
  }, [src]);

  if (parseErr) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-slate-300">{parseErr}</p>
        <Link
          href="/canais"
          className="mt-6 inline-block font-semibold text-accent hover:underline"
        >
          ← Lista de canais
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-extrabold text-slate-100">Reproduzir stream</h1>
        <Link
          href="/canais"
          className="text-sm font-semibold text-accent hover:underline"
        >
          ← Lista de canais
        </Link>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-slate-400">
        Em diretos HLS é normal o ecrã ficar preto{" "}
        <strong className="text-slate-300">alguns segundos ou mais</strong> até o
        manifesto e os primeiros segmentos carregarem — igual ao que vês ao
        colar o URL no{" "}
        <a
          href={M3U8_PLAYER_PT}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          M3U8 Player
        </a>
        . No Chrome, «Abrir fonte» com um{" "}
        <code className="font-mono">.m3u8</code> direto muitas vezes não arranca
        player; aqui usamos{" "}
        <a
          href="https://github.com/video-dev/hls.js/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          HLS.js
        </a>
        . Se depois de esperar ainda falhar, pode ser CORS — cola o URL no M3U8
        Player.
      </p>

      {waitingToPlay && !playErr && src && (
        <p className="mb-4 flex items-center gap-2 rounded-lg border border-white/10 bg-surface-card px-4 py-3 text-sm text-slate-300">
          <span
            className="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-accent border-t-transparent"
            aria-hidden
          />
          <span>
            A carregar o stream… em listas lentas pode demorar. Clica em play no
            vídeo se o browser pedir.
          </span>
        </p>
      )}

      {playErr && (
        <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/95">
          {playErr}{" "}
          <a
            href={M3U8_PLAYER_PT}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Abrir m3u8-player.net
          </a>
        </p>
      )}

      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black"
          controls
          playsInline
          preload="auto"
        />
        {waitingToPlay && !playErr && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40"
            aria-hidden
          >
            <span className="inline-block size-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        )}
      </div>

      {src && (
        <p className="mt-4 break-all font-mono text-xs text-slate-500">
          {src}
        </p>
      )}
    </div>
  );
}
