import React from "react";

export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute top-6 left-6 z-20 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white/80 text-[11px] tracking-[0.28em] uppercase font-sans-soft backdrop-blur-md transition"
      aria-label={enabled ? "Desactivar sonido" : "Activar sonido"}
      title={enabled ? "Sonido: ON" : "Sonido: OFF"}
    >
      {enabled ? "🔈 Sound" : "🔇 Sound"}
    </button>
  );
}
