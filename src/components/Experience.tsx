"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="06."
          title="Experience"
          subtitle="Professional roles and internships."
        />

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-accent/15 md:left-1/2 md:-translate-x-px" />

          {siteConfig.experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative mb-12 flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-black md:left-1/2 md:-translate-x-1/2">
                <Briefcase size={16} className="text-accent/70" />
              </div>

              <div
                className={`ml-14 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"
                }`}
              >
                <div className="card-hover matrix-card p-6">
                  <span className="font-mono text-xs text-accent/60">
                    {exp.period}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-foreground/90">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-muted">
                    {exp.company} · {exp.location}
                  </p>
                  <ul
                    className={`mt-4 space-y-2 ${
                      index % 2 !== 0 ? "md:text-left" : ""
                    }`}
                  >
                    {exp.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-foreground/60"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
