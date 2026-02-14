import React from "react";
import { motion } from "motion/react";
import FlowerFrame from "./FlowerFrame";

export default function BookPage({ moment, onClose }) {
  return (
    <motion.div
      layoutId={`card-shell-${moment.id}`}
      className="relative w-full max-w-5xl h-[85vh] md:h-[620px] rounded-sm overflow-hidden shadow-[20px_20px_70px_rgba(0,0,0,0.55)] bg-[#fff9f5] flex flex-col md:flex-row paper-texture"
      style={{ borderLeft: "10px solid rgba(0,0,0,0.08)" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/6 via-transparent to-black/6" />

      <div className="relative w-full md:w-1/2 h-1/2 md:h-full p-6 md:p-10 bg-[#fcf5ed]/70">
        <FlowerFrame color={moment.color}>
          <motion.div
            className="relative bg-white p-3 pb-10 shadow-xl border border-black/5"
            initial={{ y: 18, opacity: 0, rotate: -2 }}
            animate={{ y: 0, opacity: 1, rotate: -2 }}
            transition={{ delay: 0.55, type: "spring", stiffness: 70, damping: 16, mass: 1.15 }}
          >
            <motion.div
              className="w-[min(72vw,360px)] aspect-square overflow-hidden bg-black/10"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
            >
              <img
                src={moment.img}
                alt={moment.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <div className="absolute bottom-3 left-0 right-0 text-center text-gray-400 font-handwritten text-lg">
              {moment.id < 10 ? `0${moment.id}` : moment.id}
            </div>
          </motion.div>
        </FlowerFrame>
      </div>

      <div className="relative w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-14 bg-white/55 backdrop-blur-sm border-l border-black/5 flex flex-col justify-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-300 hover:text-pink-400 transition-colors text-2xl"
          aria-label="Cerrar"
        >
          x
        </button>

        <motion.h2
          className="font-handwritten text-3xl md:text-5xl text-gray-800 mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: "easeOut" }}
        >
          {moment.title}
        </motion.h2>

        <motion.div
          className="h-[3px] rounded-full mb-7"
          style={{ backgroundColor: moment.color, width: 64 }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 64, opacity: 1 }}
          transition={{ delay: 1.22, duration: 0.55, ease: "easeOut" }}
        />

        <motion.p
          className="font-sans-soft text-[15px] md:text-lg text-gray-600 leading-relaxed italic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
        >
          "{moment.deseo}"
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.6, ease: "easeOut" }}
          className="mt-10 text-xs tracking-[0.35em] uppercase text-gray-400 font-sans-soft"
        >
          Con todo mi amor
        </motion.div>
      </div>
    </motion.div>
  );
}
