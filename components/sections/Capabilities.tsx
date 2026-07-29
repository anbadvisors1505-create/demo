"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/lib/site-config";

export default function Capabilities() {
  return (
    <section className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionIntro
          eyebrow="Capabilities"
          title="Where we add the most leverage"
          description="Four disciplines, one advisory desk — built so your finance function scales with the business, not after it."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.index}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group preserve-3d relative bg-paper p-8 transition-colors duration-500 hover:bg-ink"
              style={{ transformOrigin: "top center" }}
            >
              <span className="font-mono text-xs text-brass-dark transition-colors duration-500 group-hover:text-brass">
                {cap.index}
              </span>
              <h3 className="mt-5 font-display text-xl text-ink transition-colors duration-500 group-hover:text-paper">
                {cap.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite/70 transition-colors duration-500 group-hover:text-paper/70">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`font-mono text-xs uppercase tracking-widest2 ${
          light ? "text-brass" : "text-brass-dark"
        }`}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.06 }}
        className={`mt-3 text-balance font-display text-3xl sm:text-4xl ${
          light ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className={`mt-4 text-balance leading-relaxed ${
            light ? "text-paper/70" : "text-graphite/70"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
