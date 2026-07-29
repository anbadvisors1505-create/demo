"use client";

import { motion } from "framer-motion";
import { useModals } from "@/components/ModalProvider";
import { trackEvent } from "@/lib/analytics";

export default function FloatingCTA() {
  const { openSpeakToCa } = useModals();

  return (
    <motion.button
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      onClick={() => {
        trackEvent("speak_to_ca_click", { location: "floating_cta" });
        openSpeakToCa();
      }}
      className="fixed bottom-6 right-5 z-40 flex items-center gap-2 rounded-full bg-brass px-5 py-3.5 font-body text-sm font-medium text-ink shadow-[0_16px_40px_-14px_rgba(196,163,90,0.7)] transition-colors hover:bg-brass-light sm:bottom-8 sm:right-8"
      aria-label="Speak to a CA — Free"
    >
      <span aria-hidden>💬</span>
      <span className="hidden sm:inline">Speak to a CA Free</span>
      <span className="sm:hidden">Speak to CA</span>
    </motion.button>
  );
}
