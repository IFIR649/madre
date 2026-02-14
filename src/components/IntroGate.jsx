import React from "react";
import { motion } from "motion/react";
import SpotifyPlaylist from "./SpotifyPlaylist";

const PLAYLIST_ID = "2m9DByI15vLxnDK9vWbANV";

export default function IntroGate({ open, onStart }) {
  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center p-4 md:p-6"
      style={{ pointerEvents: open ? "auto" : "none" }}
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-hidden={!open}
    >
      {open && (
        <>
          <motion.div
            className="absolute inset-0 bg-black/35"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 backdrop-blur-xl" />
        </>
      )}

      <motion.div
        className="relative w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.55)] overflow-hidden"
        initial={false}
        animate={
          open
            ? { y: 0, scale: 1, opacity: 1, filter: "blur(0px)" }
            : { y: -10, scale: 1.02, opacity: 0, filter: "blur(10px)" }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,183,178,0.6), transparent 60%)",
          }}
        />

        <div className="relative max-h-[88vh] overflow-auto">
          <div className="p-6 md:p-10">
            <div className="text-white/80 font-sans-soft text-[11px] tracking-[0.35em] uppercase">
              Bienvenida
            </div>

            <h1 className="mt-3 text-white font-handwritten text-3xl md:text-5xl leading-tight">
              En conmemoracion de los 50 anos de Mama
            </h1>

            <p className="mt-4 text-white/70 font-sans-soft text-sm md:text-base leading-relaxed">
              Un recorrido de recuerdos. Si quieres, pon musica para acompaniar el camino.
            </p>

            <div className="mt-7 flex justify-center">
              <SpotifyPlaylist
                title="Playlist del recorrido"
                playlistId={PLAYLIST_ID}
                theme={0}
                height={152}
              />
            </div>

            <div className="mt-4 text-xs text-white/55 font-sans-soft text-center">
              tip: dale play una vez; la musica seguira mientras recorres
            </div>

            <div className="h-28 md:h-24" />
          </div>

          <div className="sticky bottom-0 left-0 right-0 p-4 md:p-6 bg-black/25 backdrop-blur-xl border-t border-white/10">
            <motion.button
              type="button"
              onClick={onStart}
              className="w-full rounded-full px-6 py-4 bg-white text-slate-900 font-sans-soft text-sm tracking-[0.25em] uppercase shadow-[0_20px_70px_rgba(0,0,0,0.35)] hover:scale-[1.01] active:scale-[0.99] transition"
              whileTap={{ scale: 0.98 }}
            >
              Empezar recorrido
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
