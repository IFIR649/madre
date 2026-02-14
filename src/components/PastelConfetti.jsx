import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function PastelConfetti({ burstKey }) {
  const reduce = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  const pieces = useMemo(() => {
    const palette = [
      "#FFD1DC",
      "#AEC6CF",
      "#B2F2BB",
      "#FDFD96",
      "#E0BBE4",
      "#FFB7B2",
      "#B2E2F2",
      "#FFD8B1",
    ];
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (Math.random() * 2 - 1) * 220,
      y: -Math.random() * 120 - 60,
      rot: (Math.random() * 2 - 1) * 260,
      delay: Math.random() * 0.06,
      color: palette[i % palette.length],
      size: Math.random() * 6 + 6,
    }));
  }, [burstKey]);

  useEffect(() => {
    if (!burstKey) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(t);
  }, [burstKey]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              className="absolute left-1/2 top-1/2 rounded-[3px]"
              style={{
                width: p.size,
                height: p.size * 0.65,
                backgroundColor: p.color,
                boxShadow: "0 0 10px rgba(255,255,255,0.25)",
              }}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x, y: p.y, rotate: p.rot, opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.35, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
