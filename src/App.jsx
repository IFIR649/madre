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

  const [currentTourIndex, setCurrentTourIndex] = useState(-1);
  const timerRef = useRef(null);

  const tourIds = useMemo(
    () => MOMENTS.filter((m) => !m.isGuide).map((m) => m.id),
    []
  );

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

    const RAIN_MS = Math.round((MOMENTS.length - 1) * 120 + 1600);
    const INTRO_GATE_DELAY = 900;

    const run = async () => {
      setTourRunning(true);
      console.log("Tour iniciado - esperando que cierre el IntroGate...");

      await sleep(INTRO_GATE_DELAY);
      console.log("IntroGate cerrado");

      console.log("Esperando lluvia de estrellas...");
      await sleep(RAIN_MS);
      console.log("Lluvia completada");

      await sleep(400);
      console.log("Layout estabilizado");

      setCurrentTourIndex(0);
    };

    run().catch((err) => {
      console.error("Error en run():", err);
      setTourRunning(false);
    });

    return undefined;
  }, [started, tourDone]);

  useEffect(() => {
    if (!tourRunning || tourDone || currentTourIndex < 0) return;

    if (currentTourIndex >= tourIds.length) {
      setFinalOpen(true);
      return;
    }

    const id = tourIds[currentTourIndex];
    console.log(`Abriendo estrella ${id}...`);
    setSelectedId(id);

    timerRef.current = setTimeout(() => {
      console.log(`Cerrando estrella ${id}`);
      setSelectedId(null);

      timerRef.current = setTimeout(() => {
        setCurrentTourIndex((prev) => prev + 1);
      }, GAP_MS);
    }, OPEN_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentTourIndex, tourRunning, tourDone, tourIds]);

  const onStart = () => {
    setStarted(true);
  };

  const onFinalDone = () => {
    setFinalOpen(false);
    setTourDone(true);
    setTourRunning(false);
  };

  const handlePrevious = () => {
    if (currentTourIndex <= 0) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setSelectedId(null);
    setTimeout(() => {
      setCurrentTourIndex((prev) => prev - 1);
    }, 300);
  };

  const handleNext = () => {
    if (currentTourIndex >= tourIds.length - 1) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setSelectedId(null);
    setTimeout(() => {
      setCurrentTourIndex((prev) => prev + 1);
    }, 300);
  };

  const handleSkip = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setSelectedId(null);
    setTimeout(() => {
      setCurrentTourIndex(tourIds.length);
    }, 300);
  };

  const interactionLocked = tourRunning && !tourDone;
  const showControls = tourRunning && !tourDone && !finalOpen && selectedId !== null;

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
            <div className="fixed bottom-6 left-0 right-0 z-[90] px-4">
              {/* Controles principales en dos filas en móvil */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                {/* Fila 1: Navegación (móvil) / Todo junto (desktop) */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                  {/* Botón Anterior */}
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentTourIndex <= 0}
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2.5 rounded-full bg-slate-900/90 backdrop-blur-xl border-2 border-white/30 hover:bg-slate-800/90 hover:border-white/50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    aria-label="Anterior"
                  >
                    <svg
                      className="w-5 h-5 md:w-4 md:h-4 text-white"
                      fill="none"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="hidden md:inline-block ml-2 text-white font-sans-soft text-xs tracking-wider uppercase">
                      Anterior
                    </span>
                  </button>

                  {/* Indicador de progreso */}
                  <div className="flex-shrink-0 flex items-center justify-center px-5 py-2.5 md:px-4 md:py-2 rounded-full bg-slate-900/90 backdrop-blur-xl border-2 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    <span className="text-white font-sans-soft text-sm md:text-xs font-semibold tracking-wider">
                      {currentTourIndex + 1} / {tourIds.length}
                    </span>
                  </div>

                  {/* Botón Siguiente */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentTourIndex >= tourIds.length - 1}
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2.5 rounded-full bg-slate-900/90 backdrop-blur-xl border-2 border-white/30 hover:bg-slate-800/90 hover:border-white/50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    aria-label="Siguiente"
                  >
                    <span className="hidden md:inline-block mr-2 text-white font-sans-soft text-xs tracking-wider uppercase">
                      Siguiente
                    </span>
                    <svg
                      className="w-5 h-5 md:w-4 md:h-4 text-white"
                      fill="none"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Fila 2: Botón Skip (móvil) / Junto con navegación (desktop) */}
                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full md:w-auto px-6 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-xl border-2 border-white/30 hover:bg-slate-800/90 hover:border-white/50 transition shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  aria-label="Saltar al final"
                >
                  <span className="text-white font-sans-soft text-xs md:text-[11px] tracking-widest uppercase font-medium">
                    ⏭ Saltar al Final
                  </span>
                </button>
              </div>
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
