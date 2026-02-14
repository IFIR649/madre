import React from "react";

export default function SpotifyPlaylist({
  title = "Playlist para mama",
  playlistId,
  theme = 0,
  height = 152,
}) {
  if (!playlistId) return null;

  return (
    <div className="w-full max-w-md">
      <div className="text-[11px] tracking-[0.35em] uppercase text-white/70 font-sans-soft mb-3 text-center">
        {title}
      </div>

      <div className="rounded-[1.5rem] overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-md">
        <iframe
          title={title}
          style={{ borderRadius: 24 }}
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}`}
          width="100%"
          height={height}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      <div className="text-xs text-white/55 font-sans-soft mt-2 text-center">
        tip: dale play una vez y deja que acompanie todo el recorrido
      </div>
    </div>
  );
}
