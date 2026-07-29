"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

const LETTERS = ["A", "N", "B"];

export default function LoadingScreen({
  onDone,
  onSpeakToCa,
}: {
  onDone: () => void;
  onSpeakToCa: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Random simulated load time between 10ms and 2s, per brief.
    const duration = Math.random() * (2000 - 10) + 10;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        trackEvent("loading_screen_complete", { duration_ms: Math.round(duration) });
        setTimeout(() => setVisible(false), 320);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(onDone, 550);
      return () => clearTimeout(t);
    }
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="perspective-container">
            <motion.div
              className="preserve-3d flex items-end gap-2 sm:gap-4"
              initial="hidden"
              animate="show"
            >
              {LETTERS.map((letter, i) => (
                <motion.div
                  key={letter}
                  className="preserve-3d relative"
                  initial={{
                    opacity: 0,
                    rotateX: 55,
                    z: -220,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    z: 0,
                    y: 0,
                  }}
                  transition={{
                    delay: i * 0.14,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* stacked translucent ledger planes for depth */}
                  <span
                    aria-hidden
                    className="absolute inset-0 font-display text-brass/20 blur-[2px]"
                    style={{ transform: "translateZ(-40px) translateY(6px)" }}
                  >
                    {letter}
                  </span>
                  <span
                    aria-hidden
                    className="absolute inset-0 font-display text-brass/40 blur-[1px]"
                    style={{ transform: "translateZ(-20px) translateY(3px)" }}
                  >
                    {letter}
                  </span>
                  <span className="relative font-display text-brass text-7xl sm:text-8xl md:text-9xl leading-none tracking-tight">
                    {letter}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.p
            className="mt-6 font-mono text-[11px] tracking-widest2 uppercase text-paper/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            Strategic Finance &amp; Corporate Advisory
          </motion.p>

          <motion.div
            className="mt-8 h-px w-40 overflow-hidden bg-paper/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-brass"
              style={{ width: `${progress}%` }}
            />
          </motion.div>

          <motion.button
            type="button"
            onClick={() => {
              trackEvent("speak_to_ca_click", { location: "loading_screen" });
              onSpeakToCa();
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group mt-9 inline-flex items-center gap-2 rounded-full border border-brass/40 px-5 py-2.5 font-body text-xs uppercase tracking-widest2 text-paper/80 transition-colors duration-300 hover:border-brass hover:text-brass"
          >
            Speak to a CA — Free
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
