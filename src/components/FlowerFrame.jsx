import React from "react";
import { motion } from "motion/react";

export default function FlowerFrame({ color, children }) {
  const petals = Array.from({ length: 8 });

  const wrap = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.10, delayChildren: 0.25 },
    },
  };

  const petal = {
    hidden: { scale: 0, opacity: 0, rotate: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 16, mass: 1.2 },
    },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Pétalos */}
      <motion.div variants={wrap} initial="hidden" animate="show" className="absolute inset-0 flex items-center justify-center">
        {petals.map((_, i) => (
          <motion.div
            key={i}
            variants={petal}
            className="absolute rounded-full"
            style={{
              width: "min(68vw, 340px)",
              height: "min(22vw, 150px)",
              backgroundColor: color,
              opacity: 0.18,
              border: "1px solid rgba(255,255,255,0.45)",
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Centro */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
