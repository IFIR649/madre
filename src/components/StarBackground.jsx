import React from "react";
import { motion } from "motion/react";
import { useParticles } from "../hooks/useParticles";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function StarBackground() {
  const reduce = usePrefersReducedMotion();
  const particles = useParticles(90);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Nebula haze */}
      <div
        className="absolute -top-24 -left-28 w-[520px] h-[520px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,183,178,0.55), transparent 55%)",
        }}
      />
      <div
        className="absolute -bottom-28 -right-28 w-[640px] h-[640px] rounded-full blur-3xl opacity-22"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(178,226,242,0.55), transparent 58%)",
        }}
      />

      {/* Stars */}
      {particles.map((p) => {
        const style = {
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          boxShadow: `0 0 ${p.size * 3}px rgba(255,255,255,0.75)`,
        };

        if (reduce) {
          return <div key={p.id} className="absolute rounded-full bg-white/80" style={style} />;
        }

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={style}
            animate={{
              opacity: [p.opacity, 1, p.opacity],
              scale: [1, 1.25, 1],
              y: [0, -14, 0],
              x: [0, p.drift, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Pastel depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-pink-900/12" />
      {/* Vignette */}
      <div className="absolute inset-0 vignette" />
    </div>
  );
}
