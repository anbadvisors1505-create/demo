"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/site-config";
import { SectionIntro } from "@/components/sections/Capabilities";

export default function Industries() {
  return (
    <section id="industries" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionIntro light eyebrow="Industries" title="Sectors we work inside" />

        <div className="mt-14 flex flex-wrap gap-3">
          {industries.map((industry, i) => (
            <motion.span
              key={industry}
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, borderColor: "rgba(196,163,90,0.8)" }}
              className="rounded-full border border-paper/15 px-5 py-2.5 font-body text-sm text-paper/80 transition-colors"
            >
              {industry}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
