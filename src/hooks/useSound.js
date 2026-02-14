import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Audio en web: solo puede reproducirse tras interacción del usuario.
 * Este hook:
 * - precarga
 * - permite toggle on/off
 * - reproduce de forma segura (catch silencioso)
 */
export function useSound() {
  const [enabled, setEnabled] = useState(true);
  const unlockedRef = useRef(false);

  const shimmerRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    shimmerRef.current = new Audio("/assets/sfx/shimmer.mp3");
    pageRef.current = new Audio("/assets/sfx/page.mp3");

    // Menos invasivo
    shimmerRef.current.volume = 0.35;
    pageRef.current.volume = 0.35;

    shimmerRef.current.preload = "auto";
    pageRef.current.preload = "auto";
  }, []);

  const unlock = useCallback(async () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;

    // Intento de “warm up” (sin sonido audible)
    try {
      if (shimmerRef.current) {
        shimmerRef.current.muted = true;
        await shimmerRef.current.play();
        shimmerRef.current.pause();
        shimmerRef.current.currentTime = 0;
        shimmerRef.current.muted = false;
      }
      if (pageRef.current) {
        pageRef.current.muted = true;
        await pageRef.current.play();
        pageRef.current.pause();
        pageRef.current.currentTime = 0;
        pageRef.current.muted = false;
      }
    } catch {
      // Si el navegador lo bloquea, no pasa nada;
      // el primer play real tras click suele funcionar.
    }
  }, []);

  const play = useCallback(
    async (name) => {
      if (!enabled) return;

      const a = name === "page" ? pageRef.current : shimmerRef.current;
      if (!a) return;

      try {
        // reinicia para que pueda sonar rápido en clicks seguidos
        a.currentTime = 0;
        await a.play();
      } catch {
        // bloqueado o no permitido: silencioso
      }
    },
    [enabled]
  );

  return {
    enabled,
    setEnabled,
    unlock,
    play,
  };
}
