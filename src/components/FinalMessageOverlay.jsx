import React from "react";
import { AnimatePresence, motion } from "motion/react";

export default function FinalMessageOverlay({ open, onDone }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeOut" } }}
        >
          {/* Blur background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

          <motion.div
            className="relative w-full max-w-2xl rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-2xl px-7 py-10 md:px-10 md:py-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-white/80 font-sans-soft text-[11px] tracking-[0.35em] uppercase">
              Para ti
            </div>

            <h2 className="mt-4 text-white font-handwritten text-3xl md:text-5xl leading-tight">
              Con todo el amor que te tenemos
              <br />
              Feliz cumpleaños Mamá
            </h2>

            <p className="mt-6 text-white/75 font-sans-soft text-sm md:text-base leading-relaxed">
              Esta página fue creada desde cero por tu hijo,
              a quien apoyaste tanto en la vida y en su carrera.
              <br /><br />
              Esto, mamá, es el resultado de lo que me diste
              y de la confianza que sembraste en mí.
              <br /><br />
              Con amor,
              <br />
              <span className="font-handwritten text-lg text-white">
                tu hijo Alexis
              </span>
            </p>

            <motion.button
              type="button"
              onClick={onDone}
              className="mt-10 rounded-full px-7 py-4 bg-white text-slate-900 font-sans-soft text-sm tracking-[0.25em] uppercase shadow-[0_20px_70px_rgba(0,0,0,0.35)] hover:scale-[1.01] active:scale-[0.99] transition"
              whileTap={{ scale: 0.98 }}
            >
              Volver a la constelación 
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
