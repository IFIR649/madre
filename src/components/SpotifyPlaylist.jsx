import React, { useEffect, useState } from "react";

export default function SpotifyPlaylist({
  title = "Playlist para mama",
  playlistId,
  theme = 0,
  height = 152,
}) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!playlistId) return null;

  if (!shouldLoad) {
    return (
      <div
        className="w-full rounded-xl bg-slate-800/50 animate-pulse"
        style={{ height }}
      />
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="mb-2 text-white/60 font-sans-soft text-[10px] tracking-widest uppercase">
          {title}
        </div>
      )}

      <iframe
        title={title}
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}`}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
