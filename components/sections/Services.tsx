"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/site-config";
import { SectionIntro } from "@/components/sections/Capabilities";

export default function Services() {
  return (
    <section id="services" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionIntro
            light
            eyebrow="Services"
            title="Everything a finance function needs, unbundled"
            description="Engage us end-to-end or bring us in for the one workstream that's stuck."
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-ink p-7 transition-colors duration-400 hover:bg-ink-700"
            >
              <div className="mb-4 h-px w-8 bg-brass/50 transition-all duration-400 group-hover:w-14" />
              <h3 className="font-display text-lg text-paper">{service.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paper/60">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
