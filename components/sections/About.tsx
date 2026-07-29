"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { SectionIntro } from "@/components/sections/Capabilities";

export default function About() {
  return (
    <section id="about" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr,0.9fr] lg:gap-20">
          <div>
            <SectionIntro eyebrow="About" title={`About ${siteConfig.companyName}`} />
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-balance leading-relaxed text-graphite/70"
            >
              {siteConfig.companyName} is a strategic finance and corporate advisory firm
              supporting startups, SMEs, investors and international businesses. We provide
              integrated advisory across corporate finance, taxation, compliance and
              cross-border investment strategy — one desk, one point of accountability.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {siteConfig.aboutStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-paper p-7"
              >
                <p className="font-display text-3xl text-brass-dark sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-graphite/50">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
