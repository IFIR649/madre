import React, { useMemo, useRef } from "react";
import { motion } from "motion/react";
import { useMouseParallaxVars } from "../hooks/useMouseParallaxVars";
import { useMagnetField } from "../hooks/useMagnetField";

export default function Constellation({ moments, onSelect, selectedId, disabled = false }) {
  const canvasRef = useRef(null);

  useMouseParallaxVars(canvasRef, 14);

  const offsets = useMagnetField(canvasRef, moments, {
    radius: 150,
    strength: 18,
    ease: 0.11,
  });

  const byId = useMemo(() => {
    const m = new Map();
    for (const o of offsets.entries()) m.set(o[0], o[1]);
    return m;
  }, [offsets]);

  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
      <div
        ref={canvasRef}
        className="relative w-full max-w-[520px] aspect-[4/5] md:aspect-square"
        style={{
          "--mx": 0,
          "--my": 0,
          "--parallax": 14,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform:
              "translate3d(calc(var(--mx) * var(--parallax) * 1px), calc(var(--my) * var(--parallax) * 1px), 0)",
            transition: "transform 120ms ease-out",
          }}
        >
          {moments.map((m, index) => {
            const isSelected = selectedId === m.id;
            const off = byId.get(m.id) || { dx: 0, dy: 0 };

            return (
              <motion.button
                key={m.id}
                type="button"
                aria-label={m.title}
                onClick={() => {
                  if (disabled) return;
                  if (m.isGuide) return;
                  onSelect(m.id);
                }}
                className={`absolute group ${disabled ? "cursor-default" : ""}`}
                style={{
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: `translate(-50%, -50%) translate3d(${off.dx}px, ${off.dy}px, 0)`,
                }}
                initial={{
                  opacity: 0,
                  y: -420,
                  x: m.fallDx ?? 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  scale: isSelected ? 1.22 : 1,
                }}
                transition={{
                  duration: 1.4,
                  delay: index * 0.12,
                  type: "spring",
                  stiffness: 60,
                  damping: 18,
                }}
              >
                <motion.span layoutId={`star-core-${m.id}`} className="relative block">
                  <span
                    className="block rounded-full"
                    style={{
                      width: "clamp(6px, 1.1vw, 12px)",
                      height: "clamp(6px, 1.1vw, 12px)",
                      background: "white",
                      boxShadow: "0 0 18px rgba(255,255,255,0.85)",
                    }}
                  />
                  <span
                    className="absolute inset-0 rounded-full blur-md opacity-60"
                    style={{
                      backgroundColor: m.color,
                      transform: "scale(1.6)",
                    }}
                  />
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  whileHover={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                  className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/90 text-[10px] tracking-[0.22em] uppercase font-sans-soft"
                >
                  {m.title}
                </motion.span>

                {m.isGuide && (
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[11px] text-white/70 font-sans-soft tracking-widest">
                    Toca una estrella ✨
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
