import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Updates CSS variables for parallax:
 * --mx, --my in range [-1..1]
 */
export function useMouseParallaxVars(ref, strength = 14) {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref?.current;
    if (!el) return;

    let raf = null;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const mx = (x - 0.5) * 2;
      const my = (y - 0.5) * 2;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", mx.toFixed(4));
        el.style.setProperty("--my", my.toFixed(4));
        el.style.setProperty("--parallax", String(strength));
      });
    };

    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, strength, reduce]);
}
