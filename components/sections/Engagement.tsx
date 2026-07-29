"use client";

import { motion } from "framer-motion";
import { engagementStages } from "@/lib/site-config";
import { SectionIntro } from "@/components/sections/Capabilities";

export default function Engagement() {
  return (
    <section className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionIntro
          eyebrow="Engagement"
          title="How an engagement runs"
          description="Four stages, in order — each one gates the next."
        />

        <div className="relative mt-16">
          <div className="absolute left-[15px] top-2 hidden h-[calc(100%-2rem)] w-px bg-line sm:block lg:left-1/2" />
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-4">
            {engagementStages.map((stage, i) => (
              <motion.div
                key={stage.index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-10 sm:pl-0"
              >
                <div className="absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-brass/50 bg-paper font-mono text-xs text-brass-dark sm:static sm:mb-5 sm:h-10 sm:w-10">
                  {stage.index}
                </div>
                <h3 className="font-display text-lg text-ink">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/70">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
