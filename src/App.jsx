import React, { useEffect, useMemo, useRef, useState } from "react";
import StarBackground from "./components/StarBackground";
import Constellation from "./components/Constellation";
import MetamorphosisModal from "./components/MetamorphosisModal";
import SparkleCursor from "./components/SparkleCursor";
import IntroGate from "./components/IntroGate";
import FinalMessageOverlay from "./components/FinalMessageOverlay";
import { moments as MOMENTS } from "./data/moments";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const OPEN_MS = 8000;
const GAP_MS = 1000;

export default function App() {
  const [started, setStarted] = useState(false);

  const [tourRunning, setTourRunning] = useState(false);
  const [tourDone, setTourDone] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [finalOpen, setFinalOpen] = useState(false);
  const tourStartedRef = useRef(false);
  
  // Nuevo: índice actual en el tour
  const [currentTourIndex, setCurrentTourIndex] = useState(-1);
  const tourTimerRef = useRef(null);

  const selectedMoment = useMemo(
    () => MOMENTS.find((m) => m.id === selectedId) ?? null,
    [selectedId]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (tourRunning) return;
      if (finalOpen) return;
      setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tourRunning, finalOpen]);

  useEffect(() => {
    if (!started || tourDone) return;
    if (tourStartedRef.current) return;
    tourStartedRef.current = true;
    
    const tourIds = MOMENTS.filter((m) => !m.isGuide).map((m) => m.id);
    const RAIN_MS = Math.round((MOMENTS.length - 1) * 120 + 1600);
    const INTRO_GATE_DELAY = 900;

    const run = async () => {
      setTourRunning(true);
      
      await sleep(INTRO_GATE_DELAY);
      await sleep(RAIN_MS);
      await sleep(400);

      // Iniciar desde el índice 0
      setCurrentTourIndex(0);
    };

    run().catch((error) => {
      console.error("💥 Error en run():", error);
      setTourRunning(false);
    });

    return undefined;
  }, [started, tourDone]);

  // Efecto que maneja el ciclo automático basado en currentTourIndex
  useEffect(() => {
    if (!tourRunning || tourDone) return;
    if (currentTourIndex < 0) return;

    const tourIds = MOMENTS.filter((m) => !m.isGuide).map((m) => m.id);

    // Si llegamos al final del tour
    if (currentTourIndex >= tourIds.length) {
      setFinalOpen(true);
      return;
    }

    // Mostrar la estrella actual
    const currentId = tourIds[currentTourIndex];
    setSelectedId(currentId);

    // Timer para avanzar automáticamente después de OPEN_MS
    tourTimerRef.current = setTimeout(() => {
      setSelectedId(null);
      
      // Esperar GAP_MS antes de avanzar al siguiente
      setTimeout(() => {
        setCurrentTourIndex((prev) => prev + 1);
      }, GAP_MS);
    }, OPEN_MS);

    // Cleanup del timer cuando el índice cambia
    return () => {
      if (tourTimerRef.current) {
        clearTimeout(tourTimerRef.current);
        tourTimerRef.current = null;
      }
    };
  }, [currentTourIndex, tourRunning, tourDone]);

  const onStart = () => {
    setStarted(true);
  };

  const onFinalDone = () => {
    setFinalOpen(false);
    setTourDone(true);
    setTourRunning(false);
  };

  // Funciones de navegación
  const handlePrevious = () => {
    if (currentTourIndex <= 0) return;
    
    // Cancelar el timer actual
    if (tourTimerRef.current) {
      clearTimeout(tourTimerRef.current);
      tourTimerRef.current = null;
    }
    
    // Cerrar el actual
    setSelectedId(null);
    
    // Ir al anterior después de un pequeño delay
    setTimeout(() => {
      setCurrentTourIndex((prev) => prev - 1);
    }, 300);
  };

  const handleNext = () => {
    const tourIds = MOMENTS.filter((m) => !m.isGuide).map((m) => m.id);
    if (currentTourIndex >= tourIds.length - 1) return;
    
    // Cancelar el timer actual
    if (tourTimerRef.current) {
      clearTimeout(tourTimerRef.current);
      tourTimerRef.current = null;
    }
    
    // Cerrar el actual
    setSelectedId(null);
    
    // Ir al siguiente después de un pequeño delay
    setTimeout(() => {
      setCurrentTourIndex((prev) => prev + 1);
    }, 300);
  };

  const handleSkip = () => {
    // Cancelar el timer actual
    if (tourTimerRef.current) {
      clearTimeout(tourTimerRef.current);
      tourTimerRef.current = null;
    }
    
    // Cerrar el modal actual
    setSelectedId(null);
    
    // Ir directamente al mensaje final
    setTimeout(() => {
      const tourIds = MOMENTS.filter((m) => !m.isGuide).map((m) => m.id);
      setCurrentTourIndex(tourIds.length);
    }, 300);
  };

  const interactionLocked = tourRunning && !tourDone;
  const showControls = tourRunning && !tourDone && !finalOpen && selectedId !== null;
  const tourIds = MOMENTS.filter((m) => !m.isGuide).map((m) => m.id);

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #581c87 100%)",
      }}
    >
      <StarBackground />
      <SparkleCursor />

      <IntroGate open={!started} onStart={onStart} />

      {started && (
        <>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Constellation
              moments={MOMENTS}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
              disabled={interactionLocked}
            />
          </div>

          {tourDone && !selectedId && (
            <div className="absolute bottom-8 left-0 right-0 text-center z-10">
              <p className="font-sans-soft text-white/70 text-[11px] tracking-[0.35em] uppercase">
                Toca una estrella para descubrir un deseo
              </p>
            </div>
          )}

          {interactionLocked && !showControls && (
            <div className="absolute top-6 left-0 right-0 z-10 text-center">
              <p className="font-sans-soft text-white/60 text-[11px] tracking-[0.35em] uppercase">
                Recorrido automatico
              </p>
            </div>
          )}

          {/* Controles de navegación */}
          {showControls && (
            <div className="fixed bottom-8 left-0 right-0 z-[90] flex items-center justify-center gap-6 px-4">
              {/* Botón Anterior */}
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentTourIndex <= 0}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Anterior"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-white/90 font-sans-soft text-xs tracking-wider uppercase">
                  Anterior
                </span>
              </button>

              {/* Indicador de progreso */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-white/90 font-sans-soft text-xs tracking-wider">
                  {currentTourIndex + 1} / {tourIds.length}
                </span>
              </div>

              {/* Botón Siguiente */}
              <button
                type="button"
                onClick={handleNext}
                disabled={currentTourIndex >= tourIds.length - 1}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Siguiente"
              >
                <span className="text-white/90 font-sans-soft text-xs tracking-wider uppercase">
                  Siguiente
                </span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Botón Skip */}
              <button
                type="button"
                onClick={handleSkip}
                className="ml-4 px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 hover:bg-white/25 transition"
                aria-label="Saltar al final"
              >
                <span className="text-white/90 font-sans-soft text-xs tracking-widest uppercase">
                  Saltar al final
                </span>
              </button>
            </div>
          )}

          <MetamorphosisModal
            moment={selectedMoment}
            onClose={() => {
              if (interactionLocked) return;
              setSelectedId(null);
            }}
          />

          <FinalMessageOverlay open={finalOpen} onDone={onFinalDone} />
        </>
      )}
    </main>
  );
}
