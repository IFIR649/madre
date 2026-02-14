import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function SparkleCursor() {
  const reduce = usePrefersReducedMotion();
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const last = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    if (reduce) return;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const loop = () => {
      const dx = pos.current.x - last.current.x;
      const dy = pos.current.y - last.current.y;

      last.current.x += dx * 0.18;
      last.current.y += dy * 0.18;

      const x = last.current.x;
      const y = last.current.y;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <>
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-40"
        style={{ width: 14, height: 14, marginLeft: -7, marginTop: -7 }}
      >
        <div className="w-full h-full rounded-full blur-md opacity-40 bg-white" />
      </div>

      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
      >
        <div className="w-full h-full rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
      </div>
    </>
  );
}
