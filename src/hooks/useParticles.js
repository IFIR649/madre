import { useMemo } from "react";

export function useParticles(count = 80) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      blur: Math.random() * 1.2,
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.45 + 0.15,
      drift: (Math.random() * 18 + 8) * (Math.random() > 0.5 ? 1 : -1),
    }));
  }, [count]);

  return particles;
}
