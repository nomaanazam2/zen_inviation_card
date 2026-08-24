import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { motion } from "framer-motion";
import audio_url from "../assets/audio/alex-morgan-arabic-islam-islamic-music-545530.mp3";
// Self-hosted so playback never depends on a third-party CDN.
// export const AUDIO_URL = "/audio/walima-ambience.mp3";

const TARGET_VOLUME = 0.45;

export function MusicPlayer({ shouldPlay }: { shouldPlay: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const step = (target - audio.volume) / 24;
    fadeRef.current = window.setInterval(() => {
      const next = audio.volume + step;
      if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
        audio.volume = Math.min(1, Math.max(0, target));
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        onDone?.();
      } else {
        audio.volume = Math.min(1, Math.max(0, next));
      }
    }, 40);
  }, []);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    audio.volume = 0;
    try {
      await audio.play();
      setPlaying(true);
      fadeTo(TARGET_VOLUME);
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  }, [fadeTo]);

  // Attempt playback when the invitation is opened; if the browser still
  // blocks it, retry on the very next user interaction.
  useEffect(() => {
    if (!shouldPlay) return;
    let cancelled = false;

    const unlock = () => {
      void start();
    };

    void start().then((ok) => {
      if (cancelled || ok) return;
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("keydown", unlock, { once: true });
      window.addEventListener("touchstart", unlock, { once: true });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
  }, [shouldPlay, start]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void start();
    } else {
      fadeTo(0, () => {
        audio.pause();
        setPlaying(false);
      });
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audio_url} loop preload="auto" playsInline />
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={
          playing ? "Pause background music" : "Play background music"
        }
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed right-5 bottom-5 z-50 grid place-items-center rounded-full border border-gold/50 bg-gold-gradient text-primary-foreground shadow-[var(--shadow-gold)] transition-shadow duration-500 sm:right-8 sm:bottom-8"
        style={{ height: 52, width: 52 }}
      >
        {playing ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Music className="h-5 w-5" />
        )}
        {playing && (
          <>
            <span className="absolute inset-0 animate-ping rounded-full border border-gold/40" />
            <span className="absolute -inset-1.5 animate-pulse rounded-full border border-gold/20" />
          </>
        )}
      </motion.button>
    </>
  );
}
