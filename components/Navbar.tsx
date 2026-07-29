"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-config";
import { useModals } from "@/components/ModalProvider";
import { trackEvent } from "@/lib/analytics";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBookConsultation, openSpeakToCa } = useModals();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/90 shadow-[0_1px_0_rgba(196,163,90,0.25)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a
          href="#top"
          className="font-display text-lg tracking-tight text-ink"
          onClick={() => trackEvent("nav_click", { target: "logo" })}
        >
          {siteConfig.shortName}
          <span className="ml-2 hidden font-body text-[10px] font-medium uppercase tracking-widest2 text-graphite/50 sm:inline">
            Advisors LLP
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => trackEvent("nav_click", { target: link.label })}
              className="relative font-body text-sm text-ink/70 transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brass after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={openSpeakToCa}
            className="font-body text-sm text-ink/70 transition-colors hover:text-brass-dark"
          >
            Speak to a CA Free
          </button>
          <button
            onClick={openBookConsultation}
            className="rounded-full bg-ink px-5 py-2.5 font-body text-sm font-medium text-paper transition-all duration-300 hover:bg-teal-dark hover:-translate-y-0.5"
          >
            Book Consultation
          </button>
        </div>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`h-px w-6 bg-ink transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-col gap-1 border-t border-line bg-paper px-5 pb-6 pt-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-3 font-body text-sm text-ink/80 hover:bg-ink/5"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              openSpeakToCa();
            }}
            className="mt-2 rounded-lg border border-brass/40 px-3 py-3 text-center font-body text-sm text-ink"
          >
            Speak to a CA Free
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              openBookConsultation();
            }}
            className="mt-2 rounded-lg bg-ink px-3 py-3 text-center font-body text-sm text-paper"
          >
            Book Consultation
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
