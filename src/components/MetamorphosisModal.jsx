import React from "react";
import { AnimatePresence, motion } from "motion/react";
import BookPage from "./BookPage";
import PastelConfetti from "./PastelConfetti";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

export default function MetamorphosisModal({ moment, onClose }) {
  const reduce = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <AnimatePresence mode="wait">
      {moment && (
        <motion.div
          key={`modal-${moment.id}`}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <PastelConfetti burstKey={moment.id} />

          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Cerrar modal"
            onClick={onClose}
            className={`absolute inset-0 bg-black/55 ${
              isMobile ? "" : "backdrop-blur-md"
            } cursor-pointer z-[1]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Core shared element - Animación del punto de estrella */}
          <motion.div
            layoutId={`star-core-${moment.id}`}
            className="absolute z-[2]"
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              boxShadow: `0 0 22px rgba(255,255,255,0.85), 0 0 34px ${moment.color}`,
              background: "white",
            }}
            animate={{ opacity: 0, scale: reduce ? 1.2 : 1.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Shell invisible para layoutId - NO afecta visibilidad del contenido */}
          <motion.div
            layoutId={`card-shell-${moment.id}`}
            className="absolute z-[3] pointer-events-none"
            style={{
              width: 1,
              height: 1,
              opacity: 0
            }}
          />

          {/* BookPage independiente - Aparece sin depender del layoutId */}
          <motion.div
            className="relative z-[10] w-full flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ 
              duration: 0.3,
              delay: 0.15, // Pequeño delay para que el confetti aparezca primero
              ease: "easeOut"
            }}
          >
            <BookPage moment={moment} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
