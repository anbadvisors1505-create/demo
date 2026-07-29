"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useModals } from "@/components/ModalProvider";
import { trackEvent } from "@/lib/analytics";
import Button from "@/components/ui/Button";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { openBookConsultation, openSpeakToCa } = useModals();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backZ = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const midZ = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="perspective-container relative flex min-h-[100svh] items-center overflow-hidden bg-ink pb-24 pt-32 sm:pt-36"
    >
      {/* depth layer 1 — ledger rules, furthest back */}
      <motion.div
        style={{ z: backZ }}
        className="preserve-3d pointer-events-none absolute inset-0 opacity-[0.14]"
      >
        <div className="h-full w-full ledger-rule" />
      </motion.div>

      {/* depth layer 2 — ambient brass glow, mid depth */}
      <motion.div
        style={{ z: midZ }}
        className="preserve-3d pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-brass/10 blur-[120px] sm:-right-20"
      />
      <motion.div
        style={{ z: midZ }}
        className="preserve-3d pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-teal/20 blur-[110px]"
      />

      {/* content, front depth layer */}
      <motion.div
        style={{ y: frontY, opacity: fade }}
        className="preserve-3d relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs uppercase tracking-widest2 text-brass"
        >
          {siteConfig.companyName}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-3xl text-balance font-display text-4xl leading-[1.08] text-paper sm:text-5xl md:text-6xl"
        >
          Strategic finance, built for the next decision — not the last one.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-balance font-body text-base leading-relaxed text-paper/70 sm:text-lg"
        >
          Virtual CFO, M&amp;A advisory, valuation, IPO readiness and cross-border
          structuring for founders, SMEs, HNIs and international investors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button
            onClick={() => {
              trackEvent("cta_click", { location: "hero", label: "book_consultation" });
              openBookConsultation();
            }}
          >
            Book Consultation
          </Button>
          <Button
            variant="outline"
            className="border-paper/30 text-paper hover:border-brass hover:bg-paper/5 hover:text-paper"
            onClick={() => {
              trackEvent("speak_to_ca_click", { location: "hero" });
              openSpeakToCa();
            }}
          >
            Speak to a CA Free
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-paper/10 pt-8 sm:grid-cols-4"
        >
          {siteConfig.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl text-brass sm:text-3xl">{stat.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-paper/50">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
