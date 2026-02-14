import React from "react";
import { useParticles } from "../hooks/useParticles";
import { useMouseParallaxVars } from "../hooks/useMouseParallaxVars";
import { useIsMobile } from "../hooks/useIsMobile";

export default function StarBackground() {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 45 : 90;
  const particles = useParticles(particleCount);
  useMouseParallaxVars();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: `blur(${p.blur ?? 0}px)`,
            animation: `twinkle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            willChange: isMobile ? "auto" : "opacity",
          }}
        />
      ))}
    </div>
  );
}
