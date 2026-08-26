"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="02."
          title="Skills & Tools"
          subtitle="Technologies I work with across security and development."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="card-hover matrix-card p-6"
            >
              <h3 className="mb-4 font-mono text-xs tracking-widest text-accent/70 uppercase">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIndex * 0.1 + i * 0.03 }}
                    className="rounded-md border border-accent/8 bg-surface-elevated px-3 py-1.5 font-mono text-xs text-foreground/60 transition-colors hover:border-accent/20 hover:text-accent/80"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
