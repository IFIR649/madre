import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Returns a magnet field for elements positioned with % (x,y).
 * Calculates offsets (dx,dy) in px for each id.
 */
export function useMagnetField(containerRef, points, opts = {}) {
  const reduce = usePrefersReducedMotion();
  const { radius = 140, strength = 18, ease = 0.12 } = opts;

  const [offsets, setOffsets] = useState(() => new Map());
  const targetRef = useRef({ x: 0, y: 0, active: false });
  const currentRef = useRef(new Map());
  const rafRef = useRef(null);

  const pointsMemo = useMemo(() => points, [points]);

  useEffect(() => {
    if (reduce) return;
    const el = containerRef?.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      targetRef.current.x = e.clientX - r.left;
      targetRef.current.y = e.clientY - r.top;
      targetRef.current.active = true;
    };

    const onLeave = () => {
      targetRef.current.active = false;
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, reduce]);

  useEffect(() => {
    if (reduce) return;
    const el = containerRef?.current;
    if (!el) return;

    const tick = () => {
      const r = el.getBoundingClientRect();
      const next = new Map(currentRef.current);

      for (const p of pointsMemo) {
        if (p.isGuide) {
          next.set(p.id, { dx: 0, dy: 0 });
          continue;
        }

        const baseX = (p.x / 100) * r.width;
        const baseY = (p.y / 100) * r.height;

        let tx = 0;
        let ty = 0;

        if (targetRef.current.active) {
          const dx = targetRef.current.x - baseX;
          const dy = targetRef.current.y - baseY;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            const pull = 1 - dist / radius;
            const mag = strength * pull;
            tx = (dx / (dist || 1)) * mag;
            ty = (dy / (dist || 1)) * mag;
          }
        }

        const prev = next.get(p.id) || { dx: 0, dy: 0 };
        const ndx = prev.dx + (tx - prev.dx) * ease;
        const ndy = prev.dy + (ty - prev.dy) * ease;

        next.set(p.id, { dx: ndx, dy: ndy });
      }

      currentRef.current = next;
      setOffsets(next);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, pointsMemo, radius, strength, ease, reduce]);

  return offsets;
}
